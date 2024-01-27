from datetime import datetime

from typing import List

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from . import docsTable
from . import ln_docs_tags
from . import db
from .tags import Tags

from src.mixins import MixinTimestamps


class Docs(MixinTimestamps, db.Model):
  __tablename__ = docsTable

  id: Mapped[int] = mapped_column(primary_key = True)
  data: Mapped[str]

  # virtual
  tags: Mapped[List['Tags']] = relationship('Tags', secondary = ln_docs_tags, back_populates = 'docs')

  # magic
  def __repr__(self) -> str:
    return f'Docs(id={self.id!r}, data={self.data!r})'

  def tagged(tag_name):
    tag = Tags.by_name(tag_name)
    return tag.docs if tag else []
  