import os

from dotenv import load_dotenv
# from flask import Flask, request, render_template, url_for, redirect, abort
from flask import Flask
# from flask_restful import Api, Resource, fields, reqparse, marshal_with
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# https://github.com/miguelgrinberg/flask-socketio/issues/40#issuecomment-48268526
from flask_socketio import SocketIO


load_dotenv()

PRODUCTION = os.getenv('PRODUCTION')


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

DATABASE_URI = os.getenv('DATABASE_URI_production') if PRODUCTION else os.getenv('DATABASE_URI_dev')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


cors = CORS(app)
api  = Api(app)
db   = SQLAlchemy(app)

IO_CORS_ALLOW_ORIGINS = (
  os.getenv('IOCORS_ALLOW_ORIGIN_dev'),
  os.getenv('IOCORS_ALLOW_ORIGIN_production'),
  os.getenv('IOCORS_ALLOW_ORIGIN_nikolavrs'),
);
io = SocketIO(app, 
              cors_allowed_origins      = IO_CORS_ALLOW_ORIGINS, 
              cors_supports_credentials = True)
