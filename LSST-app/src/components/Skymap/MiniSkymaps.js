import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './MiniSkymaps.css';
import Skymap from './Skymap';

class MiniSkymaps extends Component {
  
  render() {
    return (
      <div className="minimap-container">
        <Skymap nodeRef='node1' className="minimap" />
        <Skymap nodeRef='node2' className="minimap" />
        <Skymap nodeRef='node3' className="minimap" />
        <Skymap nodeRef='node4' className="minimap" />
        <Skymap nodeRef='node5' className="minimap" />
        <Skymap nodeRef='node6' className="minimap" />
      </div>
    );
  }
}

export default MiniSkymaps;
