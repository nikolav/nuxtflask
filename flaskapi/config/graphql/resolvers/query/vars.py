import json

from config.graphql.init import query

from models.docs import Docs
from config      import TAG_VARS

@query.field('vars')
def resolve_vars(obj, info):
  res = []
  for doc in Docs.tagged(TAG_VARS):
    d = json.loads(doc.data)
    for name, value in d.items():
      res.append({ 'id': doc.id, 'name': name, 'value': value })
  return res
