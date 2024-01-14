# import os
import json
from datetime import datetime
from random import randint

# from flask import Flask, request, render_template, url_for, redirect, abort
from flask import Flask, request
# from flask_restful import Api, Resource, fields, reqparse, marshal_with
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# https://github.com/miguelgrinberg/flask-socketio/issues/40#issuecomment-48268526
from flask_socketio import SocketIO


IO_CORS_ALLOW_ORIGINS = (
  'http://localhost:3000',
);
IOEVENT_DOCS_CHANGE = 'change:docs'


app = Flask(__name__)
app.config['SECRET_KEY'] = 'HLrc4OfZ5euFmr2tXsT3g2rI0UyABOyGmrYvib7gfluQ'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://app:app@70.34.223.252:5544/app'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://app:app@45.76.82.58:5544/app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app)
api  = Api(app)
db   = SQLAlchemy(app)
io   = SocketIO(app, 
                cors_allowed_origins      = IO_CORS_ALLOW_ORIGINS, 
                cors_supports_credentials = True)

tblSuffix       = '_SZWAtSKRyXm'
# tblSuffix       = ''
docsTable       = f'docs{tblSuffix}'
tagsTable       = f'tags{tblSuffix}'
lnTableDocsTags = f'ln_docs_tags{tblSuffix}'

ln_docs_tags = db.Table(
  lnTableDocsTags,
  db.Column('doc_id', db.BigInteger, db.ForeignKey(f'{docsTable}.id'), primary_key = True),
  db.Column('tag_id', db.BigInteger, db.ForeignKey(f'{tagsTable}.id'), primary_key = True),
)

class Tags(db.Model):
  __tablename__ = tagsTable
  id  = db.Column(db.BigInteger, primary_key = True)
  tag = db.Column(db.String(1024), nullable = False, unique = True)
  
class Docs(db.Model):
  __tablename__ = docsTable
  id         = db.Column(db.BigInteger, primary_key = True)
  data       = db.Column(db.Text)
  created_at = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)
  updated_at = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)

  # virtual
  tags = db.relationship('Tags', secondary = ln_docs_tags, backref = 'docs')
  
docJson      = lambda d: dict(id = d.id, data = json.loads(d.data))
docJsonDates = lambda d: dict(id = d.id, data = json.loads(d.data), created_at = str(d.created_at), updated_at = str(d.updated_at))
# docPlain     = docJson
docPlain     = docJsonDates

class DocsResource(Resource):

  def get(self, tag_name):
    tag = Tags.query.filter(Tags.tag == tag_name).first()
    return [ docPlain(doc) for doc in tag.docs ] if None != tag else []
  
  def post(self, tag_name):
    data      = request.get_json()
    ID        = data.get('id', None)
    doc       = None
    docUpdate = None
    tag       = Tags.query.filter(Tags.tag == tag_name).first()
    ioevent   = IOEVENT_DOCS_CHANGE

    if None == tag:
      tag = Tags(tag = tag_name)
      db.session.add(tag)
    
    if None != ID:
      for d in tag.docs:
        if ID == d.id:
          docUpdate = d
          break
    
    if None != docUpdate:

      oldData              = docUpdate.data
      docUpdate.data       = json.dumps(data['data'])
      docUpdate.updated_at = datetime.utcnow()

      if docUpdate.data == oldData:
        ioevent = None
      
      doc = docUpdate

    else:
      
      doc = Docs(
        id   = ID, 
        data = json.dumps(data['data'])
      )
      tag.docs.append(doc)
      
    try:
      db.session.commit()
    except Exception as err:
      raise err
    else:
      # change:docs:orders@122, doc{}
      # ! io_send(f'{ioevent}:{tag.tag}')
      if None != ioevent:
        io.emit(f'{ioevent}:{tag.tag}')
    
    return docPlain(doc)
  
  def delete(self, tag_name):
    data = request.get_json()
    ID   = data.get('id', None)
    doc  = None
    tag  = None
    
    if None != ID:
      tag = Tags.query.filter(Tags.tag == tag_name).first()
      if None != tag:
        for d in tag.docs:
          if ID == d.id:
            try:
              tag.docs.remove(d)
              db.session.delete(d)
              db.session.commit()
            except Exception as err:
              raise err
            else:
              doc = d
              io.emit(f'{IOEVENT_DOCS_CHANGE}:{tag.tag}')
            
            break
    
    return docPlain(doc) if None != doc else None

api.add_resource(DocsResource, '/docs/<string:tag_name>')


@io.on('connect')
def io_connect():
  print('io:connection')


if __name__ == '__main__':
  with app.app_context():
    db.create_all()
  # app.run(debug = True)
  io.run(app, debug = True)
