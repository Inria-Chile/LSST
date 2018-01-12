import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import Skymap from './Skymap';

class MainSkymap extends PureComponent {

    render() {
        return (
            <Skymap nodeRef='mainNode' className="mainSkymap"
                    cellHoverCallback={this.props.cellHoverCallback} 
                    cellUpdateCallback={this.props.cellUpdateCallback} 
                    cellClickCallback={this.props.cellClickCallback} 
                    showEcliptic={this.props.showEcliptic}
                    showGalactic={this.props.showGalactic}
                    showMoon={this.props.showMoon}
                    showTelescopeRange={this.props.showTelescopeRange}
                    projection={this.props.projection}
                    filter={this.props.filter}
                    displayedData={this.props.displayedData}
            />
        );
    }
}

export default MainSkymap;