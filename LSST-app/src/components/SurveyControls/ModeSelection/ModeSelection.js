import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './ModeSelection.css';

class ModeSelection extends Component {

    render() {
        return (
            <div className="mode-selection">
                <div>
                    <h6>MODE SELECTION</h6>
                </div>
                <span>Playback</span>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                </label>
                <span>Live</span>
            </div>
        );
    }
}

export default ModeSelection;
