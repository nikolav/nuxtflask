from flask import g

from config.graphql.init import mutation
from models.docs         import Docs
from config              import TAG_STORAGE


@mutation.field('storageRemoveFile')
def resolve_storageRemoveFile(obj, info, file_id):
  print(file_id)
  return 'ok:storageRemoveFile'
