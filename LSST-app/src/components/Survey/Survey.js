import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import MainSkymap from '../Skymap/MainSkymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
import Charts from '../Charts/Charts';
// import M1M3 from '../M1M3/M1M3';
import Sidebar from '../Sidebar/Sidebar';
import SurveyControls from '../SurveyControls/SurveyControls';
import ObservationsTable from '../ObservationsTable/ObservationsTable';
import './Survey.css';
import openSocket from 'socket.io-client';
import { filterColors, checkStatus, parseJSON } from "../Utils/Utils"
// import * as d3 from 'd3';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.mainSkymap = null;
        this.miniSkymap = null;
        this.charts = null;
        this.displayedData = [];
        this.data = [];
        this.socket = openSocket('http://localhost:3000');
        this.state = {
            selectedMode: 'playback',
            selectedField: null,
            clickedField: [],
            displayedFilter: 'all',
            startDate: null,
            endDate: null
        }
    }

    receiveMsg(msg){
        // console.log("received" + msg);
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
    }
    
    setDisplayedDateLimits = (startDate, endDate) => {
        this.mainSkymap.setDisplayedDateLimits(startDate, endDate);
        this.miniSkymap.setDisplayedDateLimits(startDate, endDate);
        this.setDate(endDate);
        this.updateObservationsTable();
    }

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
        console.log('survey', 'Ssetdatabytdate')
        this.fetchDataByDate(startDate, endDate, (res) => {
            for(var i=0;i<res.results.length;++i)
                res.results[i]['fieldDec'] += 30;
            this.setData(res.results);
            this.setState({startDate: startDate, endDate: endDate});
            this.setDate(new Date(parseInt(endDate, 10)));
        })
    }

    setDate = (date) => {
        this.mainSkymap.setDate(date);
        this.miniSkymap.setDate(date);
    }
    
    fetchDataByDate = (startDate, endDate, cb) => {
        return fetch(`survey/playback/observationsCount?start_date=${startDate}&end_date=${endDate}`, {
            accept: "application/json"
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
    }

    setData = (data) => {
        this.displayedData = data;
        this.mainSkymap.setData(data);
        this.miniSkymap.setData(data);
        this.charts.setData(data);
    }

    addObservation = (obs) => {
        let added = false;
        for(let i=0;i<this.displayedData.length;++i){
            if(this.displayedData[i]['fieldID'] === obs['fieldID'] && this.displayedData[i]['filterName'] === obs['filterName']){
                // console.log('adding', obs, ' to ', this.displayedData[i]); // eslint-disable-line no-console          
                this.displayedData[i]['count']++;
                added = true;
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
            selectedField: latestField
        })
    }

    updateObservationsTable = () => {
        let fieldID = this.lastFieldID;
        let selectedFieldData = [];
        if(fieldID){
            for(let i=0;i<this.displayedData.length;++i){
                if(String(this.displayedData[i].fieldID) === String(fieldID) &&
                    (this.state.displayedFilter === this.displayedData[i].filterName || this.state.displayedFilter === 'all')){
                    selectedFieldData.push(this.displayedData[i]);
                }
            }
        }
        selectedFieldData.sort((a,b)=> b.expDate - a.expDate)
        this.setState({
            clickedField: selectedFieldData
        })
    }

    cellClickCallback = (fieldID, polygon) => {
        this.lastFieldID = fieldID;
        this.lastPolygon = polygon;
        this.updateObservationsTable();
        console.log('cellClickCallback');
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
                <div>
                    <h2>
                        SURVEY PROGRESS MONITOR
                    </h2>
                    <button className="settings-button" type="button" onClick={this.setSidebar} aria-label="Settings">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="main-container">
                    <div className="left-container">
                        <SurveyControls setPlaybackMode={this.setPlaybackMode} 
                                        setLiveMode={this.setLiveMode} 
                                        setDataByDate={this.setDataByDate}
                                        selectedMode={this.state.selectedMode}
                                        startDate={this.state.startDate} 
                                        endDate={this.state.endDate} 
                                        setDisplayedDateLimits={this.setDisplayedDateLimits}/>
                        <Charts ref={instance => { this.charts = instance; }}/>
                        <div className="main-skymap-wrapper">
                            {/* <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={d3.interpolateViridis}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={(d) => d3.interpolateViridis(1-d)}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={d3.interpolateMagma}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={(d) => d3.interpolateMagma(1-d)}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={d3.interpolatePlasma}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={(d) => d3.interpolatePlasma(1-d)}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={d3.interpolateCool}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={(d) => d3.interpolateCool(1-d)}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={d3.interpolateRainbow}/>
                            <M1M3 width="500px" height="500px" scale={1.4} margin={20} colormap={(d) => d3.interpolateRainbow(1-d)}/> */}
                            <MainSkymap ref={instance => { this.mainSkymap = instance; }} 
                                        cellHoverCallback={this.cellHoverCallback} 
                                        cellClickCallback={this.cellClickCallback} />
                            {
                                this.state.selectedField &&
                                <div className="hover-div">
                                    <div>FieldID: {this.state.selectedField && this.state.selectedField.fieldID ? this.state.selectedField.fieldID: ''}</div>
                                    <div>Timestamp: {this.state.selectedField && this.state.selectedField.expDate ? this.state.selectedField.expDate: ''}</div>
                                    <div>
                                        Filter: {" "}
                                        <div className="hover-filter" style={{
                                                backgroundColor: filterColors[this.state.selectedField.filterName ] ? filterColors[this.state.selectedField.filterName ]
                                                    : "#000000",
                                            }}>
                                            {
                                                this.state.selectedField.filterName ? this.state.selectedField.filterName : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            } 
                        </div>
                        <div>
                            <ObservationsTable selectedField={this.state.selectedField} clickedField={this.state.clickedField} />
                        </div>
                    </div>
                    <div className="right-container">
                        <MiniSkymaps ref={instance => { this.miniSkymap = instance; }} onMinimapClick={this.setDisplayedFilter} />
                    </div>
                </div>
                <Sidebar ref={instance => { this.sidebar = instance; }} {...setters} skymap={this.mainSkymap} />
            </div>
        );
    }
}

export default Survey;
