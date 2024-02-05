import json
from typing import List

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy     import JSON

from . import docsTable
from . import ln_docs_tags
from . import db
from .tags import Tags

from src.mixins import MixinTimestamps

from schemas.serialization import SchemaSerializeDocJsonTimes


_schemaDocsDump     = SchemaSerializeDocJsonTimes()
_schemaDocsDumpMany = SchemaSerializeDocJsonTimes(many = True)

class Docs(MixinTimestamps, db.Model):
  __tablename__ = docsTable

  id:   Mapped[int]  = mapped_column(primary_key = True)
  data: Mapped[dict] = mapped_column(JSON)

  # virtual
  tags: Mapped[List['Tags']] = relationship(secondary      = ln_docs_tags, 
                                            back_populates = 'docs')
  
  # magic
  def __repr__(self):
    return f'Docs({json.dumps(self.dump())})'

  @staticmethod
  def tagged(tag_name):
    tag = Tags.by_name(tag_name)
    return tag.docs if tag else []
  
  @staticmethod
  def dicts(docs, **kwargs):
    return _schemaDocsDumpMany.dump(docs, **kwargs)
  
  @staticmethod
  def by_tag_and_id(tag, id):
    doc = None

    try:
      doc = db.session.scalar(
        db.select(Docs)
          .join(Docs.tags)
          .where(Tags.tag == tag, Docs.id == id))
      
    except:
      pass
    
    return doc
    
  
  def includes_tags(self, *args):
    tags_self = [t.tag for t in self.tags]
    return all(tag in tags_self for tag in args)
  
  def dump(self, **kwargs):
    return _schemaDocsDump.dump(self, **kwargs)
  
  