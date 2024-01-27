from typing import List

from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship


from . import tagsTable
from . import db
from . import ln_docs_tags


class Tags(db.Model):
  __tablename__ = tagsTable

  id: Mapped[int] = mapped_column(primary_key = True)
  tag: Mapped[str] = mapped_column(String(1024))

  # virtual
  docs: Mapped[List['Docs']] = relationship('Docs', secondary = ln_docs_tags, back_populates = 'tags')

  # magic
  def __repr__(self):
    return f'Tags(id={self.id!r}, data={self.tag!r})'
  
  @staticmethod
  def by_name(tag_name):
    return db.session.scalar(
      db.select(Tags)
        .where(Tags.tag == tag_name)
    )
