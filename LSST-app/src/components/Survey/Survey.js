import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Skymap from '../Skymap/Skymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
import './Survey.css';

class Survey extends Component {
  render() {
    return (
      <div className="survey-container">
        <Skymap />
        <MiniSkymaps />
      </div>
    );
  }
}

export default Survey;
