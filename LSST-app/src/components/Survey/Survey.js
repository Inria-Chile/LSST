import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import MainSkymap from '../Skymap/MainSkymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
import Chart from '../HistogramD3/Chart';
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
        // this.children.forEach(function (child) {
        //     child.drawFrame(timestamp);
        // });
        // requestAnimationFrame(this.drawFrame);
    }

    componentDidMount() {
        // this.cel = this.mainSkymap.getCelestial();
        // requestAnimationFrame(this.drawFrame);
    }

    setEcliptic = (show) => {
        let cfg = this.cel.cfg;
        cfg.lines.ecliptic.show = show;
        this.cel.apply(cfg);
        this.cel.cfg = cfg;
    }

    setGalactic = (show) => {
        let cfg = this.cel.cfg;
        cfg.lines.galactic.show = show;
        this.cel.apply(cfg);
        this.cel.cfg = cfg;
    }

    setMoon = (show) => {
        let cfg = this.cel.cfg;
        cfg.moon.show = show;
        this.cel.apply(cfg);
        this.cel.cfg = cfg;
    }

    setTelescopeRange = (show) => {
        let cfg = this.cel.cfg;
        cfg.telescopeRange.show = show;
        this.cel.apply(cfg);
        this.cel.cfg = cfg;
    }

    setSidebar = (show) => {
        this.sidebar.setState({
            sidebarOpen: show
        })
    }

    setProjection = (proj) => {
        let cfg = this.cel.cfg;
        cfg.projection = proj;
        this.cel.reproject(cfg);
        this.cel.cfg = cfg;
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
                         <Chart/>
                         <div className="main-skymap-wrapper">
                            <MainSkymap ref={instance => { this.mainSkymap = instance; }} /> 
                         </div>
                    </div>
                    <div className="right-container">                
                        <MiniSkymaps ref={instance => { this.children.push(instance); }} /> 
                    </div>
                </div>
                <Sidebar ref={instance => { this.sidebar = instance; }} {...setters} skymap={this.mainSkymap} /> 
            </div>
        );
    }
}

export default Survey;
