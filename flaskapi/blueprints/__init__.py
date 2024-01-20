import json

from flask import Blueprint
# from flask_cors import cross_origin

from config                      import TAG_VARS
from models.tags                 import Tags
from middleware.wrappers.timelog import timelog


bp_home = Blueprint('home', __name__, url_prefix = '/')

@bp_home.route('/', methods = ('GET',))
@timelog
def status_ok():
  
  admin_email = ''
  app_name    = ''
  
  tag = Tags.query.filter(Tags.tag == TAG_VARS).first()
  if tag:
    for d in tag.docs:
      data = json.loads(d.data)

      if 'app:name' in data:
        app_name = data['app:name']
        
      if 'admin:email' in data:
        admin_email = data['admin:email']
      
      if app_name and admin_email:
        break
    
  return {
    'admin:email' : admin_email,
    'app:name'    : app_name,
  }
