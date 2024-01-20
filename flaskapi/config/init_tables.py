
from flask_app   import db
from models.tags import Tags
from .           import init_docs_tags

try:

  for t in init_docs_tags:
    db.session.add(Tags(tag = t))
    
  db.session.commit()
except:
  pass
finally:
  pass
