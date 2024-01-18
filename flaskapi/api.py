import os

from flask_app import app
from flask_app import api
from flask_app import db
from flask_app import io

from resources.docs import DocsResource


api.add_resource(DocsResource, '/docs/<string:tag_name>')


@io.on('connect')
def io_connect():
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
