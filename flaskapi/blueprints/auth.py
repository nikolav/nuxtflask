import json

from flask      import Blueprint
from flask      import request
from flask      import g
from flask_cors import CORS
# from flask_cors import cross_origin
# from flask import make_response
# from flask import abort

from flask_app      import db
from models.tags    import Tags
from models.docs    import Docs
from utils.pw       import hash  as hashPassword
from utils.pw       import check as checkPassword
from utils.jwtToken import issueToken
from utils.jwtToken import setInvalid as tokenSetInvalid
from config         import TAG_USERS


# router config
bp_auth = Blueprint('register', __name__, url_prefix = '/auth')

# cors blueprints as wel for cross-domain requests
cors_bp_auth = CORS(bp_auth)


# @cross_origin
@bp_auth.route('/register', methods = ('POST',))
def auth_register():
  # data: { email: string; password: string }
  data = request.get_json()
  
  email    = data.get('email')
  password = data.get('password')
  
  tag   = None
  token = ''

  # require email and password
  if email and password:
    try:
      tag = Tags.query.filter(Tags.tag == TAG_USERS).first()
      # skip if already registered
      for doc in tag.docs:
        d = json.loads(doc.data)
        if email == d['email'] and checkPassword(password, d['password']):
          raise Exception
      
      # register
      dataNewUser = json.dumps({ 
        'email'    : email, 
        'password' : hashPassword(password)
      })
      docNewUser = Docs(data = dataNewUser)
      tag.docs.append(docNewUser)
      db.session.commit()

      # new user added, get access-token
      token = issueToken({ 'id': docNewUser.id })
      
    # except Exception as err:
    #   raise err
    except:
      pass
    else:
      # user registered, send token, 201
      return { 'token': token }, 201
  
  return {}, 403
  
  
# @cross_origin
@bp_auth.route('/login', methods = ('POST',))
def auth_login():
  data = request.get_json()
  
  email    = data.get('email')
  password = data.get('password')
  
  docUser = None
  token   = ''
  
  if email and password:
    try:
      tag = Tags.query.filter(Tags.tag == TAG_USERS).first()
      for doc in tag.docs:
        d = json.loads(doc.data)
        if email == d['email'] and checkPassword(password, d['password']):
          docUser = doc
          break

      if docUser:
        token = issueToken({ 'id': docUser.id })
        
    except:
      pass

    else:
      if token:
        return { 'token': token }, 200

  return {}, 401


# @cross_origin
@bp_auth.route('/logout', methods = ('POST',))
def auth_logout():
  try:
    tokenSetInvalid(g.get('access_token'))
  except Exception as err:
    raise err
  # except:
  #   pass
  else:
    return {}, 200
  
# @cross_origin
@bp_auth.route('/who', methods = ('GET',))
def auth_who():
  try:
    # send user data
    return { 'email': g.get('user_data')['email'] }, 200
  except Exception as err:
    raise err
    # pass
  
  # throw 404.not-found
  # return '', 400

