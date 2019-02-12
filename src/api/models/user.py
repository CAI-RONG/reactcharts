from passlib.hash import pbkdf2_sha256 as sha256

class userModel():
    def __init__(self,uid=0):
        if uid != 0:
            pass#grab user info from db

    userName=''
    email=''
    id=0
    pwd=''

    @staticmethod
    def create_user(name, email, pwd):
        pass

    @staticmethod
    def find_user_by_email(email):
        pass#return uid
    
    def change_pwd(self):
        pass

    def delete_user(self):
        pass

    def verify_pwd(self):
        pass#return true if pwd is correct
        