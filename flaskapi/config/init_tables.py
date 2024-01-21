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


try:

  t_vars = Tags.query.filter(Tags.tag == TAG_VARS).first()
  
  if t_vars:  
    
    vars_data = (json.loads(doc.data) for doc in t_vars.docs)
    
    if all(not 'app:name' in node for node in vars_data):
      t_vars.docs.append(Docs(data = json.dumps({ 'app:name': "app:nuxtflask" })))

    if all(not 'admin:email' in node for node in vars_data):
      t_vars.docs.append(Docs(data = json.dumps({ 'admin:email': "admin@nikolav.rs" })))
  
  db.session.commit()
    
except:
  pass
