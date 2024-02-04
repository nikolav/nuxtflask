from models.tags import Tags

from utils.doc_json_date import docJsonDates as doc_plain
from config.graphql.init import query


@query.field('docsByTopic')
def resolve_docsByTopic(_obj, _info, topic):
  return [doc_plain(doc) for doc in Tags.by_name(topic, create = True).docs]
