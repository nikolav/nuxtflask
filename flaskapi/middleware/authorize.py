import re

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

  # pass open routes
  if any(re.match(p, request.path) for p in PATHS_SKIP_AUTHORIZATION):
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
    
    # pass if authorized
    if Docs.query.filter(Docs.id == payload['id']).count():
      # access token valid/not-expired here
      # store @g for registered user
      g.access_token = token
      return
  
  # except Exception as err:
  #   raise err
  except:
    pass

  # abort.401 otherwise
  return abort(make_response('', 401))
