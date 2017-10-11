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
        // console.log("playbackChange");
        let currentTime = this.state.currentTime;
        if(isPlaying){
            if(this.state.currentTime === this.props.endDate || this.state.currentTime === Infinity)
                currentTime = 0;
            // this.playbackTimerId = setInterval(this.animate, 300);
        }else
            this.stopAnimating();
        this.setState({ ...this.state, isPlaying, currentTime: currentTime })
    }

    showPrevious = () => {
        // console.log('showPrevious', this.props.startDate, this.props.endDate, Math.min(this.props.endDate, this.state.currentTime));
        this.setState({currentTime: 0});
        this.props.setDisplayedDateLimits(new Date(this.props.startDate), new Date(this.props.startDate));
    }

    showNext = () => {
        // console.log('showNext', this.props.startDate, this.props.endDate, Math.min(this.props.endDate, this.state.currentTime));
        this.setState({currentTime: this.props.endDate});
        this.props.setDisplayedDateLimits(new Date(this.props.startDate), new Date(this.props.endDate));
    }

    seekEnd = (time) => {
        this.animate();
    }

    getTimeInterval = () => {
        return this.props?(this.props.endDate - this.props.startDate)/100 : 1000;
    }

    animate = () => {
        if(this.props.startDate === null || this.props.endDate === null || this.state.currentTime > this.props.endDate){
            this.setState({currentTime: this.props.endDate});
            this.stopAnimating();
            return;            
        }
        // console.log('animating', this.props.startDate, this.props.endDate, Math.min(this.props.endDate, this.state.currentTime + this.getTimeInterval()));
        this.setState({currentTime: this.state.currentTime + this.getTimeInterval()});
        this.props.setDisplayedDateLimits(new Date(this.props.startDate), new Date(Math.min(this.props.endDate, this.props.startDate + this.state.currentTime + this.getTimeInterval())));
    }

    stopAnimating = () => {
        clearInterval(this.playbackTimerId);
        this.playbackTimerId = null;
        this.setState({isPlaying: false});
    }
    
    componentDidUpdate(prevProps, prevState){
        if((this.state.isPlaying && !prevState) || (this.state.isPlaying && !prevState.isPlaying))
            this.playbackTimerId = setInterval(this.animate, 300);
        if(prevProps.endDate !== this.props.endDate)
            this.setState({currentTime: this.props.endDate});
    }

    render() {
        return (
            <div className="player-controls">
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
                    totalTime={this.props.endDate - this.props.startDate}
                    currentTime={this.state.currentTime}
                    isSeekable={this.state.isSeekable}
                    onSeek={time => this.setState(() => ({ currentTime: time }))}
                    onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
                    onSeekEnd={this.seekEnd}
                    onIntent={time => this.setState(() => ({ lastIntent: time }))}
                />
            </div>
        );
    }
}

export default PlayerControls;