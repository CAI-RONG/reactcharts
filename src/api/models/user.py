from passlib.hash import pbkdf2_sha256 as sha256
from database import db

class userModel(db.Model):
    __tablename__ = 'userTable'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable = False)
    email = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable = False)


    def __repr__(self):
        return '<UserModel %r>' % self.username

    # def save_to_db(self):
    #     new_user = userModel(username='user1', email='test@test', password='123') 
    #     db.session.add(new_user)
    #     db.session.add(self)
    #     db.session.commit()
    #     db.session.close()

    @staticmethod
    def find_user_by_email(email):
        print '------ execute find_user_by_email ------'
        #for a non existing email gives None
        try:
            user = userModel.query.filter_by(email=email).first()
            db.session.close()
            print user   
            return user
        except Exception as e:
            print(type(e), str(e))
            return {'msg':'something wrong'}, 500

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)
'''
    @staticmethod
    def create_user(name, email, password):
        new_user = userModel(
            username='user1',
            password=userModel.generate_hash(password)
        )

        try:
            new_user.save_to_db()


    def change_pwd(self):
        pass

    def delete_user(self):
        pass

    def verify_pwd(self):
        pass#return true if pwd is correct
'''