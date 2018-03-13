import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './SelectedFloor.css';
import Alarm from './Alarm.jsx';

class SelectedFloor extends Component {
    constructor(props){
        super(props);
        this.offsetX = 665;
        this.offsetY = 87;
        this.floorPlanImgWidth = 3137;
        this.floorPlanImgHeight = 1500;
        this.iconWidth = 25/this.floorPlanImgWidth*100;
        this.iconHeight = 25/this.floorPlanImgHeight*100;
    }

    static floorPlans = {
        floor1: { 
            url: '/img/floor_plans/floor_01/1-blueprint.svg', 
            alarmsCoordinates: [[3188,219],[2962,333],[3143,332],[3328,334],[3376,292],[3590,378],[3150,582],[3365,625],[3593,621],[2974,903],[3150,904],[3347,905],[3590,887]]
        },
        floor2: {
            url:'/img/floor_plans/floor_02/2-blueprint.svg' ,
            alarmsCoordinates: [[3124,389],[3181,390],[3267,377],[3322,338],[3552,380],[3160,443],[3161,529],[3378,528],[3545,579],[2952,662],[3160,667],[3379,668],[3547,687],[3157,811],[3378,812],[3548,772],[2948,874],[3160,893],[3380,894],[3549,935]]  
        },
        floor3:{ 
            url: '/img/floor_plans/floor_03/3-blueprint.svg',
            alarmsCoordinates: [[1595,338],[1813,354],[2056,352],[2214,392],[2400,389],[3318,379],[3364,318],[3606,333],[1808,486],[2067,486],[1809,545],[2068,545],[3663,520]]
        },
        floor4:{ 
            url: '/img/floor_plans/floor_04/4-blueprint.svg', 
            alarmsCoordinates: [[1573,355],[1778,321],[2040,321],[2320,319],[2558,322],[2850,320],[3132,319],[3401,341],[3344,411],[3597,410],[3470,526],[1779,457],[2007,459]]
        },
        floor5:{ 
            url: '/img/floor_plans/floor_05/5-blueprint.svg', 
            alarmsCoordinates: []
        },
        floor6:{ url: '/img/floor_plans/floor_01/1-fire.svg', alarmsCoordinates: []},
        floor7:{ url: '/img/floor_plans/floor_01/1-fire.svg', alarmsCoordinates: []},
        floor8:{ url: '/img/floor_plans/floor_01/1-fire.svg', alarmsCoordinates: []},
    }


    static sideThumbnails =  {
        floor1: '/img/floor_plans/floor_01/1-side_thumbnail-alert.svg',
        floor2: '/img/floor_plans/floor_02/2-side_thumbnail-alert.svg',
        floor3: '/img/floor_plans/floor_03/3-side_thumbnail-alert.svg',
        floor4: '/img/floor_plans/floor_04/4-side_thumbnail-alert.svg',
        floor5: '/img/floor_plans/floor_01/5-side_thumbnail-alert.svg',
        floor6: '/img/floor_plans/floor_01/1-side_thumbnail-alert.svg',
        floor7: '/img/floor_plans/floor_01/1-side_thumbnail-alert.svg',
        floor8: '/img/floor_plans/floor_01/1-side_thumbnail-alert.svg',
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
            return [(coord[0]-this.offsetX)/this.floorPlanImgWidth*100, (coord[1]-this.offsetY)/this.floorPlanImgHeight*100];
        });
        

        return (

            <div className={["selected-floor-container",  
                            this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm' : ''].join(' ')}>
                <div style={{ position: "relative", opacity: "70%" }}>

                    {alarmsCoordinates.map( (alarmCoordinate, index) => {
                        return(                    
                            <Alarm
                            key = {index.toString()}
                            position={[(alarmCoordinate[0]  - 0.5*this.iconWidth), (alarmCoordinate[1]-0.5*this.iconHeight) ]}
                            width={this.iconWidth}
                            height={this.iconHeight} 
                            floorHasAlarmsOn={this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1}/>
                        );
                    })}

                    <img src={"/img/floor_plans/floor_01/1-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('1-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
                    }}/>
                    <img src={"/img/floor_plans/floor_02/2-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('2-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
                    }}/>
                    <img src={"/img/floor_plans/floor_03/3-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('3-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
                    }}/>
                    <img src={"/img/floor_plans/floor_04/4-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('4-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
                    }}/>
                    <img src={"/img/floor_plans/floor_05/5-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('5-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
                    }}/>
                    <img src={"/img/floor_plans/floor_06/6-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('6-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
                    }}/>
                    <img src={"/img/floor_plans/floor_07/7-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('7-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
                    }}/>
                    <img src={"/img/floor_plans/floor_08/8-blueprint.svg"} 
                        className={["selected-floor-plan", floorPlanImage.indexOf('8-') < 1?"hidden":""].join(' ')} 
                        alt="selected floor" onClick={(e) => {
                        console.log('['+e.clientX+','+e.clientY+']');
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
