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

  drawFrame = (timestamp) => {
    // console.log('drawFrame MiniSkymaps');
    // console.log(timestamp);
    this.children.forEach(function (child) {
      var Celestial = child.getCelestial();
      var step = 1.6;

      // reqID = window.requestAnimationFrame(animate);
      var rot = Celestial.rotate();
      rot[0] = rot[0] === 180 - step ? -180 : rot[0] + step;
      rot[2] = 0;
      Celestial.rotate({ center: rot });
      Celestial.updateCell(Math.floor(Math.random() * 857));
    });
  }


  setData = (data) => {
    for(let i=0;i<this.children.length;++i){
      this.children[i].getCelestial().updateCells(data);
      this.children[i].getCelestial().redraw();
    }
  }

  setDate = (date) => {
    for(let i=0;i<this.children.length;++i){
      this.children[i].getCelestial().goToDate(date);
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
        <div className={"minimap-wrapper " + (this.state.selectedFilter==='u' ? 'selected-filter' : '')} onClick={ () => this.handleClick('u')}>
          <p className="filter-name"> u filter </p>
          <Skymap nodeRef='node1' className="minimap" ref={instance => { if(instance) this.children.push(instance); }}/>
        </div>
        <div className={"minimap-wrapper " + (this.state.selectedFilter==='g' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('g')}>
          <p className="filter-name"> g filter </p>          
          <Skymap nodeRef='node2' className="minimap" ref={instance => { if(instance) this.children.push(instance); }}/>
        </div>
        <div className={"minimap-wrapper " + (this.state.selectedFilter==='r' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('r')}>
          <p className="filter-name"> r filter </p>          
          <Skymap nodeRef='node3' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
        </div>
        <div className={"minimap-wrapper " + (this.state.selectedFilter==='i' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('i')}>
          <p className="filter-name"> i filter </p>          
          <Skymap nodeRef='node4' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
        </div>
        <div className={"minimap-wrapper " + (this.state.selectedFilter==='z' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('z')}>
          <p className="filter-name"> z filter </p>          
          <Skymap nodeRef='node5' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
        </div>
        <div className={"minimap-wrapper " + (this.state.selectedFilter==='y' ? 'selected-filter' : '')}  onClick={ () => this.handleClick('y')}>
          <p className="filter-name"> y filter </p>          
          <Skymap nodeRef='node6' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
        </div>
        <div className={"minimap-wrapper all-filter "  + (this.state.selectedFilter==='all' ? 'selected-filter' : '')} onClick={ () => this.handleClick('all')}>
          <p className="filter-name"> all filters </p>          
          <Skymap nodeRef='node7' className="minimap" ref={instance => { if(instance) this.children.push(instance); }} />
        </div>
      </div>
    );
  }
}

export default MiniSkymaps;
