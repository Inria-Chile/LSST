import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import MainSkymap from '../Skymap/MainSkymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
import './Survey.css';

class Survey extends Component {
  render() {
    return (
      <div className="survey-container">
        <MainSkymap />
        <MiniSkymaps />
      </div>
    );
  }
}

export default Survey;
