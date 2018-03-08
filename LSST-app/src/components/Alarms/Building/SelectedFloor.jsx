import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './SelectedFloor.css';
import Alarm from './Alarm.jsx';

class SelectedFloor extends Component {
    constructor(props){
        super(props);
        this.offsetX = 431;
        this.offsetY = 56;
        this.iconWidth = 25/3333*100;
        this.iconHeight = 25/1611*100;
    }

    static floorPlans = {
        floor1: { 
            url: '/img/floor_plans/n1-floor_plan-text-noalarms.svg', 
            alarmsCoordinates: [[2955,247],[2973,863],[3169,245],[3169,526],[3170,863],[3215,114],[3367,242],[3422,194],[3407,564],[3388,863],[3663,295],[3663,567],[3659,863]]
        },
        floor2: {
            url:'/img/floor_plans/n2-floor_plan.svg' ,
            alarmsCoordinates: [[2947,598],[2943,841],[3143,288],[3208,288],[3183,353],[3184,447],[3182,605],[3180,769],[3182,862],[3306,278],[3370,232],[3433,448],[3433,605],[3435,770],[3433,862],[3624,281],[3621,507],[3624,627],[3624,724],[3624,912]]   
        },
        floor3:{ url: '/img/floor_plans/n1-floor_plan-text-noalarms.svg', alarmsCoordinates: []},
        floor4:{ url: '/img/floor_plans/n1-floor_plan-text-noalarms.svg', alarmsCoordinates: []},
        floor5:{ url: '/img/floor_plans/n1-floor_plan-text-noalarms.svg', alarmsCoordinates: []},
        floor6:{ url: '/img/floor_plans/n1-floor_plan-text-noalarms.svg', alarmsCoordinates: []},
        floor7:{ url: '/img/floor_plans/n1-floor_plan-text-noalarms.svg', alarmsCoordinates: []},
        floor8:{ url: '/img/floor_plans/n1-floor_plan-text-noalarms.svg', alarmsCoordinates: []},
    }


    static sideThumbnails =  {
        floor1: '/img/floor_plans/n1-side_thumbnail-danger.svg',
        floor2: '/img/floor_plans/n2-side_thumbnail-danger.svg',
        floor3: '/img/floor_plans/n2-side_thumbnail-danger.svg',
        floor4: '/img/floor_plans/n2-side_thumbnail-danger.svg',
        floor5: '/img/floor_plans/n2-side_thumbnail-danger.svg',
        floor6: '/img/floor_plans/n2-side_thumbnail-danger.svg',
        floor7: '/img/floor_plans/n2-side_thumbnail-danger.svg',
        floor8: '/img/floor_plans/n2-side_thumbnail-danger.svg',
    }

    // constructor(props) {
    //     super(props);
    // }

    render() {
        let floorPlanImage = SelectedFloor.floorPlans[this.props.selectedFloor].url;
        if (!floorPlanImage)
            floorPlanImage = "";

        let sideThumbnailImage = SelectedFloor.sideThumbnails[this.props.selectedFloor];

        let alarmsCoordinates = SelectedFloor.floorPlans[this.props.selectedFloor].alarmsCoordinates.map((coord) =>{
            return [(coord[0]-this.offsetX)/3333*100, (coord[1]-this.offsetY)/1611*100];
        });
        

        return (

            <div className={["selected-floor-container", this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm' : ''].join(' ')}>
                <div style={{ position: "relative", opacity: "70%" }}>

                    {alarmsCoordinates.map( (alarmCoordinate, index) => {
                        return(                    
                            <Alarm
                            key = {index.toString()}
                            position={[(alarmCoordinate[0]  - 0.5*this.iconWidth), (alarmCoordinate[1]-0.5*this.iconHeight) ]}
                            width={this.iconWidth}
                            height={this.iconHeight} />
                        );
                    })}

                    <img src={floorPlanImage} className="selected-floor-plan" alt="selected floor" onClick={(e) => {
                        console.log(e.clientX,e.clientY);
                    }}/>

                    <div className={'side-thumbnail-container'}>
                        <img src={sideThumbnailImage}
                        alt="side view thumbnail" />
                    </div>
                </div>

            </div>
        );
    }
}


export default SelectedFloor;
