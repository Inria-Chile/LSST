import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './MiniSkymaps.css';
import Skymap from './Skymap';

class MiniSkymaps extends Component {

  constructor(props) {
    super(props);
    this.children = [];
    this.selectedFilter = 'all';
    this.state = {
      selectedFilter: 'all'
    }
  }

  setData = (data) => {
    this.data = data;
    this.setDisplayedDateLimits();
  }

  setDate = (date) => {
    for(let i=0;i<this.children.length;++i){
      this.children[i].getCelestial().goToDate(date);
    }
  }

  setDisplayedDateLimits(startDate, endDate){
    let displayedData = [];
    if(!startDate || !endDate){
      displayedData = this.data;
      for(let i=0;i<this.children.length;++i){
        this.children[i].getCelestial().updateCells(displayedData);
        this.children[i].getCelestial().redraw();
      }
      return;
    }
    else if(this.data){
        for(let i=0;i<this.data.length;++i){
          if(this.data[i].expDate > startDate && this.data[i].expDate < endDate)
            displayedData.push(this.data[i]);
        }
    }
    for(let i=0;i<this.children.length;++i){
      this.children[i].getCelestial().updateCells(displayedData);
    }
  }

  updateDimensions = () => {
    for(let i=0;i<this.children.length;++i){
        this.children[i].getCelestial().resize({width:0});
      }
  }

  componentDidMount() {
    let filters = ["u","g","r","i","z","y"];
    for(let i=0;i<filters.length;++i){
      this.children[i].displayFilter(filters[i]);
      this.children[i].setFontSize(0);
      this.children[i].setGridOpacity(0);
    }
    this.children[this.children.length-1].displayAllFilters();
    this.children[this.children.length-1].setFontSize(0);
    this.children[this.children.length-1].setGridOpacity(0);
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  handleClick = (filterName) => {
    console.log(this.props)
    this.setState({
      selectedFilter: filterName
    });
    this.props.onMinimapClick(filterName)
  }

  render() {
    this.children = [];
    return (
      <div className="minimap-container">
        <div>
          <h3>Filters</h3>
        </div>
        <div className="container">
          <div className="row">
            <div className={"minimap-wrapper all-filter "  + (this.state.selectedFilter==='all' ? 'selected-filter' : '')} onClick={ () => this.handleClick('all')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='all' ? 'selected-filter' : '')}>
                <Skymap nodeRef='node7' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
              </div>
              <p className="filter-name"> all filters </p>
            </div>
          </div>
          <div className="row">          
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='u' ? 'selected-filter' : '')} onClick={ () => this.handleClick('u')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='u' ? 'selected-filter' : '')}>
                <Skymap nodeRef='node1' className="minimap" ref={instance => { if(instance) this.children.push(instance); }}/>
              </div>
              <p className="filter-name"> u filter </p>
            </div>
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='g' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('g')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='g' ? 'selected-filter' : '')}>
                <Skymap nodeRef='node2' className="minimap" ref={instance => { if(instance) this.children.push(instance); }}/>
              </div>
              <p className="filter-name"> g filter </p>
            </div>
          </div>
          <div className="row">                    
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='r' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('r')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='r' ? 'selected-filter' : '')}>
                <Skymap nodeRef='node3' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
              </div>
              <p className="filter-name"> r filter </p>
            </div>
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='i' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('i')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='i' ? 'selected-filter' : '')}>
                <Skymap nodeRef='node4' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
              </div>
              <p className="filter-name"> i filter </p>
            </div>
          </div>
          <div className="row">          
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='z' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('z')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='z' ? 'selected-filter' : '')}>
                <Skymap nodeRef='node5' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
              </div>
              <p className="filter-name"> z filter </p>
            </div>
            <div className={"col-6 minimap-wrapper " + (this.state.selectedFilter==='y' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('y')}>
              <div className={"skymap-wrapper " + (this.state.selectedFilter==='y' ? 'selected-filter' : '')}>
                <Skymap nodeRef='node6' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
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
