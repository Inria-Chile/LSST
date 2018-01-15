import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import Skymap from '../Skymap/Skymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
import Charts from '../Charts/Charts';
import Scatterplot from '../Scatterplot/Scatterplot';
import Settings from './Settings/Settings';
import SurveyControls from '../SurveyControls/SurveyControls';
import TimeWindow from '../SurveyControls/TimeWindow/TimeWindow';
import ObservationsTable from '../ObservationsTable/ObservationsTable';
import CellHoverInfo from './CellHoverInfo/CellHoverInfo';
import DraggableTitle from '../Utils/DraggableTitle';
import openSocket from 'socket.io-client';
import { checkStatus, parseJSON, jsToLsstTime } from "../Utils/Utils"

import './Survey.css';
import 'bootstrap/dist/css/bootstrap.css';

class Survey extends PureComponent {
    
    static viewName = 'survey';

    constructor(props) {
        super(props);
        this.charts = null;
        this.socket = openSocket(window.location.origin + '');
        this.currentTime = Infinity;
        this.state = {
            selectedMode: 'playback',
            timeWindow: TimeWindow.timeWindowOptions[Object.keys(TimeWindow.timeWindowOptions)[0]],
            hoveredField: null,
            selectedFieldData: [],
            displayedFilter: 'all',
            startDate: null,
            endDate: null,
            showSkyMap: true,

            currentDate: null,
            showEcliptic: true,
            showGalactic: true,
            showMoon: true,
            showTelescopeRange: true,
            projection: "aitoff",

            displayedData: []
        }

        this.hiddenStyle = {
            visibility: 'hidden',
            position: 'absolute',
            width: '100%',
            top: 0
        };
        this.visibleStyle = {
            display:'block'
        };

        this.mainSkymapStyle = this.visibleStyle;
        this.mainScatterplotStyle = this.hiddenStyle;
    }

    receiveMsg(msg){
        msg.expDate = msg.request_time;
        this.addObservation(msg);
        this.setDate(new Date(parseInt(msg.request_time, 10)));
    }

    setEcliptic = (show) => {
        this.setState({showEcliptic:show});
    }
    
    setGalactic = (show) => {
        this.setState({showGalactic:show});
    }
    
    setMoon = (show) => {
        this.setState({showMoon:show});
    }
    
    setTelescopeRange = (show) => {
        this.setState({showTelescopeRange:show});
    }
    
    setProjection = (proj) => {
        this.setState({projection:proj});
    }
    
    setDisplayedFilter = (filter) => {
        this.setState({
            displayedFilter: filter
        })
        this.displayMainSkymap();       
    }

    setTimeWindow = (timeWindow) => {
        this.setState({timeWindow: timeWindow});
    }

    displayMainSkymap = () => {
        this.mainSkymapStyle = this.visibleStyle;
        this.mainScatterplotStyle = this.hiddenStyle;
        this.setState({showSkyMap:true});
    }

    toggleMapScatterplot = () => {
        let showSkyMap = this.state.showSkyMap;
        if(showSkyMap){
            this.mainSkymapStyle = this.hiddenStyle;
            this.mainScatterplotStyle = this.visibleStyle;
        }
        else{
            this.mainSkymapStyle = this.visibleStyle;
            this.mainScatterplotStyle = this.hiddenStyle;
        }
        this.setState({showSkyMap:!showSkyMap});
    }
    
    setDisplayedDateLimits = (startDate, endDate) => {
        let startDateEpoch = new Date(startDate.getTime());
        let endDateEpoch = new Date(endDate.getTime());

        let displayedData = [];
        if( startDateEpoch || endDateEpoch ){
            for(let i=0;i<this.state.data.length;++i){
                if(this.state.data[i].expDate > startDateEpoch && this.state.data[i].expDate < endDateEpoch)
                    displayedData.push(this.state.data[i]);
            }
        }

        this.setState({displayedData: displayedData});        

        this.charts.setDisplayedDateLimits(endDate);
        this.currentTime = endDate;
        this.setDate(endDateEpoch);
        this.updateObservationsTable();
    }

    //function to set the start and end dates selected by the slider

    setLiveMode = () => {
        console.log('setlivemode')
        this.setState({
            selectedMode: 'live'
        })
        this.setData([]);
        console.log('SCOKERT', this.socket.on('data', timestamp => this.receiveMsg(timestamp)));
    }

    setPlaybackMode = () => {
        this.setState({
            selectedMode: 'playback'
        })
        this.socket.off('data');
        this.setData([]);
    }

    setDataByDate = (startDate, endDate) => {
        this.fetchDataByDate(startDate, endDate, (res) => {
            for(var i=0;i<res.results.length;++i)
                res.results[i]['fieldDec'] += 30;
            this.setData(res.results);
            this.setState({
                data: res.results,
                startDate: startDate, 
                endDate: endDate
            });
            this.setDate(new Date(parseInt(endDate, 10)));
        })
        this.charts.setDate(startDate,endDate)
    }

    setDate = (date) => {
        if(this.state.showSkyMap){
            this.setState({currentDate: date});
        }
    }
    
    fetchDataByDate = (startDate, endDate, cb) => {
        let lsstStartDate = startDate;
        let lsstEndDate = endDate;
        return fetch(`backend/survey/playback/observations?start_date=${lsstStartDate}&end_date=${lsstEndDate}`, {
            accept: "application/json"
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
    }

    setData = (data) => {
        this.setState({displayedData: data});
        // this.displayedData = data;
        this.charts.setData(data);
        this.updateObservationsTable();
    }

    addObservation = (obs) => {
        let added = false;
        let currentTime = jsToLsstTime((new Date()).getTime());
        let displayedData = this.state.displayedData.slice();

        for(let i=0;i<displayedData.length;++i){
            if(this.state.timeWindow < currentTime - displayedData[i]['expDate']){
                displayedData.splice(i, 1);
                --i;
            }
        }
        if(!added)
            displayedData.push(obs);
        this.setData(displayedData);
    }

    componentDidMount() {
        // console.log("componentDidMount")
        // this.fetchDataByDate(0, 99994323, (res) => {
        this.fetchDataByDate(0, 2, (res) => {
            for(var i=0;i<res.results.length;++i)
                res.results[i][2] += 30;
            // this.setData(res.results);
        });
    }

    cellHoverCallback = (fieldID, polygon) => {
        let latestField = null;
        let latestExpDate = 0;
        if(fieldID){
            for(let i=0;i<this.state.displayedData.length;++i){
                if(String(this.state.displayedData[i].fieldID) === String(fieldID) &&
                    (this.state.displayedFilter === this.state.displayedData[i].filterName || this.state.displayedFilter === 'all')){
                    if(this.state.displayedData[i].expDate > latestExpDate){
                        latestExpDate = this.state.displayedData[i].expDate;
                        latestField = this.state.displayedData[i];
                    }
                }
            }
        }
        this.setState({
            hoveredField: latestField
        });
    }

    updateObservationsTable = () => {
        let fieldID = this.lastFieldID;
        let selectedFieldData = [];
        if(fieldID){
            for(let i=0;i<this.state.displayedData.length;++i){
                if(String(this.state.displayedData[i].fieldID) === String(fieldID) &&
                    (this.state.displayedFilter === this.state.displayedData[i].filterName || this.state.displayedFilter === 'all') &&
                    (this.state.displayedData[i].expDate < this.currentTime)){
                    selectedFieldData.push(this.state.displayedData[i]);
                }
            }
        }
        selectedFieldData.sort((a,b)=> b.expDate - a.expDate);
        // console.log('updateObservationsTable', selectedFieldData);
        this.setState({
            selectedFieldData: selectedFieldData
        });
    }

    cellClickCallback = (fieldID, polygon) => {
        this.lastFieldID = fieldID;
        this.lastPolygon = polygon;
        if(fieldID){
            this.updateObservationsTable();
            if(this.props.setFieldDetailsVisibility)
                this.props.setFieldDetailsVisibility(true);
            if(this.props.setSelectedFieldData)
                this.props.setSelectedFieldData(this.state.selectedFieldData);
        }
        console.log('cellClickCallback', fieldID, polygon);
    }

    cellUpdateCallback = (fieldID, polygon) => {
        this.lastFieldID = fieldID;
        this.lastPolygon = polygon;
        this.updateObservationsTable();
        console.log('cellUpdateCallback');
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.displayedFilter !== this.state.displayedFilter)
            this.updateObservationsTable();
    }

    render() {
        let setters = {
            setEcliptic: this.setEcliptic,
            setGalactic: this.setGalactic,
            setMoon: this.setMoon,
            setTelescopeRange: this.setTelescopeRange,
            setProjection: this.setProjection
        }

        return (
            <div className="survey-container">
                <DraggableTitle title='Survey Progress'/>
                <div className="main-container">
                    <div className="left-container">
                        <SurveyControls setPlaybackMode={this.setPlaybackMode} 
                                        setLiveMode={this.setLiveMode} 
                                        setDataByDate={this.setDataByDate}
                                        selectedMode={this.state.selectedMode}
                                        startDate={this.state.startDate} 
                                        endDate={this.state.endDate}
                                        setTimeWindow={this.setTimeWindow}
                                        setDisplayedDateLimits={this.setDisplayedDateLimits}/>
                        <div className="bottom-left-container">

                             <Charts ref={instance => { this.charts = instance; }} mode={this.state.selectedMode}/> 
                            <div className="row">
                                <div className="col-6">
                                    <div className="main-skymap-wrapper">
                                        <Settings {...setters} />
                                        <div style = {this.mainSkymapStyle}>
                                        <Skymap nodeRef='mainNode' className="mainSkymap"
                                                cellHoverCallback={this.cellHoverCallback} 
                                                cellUpdateCallback={this.cellUpdateCallback} 
                                                cellClickCallback={this.cellClickCallback} 
                                                showEcliptic={this.state.showEcliptic}
                                                showGalactic={this.state.showGalactic}
                                                showMoon={this.state.showMoon}
                                                showTelescopeRange={this.state.showTelescopeRange}
                                                projection={this.state.projection}
                                                filter={this.state.displayedFilter}
                                                displayedData={this.state.displayedData}
                                        />                                         
                                         </div>
                                        <div style = {this.mainScatterplotStyle}>
                                            <div className="scatterplot">                                                <Scatterplot displayedData={this.state.displayedData} />
                                            </div>                                            
                                        </div>
                                        
                                        {
                                            this.state.hoveredField &&
                                            <CellHoverInfo selectedField={this.state.hoveredField} />
                                        } 
                                    </div>
                                </div>
                                <div className="col-6">
                                     <ObservationsTable clickedField={this.state.selectedFieldData} /> 
                                </div>
                            </div>                        
                        </div>                        
                    </div>
                    <div className="right-container">                        
                          <MiniSkymaps 
                            onMinimapClick={this.setDisplayedFilter} 
                            displayedData={this.state.displayedData}
                            fontSize={0}
                            gridOpacity={0}
                            selectedFilter={this.state.displayedFilter}
                          />  
                        <div className="scatterplot-container" onClick={ () => this.toggleMapScatterplot()}>
                            <h4> Right Ascention / Declination </h4>
                            <Scatterplot height={183} displayedData={this.state.displayedData}/>
                        </div>                         
                    </div>
                </div>
                
                {/* {
                    this.props.parentNode && this.props.showFieldDetails ?
                        <FieldDetails targetNode={this.props.parentNode} 
                                        fieldData={this.state.selectedFieldData}
                                        setFieldDetailsVisibility={this.props.setFieldDetailsVisibility}
                                        showFieldDetails={this.props.showFieldDetails}/>
                    :''
                } */}
            </div>
        );
    }
}

export default Survey;
