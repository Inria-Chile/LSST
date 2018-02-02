import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './PlatformLift.css';
import DraggableTitle from '../../Utils/DraggableTitle';
// import openSocket from 'socket.io-client';

class PlatformLift extends Component {
    static status = {
        'STOPPED': 'Stopped',
        'MOVING_UP': 'Moving up',
        'MOVING_DOWN': 'Moving down'
    }

    constructor(props) {
        super(props);
        this.state = {
            motionIndicator: false,
            status: 'STOPPED',
            height: 0,
        };
        this.interval = setInterval(() => {
            this.setHeight(Math.min(100, Math.random()*150));
            setTimeout(() => {
                this.stopMoving();
            }, 1500);
        }, 3000);
    }

    setHeight = (height) => {
        this.setState({
            status: height > this.state.height ? 'MOVING_UP':'MOVING_DOWN',
            height: height,
        });
    }

    stopMoving = () => {
        this.setState({
            status: 'STOPPED',
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let buildingHeight = 70;
        let minHeight = 60;
        let displayedHeight = (1-this.state.height/100)*(100-minHeight);
        
        return (
            <div className="platform-lift-container">
                <DraggableTitle title='Platform lift'/>
                <div id="platform-lift-content">
                    <img src="img/platform_lift/dome_side.png" alt="Platform background"/>
                    <div id="motion-indicator" className={'indicator ' + (this.state.status !== 'STOPPED' ? 'moving':'')}>
                        {PlatformLift.status[this.state.status]}
                    </div>
                    <div id="height-indicator" className={'indicator'}>
                        Target height: {this.state.height.toFixed(1)}
                    </div>
                    <div id="lift" className={this.state.height > buildingHeight ? 'above':'under'} style={{bottom:'-'+displayedHeight+'%'}}>
                        <img src="img/platform_lift/lift.png" alt="Lift"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlatformLift;
