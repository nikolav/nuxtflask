import re

from flask import request
from flask import abort
from flask import make_response

from models.docs    import Docs
from utils.jwtToken import jwtTokenDecode
from utils.jwtToken import tokenFromRequest
from config         import PATHS_SKIP_AUTHORIZATION


def authorize():
  # @before_request

  # pass open routes
  if any(re.match(p, request.path) for p in PATHS_SKIP_AUTHORIZATION):
    return
  
  # @auth
  try:

    # get token/payload from auth header
    payload = jwtTokenDecode(tokenFromRequest())
    
    # pass if authorized
    if Docs.query.filter(Docs.id == payload['id']).count():
      return
  
  except:
    pass

  # abort.401 otherwise
  return abort(make_response('', 401))
