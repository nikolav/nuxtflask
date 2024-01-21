import os
import json
from datetime import datetime

from flask         import request
from flask_restful import Resource

from flask_app   import db
from flask_app   import io
from models.docs import Docs
from models.tags import Tags
from utils.doc_json_date import docJsonDates as docPlain


IOEVENT_DOCS_CHANGE = os.getenv('IOEVENT_DOCS_CHANGE')

class DocsResource(Resource):

  def get(self, tag_name):
    tag = Tags.query.filter(Tags.tag == tag_name).first()
    return [ docPlain(doc) for doc in tag.docs ] if None != tag else []
  
  def post(self, tag_name):
    data      = request.get_json()
    ID        = data.get('id')
    doc       = None
    docUpdate = None
    ioevent   = IOEVENT_DOCS_CHANGE
    sNewData  = ''


    tag = Tags.query.filter(Tags.tag == tag_name).first()
    
    if not tag:
      tag = Tags(tag = tag_name)
      db.session.add(tag)
    
    if ID:
      for d in tag.docs:
        if ID == d.id:
          docUpdate = d
          break
    
    sNewData = json.dumps(data['data'])

    if docUpdate:

      sOldData       = docUpdate.data
      docUpdate.data = sNewData

      if sNewData != sOldData:
        docUpdate.updated_at = datetime.utcnow()

      if sNewData == sOldData:
        ioevent = None
      
      doc = docUpdate

    else:
      doc = Docs(id = ID, data = sNewData)
      tag.docs.append(doc)
      
    try:
      db.session.commit()
    except Exception as err:
      raise err
    else:
      # change:docs:orders@122, doc{}
      # ! io_send(f'{ioevent}:{tag.tag}')
      if ioevent:
        io.emit(f'{ioevent}:{tag.tag}')
    
    return docPlain(doc)
  
  def delete(self, tag_name):
    data = request.get_json()
    ID   = data.get('id')
    doc  = None
    tag  = None
    
    if ID:
      tag = Tags.query.filter(Tags.tag == tag_name).first()
      if tag:
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

