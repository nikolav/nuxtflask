import os
import jwt

def jwtToken(jsonPayload):
  return jwt.encode(jsonPayload,
    os.getenv('JWT_SECRET_ACCESS_TOKEN'),
    algorithm = 'HS256'
  )
