from . import tagsTable, db

class Tags(db.Model):
  __tablename__ = tagsTable
  id  = db.Column(db.BigInteger, primary_key = True)
  tag = db.Column(db.String(1024), nullable = False, unique = True)
