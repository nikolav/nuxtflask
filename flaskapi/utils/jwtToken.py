import os
import re

from flask import request
import jwt

def jwtToken(jsonPayload):
  return jwt.encode(jsonPayload,
    os.getenv('JWT_SECRET_ACCESS_TOKEN'),
    algorithm = 'HS256'
  )

def jwtTokenDecode(sToken):
  return jwt.decode(sToken, os.getenv('JWT_SECRET_ACCESS_TOKEN'), algorithms = ('HS256',))

def tokenFromRequest():
  t     = None
  token = ''
  try:
    t = re.match(r'^Basic (.+)$', request.headers['Authorization']).groups()[0]
  except:
    pass
  else:
    if t:
      token = t
  
  return token

