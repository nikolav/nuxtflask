import os

from marshmallow import Schema
from marshmallow import validates
from marshmallow import fields
from marshmallow.exceptions import ValidationError as MVError


AUTH_PASSWORD_MIN_LENGTH = int(os.getenv('AUTH_PASSWORD_MIN_LENGTH'))

class SchemaAuthLogin(Schema):
  email    = fields.Email(required = True)
  password = fields.Str(required = True)


class SchemaAuthRegister(Schema):
  email    = fields.Email(required = True)
  password = fields.Str(required = True)

  @validates('password')
  def password_check(self, value):
    if len(value) < AUTH_PASSWORD_MIN_LENGTH:
      raise MVError('short password')
  