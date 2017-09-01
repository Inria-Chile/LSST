import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import './SurveyControls.css';
import ModeSelection from './ModeSelection/ModeSelection';
import DateSelection from './DateSelection/DateSelection';
import PlayerControls from './PlayerControls/PlayerControls';

class SurveyControls extends Component {
    render() {
        return (
            <div className="survey-control-bar">
                <div>
                    <h3>Survey</h3>
                </div>
                <div className="survey-controls">
                    <ModeSelection setPlaybackMode={this.props.setPlaybackMode} setLiveMode={this.props.setLiveMode} />
                    { this.props.selectedMode === 'playback' && <DateSelection setDataByDate={this.props.setDataByDate} /> }
                    { this.props.selectedMode === 'playback' && <PlayerControls/> }
                </div>
            </div>
        );
    }
}

export default SurveyControls;
