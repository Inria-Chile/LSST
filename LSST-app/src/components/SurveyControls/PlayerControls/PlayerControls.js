import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './SurveyControls.css';
import './PlayerControls.css';
import './PlayerControlsLib.css';
import { PlaybackControls, ProgressBar } from 'react-player-controls'

class PlayerControls extends Component {


    constructor() {
        super();
        this.playbackTimerId = null;
        this.timeInterval = 10000;
        this.state = {
            totalTime: 190,
            currentTime: Infinity,
            isSeekable: true,
            isPlayable: true,
            hasPrevious: true,
            hasNext: true,
        };
    }

    playbackChange = (isPlaying) => {
        console.log(this.state.currentTime, "playing", isPlaying);
        if(isPlaying)
            this.playbackTimerId = setInterval(this.animate, 300);
        else
            this.stopAnimating();
        this.setState({ ...this.state, isPlaying })
    }

    showPrevious = () => {
        console.log('showPrevious', this.props.startDate, this.props.endDate, Math.min(this.props.endDate, this.state.currentTime));
        this.setState({currentTime: this.props.startDate});
        this.props.setDisplayedDateLimits(new Date(this.props.startDate), new Date(this.props.startDate));
    }

    showNext = () => {
        console.log('showPrevious', this.props.startDate, this.props.endDate, Math.min(this.props.endDate, this.state.currentTime));
        this.setState({currentTime: this.props.endDate});
        this.props.setDisplayedDateLimits(new Date(this.props.startDate), new Date(this.props.endDate));
    }

    animate = () => {
        if(this.state.currentTime > this.props.endDate){
            this.stopAnimating();
            return;            
        }
        console.log('animating', this.props.startDate, this.props.endDate, Math.min(this.props.endDate, this.state.currentTime + this.timeInterval));
        this.setState({currentTime: this.state.currentTime + this.timeInterval});
        this.props.setDisplayedDateLimits(new Date(this.props.startDate), new Date(Math.min(this.props.endDate, this.state.currentTime + this.timeInterval)));
    }

    stopAnimating = () => {
        clearInterval(this.playbackTimerId);
        this.playbackTimerId = null;
        this.setState({isPlaying: false});
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
                    onPlaybackChange={isPlaying => this.playbackChange(isPlaying)}
                    onPrevious={this.showPrevious}
                    onNext={this.showNext}
                />

                <ProgressBar
                    totalTime={this.props.endDate}
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