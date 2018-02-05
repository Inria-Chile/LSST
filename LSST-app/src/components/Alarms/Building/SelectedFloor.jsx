import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './SelectedFloor.css';

class SelectedFloor extends Component {
    constructor(props){
        super(props);
        this.alarmsCoordinates = [[3003-441,524-55],
        [3002-441,770-55],
        [3206-441,209-55],
        [3270-441,208-55],
        [3248-441,276-55],
        [3248-441,373-55],
        [3248-441,534-55],
        [3245-441,700-55],
        [3248-441,796-55],
        [3372-441,198-55],
        [3439-441,154-55],
        [3502-441,373-55],
        [3502-441,532-55],
        [3506-441,702-55],
        [3502-441,795-55],
        [3697-441,200-55],
        [3699-441,436-55],
        [3697-441,557-55],
        [3698-441,655-55],
        [3697-441,845-55]];
    }

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


        const h = 16 ;
        const w = 16 ;
        return (

            <div className={["selected-floor-container", this.props.floorAlarms.indexOf(this.props.selectedFloor) > -1 ? 'alarm' : ''].join(' ')}>
                <div height="100%" width="100%" style={{ position: "relative", opacity: "70%" }}>

                    {this.alarmsCoordinates.map( (alarmCoordinate, index) => {
                        return(                    
                            <Alarm
                            key = {index.toString()}
                            position={[(alarmCoordinate[0]  -0.5*w) / 3391 * 100, (alarmCoordinate[1] -0.5*h) / 1555.86 * 100]}
                            width={w}
                            height={h} />
                        );
                    })}

                    <img src={imgSrc} className="selected-floor-plan" alt="selected floor" onClick={(e) => {
                        console.log(e.clientX,e.clientY);
                    }} />

                </div>
            </div>
        );
    }
}
class Alarm extends Component {
    constructor(props){
        super(props);
        this.images =[
            "/img/floor_plans/fire_alarm-on.svg",
            "/img/floor_plans/fire_alarm-off.svg"
        ];

        this.state = {
            isOn: true
        };
    }
    render() {
        return (
            <img alt="alarm icon"
                src= {this.state.isOn? this.images[0]: this.images[1]}
                style={{
                    left: this.props.position[0] + "%",
                    top: this.props.position[1] + "%",
                    position: 'absolute',
                    width: this.props.width + "px",
                    height: this.props.height + "px"
                }} 
                onClick = {(e) =>{
                    this.setState({
                        isOn: !this.state.isOn
                    });
                }}/>
        );
    }
}

export default SelectedFloor;
