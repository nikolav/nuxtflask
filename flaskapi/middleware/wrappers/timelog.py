from functools import wraps
from datetime import datetime
from datetime import timezone

def timelog(fnView):
  @wraps(fnView)
  def with_timelog(*args, **kwargs):
    print(f'@[{datetime.now(timezone.utc)}]')
    return fnView(*args, **kwargs)
  return with_timelog
