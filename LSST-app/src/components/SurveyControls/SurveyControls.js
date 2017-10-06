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
                <div className="survey-controls">
                    <ModeSelection setPlaybackMode={this.props.setPlaybackMode} setLiveMode={this.props.setLiveMode} />
                    { this.props.selectedMode === 'playback' && <DateSelection setDataByDate={this.props.setDataByDate} /> }
                    { this.props.selectedMode === 'playback' && <PlayerControls startDate={this.props.startDate} 
                                                                                endDate={this.props.endDate} 
                                                                                setDisplayedDateLimits={this.props.setDisplayedDateLimits} /> }
                </div>
            </div>
        );
    }
}

export default SurveyControls;
