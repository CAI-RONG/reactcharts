from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api, reqparse, Resource, abort
from flask_jwt_extended import create_access_token,create_refresh_token, get_jwt_identity, jwt_required,fresh_jwt_required
from models import userModel

parser=reqparse.RequestParser()
#parser.add_argument('username')
parser.add_argument('email')
parser.add_argument('password')

class authorization(Resource):
    def get(self):
        args=parser.parse_args()
        email=args['email']
        password=args['password']

        print email
        print password

        current_user = userModel.find_user_by_email(email)

        if current_user is None: #True
            return {'msg': 'User {} doesn\'t exist'.format(email)},400
        
        #elif userModel.verify_hash(password, current_user.password):
        elif password == current_user.password:
            access_token=create_access_token(identity=current_user.id,fresh=True)
            refresh_token=create_refresh_token(identity=current_user.id)
            return {
                'access_token':access_token,
                'refresh_token':refresh_token,
                'username':current_user.username
                #'msg': 'Logged in as {}'.format(current_user.username)
            }, 200
           
        else:
            return {'msg': 'Wrong credentials'},400

'''
class register(Resource):
    def post(self):
        args=parser.parse_args()

        new_user = userModel(
            username = args['username'],
            email = args['email'],
            password = userModel.generate_hash(password=args['password'])
        )

        try:
            new_user.save_to_db()
'''

    #@fresh_jwt_required
    #def put(self):
