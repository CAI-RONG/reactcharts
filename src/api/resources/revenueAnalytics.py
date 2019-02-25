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
parser.add_argument('end')
parser.add_argument('timeUnit')

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
client=bigquery.Client.from_service_account_json('C:\\Users\\BingZe Yu\\Downloads\\My_Project-c01a947a8626.json')

class revenueAnalyticsDashboard(Resource):
    @jwt_required
    def get(self):
        
        #initialize return value
        response={
            'data':{
                'offRoad':{
                    'iOS':[],
                    'Android':[]
                },
                'roadSide':[],
                'subscribe':[]
            },
            'error':'no error',
            'currentUserId':0
        }

        currentUserId=get_jwt_identity()

        #get request arguments
        args=parser.parse_args()
        end=args['end']
        timeUnit=args['timeUnit']

        #generate SQL string
        if timeUnit == 'week':# there will be a table for weekly data on bigquery
            sqlstr=sql.select([
                device_type, brand_name, week_no,
                sql.label('order_qty',func.sum(order_qty)),
                sql.label('order_amt',func.sum(order_amt))
            ]).select_from(
                sql.table('pklots_test.weekly_revenueAnalyticsDashboard')
            ).where(
                sql.and_(
                    'beginDate <= \'%s\''%end,
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
                brand_name,week_no,endDate,device_type
            ).order_by(
                endDate.desc()
            ).compile(dialect=bq.BQDialect())

        query=client.query(str(sqlstr))
        result=query.result()
        resultIterator=bigquery.table.RowIterator(
            client=client,
            api_request=result.api_request,
            path=result.path,
            schema=result.schema
        )

        def fillData(row,type_):
            arr=list(map(lambda d:d['brand_name'],response['data']['offRoad'][type_]))#which brand_name has been added into response['data']['offRoad']
            #combine current week and last week
            if row.brand_name in arr:
                current_object=response['data']['offRoad'][type_][arr.index(row.brand_name)]
                current_object['device_type']=row.device_type
                current_object['last_qty']=row.order_qty
                current_object['diff_qty']=current_object['current_qty']-current_object['last_qty']
                current_object['ratio_qty']=int((float(current_object['diff_qty'])/float(current_object['last_qty']))*100)
                current_object['last_amt']=row.order_amt
                current_object['diff_amt']=current_object['current_amt']-current_object['last_amt']
                current_object['ratio_amt']=int((float(current_object['diff_amt'])/float(current_object['last_amt']))*100)
            else:
                response['data']['offRoad'][type_].append(
                    {
                        'brand_name':row.brand_name,
                        'current_qty':row.order_qty,
                        'current_amt':row.order_amt
                    }
                )
            

        
        for row in resultIterator:
            if row.device_type == 1:#iOS
                fillData(row,'iOS')
            else:#Android
                fillData(row,'Android')
        
        #sort
        response['data']['offRoad']['iOS']=sorted(response['data']['offRoad']['iOS'], key=lambda d:d['brand_name'])
        response['data']['offRoad']['Android']=sorted(response['data']['offRoad']['Android'], key=lambda d:d['brand_name'])

        response['currentUserId']=currentUserId
        response['raw_data']=result.to_dataframe().to_dict()
        response['raw_SQL']=str(sqlstr)
        return response, 200