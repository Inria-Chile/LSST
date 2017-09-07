import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Skymap from './Skymap';

class MainSkymap extends Component {

    getCelestial(){
        return this.skymap.getCelestial();
    }

    getConfig(){
        return this.skymap.getConfig();
    }

    drawFrame = () => {
        // console.log('drawFrame MainSkymap');
        var Celestial = this.getCelestial();
        var step = 1.6;

        // reqID = window.requestAnimationFrame(animate);
        var rot = Celestial.rotate();
        rot[0] = rot[0] === 180 - step ? -180 : rot[0] + step;
        rot[2] = 0;
        Celestial.rotate({center:rot});
        Celestial.updateCell(Math.floor(Math.random()*857));
    }

    setEcliptic(show){
        this.skymap.setEcliptic(show);
    }

    setGalactic = (show) => {
        this.skymap.setGalactic(show);
    }

    setMoon = (show) => {
        this.skymap.setMoon(show);        
    }

    setTelescopeRange = (show) => {
        this.skymap.setTelescopeRange(show);        
    }

    setProjection = (proj) => {
        this.skymap.setProjection(proj);        
    }

    setDisplayedFilter(filter){
        if(filter === 'all')
            this.skymap.displayAllFilters();
        else
            this.skymap.displayFilter(filter);
    }

    setData(data){
        this.skymap.getCelestial().updateCells(data);
        this.skymap.getCelestial().redraw();
    }

    setDate(date){
        this.skymap.getCelestial().goToDate(date);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Skymap ref={instance => { this.skymap = instance; }} nodeRef='mainNode' className="mainSkymap" />
        );
    }
}

export default MainSkymap;
