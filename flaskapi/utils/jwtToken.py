import os
import re
from datetime import datetime
import json

from flask import request
import jwt

from flask_app   import db
from models.tags import Tags
from models.docs import Docs
from config      import KEY_TOKEN_CREATED_AT
from config      import TAG_TOKEN_VALID


def __with_created_at(payload):
  payload[KEY_TOKEN_CREATED_AT] = str(datetime.now())
  return payload


def tokenFromRequest():
  t     = ''
  token = ''
  try:
    t = re.match(r'^Bearer (.+)$', request.headers.get('Authorization')).groups()[0]
  except Exception as err:
    raise err
  else:
    if t:
      token = t
  
  return token


def decode(sToken):
  return jwt.decode(sToken, os.getenv('JWT_SECRET_ACCESS_TOKEN'), algorithms = ('HS256',))


def expired(token):
  jsonTokenPayload = token if isinstance(token, dict) else decode(token)
  ddif = datetime.now() - datetime.fromisoformat(jsonTokenPayload[KEY_TOKEN_CREATED_AT])
  return int(os.getenv('JWT_EXPIRE_SECONDS')) < ddif.total_seconds()
  

def encode(jsonPayload):
  return jwt.encode(__with_created_at(jsonPayload),
    os.getenv('JWT_SECRET_ACCESS_TOKEN'),
    algorithm = 'HS256'
  )
  

def issueToken(jsonPayload):
  token = encode(jsonPayload)
  tag   = Tags.query.filter(Tags.tag == TAG_TOKEN_VALID).first()

  # add valid tokens '@token/valid' list
  
  if not tag:
    tag = Tags(tag = TAG_TOKEN_VALID)
    db.session.add(tag)
  
  docTokenValid = Docs(data = json.dumps({ f'{token}': 1 }))
  tag.docs.append(docTokenValid)
  
  db.session.commit()

  return token
  

def valid(token):
  tag = Tags.query.filter(Tags.tag == TAG_TOKEN_VALID).first()
  return any(token in json.loads(doc.data) for doc in tag.docs) if tag else False


def setInvalid(token):
  if token:
    tag = Tags.query.filter(Tags.tag == TAG_TOKEN_VALID).first()
    if tag:
      for doc in tag.docs:
        if token in json.loads(doc.data):
          db.session.delete(doc)
          db.session.commit()
          break


def clearExpiredAll():
  tag = Tags.query.filter(Tags.tag == TAG_TOKEN_VALID).first()
  if tag:
    for doc in tag.docs:
      for token in json.loads(doc.data):
        if expired(token):
          db.session.delete(doc)
    db.session.commit()


