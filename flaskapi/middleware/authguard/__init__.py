from functools import wraps

from flask import g
from flask import abort
from flask import make_response

from models.policies import Policy


def authguard(*policies):
  def guarded(fnView):
    @wraps(fnView)
    def with_authguard(*args, **kwargs):
      if not Policy.has_policies(g.get('user'), *policies):
        return abort(make_response('', 403))
      return fnView(*args, **kwargs)
    return with_authguard
  return guarded
