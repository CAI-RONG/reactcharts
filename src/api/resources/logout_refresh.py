from flask_restful import Resource
from flask_jwt_extended import jwt_refresh_token_required,get_jwt_identity,get_raw_jwt
from models.revokeToken import revoke

class logout_refresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti=get_raw_jwt()['jti']
        revoke.add(jti=jti)
        return {'msg':'Successfully logged out!'}, 200
