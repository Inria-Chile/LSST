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
        if (!imgSrc)
            imgSrc = "";



        return (

            <div className={["selected-floor-container", this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm' : ''].join(' ')}
                style={{position:'relative'}}>
                <svg  height="100%" width="100%" style={{position:"absolute",opacity:"70%"}}>
                    <Alarm position= {[(2251.5+10)/2989*100, (403+20)/1369*100]}/>
                </svg>
                <img src={imgSrc} className="selected-floor-plan" alt="selected floor" />
            </div>
        );
    }
}                
class Alarm extends Component{
    render(){
        const r = 20;
            
        return(
            <circle cx={this.props.position[0]+"%"} cy={this.props.position[1]+"%"} r={20/2989*100+"%"} stroke="black" strokeWidth="3" fill="red"  />
        );
    }
}

export default SelectedFloor;
