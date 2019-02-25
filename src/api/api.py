from resources import userAnalyticsDashboard
from resources import revenueAnalyticsDashboard
from resources import authorization
from resources import refresh_token
from resources import logout_access
from resources import logout_refresh
from resources import operatorTransaction
from resources import pklotTransaction

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import datetime
from models import revoke


App=Flask(__name__)
api=Api(App)
CORS(App)

jwt=JWTManager(App)
App.config['JWT_SECRET_KEY']='test123'
App.config['JWT_ACCESS_TOKEN_EXPIRES']=datetime.timedelta(minutes=15)
App.config['JWT_REFRESH_TOKEN_EXPIRES']=datetime.timedelta(hours=5)
App.config['JWT_BLACKLIST_ENABLED']=True

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti=decrypted_token['jti']
    if revoke.isExist(jti=jti):
        return True 
    else:
        return False

@jwt.user_claims_loader
def add_claims_into_token(identity):
    return {
        'uid':identity
    }


api.add_resource(userAnalyticsDashboard,'/api/userAnalyticsDashboard/')
api.add_resource(revenueAnalyticsDashboard,'/api/revenueAnalyticsDashboard/')
api.add_resource(authorization,'/api/auth/')
api.add_resource(refresh_token,'/api/get_refresh_token/')
api.add_resource(logout_access,'/api/logout_access/')
api.add_resource(logout_refresh,'/api/logout_refresh/')
api.add_resource(operatorTransaction,'/api/operatorTransaction/')
api.add_resource(pklotTransaction,'/api/pklotTransaction/')

if __name__ == '__main__':
    App.run(debug=True,port=5000)