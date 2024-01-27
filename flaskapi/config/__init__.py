
PATHS_SKIP_AUTH = (

  r'^/$',
  r'^/auth/register$',
  r'^/auth/login$',
  # r'^/policies/\d+$',

  # allow static resources
  # @static-generator/SerifWebPlus
  r'^/demo$',
  r'^/wpscripts/.*$',
  r'^/wpimages/.*$',
  r'^/favicon\.ico$',
  
)

TAG_USERS        = '@users'
TAG_VARS         = '@vars'
TAG_TOKEN_VALID  = '@token/valid'

init_docs_tags = (TAG_USERS, TAG_VARS, TAG_TOKEN_VALID,)


KEY_TOKEN_CREATED_AT = '@'
