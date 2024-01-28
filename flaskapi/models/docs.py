from typing import List

from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from . import docsTable
from . import ln_docs_tags
from . import ln_docs_policies
from . import db
from .tags import Tags

from src.mixins import MixinTimestamps


class Docs(MixinTimestamps, db.Model):
  __tablename__ = docsTable

  id:   Mapped[int] = mapped_column(primary_key = True)
  data: Mapped[str] = mapped_column(Text)

  # virtual
  tags: Mapped[List['Tags']] = relationship(secondary      = ln_docs_tags, 
                                            back_populates = 'docs')
  # virtual
  policies: Mapped[List['Policy']] = relationship(secondary      = ln_docs_policies, 
                                                  back_populates = 'docs')

  # magic
  def __repr__(self):
    return f'Docs(id={self.id!r}, data={self.data!r})'

  @staticmethod
  def tagged(tag_name):
    tag = Tags.by_name(tag_name)
    return tag.docs if tag else []
  