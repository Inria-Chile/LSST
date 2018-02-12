import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './SelectedFloor.css';
import Alarm from './Alarm.jsx';

class SelectedFloor extends Component {
    constructor(props){
        super(props);
        const offsetX = 433+7;
        const offsetY = 52+4;
        this.alarmsCoordinates = [[2954-offsetX, 520-offsetY],
        [2952-offsetX, 761-offsetY],
        [3154-offsetX, 207-offsetY],
        [3216-offsetX, 206-offsetY],
        [3193-offsetX, 274-offsetY],
        [3193-offsetX, 368-offsetY],
        [3192-offsetX, 525-offsetY],
        [3193-offsetX, 690-offsetY],
        [3193-offsetX, 782-offsetY],
        [3315-offsetX, 196-offsetY],
        [3380-offsetX, 151-offsetY],
        [3443-offsetX, 368-offsetY],
        [3444-offsetX, 527-offsetY],
        [3443-offsetX, 691-offsetY],
        [3444-offsetX, 781-offsetY],
        [3637-offsetX, 198-offsetY],
        [3636-offsetX, 432-offsetY],
        [3634-offsetX, 546-offsetY],
        [3635-offsetX, 645-offsetY],
        [3635-offsetX, 833-offsetY]];
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


        const w = 25;
        const h = 25;
        return (

            <div className={["selected-floor-container", this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm' : ''].join(' ')}>
                <div height="100%" width="100%" style={{ position: "relative", opacity: "70%" }}>

                    {this.alarmsCoordinates.map( (alarmCoordinate, index) => {
                        return(                    
                            <Alarm
                            key = {index.toString()}
                            position={[(alarmCoordinate[0]  - 0.5*w)/ 3333 * 100, (alarmCoordinate[1]-0.5*h)/ 1530  * 100]}
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
