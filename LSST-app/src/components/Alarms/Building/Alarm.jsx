import React, { Component } from 'react';

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

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                isOn: !this.state.isOn
            });       
        }, 4000*(Math.random()+0.2));
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

export default Alarm;