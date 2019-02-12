

class revokeToken():
    Blacklist=[]

    def add(self,jti):
        self.Blacklist.append(jti)

    def isExist(self,jti):
        if(self.Blacklist.count(jti)>0):
            return True
        else:
            return False

revoke=revokeToken()