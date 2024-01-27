import os
from typing import List

from sqlalchemy import String

from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship

from . import db
from . import policiesTable
from . import ln_docs_policies


class Policy(db.Model):
  __tablename__ = policiesTable

  id: Mapped[int] = mapped_column(primary_key = True)
  policy: Mapped[str] = mapped_column(String(1024), unique = True)

  # virtual
  docs: Mapped[List['Docs']] = relationship('Docs', 
                                            secondary = ln_docs_policies, 
                                            back_populates = 'policies')

  def __repr__(self):
    return f'Policy(policy={self.policy})'
  
  @staticmethod
  def has_policies(docUser, *policies):
    tp = [p.policy for p in docUser.policies]
    return all(p in tp for p in policies)
  