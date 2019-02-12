from flask_restful import Resource,reqparse
from flask_jwt_extended import jwt_required,get_jwt_identity
from google.cloud import bigquery
import sqlalchemy.sql as sql
import sqlalchemy_bigquery.base as bq
import math


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
                'per-page':0,
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
        page=args['page']
        per_page=args['per_page']

        #generate SQL string
        if timeUnit == 'week':# there will be a table for weekly data on bigquery
            sqlstr=sql.select([
                brand_name, week_no,
                order_qty, order_amt
            ]).select_from(
                sql.table('dataset.table')
            ).group_by(
                brand_name, week_no
            ).where(
                sql.and_('endDate >= \'%s\''%begin, 'beginDate <= \'%s\''%end)
            ).order_by(
                endDate.desc()
            ).limit(2).compile(dialect=bq.BQDialect())

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

        #fill data into response

        response['metadata']['page']=page
        response['metadata']['per_page']=per_page
        response['metadata']['rows_count']=int(resultIterator.total_rows/2)
        response['metadata']['total_pages']=math.ceil(resultIterator.total_rows/(per_page*2))
        response['currentUserId']=currentUserId

        return response, 200