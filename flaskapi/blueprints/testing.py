# import json

from flask      import Blueprint
# from flask      import request
from flask      import g
from flask_cors import CORS
# from flask_cors import cross_origin
# from flask import make_response
# from flask import abort

from flask_app       import db
from models.tags     import Tags
from models.docs     import Docs
from models.policies import Policy
# from utils.pw       import hash  as hashPassword
# from utils.pw       import check as checkPassword
# from utils.jwtToken import issueToken
# from utils.jwtToken import setInvalid as tokenSetInvalid
# from config         import TAG_USERS

bp_testing = Blueprint('testing', __name__, url_prefix = '/test')
cors_bp_testing = CORS(bp_testing)

@bp_testing.route('/', methods = ('GET',))
def testing_home():
  a = Policy.by_name('admins')
  docs = [d.id for d in a.docs]
  return docs