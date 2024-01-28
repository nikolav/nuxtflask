import os
import json

from flask         import request
from flask_restful import Resource

from flask_app   import db
from flask_app   import io
from models.docs import Docs
from models.tags import Tags


IOEVENT_DOCS_CHANGE = os.getenv('IOEVENT_DOCS_CHANGE')

class DocsResource(Resource):

  def get(self, tag_name):
    return Docs.dicts(Docs.tagged(tag_name))
  
  def post(self, tag_name):
    data        = request.get_json()
    ID          = data.get('id')
    doc         = None
    docUpdate   = None
    ioevent     = IOEVENT_DOCS_CHANGE
    sNewData    = ''
    status_code = 200


    tag = Tags.by_name(tag_name)
    
    if not tag:
      tag = Tags(tag = tag_name)
      db.session.add(tag)
    
    if ID:
      for d in tag.docs:
        if ID == d.id:
          docUpdate = d
          break

    if docUpdate:
      sOldData       = json.dumps(docUpdate.data)
      sNewData       = json.dumps(data['data'])
      docUpdate.data = data['data']

      if sOldData == sNewData:
        ioevent = None
      
      doc = docUpdate

    else:
      doc = Docs(id = ID, data = data['data'])
      tag.docs.append(doc)
      status_code = 201
    
    try:
      db.session.commit()
    # except Exception as err:
    #   raise err
    except:
      status_code = 400
    else:
      # change:docs:orders@122, doc{}
      # ! io_send(f'{ioevent}:{tag.tag}')
      if ioevent:
        io.emit(f'{ioevent}:{tag.tag}')
    
    return doc.dump() if doc else None, status_code
  
  def delete(self, tag_name):
    data = request.get_json()
    ID   = data.get('id')
    doc  = None
    tag  = None
    status_code = 200
    
    if ID:
      tag = Tags.by_name(tag_name)
      if tag:
        for d in tag.docs:
          if ID == d.id:
            try:
              tag.docs.remove(d)
              db.session.delete(d)
              db.session.commit()
            # except Exception as err:
            #   raise err
            except:
              status_code = 400
            else:
              doc = d
              io.emit(f'{IOEVENT_DOCS_CHANGE}:{tag.tag}')            
            
            break
    
    return doc.dump() if doc else None, status_code
