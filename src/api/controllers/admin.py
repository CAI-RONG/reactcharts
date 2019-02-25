
from models import db
from api import admin



class UserView(ModelView):
	can_delete = False
	can_edit = False
	can_create = False
	column_labels = dict( username='us',)
	#column_exclude_list = ('password_hash',)

admin.add_view(UserView(userModel, db.session, name='userdb', category='user'))
