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

    render() {
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
                    filter={this.props.filter}
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