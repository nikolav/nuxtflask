import re
import json

from flask import request
from flask import abort
from flask import make_response
from flask import g

from models.docs    import Docs
from utils.jwtToken import tokenFromRequest
from utils.jwtToken import decode     as jwtTokenDecode
from utils.jwtToken import expired    as tokenExpired
from utils.jwtToken import valid      as tokenValid
from config         import PATHS_SKIP_AUTHORIZATION


def authorize():
  # @before_request

  docUser = None
    
  # pass open routes
  if any(re.match(p, request.path) for p in PATHS_SKIP_AUTHORIZATION):
    return
  
  # ensure all CORS preflight OPTIONS requests 
  # are answered with a successful HTTP status code (2xx)
  # and do not redirect
  if 'OPTIONS' == request.method.upper():
    return

  # @auth
  try:
    # get token/payload from auth header
    token   = tokenFromRequest()
    payload = jwtTokenDecode(token)

    
    # abort.401 if token expired
    if tokenExpired(payload):
      # setInvalid(token)
      raise Exception

    # abort.401 if token invalid
    if not tokenValid(token):
      raise Exception
    
    # pass if authorized, user exists in db
    docUser = Docs.query.get(payload['id'])
    if docUser:
      
      # cache auth-data
      g.access_token         = token
      g.access_token_payload = payload
      g.user_data            = json.loads(docUser.data)
      
      # run next
      return
  
  # except Exception as err:
  #   raise err
  except:
    pass

  # 401/unauthorized otherwise
  return abort(make_response('', 401))
