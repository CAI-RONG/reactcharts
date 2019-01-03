from flask import Flask, jsonify
from flask_cors import CORS
from google.cloud import bigquery

App=Flask(__name__)
CORS(App)

client=bigquery.Client()

@App.route('/api/userAnalyticsDashboard', methods=['GET'])
def test():
    quary=client.query(
        '''SELECT descript,timestamp,resolution 
            FROM `bigquery-public-data.san_francisco.sfpd_incidents`
            WHERE category='BURGLARY' 
            ORDER BY timestamp DESC 
            LIMIT 10''')
    result=quary.result()
    #result_dict=result.to_dataframe().to_dict()
    temp=[]
    for row in result:
        temp.append({'descript':row.descript,'time':row.timestamp,'state':row.resolution})
    return jsonify({'data':temp}), 200


@App.route('/api/lineChart/name=<string:name>/begin=<string:begin>/end=<string:end>/timeScale=<string:timeScale>', methods=['GET'])
def getDataFromBigquery(name, begin, end, timeScale):
    
    #some sql command here to get data from BigQuery
    if name == 'activedUser':
        """#MAU
        query=client.query('''
            SELECT CAST(week_no AS STRING) AS date,
                    mau AS value
            FROM 'datasetName'
            WHERE device_type=1
              AND day_of_week=7
              AND stats_date BETWEEN '''+begin+' AND '+end+''' 
            ORDER BY stats_date DESC
            LIMIT 6
        ''')
        MAU_iOS=query.result().to_dataframe().to_dict()
        query=client.query('''
            SELECT CAST(week_no AS STRING) AS date,
                    mau AS value
            FROM 'datasetName'
            WHERE device_type=2
              AND day_of_week=7
              AND stats_date BETWEEN '''+begin+' AND '+end+''' 
            ORDER BY stats_date DESC
            LIMIT 6
        ''')
        MAU_Android=query.result().to_dataframe().to_dict()
        MAU_Total={'date':[],'value':[]}
        for d,i in MAU_iOS['date']:
            MAU_Total['date'].append(d)
            MAU_Total['value'].append(MAU_iOS['value'][i]+MAU_Android['value'][i])
        MAU={'Total':MAU_Total,'iOS':MAU_iOS,'Android':MAU_Android}
        return jsonify(MAU), 200"""
        return {}
    else:
        return jsonify({'name':name, 'beginDate':begin, 'endDate':end, 'timeScale':timeScale}), 200


if __name__ == '__main__':
    App.run(debug=True)