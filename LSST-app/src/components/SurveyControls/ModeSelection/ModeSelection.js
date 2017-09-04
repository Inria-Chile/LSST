import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './ModeSelection.css';

class ModeSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playbackModeActive: false,
        }
    }

    handleChangeChk = () => {
        if(this.state.playbackModeActive)
            this.props.setPlaybackMode();
        else
            this.props.setLiveMode();        
        this.setState({
            playbackModeActive: !this.state.playbackModeActive,
        })
    }

    render() {
        return (
            <div className="mode-selection">
                <div>
                    <h6>MODE SELECTION</h6>
                </div>
                <span>Playback</span>
                <label className="switch">
                    <input type="checkbox" checked={this.state.playbackModeActive} onChange={this.handleChangeChk}/>
                    <span className="slider round"></span>
                </label>
                <span>Live</span>
            </div>
        );
    }
}

export default ModeSelection;
