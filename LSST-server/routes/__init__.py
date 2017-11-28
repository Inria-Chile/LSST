from flask import Flask
from .survey import survey
from .m1m3 import m1m3
from flask import Flask, url_for, request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, Date, String, VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, class_mapper
from json import dumps
from utils import serialize
import pandas as pd


app = Flask(__name__)

app.register_blueprint(survey, url_prefix='/survey')
app.register_blueprint(m1m3, url_prefix='/m1m3')

