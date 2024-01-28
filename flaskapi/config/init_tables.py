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


try:
  tag = Tags.by_name(TAG_VARS)
  
  if tag:  
    vars_data = [doc.data for doc in tag.docs]
    
    if all(not 'app:name' in node for node in vars_data):
      tag.docs.append(Docs(data = { 'app:name': "app:nuxtflask" }))

    if all(not 'admin:email' in node for node in vars_data):
      tag.docs.append(Docs(data = { 'admin:email': "admin@nikolav.rs" }))
  
  db.session.commit()
    
except:
  pass
