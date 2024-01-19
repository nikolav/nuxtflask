import os

from flask_app import app
from flask_app import api
from flask_app import db
from flask_app import io

from resources.docs       import DocsResource
from blueprints           import bp_home
from blueprints.auth      import bp_auth
from middleware.authorize import authorize


# mount resources
api.add_resource(DocsResource, '/docs/<string:tag_name>')


# mount blueprints
app.register_blueprint(bp_auth)
app.register_blueprint(bp_home)


# request authorization middleware
@app.before_request
def before_request_authorize():
  return authorize()


@io.on('connect')
def io_connected():
  print('io:connection')


if __name__ == '__main__':
  
  with app.app_context():
    db.create_all()

  _port = os.getenv('PORT')
  io.run(app, 
         debug = True,
         host = '0.0.0.0',
         port = _port if None != _port else 5000,
         allow_unsafe_werkzeug = True)

