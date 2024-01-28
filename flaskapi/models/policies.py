# import os
from typing import List

from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship

from . import db
from . import policiesTable
from . import ln_docs_policies


class Policy(db.Model):
  __tablename__ = policiesTable

  id:     Mapped[int] = mapped_column(primary_key = True)
  policy: Mapped[str] = mapped_column(unique = True)

  # virtual
  docs: Mapped[List['Docs']] = relationship(secondary      = ln_docs_policies, 
                                            back_populates = 'policies')

  def __repr__(self):
    return f'Policy(policy={self.policy})'
  
  @staticmethod
  def has_policies(docUser, *policies):
    
    if docUser:
      tp = [p.policy for p in docUser.policies]
      # if os.getenv('POLICY_ALL') in tp:
      #   return True
      return all(p in tp for p in policies)
      
    return False
  
  @staticmethod
  def by_name(policy_name):
    return db.session.scalar(
      db.select(Policy)
        .where(Policy.policy == policy_name)
    )
  