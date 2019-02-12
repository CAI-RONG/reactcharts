from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity,create_access_token,jwt_refresh_token_required


class refresh_token(Resource):
    @jwt_refresh_token_required
    def get(self):
        identity=get_jwt_identity()
        access_token=create_access_token(identity=identity, fresh=False)
        return {'access_token':access_token}, 200