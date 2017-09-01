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
survey = Blueprint('survey', __name__)

def load_db():
    if not engine.dialect.has_table(engine, 'observations'):
        file_name = 'circumpolar.dat'
        df = pd.read_csv(file_name, sep='\t')
        df.to_sql(con=engine, index_label='obsHistID_index', name=Observation.__tablename__, if_exists='replace')

class Observation(Base):
    #Tell SQLAlchemy what the table name is and if there's any table-specific arguments it should know about
    __tablename__ = 'observations'
    __table_args__ = {'sqlite_autoincrement': True}
    #tell SQLAlchemy the name of column and its attributes:
    obsHistID = Column(Integer, primary_key=True, nullable=False)
    sessionID = Column(VARCHAR)
    propID = Column(VARCHAR)
    fieldID = Column(VARCHAR)
    filterName = Column(VARCHAR)
    seqnNum = Column(VARCHAR)
    subseq = Column(VARCHAR)
    pairNum = Column(VARCHAR)
    expDate = Column(Integer)
    expMJD = Column(VARCHAR)
    expTime = Column(VARCHAR)
    slewTime = Column(VARCHAR)
    slewDist = Column(VARCHAR)
    rotSkyPos = Column(VARCHAR)
    rotTelPos = Column(VARCHAR)
    fldVisits = Column(VARCHAR)
    fldInt = Column(VARCHAR)
    fldFltrInt = Column(VARCHAR)
    propRank = Column(VARCHAR)
    finRank = Column(VARCHAR)
    maxSeeing = Column(VARCHAR)
    rawSeeing = Column(VARCHAR)
    seeing = Column(VARCHAR)
    xparency = Column(VARCHAR)
    cldSeeing = Column(VARCHAR)
    airmass = Column(VARCHAR)
    VskyBright = Column(VARCHAR)
    filtSky = Column(VARCHAR)
    fieldRA = Column(VARCHAR)
    fieldDec = Column(VARCHAR)
    lst = Column(VARCHAR)
    altitude = Column(VARCHAR)
    azimuth = Column(VARCHAR)
    dist2Moon = Column(VARCHAR)
    moonRA = Column(VARCHAR)
    moonDec = Column(VARCHAR)
    moonAlt = Column(VARCHAR)
    moonPhase = Column(VARCHAR)
    sunAlt = Column(VARCHAR)
    sunAz = Column(VARCHAR)
    phaseAngle = Column(VARCHAR)
    rScatter = Column(VARCHAR)
    mieScatter = Column(VARCHAR)
    moonIllum = Column(VARCHAR)
    moonBright = Column(VARCHAR)
    darkBright = Column(VARCHAR)
    fiveSigma = Column(VARCHAR)
    perry_skybrightness = Column(VARCHAR)
    fiveSigma_ps = Column(VARCHAR)
    skybrightness_modified = Column(VARCHAR)
    fiveSigma_modified = Column(VARCHAR)
    night = Column(VARCHAR)
    hexdithra = Column(VARCHAR)
    hexdithdec = Column(VARCHAR)
    vertex = Column(VARCHAR)

'''
Sample query URL: 
/survey/playback/observations?start_date=40000&end_date=80000
Returns all observations on a given date range
'''
@survey.route('/playback/observations', methods=['GET', 'POST'])
def api_observations():
    data = None
    start_date = 0
    end_date = 99999
    if request.args != None and any(request.args):
        data = request.args
    if request.get_json() != None:
        data = request.get_json()
    if data != None:
        start_date = int(data['start_date'])
        end_date = int(data['end_date'])
    query_result = session.query(Observation).filter(Observation.expDate > start_date, Observation.expDate < end_date)
    serialized_labels = [serialize(obs) for obs in query_result.all()]
    your_json = dumps(serialized_labels)
    return jsonify(results=your_json)

'''
Sample query URL: 
/survey/playback/observationsCount?start_date=40000&end_date=80000
Returns field position and observation count on a given date range
'''
@survey.route('/playback/observationsCount', methods=['GET', 'POST'])
def api_observationsCount():
    data = None
    start_date = 0
    end_date = 99959999
    if request.args != None and any(request.args):
        data = request.args
    if request.get_json() != None:
        data = request.get_json()
    if data != None:
        start_date = int(data['start_date'])
        end_date = int(data['end_date'])
    query_result = session.query(Observation, func.count()).filter(Observation.expDate > start_date, Observation.expDate < end_date).group_by(Observation.fieldID, Observation.filterName)
    serialized_labels = [dict(serialize(obs[0]), **{'count': obs[1]}) for obs in query_result.all()]
    serialized_labels = [{k:adict[k] for k in ('fieldID','fieldRA','fieldDec','filterName','count') if k in adict} for adict in serialized_labels]
    for adict in serialized_labels:
        adict['fieldRA'] = round(adict['fieldRA']*180.0/math.pi, 3)
        adict['fieldDec'] = round(adict['fieldDec']*180.0/math.pi, 3)
    # serialized_labels = [[row['fieldID'], round(row['fieldRA']*180.0/math.pi, 3), round(row['fieldDec']*180.0/math.pi, 3), row['filterName'], row['count']] for row in serialized_labels]
    your_json = dumps(serialized_labels)
    return jsonify(results=serialized_labels)

load_db()
