from flask_restful import Resource,reqparse
from flask_jwt_extended import jwt_required,get_jwt_identity
from google.cloud import bigquery
import sqlalchemy.sql as sql
import sqlalchemy_bigquery.base as bq
from sqlalchemy.orm import aliased
import math

#request parameters
parser=reqparse.RequestParser()
parser.add_argument('begin')
parser.add_argument('end')
parser.add_argument('timeUnit')
parser.add_argument('page')
parser.add_argument('per_page')
parser.add_argument('operator')

#columns in the table
beginDate=sql.column('beginDate')
endDate=sql.column('endDate')
order_qty=sql.column('order_qty')
order_amt=sql.column('order_amt')
brand_name=sql.column('brand_name')
device_type=sql.column('device_type')
week_no=sql.column('week_no')

#BigQuery client
client=bigquery.Client.from_service_account_json("/Users/una/Downloads/My_Project-c01a947a8626.json")# tables for revenue haven't exist yet

class operatorTransaction(Resource):
    @jwt_required
    def get(self):
        #initialize return value
        response={
            'data':{
                'iOS':[],
                'Android':[]
            },
            'metadata':{
                'page':0,
                'per_page':0,
                'rows_count':0,
                'total_pages':0
            },
            'error':'no error',
            'currentUserId':0
        }

        currentUserId=get_jwt_identity()

        #get request argument
        args=parser.parse_args()
        #begin=args['begin']
        end=args['end']
        timeUnit=args['timeUnit']
        operator=args['operator']
        page=int(args['page'])
        per_page=int(args['per_page'])

        #generate SQL string
        if timeUnit == 'week':
            #subquery
            tempsql=sql.select([
                device_type,
                beginDate, endDate,
                brand_name, week_no,
                sql.label('order_qty',sql.func.sum(order_qty)),
                sql.label('order_amt',sql.func.sum(order_amt))
            ]).select_from(
                sql.table('pklots_test.weekly_revenueAnalyticsDashboard')
            ).where(
                'beginDate <= \'%s\''%end
            ).group_by(
                brand_name, week_no, beginDate, endDate, device_type
            ).order_by(endDate.desc())
            
            #Alias
            a=aliased(tempsql,name='a')
            b=aliased(tempsql,name='b')

            #query string
            # c means column of the alias
            sqlstr=sql.select([
                a.c.device_type,
                a.c.beginDate, a.c.endDate,
                a.c.brand_name, a.c.week_no,
                a.c.order_qty, a.c.order_amt,
                sql.label('last_order_qty',b.c.order_qty),
                sql.label('last_order_amt',b.c.order_amt)
            ]).select_from(
                a.outerjoin(
                    b,
                    sql.and_(
                        'a.brand_name = b.brand_name',
                        'a.week_no-%d = b.week_no' % 1,
                        'a.device_type = b.device_type'
                    )
                )
            ).where(
                'a.brand_name = \'%s\'' % operator
            ).compile(dialect=bq.BQDialect())


        query=client.query(str(sqlstr))
        result=query.result()
        resultIterator=bigquery.table.RowIterator(
            client=client,
            api_request=result.api_request,
            path=result.path,
            schema=result.schema,
            page_size=per_page
        )

        #for i in range(page-1):
            #resultIterator._next_page()
        
        def appendDatum(row):
            if row.device_type == 1:#iOS
                response['data']['iOS'].append(
                    {  
                        'operator':row.brand_name,
                        'beginDate':str(row.beginDate),
                        'endDate':str(row.endDate),
                        'current_qty':row.order_qty if row.order_qty else 'No Data',
                        'last_qty':row.last_order_qty if row.last_order_qty else 'No Data',
                        'diff_qty':row.order_qty-row.last_order_qty if row.last_order_qty else 'No Data',
                        'ratio_qty':int(float(row.order_qty-row.last_order_qty)/float(row.last_order_qty)*100) if row.last_order_qty else 'No Data',
                        'current_amt':row.order_amt if row.order_amt else 'No Data',
                        'last_amt':row.last_order_amt if row.last_order_amt else 'No Data',
                        'diff_amt':row.order_amt-row.last_order_amt if row.last_order_amt else 'No Data',
                        'ratio_amt':int(float(row.order_amt-row.last_order_amt)/float(row.last_order_amt)*100) if row.last_order_amt else 'No Data'
                    }
                )
            else:#Android
                response['data']['Android'].append(
                    {
                        'operator':row.brand_name,
                        'beginDate':str(row.beginDate),
                        'endDate':str(row.endDate),
                        'current_qty':row.order_qty if row.order_qty else 'No Data',
                        'last_qty':row.last_order_qty if row.last_order_qty else 'No Data',
                        'diff_qty':row.order_qty-row.last_order_qty if row.last_order_qty else 'No Data',
                        'ratio_qty':int(float(row.order_qty-row.last_order_qty)/float(row.last_order_qty)*100) if row.last_order_qty else 'No Data',
                        'current_amt':row.order_amt if row.order_amt else 'No Data',
                        'last_amt':row.last_order_amt if row.last_order_amt else 'No Data',
                        'diff_amt':row.order_amt-row.last_order_amt if row.last_order_amt else 'No Data',
                        'ratio_amt':int(float(row.order_amt-row.last_order_amt)/float(row.last_order_amt)*100) if row.last_order_amt else 'No Data'
                    }
                )
        
        for i,row in enumerate(resultIterator):
            if i >= per_page*2:#two rows of data for a day(different device_type)
                break
            appendDatum(row)
        
        response['metadata']['page']=page
        response['metadata']['per_page']=per_page
        response['metadata']['rows_count']=int(resultIterator.total_rows/2)
        response['metadata']['total_pages']=math.ceil(resultIterator.total_rows/(per_page*2))
        response['currentUserId']=currentUserId
        
        return response, 200
