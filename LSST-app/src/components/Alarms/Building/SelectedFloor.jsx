import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './SelectedFloor.css';

class SelectedFloor extends Component {

    static floorPlanImages = {
        floor1: '/img/floor_plans/floor1.png',
        floor2: '/img/floor_plans/floor2.png',
        floor3: '/img/floor_plans/floor3.png',
        floor4: '/img/floor_plans/floor4.png',
        floor5: '/img/floor_plans/floor5.png',
        floor6: '/img/floor_plans/floor6.png',
        floor7: '/img/floor_plans/floor7.png',
        floor8: '/img/floor_plans/floor8.png',
    }

    // constructor(props) {
    //     super(props);
    // }

    render() {
        let imgSrc = SelectedFloor.floorPlanImages[this.props.selectedFloor];
        if(!imgSrc)
            imgSrc = "";
        return (
            <div className={["selected-floor-container", this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm':''].join(' ')}>
                <img src={imgSrc} className="selected-floor-plan" alt="selected floor"/>
            </div>
        );
    }
}

export default SelectedFloor;
