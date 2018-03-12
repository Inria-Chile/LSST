import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Building.css';
import SelectedFloor from './SelectedFloor/SelectedFloor';
import FloorThumbnails from './FloorThumbnails/FloorThumbnails';
import DraggableTitle from '../../Utils/DraggableTitle';
// import openSocket from 'socket.io-client';
// import update from 'react-addons-update';

class Building extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFloor: 'floor1',
            floorAlarms: ['floor1'],
        }

        this.intervals = 0;
        setInterval((time) => {
            if(this.intervals++ % 3 === 0)
                this.setFloorAlarms(['floor1']);            
            else
                this.setFloorAlarms(['floor1', 'floor'+Math.ceil(Math.random() * Math.ceil(8))]);
        }, 10000);
    }

    setSelectedFloor = (floor) => {
        this.setState({
            selectedFloor: floor
        });
    }

    setFloorAlarms = (floors) => {
        this.setState({
            floorAlarms: floors
        });
    }

    // TO DO
    // setFloorAlarm = (floor, state) => {
    //     let newAlarms = this.state.floorAlarms;
    //     newAlarms[floor] = state;
    //     this.setState({
    //         floorAlarms: update(this.state.floorAlarms, )
    //     });
    // }

    render() {
        let setters = {
            setSelectedFloor: this.setSelectedFloor,
            setFloorAlarms: this.setFloorAlarms
        }
        return (
            <div className="building-container">
                <DraggableTitle title='Alarms'/>
                <div className="building-container-main">
                    <FloorThumbnails {...this.state} {...setters}/>
                    <SelectedFloor {...this.state}/>
                </div>
            </div>
        );
    }
}

export default Building;
