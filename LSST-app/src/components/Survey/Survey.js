import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import MainSkymap from '../Skymap/MainSkymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
// import Charts from '../Charts/Charts';
import Sidebar from '../Sidebar/Sidebar';
import SurveyControls from '../SurveyControls/SurveyControls';
import './Survey.css';
import openSocket from 'socket.io-client';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.mainSkymap = null;
        this.miniSkymap = null;
        this.data = [];
        this.socket = openSocket('http://localhost:3000');
        this.socket.on('data', timestamp => this.receiveMsg(timestamp));
    }

    receiveMsg(msg){
        this.addObservation(msg);
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
        this.mainSkymap.setDisplayedFilter(filter);
    }
    
    fetchDataByDate = (startDate, endDate, cb) => {
        return fetch(`survey/playback/observationsCount?start_date=${startDate}&end_date=${endDate}`, {
            accept: "application/json"
        })
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then(cb);
    }

    setData = (data) => {
        this.data = data;
        this.mainSkymap.setData(data);
        this.miniSkymap.setData(data);
    }

    addObservation = (obs) => {
        let added = false;
        for(let i=0;i<this.data.length;++i){
            if(this.data[i]['fieldID'] === obs['fieldID'] && this.data[i]['filterName'] === obs['filterName']){
                // console.log('adding', obs, ' to ', this.data[i]); // eslint-disable-line no-console          
                this.data[i]['count']++;
                added = true;
            }
        }
        if(!added)
            this.data.push(obs);
        this.setData(this.data);
    }
    
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
    
    parseJSON(response) {
        return response.json();
    }

    componentDidMount() {
        console.log("componentDidMount")
        // this.fetchDataByDate(0, 99994323, (res) => {
        this.fetchDataByDate(0, 2, (res) => {
            for(var i=0;i<res.results.length;++i)
                res.results[i][2] += 30;
            // this.setData(res.results);
        });
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
                        <SurveyControls />
                        {/* <Charts/> */}
                        <div className="main-skymap-wrapper">
                            <MainSkymap ref={instance => { this.mainSkymap = instance; }} />
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
