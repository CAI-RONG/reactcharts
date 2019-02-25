from flask_restful import Resource,reqparse
from flask_jwt_extended import jwt_required,get_jwt_identity
from google.cloud import bigquery
import sqlalchemy.sql as sql
import sqlalchemy_bigquery.base as bq
from sqlalchemy.orm import aliased
import math

from pandas import DataFrame

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
parkinglot_name=sql.column('parkinglot_name')
device_type=sql.column('device_type')
week_no=sql.column('week_no')

#BigQuery client
client=bigquery.Client.from_service_account_json('C:\\Users\\BingZe Yu\\Downloads\\My_Project-c01a947a8626.json')

class pklotTransaction(Resource):
    @jwt_required
    def get(self):
        #initialize return value
        response={
            'data':{},
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
        end=args['end']
        timeUnit=args['timeUnit']
        operator=args['operator']
        page=int(args['page'])
        per_page=int(args['per_page'])

        #generate SQL string
        if timeUnit == 'week':
            sqlstr=sql.select([
                device_type,
                beginDate, endDate,
                parkinglot_name, week_no,
                order_qty, order_amt
            ]).select_from(
                'pklots_test.weekly_revenueAnalyticsDashboard'
            ).where(
                sql.and_(
                    'brand_name = \'%s\'' % operator,
                    'beginDate <= \'%s\'' % end
                )
            ).order_by(
                parkinglot_name.desc(), endDate.desc()
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
                response['data'][row.parkinglot_name]['iOS'].append(
                    {  
                        'beginDate':str(row.beginDate),
                        'endDate':str(row.endDate),
                        'order_qty':row.order_qty,
                        'order_amt':row.order_amt
                    }
                )
            else:#Android
                response['data'][row.parkinglot_name]['Android'].append(
                    {
                        'beginDate':str(row.beginDate),
                        'endDate':str(row.endDate),
                        'order_qty':row.order_qty,
                        'order_amt':row.order_amt
                    }
                )
        
        for i,row in enumerate(resultIterator):
            #if i >= per_page*2:#two rows of data for a day(different device_type)
                #break

            if row.parkinglot_name not in response['data'].keys():
                response['data'][row.parkinglot_name]={'iOS':[],'Android':[]}
            appendDatum(row)
        
        response['metadata']['page']=page
        response['metadata']['per_page']=per_page
        response['metadata']['rows_count']=int(resultIterator.total_rows/2)
        response['metadata']['total_pages']=math.ceil(resultIterator.total_rows/(per_page*2))
        response['currentUserId']=currentUserId

        return response, 200