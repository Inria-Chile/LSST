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

    setDisplayedFilter(filter){
        if(filter === 'all')
            this.skymap.displayAllFilters();
        else
            this.skymap.displayFilter(filter);
    }




    setDate(date){
        this.skymap.getCelestial().goToDate(date);
    }

    render() {
        if(this.props.currentDate)
            this.setDate(this.props.currentDate);

        // this replaces setDisplayedDateLimits
        if(this.skymap){
            this.skymap.getCelestial().updateCells(this.props.displayedData);    
            
            this.skymap.getCelestial().redraw(); // antes esto ocurria solo cuando no existian ni startDate ni endDate
        }
        
        
        return (
            <Skymap ref={instance => { this.skymap = instance; }} nodeRef='mainNode' className="mainSkymap"
                    cellHoverCallback={this.props.cellHoverCallback} 
                    cellUpdateCallback={this.props.cellUpdateCallback} 
                    cellClickCallback={this.props.cellClickCallback} 
                    showEcliptic={this.props.showEcliptic}
                    showGalactic={this.props.showGalactic}
                    showMoon={this.props.showMoon}
                    showTelescopeRange={this.props.showTelescopeRange}
                    projection={this.props.projection}
            />
        );
    }
}

export default MainSkymap;

                    {/* data={this.props.data}
                    
                    date={this.props.date}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    
                    
                    displayedFilters={this.props.displayedFilters}
                    showProjection={this.props.showProjection}
                    showRange={this.props.showRange}
                    showMoon={this.props.showMoon}
                    showGalactic={this.props.showGalactic}
                    showEcliptic={this.props.showEcliptic}
                     */}