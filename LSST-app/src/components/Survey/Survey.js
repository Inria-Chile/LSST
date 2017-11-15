import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import MainSkymap from '../Skymap/MainSkymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
import Charts from '../Charts/Charts';
import MiniScatterplot from '../Scatterplot/MiniScatterplot'
import MainScatterplot from '../Scatterplot/MainScatterplot'
import Sidebar from '../Sidebar/Sidebar';
import SurveyControls from '../SurveyControls/SurveyControls';
import TimeWindow from '../SurveyControls/TimeWindow/TimeWindow';
import ObservationsTable from '../ObservationsTable/ObservationsTable';
import CellHoverInfo from './CellHoverInfo/CellHoverInfo';
import FieldDetails from './FieldDetails/FieldDetails';
import DraggableTitle from '../Utils/DraggableTitle';
import openSocket from 'socket.io-client';
import { checkStatus, parseJSON, jsToLsstTime } from "../Utils/Utils"

import './Survey.css';
import 'bootstrap/dist/css/bootstrap.css';

class Survey extends PureComponent {
    
    static viewName = 'survey';

    constructor(props) {
        super(props);
        this.mainSkymap = null;
        this.miniSkymap = null;
        this.charts = null;
        this.miniScatterplot = null;
        this.mainScatterplot = null;
        this.displayedData = [];
        this.socket = openSocket(window.location.origin + '');
        this.currentTime = Infinity;
        this.state = {
            selectedMode: 'playback',
            // selectedMode: 'playback',
            timeWindow: TimeWindow.timeWindowOptions[Object.keys(TimeWindow.timeWindowOptions)[0]],
            hoveredField: null,
            selectedFieldData: [],
            displayedFilter: 'all',
            startDate: null,
            endDate: null,
            showSkyMap: true,
            showFieldDetails: true,
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

    drawFrame = (timestamp) => {
        // console.log('Parent Drawframe')
        this.mainSkymap.drawFrame(timestamp);
        this.miniSkymap.drawFrame(timestamp);
        requestAnimationFrame(this.drawFrame);
    }
    
    setEcliptic = (show) => {
        this.mainSkymap.setEcliptic(show);
    }
    
    setGalactic = (show) => {
        this.mainSkymap.setGalactic(show);
    }
    
    setMoon = (show) => {
        this.mainSkymap.setMoon(show);
    }
    
    setTelescopeRange = (show) => {
        this.mainSkymap.setTelescopeRange(show);
    }
    
    setSidebar = (show) => {
        this.sidebar.setState({
            sidebarOpen: show
        })
    }
    
    setProjection = (proj) => {
        this.mainSkymap.setProjection(proj);
    }
    
    setDisplayedFilter = (filter) => {
        this.setState({
            displayedFilter: filter
        })
        this.mainSkymap.setDisplayedFilter(filter);
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
        this.mainSkymap.setDisplayedDateLimits(startDateEpoch, endDateEpoch);
        this.miniSkymap.setDisplayedDateLimits(startDateEpoch, endDateEpoch);
        this.mainScatterplot.setDisplayedDateLimits(startDateEpoch, endDateEpoch);
        this.miniScatterplot.setDisplayedDateLimits(startDateEpoch, endDateEpoch);
        this.charts.setDisplayedDateLimits(endDate);
        this.currentTime = endDate;
        this.setDate(endDateEpoch);
        this.updateObservationsTable();
    }

    //function to set the start and end dates selected by the slider

    // setSliderTimeWindow = (startDate, endDate) => {
    //     this.startDisplayedDate = startDate;
    //     this.endDisplayedDate = endDate;
    // }

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
            this.setState({startDate: startDate, endDate: endDate});
            this.setDate(new Date(parseInt(endDate, 10)));
        })
        this.charts.setDate(startDate,endDate)
    }

    setDate = (date) => {
        if(this.state.showSkyMap){
            this.mainSkymap.setDate(date);
        }
        this.miniSkymap.setDate(date);
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
        this.displayedData = data;
        this.charts.setData(data);
        this.miniScatterplot.setData(data);
        this.miniSkymap.setData(data);
        this.mainSkymap.setData(data);
        this.mainScatterplot.setData(data);
        this.updateObservationsTable();
    }

    addObservation = (obs) => {
        let added = false;
        let currentTime = jsToLsstTime((new Date()).getTime());
        for(let i=0;i<this.displayedData.length;++i){
            if(this.state.timeWindow < currentTime - this.displayedData[i]['expDate']){
                this.displayedData.splice(i, 1);
                --i;
            }
        }
        if(!added)
            this.displayedData.push(obs);
        this.setData(this.displayedData);
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
            for(let i=0;i<this.displayedData.length;++i){
                if(String(this.displayedData[i].fieldID) === String(fieldID) &&
                    (this.state.displayedFilter === this.displayedData[i].filterName || this.state.displayedFilter === 'all')){
                    if(this.displayedData[i].expDate > latestExpDate){
                        latestExpDate = this.displayedData[i].expDate;
                        latestField = this.displayedData[i];
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
            for(let i=0;i<this.displayedData.length;++i){
                if(String(this.displayedData[i].fieldID) === String(fieldID) &&
                    (this.state.displayedFilter === this.displayedData[i].filterName || this.state.displayedFilter === 'all') &&
                    (this.displayedData[i].expDate < this.currentTime)){
                    selectedFieldData.push(this.displayedData[i]);
                }
            }
        }
        selectedFieldData.sort((a,b)=> b.expDate - a.expDate);
        // console.log('selectedFieldData', selectedFieldData);
        this.setState({
            selectedFieldData: selectedFieldData
        });
    }

    setFieldDetailsVisibility = (visibility) => {
        this.setState({
            showFieldDetails: visibility,
        });
    }

    cellClickCallback = (fieldID, polygon) => {
        this.lastFieldID = fieldID;
        this.lastPolygon = polygon;
        if(fieldID){
            this.updateObservationsTable();
            this.setFieldDetailsVisibility(true);
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
            setSidebar: this.setSidebar,
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
                                        <div style = {this.mainSkymapStyle}>
                                        <MainSkymap ref={instance => { this.mainSkymap = instance; }} 
                                            data={this.displayedData} 
                                            filter={this.state.displayedFilter}
                                            startDate = {this.state.startDate} 
                                            endDate={this.state.endDate}
                                            cellHoverCallback={this.cellHoverCallback} 
                                            cellClickCallback={this.cellClickCallback} 
                                            cellUpdateCallback={this.cellUpdateCallback} 
                                         />
                                         </div>
                                        <div style = {this.mainScatterplotStyle}>
                                        <MainScatterplot ref={instance => {this.mainScatterplot=instance;}} 
                                            data={this.displayedData}
                                            />
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
                        <MiniSkymaps ref={instance => { this.miniSkymap = instance; }} onMinimapClick={this.setDisplayedFilter} />
                        <MiniScatterplot ref={instance => {this.miniScatterplot=instance;}} onScatterplotClick={this.toggleMapScatterplot}/>
                    </div>
                </div>
                <Sidebar ref={instance => { this.sidebar = instance; }} {...setters} skymap={this.mainSkymap} />
                {
                    this.props.parentNode && this.state.showFieldDetails ?
                        <FieldDetails targetNode={this.props.parentNode} 
                                        fieldData={this.state.selectedFieldData}
                                        setFieldDetailsVisibility={this.setFieldDetailsVisibility}
                                        showFieldDetails={this.state.showFieldDetails}/>
                    :''
                }
            </div>
        );
    }
}

export default Survey;
