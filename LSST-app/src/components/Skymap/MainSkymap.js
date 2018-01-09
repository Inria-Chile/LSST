import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import Skymap from './Skymap';

class MainSkymap extends PureComponent {

    constructor(props) {
        super(props);
        this.data = [];
  
    }

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
        this.data = data;
        this.setDisplayedDateLimits();
    }

    setDisplayedDateLimits(startDate, endDate){
        let displayedData = [];
        if(!startDate && !endDate){
            displayedData = this.data;
            this.skymap.getCelestial().updateCells(displayedData);            
            this.skymap.getCelestial().redraw();
            return;
        }else{
            for(let i=0;i<this.data.length;++i){
                if(this.data[i].expDate > startDate && this.data[i].expDate < endDate)
                    displayedData.push(this.data[i]);
            }
        }
        this.skymap.getCelestial().updateCells(displayedData);            
    }

    setDate(date){
        this.skymap.getCelestial().goToDate(date);
    }

    render() {
        if(this.props.currentDate)
            this.setDate(this.props.currentDate);
        return (
            <Skymap ref={instance => { this.skymap = instance; }} nodeRef='mainNode' className="mainSkymap"
                    cellHoverCallback={this.props.cellHoverCallback} 
                    cellUpdateCallback={this.props.cellUpdateCallback} 
                    cellClickCallback={this.props.cellClickCallback} />
        );
    }
}

export default MainSkymap;
