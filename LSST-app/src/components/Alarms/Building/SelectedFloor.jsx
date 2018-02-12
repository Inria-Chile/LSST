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
        floor1: { url: '/img/floor_plans/n1-floor_plan-text.svg', alarmsCoordinates: []},
        floor2: {
            url:'/img/floor_plans/n2-floor_plan.svg' ,
            alarmsCoordinates: [[2947,598],[2943,841],[3143,288],[3208,288],[3183,353],[3184,447],[3182,605],[3180,769],[3182,862],[3306,278],[3370,232],[3433,448],[3433,605],[3435,770],[3433,862],[3624,281],[3621,507],[3624,627],[3624,724],[3624,912]]   
        },
        floor3:{ url: '/img/floor_plans/floor5.png', alarmsCoordinates: []},
        floor4:{ url: '/img/floor_plans/floor5.png', alarmsCoordinates: []},
        floor5:{ url: '/img/floor_plans/floor5.png', alarmsCoordinates: []},
        floor6:{ url: '/img/floor_plans/floor6.png', alarmsCoordinates: []},
        floor7:{ url: '/img/floor_plans/floor7.png', alarmsCoordinates: []},
        floor8:{ url: '/img/floor_plans/floor8.png', alarmsCoordinates: []},
    }



    // constructor(props) {
    //     super(props);
    // }

    render() {
        let imgSrc = SelectedFloor.floorPlans[this.props.selectedFloor].url;
        if (!imgSrc)
            imgSrc = "";
        console.log(SelectedFloor.floorPlans[this.props.selectedFloor]);
        let alarmsCoordinates = SelectedFloor.floorPlans[this.props.selectedFloor].alarmsCoordinates.map((coord) =>{
            return [(coord[0]-this.offsetX)/3333*100, (coord[1]-this.offsetY)/1611*100];
        });
        
;

        return (

            <div className={["selected-floor-container", this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm' : ''].join(' ')}>
                <div height="100%" width="100%" style={{ position: "relative", opacity: "70%" }}>

                    {alarmsCoordinates.map( (alarmCoordinate, index) => {
                        return(                    
                            <Alarm
                            key = {index.toString()}
                            position={[(alarmCoordinate[0]  - 0.5*this.iconWidth), (alarmCoordinate[1]-0.5*this.iconHeight) ]}
                            width={this.iconWidth}
                            height={this.iconHeight} />
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
