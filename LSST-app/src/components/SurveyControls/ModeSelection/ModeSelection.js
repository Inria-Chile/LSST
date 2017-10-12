import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './ModeSelection.css';

class ModeSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playbackModeActive: this.props.selectedMode === 'playback',
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

    setPlaybackMode = () => {
        this.props.setPlaybackMode();
        this.setState({
            playbackModeActive: true,
        })
    }

    setLiveMode = () => {
        this.props.setLiveMode();
        this.setState({
            playbackModeActive: false,
        })
    }

    render() {
        return (
            <div className="mode-selection">
                <div>
                    <h6>Mode selection</h6>
                </div>
                <span className={this.state.playbackModeActive ? 'highlight-text' : ''} onClick={this.setPlaybackMode} >Playback</span>
                <label className="switch">
                    <input type="checkbox" checked={!this.state.playbackModeActive} onChange={this.handleChangeChk}/>
                    <span className="slider round"></span>
                </label>
                <span className={!this.state.playbackModeActive ? 'highlight-text' : ''} onClick={this.setLiveMode} >Live</span>
            </div>
        );
    }
}

export default ModeSelection;
