from flask import Flask, jsonify, request
from google.cloud import bigquery
from flask_restful import Api, reqparse, Resource, abort
from flask_jwt_extended import get_jwt_identity, jwt_required,get_jwt_claims
import sqlalchemy.sql as sql
import sqlalchemy_bigquery.base as bq
import datetime
import math

#userAnalyticsDashboard api v1.0

#request parameters
parser=reqparse.RequestParser()
parser.add_argument('begin')
parser.add_argument('end')
parser.add_argument('timeUnit')
parser.add_argument('page')
parser.add_argument('per_page')


#columns in the table
device_type=sql.column('device_type')
beginDate=sql.column('beginDate')#first day of the selected duration
endDate=sql.column('endDate')#last day of the selected duration
num_downloads=sql.column('num_downloads')
num_valid_device=sql.column('num_valid_device')
MAU=sql.column('MAU')
WAU=sql.column('WAU')
DAU=sql.column('DAU')
stickiness=sql.column('stickiness')
num_user=sql.column('num_user')
num_user_with_lp=sql.column('num_user_with_lp')
num_user_with_subscription=sql.column('num_user_with_subscription')

#BigQuery client
client=bigquery.Client.from_service_account_json('C:\\Users\\BingZe Yu\\Downloads\\My_Project-c01a947a8626.json')

class userAnalyticsDashboard(Resource):
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
        begin=datetime.datetime.strptime(args['begin'],'%Y-%m-%d').date()
        end=datetime.datetime.strptime(args['end'],'%Y-%m-%d').date()
        timeUnit=args['timeUnit']
        page=int(args['page'])
        per_page=int(args['per_page'])

        #generate SQL string
        if timeUnit == 'week':
            sqlstr=sql.select([
                device_type,
                beginDate, endDate,
                num_downloads, num_valid_device,
                MAU, WAU, DAU, stickiness,
                num_user, num_user_with_lp, num_user_with_subscription
            ]).select_from(
                sql.table('pklots_test.weekly_userAnalyticsDashboard')
            ).where(
                sql.and_('endDate >= \'%s\''%begin, 'beginDate <= \'%s\''%end)
            ).order_by(endDate).compile(dialect=bq.BQDialect())
        elif timeUnit == 'month':
            sqlstr=sql.select([
                device_type,
                beginDate, endDate,
                num_downloads, num_valid_device,
                MAU, WAU, DAU, stickiness,
                num_user, num_user_with_lp, num_user_with_subscription
            ]).select_from(
                sql.table('dataset.table(monthly)')
            ).where(
                sql.and_('endDate >= \'%s\''%begin, 'beginDate <= \'%s\''%end)
            ).order_by(endDate).compile(dialect=bq.BQDialect())
        elif timeUnit == 'day':
            sqlstr=sql.select([
                device_type,
                beginDate, endDate,
                num_downloads, num_valid_device,
                MAU, WAU, DAU, stickiness,
                num_user, num_user_with_lp, num_user_with_subscription
            ]).select_from(
                sql.table('dataset.table(daily)')
            ).where(
                sql.and_('endDate >= \'%s\''%begin, 'beginDate <= \'%s\''%end)
            ).order_by(endDate).compile(dialect=bq.BQDialect())

        queryJob=client.query(str(sqlstr))
        result=queryJob.result()
        resultIterator=bigquery.table.RowIterator(
            client=client,
            api_request=result.api_request,
            path=result.path,
            schema=result.schema,
            page_size=per_page
        )

        for i in range(page-1):
            resultIterator._next_page()

        def appendDatum(row):
            if row.device_type ==1:# iOS
                response['data']['iOS'].append(
                    {
                        'device_type':row.device_type,
                        'beginDate':str(row.beginDate),
                        'endDate':str(row.endDate),
                        'num_downloads':row.num_downloads,
                        'num_valid_device':row.num_valid_device,
                        'MAU':row.MAU,
                        'WAU':row.WAU,
                        'DAU':row.DAU,
                        'stickiness':row.stickiness,
                        'num_user':row.num_user,
                        'num_user_with_lp':row.num_user_with_lp,
                        'num_user_with_subscription':row.num_user_with_subscription
                    }
                )
            else:# Android
                response['data']['Android'].append(
                    {
                        'device_type':row.device_type,
                        'beginDate':str(row.beginDate),
                        'endDate':str(row.endDate),
                        'num_downloads':row.num_downloads,
                        'num_valid_device':row.num_valid_device,
                        'MAU':row.MAU,
                        'WAU':row.WAU,
                        'DAU':row.DAU,
                        'stickiness':row.stickiness,
                        'num_user':row.num_user,
                        'num_user_with_lp':row.num_user_with_lp,
                        'num_user_with_subscription':row.num_user_with_subscription
                    }
                )

        for i,row in enumerate(resultIterator):
            if i >= per_page*2:# two rows of data for a day(different device_type)
                break
            appendDatum(row)

        response['metadata']['page']=page
        response['metadata']['per_page']=per_page
        response['metadata']['rows_count']=int(resultIterator.total_rows/2)
        response['metadata']['total_pages']=math.ceil(resultIterator.total_rows/(per_page*2))
        response['currentUserId']=currentUserId

        return response, 200
        