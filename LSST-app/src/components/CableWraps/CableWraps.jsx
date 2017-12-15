import React, { Component } from 'react'
import './CableWraps.css';
import DraggableTitle from '../Utils/DraggableTitle';
import AZCableWrap from './AZCableWrap/AZCableWrap'

class CableWraps extends Component {


    render() {
        return(
            <div className="cable-wraps-container">
            <DraggableTitle title='Cable Wraps'/>
            <div className="container pull-left">
            <div className="row">
                <div className="cam-cable col-md-4">
                <h3>Camera</h3>
                </div>
                <div className="az-cable col-md-4">
                <h3>Azimuth</h3>
                <AZCableWrap height={300} width={300}/>
                </div>
                <div className="el cable col-md-4">Elevation</div>
            
            </div></div></div>
        );
    }
}
export default CableWraps;
