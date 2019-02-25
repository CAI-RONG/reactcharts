from flask_restful import Resource
from flask_jwt_extended import jwt_required,get_jwt_identity,get_raw_jwt
from models.revokeToken import revoke

class logout_access(Resource):
    @jwt_required
    def post(self):
    	try:
        	jti=get_raw_jwt()['jti']
        	revoke.add(jti=jti)
        	return {'msg':'Successfully logged out!'}, 200
        except Exception as e:
        	print(type(e), str(e))
        	return {'msg':'something wrong'}, 500
        	