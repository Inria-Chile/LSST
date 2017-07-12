import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Skymap from './Skymap';

class MainSkymap extends Component {
  render() {
    return (
      <Skymap nodeRef='mainNode' className="mainSkymap" />
    );
  }
}

export default MainSkymap;
