import os

from flask       import Blueprint
# from flask       import request
from flask       import g
from flask_cors  import CORS

from flask_app   import db
from flask_app   import io
from models.tags import Tags
from models.docs import Docs

from middleware.wrappers.files import files
from middleware.authguard      import authguard

from schemas.validation.storage import SchemaStorageFile

from utils import id_gen
from utils import gen_filename
from utils.mimetype      import mimetype
from utils.doc_json_date import docJsonDates as doc_plain

from config import TAG_STORAGE


UPLOAD_PATH = os.getenv('UPLOAD_PATH')
UPLOAD_DIR  = os.getenv('UPLOAD_DIR')

# router config
bp_storage = Blueprint('storage', __name__, url_prefix = '/storage')

# cors blueprints as wel for cross-domain requests
cors_bp_storage = CORS(bp_storage)


@bp_storage.route('/', methods = ('POST',))
@authguard(os.getenv('POLICY_FILESTORAGE'))
@files
def storage_upload():
  saved  = {}
  status = 400
  tag_storage_ = f'{TAG_STORAGE}{g.user.id}'

  for name, node in g.files.items():
    # try:
    #   save file locally
    #   dump file_data from schema
    #   persist file_data @Docs
    #   @success: 201, signal io:changed
    file_id_  = id_gen()
    filename_ = gen_filename(node['file'].filename, file_id_)
    filepath_ = os.path.join(os.path.abspath(UPLOAD_PATH), UPLOAD_DIR, str(g.user.id), filename_)

    try:

      # ensure path exists
      try:
        os.makedirs(os.path.dirname(filepath_))
      except:
        pass
      
      # save file
      node['file'].save(filepath_)
      
    except:
      pass
    
    else:
      if os.path.exists(filepath_):
        file_data = {
            'file_id'  : file_id_,
            'user_id'  : g.user.id,
            'filename' : filename_,
            'path'     : filepath_,
            'size'     : os.path.getsize(filepath_),
            'mimetype' : mimetype(node['file']),
          }
        file_data.update(node['data'])
        
        try:
          file_data = SchemaStorageFile().load(file_data)
          
        except:
          pass
        
        else:
          # persist
          try:
            doc_file_data = Docs(data = file_data)
            tag = Tags.by_name(tag_storage_, create = True)
            tag.docs.append(doc_file_data)
            db.session.commit()
            
          except:
            pass
          
          else:
            # @201; file uploaded, data cached
            saved[name] = doc_plain(doc_file_data)
  
  if 0 < len(saved):
    status = 201
    io.emit(tag_storage_)
  
  return saved, status


@bp_storage.route('/<string:file_id>', methods = ('GET',))
def storage_download(file_id):
  return f'ok:storage_download:{file_id}'


@bp_storage.route('/', methods = ('DELETE',))
@authguard(os.getenv('POLICY_FILESTORAGE'))
def storage_remove():
  return f'ok:storage_remove'


# @Docs/file
#   .file_id
#   .user_id
#   .title
#   .description
#   .filename
#   .path
#   .size
#   .mimetype
#   .public

# 'close', 'content_length', 'content_type', 'filename', 
# 'headers', 'mimetype', 'mimetype_params', 'name'
