import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import MainSkymap from '../Skymap/MainSkymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
// import Charts from '../Charts/Charts';
import Sidebar from '../Sidebar/Sidebar';
import SurveyControls from '../SurveyControls/SurveyControls';
import './Survey.css';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.mainSkymap = null;
        this.children = [];
    }

    drawFrame = (timestamp) => {
        // console.log('Parent Drawframe')
        this.mainSkymap.drawFrame(timestamp);
        this.children.forEach(function (child) {
            child.drawFrame(timestamp);
        });
        requestAnimationFrame(this.drawFrame);
    }

    componentDidMount() {
        // this.cel = this.mainSkymap.getCelestial();
        // requestAnimationFrame(this.drawFrame);
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
                         <SurveyControls/> 
                         {/* <Charts/> */}
                         <div className="main-skymap-wrapper">
                            <MainSkymap ref={instance => { this.mainSkymap = instance; }} /> 
                         </div>
                    </div>
                    <div className="right-container">                
                        <MiniSkymaps ref={instance => { this.children.push(instance); }} onMinimapClick={this.setDisplayedFilter}/> 
                    </div>
                </div>
                <Sidebar ref={instance => { this.sidebar = instance; }} {...setters} skymap={this.mainSkymap} /> 
            </div>
        );
    }
}

export default Survey;
