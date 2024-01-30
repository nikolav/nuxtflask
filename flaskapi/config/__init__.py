PATHS_SKIP_AUTH = (
  # status check
  r'^/$',
  # auth 
  r'^/auth/register$',
  r'^/auth/login$',

  # r'^/test/?$',
  # r'^/test/.*$',
)

TAG_USERS        = '@users'
TAG_VARS         = '@vars'
TAG_TOKEN_VALID  = '@token/valid'
TAG_STORAGE      = '@storage:'


init_docs_tags = (TAG_USERS, TAG_VARS, TAG_TOKEN_VALID,)


KEY_TOKEN_CREATED_AT = '@'
