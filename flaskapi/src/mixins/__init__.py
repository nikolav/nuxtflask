from datetime import datetime
from datetime import timezone

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class MixinTimestamps():
  created_at: Mapped[datetime] = mapped_column(default = lambda: datetime.now(timezone.utc))
  updated_at: Mapped[datetime] = mapped_column(default = lambda: datetime.now(timezone.utc),
                                               onupdate = lambda: datetime.now(timezone.utc))
