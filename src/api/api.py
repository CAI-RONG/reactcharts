

from resources import userAnalyticsDashboard
from resources import revenueAnalyticsDashboard
from resources import authorization
from resources import refresh_token
from resources import logout_access
from resources import logout_refresh

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_restful import Api
from flask_admin import Admin, BaseView, expose

import datetime

from models import revoke
from models import db


app=Flask(__name__)
api=Api(app)
CORS(app)

#--- admin ---
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
admin = Admin(app, name='dashboard', template_mode='bootstrap3')


from flask_admin.contrib.sqla import ModelView
from models import userModel
admin.add_view(ModelView(userModel, db.session))

#--- jwt ---

jwt=JWTManager(app)
app.config['JWT_SECRET_KEY']='test123'
app.config['JWT_ACCESS_TOKEN_EXPIRES']=datetime.timedelta(minutes=15)
app.config['JWT_REFRESH_TOKEN_EXPIRES']=datetime.timedelta(hours=5)
app.config['JWT_BLACKLIST_ENABLED']=True

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti=decrypted_token['jti']
    if revoke.isExist(jti=jti):
        return True 
    else:
        return False


#--- SQLALCHEMY  ---       
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:1051446@127.0.0.1:5432/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'

db.init_app(app)

with app.app_context():
	# within this block, current_app points to app.
    db.create_all()

api.add_resource(userAnalyticsDashboard,'/api/userAnalyticsDashboard/')
api.add_resource(revenueAnalyticsDashboard,'/api/revenueAnalyticsDashboard/')
api.add_resource(authorization,'/api/auth/')
api.add_resource(refresh_token,'/api/get_refresh_token/')
api.add_resource(logout_access,'/api/logout_access/')
api.add_resource(logout_refresh,'/api/logout_refresh/')

if __name__ == '__main__':
    app.run(threaded=True)