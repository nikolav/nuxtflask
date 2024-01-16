
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
  io.run(app, 
         debug = True,
         host = '0.0.0.0',
         port = 40117,
         allow_unsafe_werkzeug = True)
