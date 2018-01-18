import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Building.css';
import SelectedFloor from './SelectedFloor';
import FloorThumbnails from './FloorThumbnails';
import DraggableTitle from '../../Utils/DraggableTitle';
// import openSocket from 'socket.io-client';

class Building extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFloor: 'floor1',
            floorAlarms: ['floor2']
        }

        this.intervals = 0;
        setInterval((time) => {
            if(this.intervals++ % 3 === 0)
                this.setFloorAlarms([]);            
            else
                this.setFloorAlarms(['floor'+Math.ceil(Math.random() * Math.ceil(8))]);
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
        })
    }

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
