import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './SurveyControls.css';
import './PlayerControls.css';
import './PlayerControlsLib.css';
import { PlaybackControls, ProgressBar } from 'react-player-controls'

class PlayerControls extends Component {


    constructor() {
        super();
        this.state = {
            totalTime: 190,
            currentTime: 0,
            isSeekable: true,
            isPlayable: true,
            hasPrevious: true,
        };
    }


    render() {
        return (
            <div className="player-controls">
                <div>
                    <h6>PLAYER</h6>
                </div>
                <PlaybackControls
                    isPlayable={this.state.isPlayable}
                    isPlaying={this.state.isPlaying}
                    showPrevious={this.state.showPrevious}
                    hasPrevious={this.state.hasPrevious}
                    showNext={this.state.showNext}
                    hasNext={this.state.hasNext}
                    onPlaybackChange={isPlaying => this.setState({ ...this.state, isPlaying })}
                    onPrevious={() => alert('Go to previous')}
                    onNext={() => alert('Go to next')}
                />

                <ProgressBar
                    totalTime={this.state.totalTime}
                    currentTime={this.state.currentTime}
                    isSeekable={this.state.isSeekable}
                    onSeek={time => this.setState(() => ({ currentTime: time }))}
                    onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
                    onSeekEnd={time => this.setState(() => ({ lastSeekEnd: time }))}
                    onIntent={time => this.setState(() => ({ lastIntent: time }))}
                />
            </div>
        );
    }
}

export default PlayerControls;