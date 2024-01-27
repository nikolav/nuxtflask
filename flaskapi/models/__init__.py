import os

from flask_app import db


tblSuffix           = os.getenv('TABLE_NAME_SUFFIX')
lnTableDocsTags     = f'ln_docs_tags{tblSuffix}'
lnTableDocsPolicies = f'ln_docs_policies{tblSuffix}'
docsTable           = f'docs{tblSuffix}'
tagsTable           = f'tags{tblSuffix}'
policiesTable       = f'policies{tblSuffix}'

ln_docs_tags = db.Table(
  lnTableDocsTags,
  db.Column('doc_id', db.Integer, db.ForeignKey(f'{docsTable}.id'), primary_key = True),
  db.Column('tag_id', db.Integer, db.ForeignKey(f'{tagsTable}.id'), primary_key = True),
)

ln_docs_policies = db.Table(
  lnTableDocsPolicies,
  db.Column('doc_id', db.Integer, db.ForeignKey(f'{docsTable}.id'), primary_key = True),
  db.Column('policy_id', db.Integer, db.ForeignKey(f'{policiesTable}.id'), primary_key = True),
)
