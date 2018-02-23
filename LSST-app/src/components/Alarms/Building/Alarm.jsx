import React, { Component } from 'react';

class Alarm extends Component {
    constructor(props){
        super(props);
        this.images =[
            "/img/floor_plans/fire_alarm-on.svg",
            "/img/floor_plans/fire_alarm-off.svg"
        ];

        this.state = {
            isOn: false
        };
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                isOn: !this.state.isOn
            });       
        }, 8000*(Math.random()+0.1));
    }

    render() {
        return (
            <img alt="alarm icon"
                src= {this.state.isOn? this.images[0]: this.images[1]}
                style={{
                    left: this.props.position[0] + "%",
                    top: this.props.position[1] + "%",
                    position: 'absolute',
                    width: this.props.width + "%",
                    height: this.props.height + "%"
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