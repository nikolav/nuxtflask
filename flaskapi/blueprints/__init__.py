import os
import json

from flask import Blueprint

from models.tags import Tags


bp_home = Blueprint('home', __name__, url_prefix = '/')

@bp_home.route('/', methods = ['GET'])
def status_ok():
  app_name = ''
  tag = Tags.query.filter(Tags.tag == '@vars').first()
  for d in tag.docs:
    data = json.loads(d.data)
    if 'app:name' in data:
      app_name = data['app:name']
      break
    
  return { 
    'app:name' : app_name if app_name else os.getenv('APP_NAME'),
    'status'   : 'ok',
  }
