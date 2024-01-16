import os

from flask_app import app, api, db, io
from resources.docs import DocsResource

api.add_resource(DocsResource, '/docs/<string:tag_name>')


@io.on('connect')
def io_connect():
  print('io:connection')


if __name__ == '__main__':
  with app.app_context():
    db.create_all()
  # app.run(debug = True)

  # auto assigned heroku app port
  _port = os.getenv('PORT')
  print(f'__PORT__: {_port}')

  io.run(app, 
         debug = True,
        #  host = '0.0.0.0',
         port = _port if None != _port else 5000,
         allow_unsafe_werkzeug = True)
