from flask import Blueprint
from flask import Flask, url_for, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, class_mapper
from flask import Flask
from flask import Flask, url_for, request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, Date, String, VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import func
from sqlalchemy.orm import sessionmaker, class_mapper
from json import dumps
from utils import serialize, row2dict, object_as_dict
import pandas as pd
import math

Base = declarative_base()
engine = create_engine('sqlite:///circumpolar.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()
m1m3 = Blueprint('m1m3', __name__)

def load_db():
    if not engine.dialect.has_table(engine, 'actuators'):
        file_name = 'data/act_loc_plus.txt'
        df = pd.read_csv(file_name, sep=r"\s+")
        df.to_sql(con=engine, index_label='actuatorID_index', name=Actuator.__tablename__, if_exists='replace')

class Actuator(Base):
    #Tell SQLAlchemy what the table name is and if there's any table-specific arguments it should know about
    __tablename__ = 'actuators'
    __table_args__ = {'sqlite_autoincrement': True}
    #tell SQLAlchemy the name of column and its attributes:
    #ID, x,y,z position [in], and x,y,z force direction vectors
    actuatorID = Column(Float, primary_key=True, nullable=False)
    xPosition = Column(Float)
    yPosition = Column(Float)
    zPosition = Column(Float)
    xForceVector = Column(Float)
    yForceVector = Column(Float)
    zForceVector = Column(Float)

'''
Sample query URL:
/m1m3/actuators
Returns all m1m3 actuator positions
'''
@m1m3.route('/actuators', methods=['GET', 'POST'])
def api_actuators():
    query_result = session.query(Actuator)
    serialized_labels = [serialize(act) for act in query_result.all()]
    for act in serialized_labels:
        act['position'] = [act['xPosition'], act['yPosition'], act['zPosition']]
        act['force'] = [act['xForceVector'], act['yForceVector'], act['zForceVector']]
        del act['xPosition']
        del act['yPosition']
        del act['zPosition']
        del act['xForceVector']
        del act['yForceVector']
        del act['zForceVector']
    return jsonify(results=serialized_labels)

load_db()
