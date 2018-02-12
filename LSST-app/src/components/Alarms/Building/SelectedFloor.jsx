import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './SelectedFloor.css';
import Alarm from './Alarm.jsx';

class SelectedFloor extends Component {
    constructor(props){
        super(props);
        const offsetX = 433+7;
        const offsetY = 52+4;
        this.alarmsCoordinates = [[2954, 520],
        [2952, 761],
        [3154, 207],
        [3216, 206],
        [3193, 274],
        [3193, 368],
        [3192, 525],
        [3193, 690],
        [3193, 782],
        [3315, 196],
        [3380, 151],
        [3443, 368],
        [3444, 527],
        [3443, 691],
        [3444, 781],
        [3637, 198],
        [3636, 432],
        [3634, 546],
        [3635, 645],
        [3635, 833]].map((coord) =>{
            return [(coord[0]-offsetX)/3333*100, (coord[1]-offsetY)/1530*100];
        });
    }

    static floorPlanImages = {
        floor1: '/img/floor_plans/n2-floor_plan.svg',
        floor2: '/img/floor_plans/n2-floor_plan-noalarms.svg',
        // floor2: '/img/floor_plans/floor2.png',
        floor3: '/img/floor_plans/floor1.png',
        floor4: '/img/floor_plans/floor1_noalarms.svg',
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
        if (!imgSrc)
            imgSrc = "";


        const w = 25/3333*100;
        const h = 25/1530*100;
        return (

            <div className={["selected-floor-container", this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm' : ''].join(' ')}>
                <div height="100%" width="100%" style={{ position: "relative", opacity: "70%" }}>

                    {this.alarmsCoordinates.map( (alarmCoordinate, index) => {
                        return(                    
                            <Alarm
                            key = {index.toString()}
                            position={[(alarmCoordinate[0]  - 0.5*w), (alarmCoordinate[1]-0.5*h) ]}
                            width={w}
                            height={h} />
                        );
                    })}

                    <img src={imgSrc} className="selected-floor-plan" alt="selected floor" onClick={(e) => {
                        console.log(e.clientX,e.clientY);
                    }}/>

                </div>
            </div>
        );
    }
}


export default SelectedFloor;
