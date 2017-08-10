import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './MiniSkymaps.css';
import Skymap from './Skymap';

class MiniSkymaps extends Component {

  constructor(props) {
    super(props);
    this.children = [];
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


  render() {
    return (
      <div className="minimap-container">
        <div>
          <h3>Filters</h3>
        </div>
        <div className="minimap-wrapper">
          <p className="filter-name"> u filter </p>
          <Skymap nodeRef='node1' className="minimap" ref={instance => { this.children.push(instance); }} />
        </div>
        <div className="minimap-wrapper">
          <p className="filter-name"> g filter </p>          
          <Skymap nodeRef='node2' className="minimap" ref={instance => { this.children.push(instance); }} />
        </div>
        <div className="minimap-wrapper">
          <p className="filter-name"> r filter </p>          
          <Skymap nodeRef='node3' className="minimap" ref={instance => { this.children.push(instance); }} />
        </div>
        <div className="minimap-wrapper">
          <p className="filter-name"> i filter </p>          
          <Skymap nodeRef='node4' className="minimap" ref={instance => { this.children.push(instance); }} />
        </div>
        <div className="minimap-wrapper">
          <p className="filter-name"> z filter </p>          
          <Skymap nodeRef='node5' className="minimap" ref={instance => { this.children.push(instance); }} />
        </div>
        <div className="minimap-wrapper">
          <p className="filter-name"> y filter </p>          
          <Skymap nodeRef='node6' className="minimap" ref={instance => { this.children.push(instance); }} />
        </div>
        <div className="minimap-wrapper all-filter">
          <p className="filter-name"> all filters </p>          
          <Skymap nodeRef='node7' className="minimap" ref={instance => { this.children.push(instance); }} />
        </div>
      </div>
    );
  }
}

export default MiniSkymaps;
