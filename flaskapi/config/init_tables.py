import json

from flask_app   import db
from models.tags import Tags
from models.docs import Docs
from .           import init_docs_tags
from config      import TAG_VARS

try:

  for t in init_docs_tags:
    db.session.add(Tags(tag = t))
  
  db.session.commit()
except:
  pass
finally:
  pass

try:

  tag = Tags.query.filter(Tags.tag == TAG_VARS).first()
  
  if tag:  

    if all(not 'admin:email' in doc.data for doc in tag.docs):
      tag.docs.append(Docs(data = json.dumps({ 'admin:email': "admin@nikolav.rs" })))
    
    if all(not 'app:name' in doc.data for doc in tag.docs):
      tag.docs.append(Docs(data = json.dumps({ 'app:name': "app:nuxtflask" })))
  
  db.session.commit()
    
except:
  pass
finally:
  pass
