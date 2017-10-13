import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import './SurveyControls.css';
import ModeSelection from './ModeSelection/ModeSelection';
import DateSelection from './DateSelection/DateSelection';
import TimeWindow from './TimeWindow/TimeWindow';
import PlayerControls from './PlayerControls/PlayerControls';

class SurveyControls extends PureComponent {
    render() {
        return (
            <div className="survey-control-bar">
                <div className="survey-controls">
                    <ModeSelection selectedMode={this.props.selectedMode} setPlaybackMode={this.props.setPlaybackMode} setLiveMode={this.props.setLiveMode} />
                    { this.props.selectedMode === 'live' && <TimeWindow setTimeWindow={this.props.setTimeWindow} /> }
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
