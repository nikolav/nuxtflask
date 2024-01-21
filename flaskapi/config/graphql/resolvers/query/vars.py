import json

from config.graphql.init import query

from models.tags import Tags
from config      import TAG_VARS

@query.field('vars')
def resolve_vars(obj, info):
  res = []
  tag = Tags.query.filter(Tags.tag == TAG_VARS).first()
  if tag:
    for doc in tag.docs:
      d = json.loads(doc.data)
      for name, value in d.items():
        res.append({ 'id': doc.id, 'name': name, 'value': value })
  return res
