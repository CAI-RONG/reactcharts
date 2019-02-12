from flask_restful import Resource,reqparse
from flask_jwt_extended import jwt_required,get_jwt_identity
from google.cloud import bigquery
import sqlalchemy.sql as sql
import sqlalchemy_bigquery.base as bq
from sqlalchemy.sql import func
import math
from pandas import DataFrame


#request parameter
parser=reqparse.RequestParser()
parser.add_argument('begin')
parser.add_argument('end')
parser.add_argument('timeUnit')
parser.add_argument('page')
parser.add_argument('per_page')

#columns in the table
beginDate=sql.column('beginDate')
endDate=sql.column('endDate')
city_name=sql.column('city_name')
brand_name=sql.column('brand_name')
parkinglot_name=sql.column('parkinglot_name')
order_amt=sql.column('order_amt')
order_qty=sql.column('order_qty')
device_type=sql.column('device_type')
week_no=sql.column('week_no')


#BigQuery client
client=bigquery.Client.from_service_account_json('C:\\Users\\BingZe Yu\\Downloads\\My_Project-c01a947a8626.json')# tables for revenue haven't exist yet

class revenueAnalyticsDashboard(Resource):
    @jwt_required
    def get(self):
        
        #initialize return value
        response={
            'data':{
                'offRoad':[],
                'roadSide':[],
                'subscribe':[]
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

        #get request arguments
        args=parser.parse_args()
        begin=args['begin']
        end=args['end']
        timeUnit=args['timeUnit']
        page=int(args['page'])
        per_page=int(args['per_page'])

        #generate SQL string
        if timeUnit == 'week':# there will be a table for weekly data on bigquery
            sqlstr=sql.select([
                brand_name, week_no,
                sql.label('order_qty',func.sum(order_qty)),
                sql.label('order_amt',func.sum(order_amt))
            ]).select_from(
                sql.table('pklots_test.weekly_revenueAnalyticsDashboard')
            ).where(
                sql.and_('beginDate <= \'%s\''%end,
                    week_no.in_(
                        sql.select(
                            [week_no],
                            distinct=True
                        ).select_from(
                            sql.table('pklots_test.weekly_revenueAnalyticsDashboard')
                        ).order_by(
                            week_no.desc()
                        ).limit(2)
                    )
                )
            ).group_by(
                brand_name,week_no,endDate
            ).order_by(
                endDate.desc()
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

        for i in range(page-1):
            resultIterator._next_page()

        for row in resultIterator:
            arr=list(map(lambda d:d['brand_name'],response['data']['offRoad']))
            if row.brand_name in arr:
                current_object=response['data']['offRoad'][arr.index(row.brand_name)]
                current_object['last_qty']=row.order_qty
                current_object['diff_qty']=current_object['current_qty']-current_object['last_qty']
                current_object['ratio_qty']=int((float(current_object['diff_qty'])/float(current_object['last_qty']))*100)
                current_object['last_amt']=row.order_amt
                current_object['diff_amt']=current_object['current_amt']-current_object['last_amt']
                current_object['ratio_amt']=int((float(current_object['diff_amt'])/float(current_object['last_amt']))*100)
            else:
                response['data']['offRoad'].append(
                    {
                        'brand_name':row.brand_name,
                        'current_qty':row.order_qty,
                        'current_amt':row.order_amt
                    }
                )

        response['metadata']['page']=page
        response['metadata']['per_page']=per_page
        response['metadata']['rows_count']=int(resultIterator.total_rows/2)
        response['metadata']['total_pages']=math.ceil(resultIterator.total_rows/(per_page*2))
        response['currentUserId']=currentUserId

        return response, 200