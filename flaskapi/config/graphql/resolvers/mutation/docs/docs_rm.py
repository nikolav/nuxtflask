
from flask_app import db
from flask_app import io

from models.tags import Tags
from models.docs import Docs

from config.graphql.init import mutation
from utils.doc_json_date import docJsonDates as doc_plain

from . import IOEVENT_JsonData


@mutation.field('docsRm')
def resolve_docsRm(_obj, _info, topic, id):

  doc = None

  try:
    doc = db.session.scalar(
      db.select(Docs)
        .join(Docs.tags)
        .where(Docs.tags.any(Tags.tag == topic), Docs.id == id))
      
  except:
    pass
  
  else:
    if doc:
      tagTopic = Tags.by_name(topic)
      tagTopic.docs.remove(doc)
      db.session.delete(doc)

      try:
        db.session.commit()
        
      except:
        pass
      
      else:
        io.emit(IOEVENT_JsonData)
        return doc_plain(doc)
  
  return None
