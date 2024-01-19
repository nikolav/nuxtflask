from datetime import datetime

from . import docsTable
from . import ln_docs_tags
from . import db


class Docs(db.Model):
  __tablename__ = docsTable
  id         = db.Column(db.BigInteger, primary_key = True)
  data       = db.Column(db.Text)
  created_at = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)
  updated_at = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)

  # virtual
  tags = db.relationship('Tags', secondary = ln_docs_tags, backref = 'docs')
  