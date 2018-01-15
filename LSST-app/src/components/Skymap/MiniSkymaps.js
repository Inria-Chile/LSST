import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import './MiniSkymaps.css';
import Skymap from './Skymap';

class MiniSkymaps extends PureComponent {

  render() {
    return (
      <div className="minimap-container">
        <div className="container">
          <div className="row">
            <div className={"minimap-wrapper all-filter "  + (this.props.selectedFilter==='all' ? 'selected-filter' : '')} 
                onClick={ () => this.props.onMinimapClick('all')}>
              <div className={"skymap-wrapper " + (this.props.selectedFilter==='all' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node7' 
                  className="minimap" 
                  showEcliptic={true}
                  showGalactic={true}
                  showMoon={true}
                  showTelescopeRange={true}
                  projection='aitoff'
                  filter='all'
                  displayedData={this.props.displayedData}
                  fontSize={this.props.fontSize}
                  gridOpacity={this.props.gridOpacity}
                />
              </div>
              <p className="filter-name"> all filters </p>
            </div>
          </div>
          <div className="row">          
            <div className={"col-6 minimap-wrapper " + (this.props.selectedFilter==='u' ? 'selected-filter' : '')} 
                onClick={ () => this.props.onMinimapClick('u')}>
              <div className={"skymap-wrapper " + (this.props.selectedFilter==='u' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node1' 
                  className="minimap" 
                  showEcliptic={true}
                  showGalactic={true}
                  showMoon={true}
                  showTelescopeRange={true}
                  projection='aitoff'
                  filter='u'
                  displayedData={this.props.displayedData}
                  fontSize={this.props.fontSize}
                  gridOpacity={this.props.gridOpacity}
                />
              </div>
              <p className="filter-name"> u filter </p>
            </div>
            <div className={"col-6 minimap-wrapper " + (this.props.selectedFilter==='g' ? 'selected-filter' : '')}  
                onClick={ () => this.props.onMinimapClick('g')}>
              <div className={"skymap-wrapper " + (this.props.selectedFilter==='g' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node2' 
                  className="minimap" 
                  showEcliptic={true}
                  showGalactic={true}
                  showMoon={true}
                  showTelescopeRange={true}
                  projection='aitoff'
                  filter='g'
                  displayedData={this.props.displayedData}
                  fontSize={this.props.fontSize}
                  gridOpacity={this.props.gridOpacity}
                />
              </div>
              <p className="filter-name"> g filter </p>
            </div>
          </div>
          <div className="row">                    
            <div className={"col-6 minimap-wrapper " + (this.props.selectedFilter==='r' ? 'selected-filter' : '')}  
                onClick={ () => this.props.onMinimapClick('r')}>
              <div className={"skymap-wrapper " + (this.props.selectedFilter==='r' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node3' 
                  className="minimap" 
                  showEcliptic={true}
                  showGalactic={true}
                  showMoon={true}
                  showTelescopeRange={true}
                  projection='aitoff'
                  filter='r'
                  displayedData={this.props.displayedData}
                  fontSize={this.props.fontSize}
                  gridOpacity={this.props.gridOpacity}
                />
              </div>
              <p className="filter-name"> r filter </p>
            </div>
            <div className={"col-6 minimap-wrapper " + (this.props.selectedFilter==='i' ? 'selected-filter' : '')}  
                onClick={ () => this.props.onMinimapClick('i')}>
              <div className={"skymap-wrapper " + (this.props.selectedFilter==='i' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node4' 
                  className="minimap" 
                  showEcliptic={true}
                  showGalactic={true}
                  showMoon={true}
                  showTelescopeRange={true}
                  projection='aitoff'
                  filter='i'
                  displayedData={this.props.displayedData}
                  fontSize={this.props.fontSize}                  
                  gridOpacity={this.props.gridOpacity}
                />
              </div>
              <p className="filter-name"> i filter </p>
            </div>
          </div>
          <div className="row">          
            <div className={"col-6 minimap-wrapper " + (this.props.selectedFilter==='z' ? 'selected-filter' : '')}  
                onClick={ () => this.props.onMinimapClick('z')}>
              <div className={"skymap-wrapper " + (this.props.selectedFilter==='z' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node5' 
                  className="minimap" 
                  showEcliptic={true}
                  showGalactic={true}
                  showMoon={true}
                  showTelescopeRange={true}
                  projection='aitoff'
                  filter='z'
                  displayedData={this.props.displayedData}
                  fontSize={this.props.fontSize}                  
                  gridOpacity={this.props.gridOpacity}
                />
              </div>
              <p className="filter-name"> z filter </p>
            </div>
            <div className={"col-6 minimap-wrapper " + (this.props.selectedFilter==='y' ? 'selected-filter' : '')}  
                onClick={ () => this.props.onMinimapClick('y')}>
              <div className={"skymap-wrapper " + (this.props.selectedFilter==='y' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node6' 
                  className="minimap" 
                  showEcliptic={true}
                  showGalactic={true}
                  showMoon={true}
                  showTelescopeRange={true}
                  projection='aitoff'
                  filter='y'
                  displayedData={this.props.displayedData}
                  fontSize={this.props.fontSize}                  
                  gridOpacity={this.props.gridOpacity}
                />
              </div>
              <p className="filter-name"> y filter </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniSkymaps;
