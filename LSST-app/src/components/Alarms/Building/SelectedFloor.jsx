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
            url: '/img/floor_plans/floor_01/1-fire.svg', 
            alarmsCoordinates: []
        },
        floor2: {
            url:'/img/floor_plans/floor_02/2-fire.svg' ,
            alarmsCoordinates: []   
        },
        floor3:{ url: '/img/floor_plans/floor_03/3-fire.svg', alarmsCoordinates: []},
        floor4:{ url: '/img/floor_plans/floor_04/4-fire.svg', alarmsCoordinates: []},
        floor5:{ url: '/img/floor_plans/floor_01/1-fire.svg', alarmsCoordinates: []},
        floor6:{ url: '/img/floor_plans/floor_01/1-fire.svg', alarmsCoordinates: []},
        floor7:{ url: '/img/floor_plans/floor_01/1-fire.svg', alarmsCoordinates: []},
        floor8:{ url: '/img/floor_plans/floor_01/1-fire.svg', alarmsCoordinates: []},
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
