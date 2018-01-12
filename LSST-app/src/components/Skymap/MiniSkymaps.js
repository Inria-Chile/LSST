import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import './MiniSkymaps.css';
import Skymap from './Skymap';

class MiniSkymaps extends PureComponent {

  constructor(props) {
    super(props);
    this.children = [];
    this.selectedFilter = 'all';
    this.state = {
      selectedFilter: 'all'
    }
    this.loadedMaps = 0;
  }

  // setData = (data) => {
  //   this.data = data;
  //   this.setDisplayedDateLimits();
  // }

  // setDate = (date) => {
  //   for(let i=0;i<this.children.length;++i){
  //     this.children[i].getCelestial().goToDate(date);
  //   }
  // }

  // setDisplayedDateLimits(startDate, endDate){
  //   let displayedData = [];
  //   if(!startDate || !endDate){
  //     displayedData = this.data;
  //     for(let i=0;i<this.children.length;++i){
  //       this.children[i].getCelestial().updateCells(displayedData);
  //       this.children[i].getCelestial().redraw();
  //     }
  //     return;
  //   }
  //   else if(this.data){
  //       for(let i=0;i<this.data.length;++i){
  //         if(this.data[i].expDate > startDate && this.data[i].expDate < endDate)
  //           displayedData.push(this.data[i]);
  //       }
  //   }
  //   for(let i=0;i<this.children.length;++i){
  //     this.children[i].getCelestial().updateCells(displayedData);
  //   }
  // }

  // TODO
  // updateDimensions = () => {
  //   for(let i=0;i<this.children.length;++i){
  //       this.children[i].getCelestial().resize({width:0});
  //     }
  // }


  // onCelestialLoaded = () => {
  //   let filters = ["u","g","r","i","z","y"];
  //   this.loadedMaps++;
  //   if(this.loadedMaps <= filters.length)
  //     return;
  //   console.log('asdfasdf');
    // for(let i=0;i<filters.length;++i){
      // this.children[i+1].displayFilter(filters[i]);
      // this.children[i+1].setFontSize(0);
      // this.children[i+1].setGridOpacity(0);
    // }
    // this.children[0].displayAllFilters();
    // this.children[0].setFontSize(0);
    // this.children[0].setGridOpacity(0);
  //   window.addEventListener("resize", this.updateDimensions);
  // }

  // componentWillUnmount() {
  //     window.removeEventListener("resize", this.updateDimensions);
  // }

  handleClick = (filterName) => {
    console.log(this.props)
    this.setState({
      selectedFilter: filterName
    });
    this.props.onMinimapClick(filterName)
  }

  render() {
    // console.log(this.children);
    // this.children.forEach((children)=>{
    //   children.getCelestial().updateCells(this.props.displayedData); 
    //   children.getCelestial().redraw();   
    // });
   
    return (
      <div className="minimap-container">
        <div className="container">
          <div className="row">
            <div className={"minimap-wrapper all-filter "  + (this.state.selectedFilter==='all' ? 'selected-filter' : '')} onClick={ () => this.handleClick('all')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='all' ? 'selected-filter' : '')}>
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
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='u' ? 'selected-filter' : '')} onClick={ () => this.handleClick('u')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='u' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node1' 
                  className="minimap" 
                  ref={instance => { if(instance && this.children.length<7) this.children.push(instance); }}
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
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='g' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('g')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='g' ? 'selected-filter' : '')}>
                <Skymap 
                  onLoaded={this.onCelestialLoaded} 
                  nodeRef='node2' 
                  className="minimap" 
                  ref={instance => { if(instance && this.children.length<7) this.children.push(instance); }}
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
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='r' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('r')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='r' ? 'selected-filter' : '')}>
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
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='i' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('i')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='i' ? 'selected-filter' : '')}>
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
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='z' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('z')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='z' ? 'selected-filter' : '')}>
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
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='y' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('y')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='y' ? 'selected-filter' : '')}>
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
