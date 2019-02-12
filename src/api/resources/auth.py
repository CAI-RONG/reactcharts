from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api, reqparse, Resource, abort
from flask_jwt_extended import create_access_token,create_refresh_token, get_jwt_identity, jwt_required,fresh_jwt_required
from models import userModel

parser=reqparse.RequestParser()
#parser.add_argument('userName')
parser.add_argument('email')
parser.add_argument('pwd')

class authorization(Resource):
    def get(self):
        args=parser.parse_args()
        email=args['email']
        pwd=args['pwd']

        """uid=userModel().find_user_by_email(email)
        user=userModel(uid)
        
        if not uid:
            return {'msg':'Unrecognized User!'}, 400
        elif not user.verify_pwd():
            return {'msg':'Wrong password!'}, 400
        else:
            access_token=create_access_token(identity=uid,fresh=True)
            refresh_token=create_refresh_token(identity=uid)
            return {'access_token':access_token,'refresh_token':refresh_token}, 200"""
        uid_test=1
        if email!='test':
            return {'msg':'Unrecognized User!'}, 400
        elif pwd != '123':
            return {'msg':'Wrong password!'}, 400
        else:
            access_token=create_access_token(identity=uid_test,fresh=True)
            refresh_token=create_refresh_token(identity=uid_test)
            return {'access_token':access_token,'refresh_token':refresh_token}, 200

    #@fresh_jwt_required
    #def put(self):
