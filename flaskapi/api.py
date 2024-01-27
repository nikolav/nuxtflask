import os
from datetime import datetime

from flask import render_template
from flask import send_from_directory

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
# /auth
app.register_blueprint(bp_auth)
# /
app.register_blueprint(bp_home)


# init graphql endpoint, POST /graphql
import config.graphql.init


# authorization middleware
@app.before_request
def before_request_authorize():
  return authorize()


# io status check
@io.on('connect')
def io_connected():
  print('@io/connection')


# mount static documentation
@app.route('/demo')
def page_demo():
  return render_template('index.html', time = datetime.now())

# ..and resources
@app.route('/<path:path>')
def page_demo_resource(path):
  return send_from_directory('templates', path)



if __name__ == '__main__':
  
  with app.app_context():
    # @app/init

    db.create_all()
    import config.init_tables
    
  _port = os.getenv('PORT')
  io.run(app, 
        debug = True,
        host  = '0.0.0.0',
        port  = _port if None != _port else 5000,
        allow_unsafe_werkzeug = True)
