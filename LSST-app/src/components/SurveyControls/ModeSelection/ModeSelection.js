import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './ModeSelection.css';

class ModeSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playbackModeActive: true,
        }
    }

    handleChangeChk = () => {
        if(this.state.playbackModeActive)
            this.props.setLiveMode();        
        else
            this.props.setPlaybackMode();
        this.setState({
            playbackModeActive: !this.state.playbackModeActive,
        })
    }

    render() {
        return (
            <div className="mode-selection">
                <div>
                    <h6>Mode selection</h6>
                </div>
                <span className={this.state.playbackModeActive ? 'highlight-text' : ''}>Playback</span>
                <label className="switch">
                    <input type="checkbox" checked={!this.state.playbackModeActive} onChange={this.handleChangeChk}/>
                    <span className="slider round"></span>
                </label>
                <span className={!this.state.playbackModeActive ? 'highlight-text' : ''}>Live</span>
            </div>
        );
    }
}

export default ModeSelection;
