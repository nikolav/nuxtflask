from functools import wraps
from datetime import datetime

def timelog(fnView):
  @wraps(fnView)
  def with_timelog(*args, **kwargs):
    print(f'@[{datetime.now()}]')
    return fnView(*args, **kwargs)
  return with_timelog
