import os
import re

from flask import request
from flask import make_response
from flask import abort
import jwt

from models.docs import Docs
from config import paths_skip_authorization


def authorize():
  # @before_request

  # pass open routes
  if any(re.match(p, request.path) for p in paths_skip_authorization):
    return
  
  # @auth
  try:

    # get token from auth header
    token   = re.match(r'^Basic (.+)$', request.headers['Authorization']).groups()[0]
    payload = jwt.decode(token, os.getenv('JWT_SECRET_ACCESS_TOKEN'), algorithms = ('HS256',))
    
    # pass if authorized
    if Docs.query.filter(Docs.id == payload['id']).count():
      return
  
  except:
    pass

  # abort.401 otherwise
  return abort(make_response([], 401))
