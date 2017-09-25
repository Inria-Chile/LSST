import React, { Component } from 'react'
import './Shutters.css';
import * as d3 from 'd3';

class Shutters extends Component {

    constructor(props){
        super(props);
        this.data = [];
        this.state = {
            data: [],
            aperture: 0
        }

    }
  
    setShuttersAperture = (aperture) => {
        let shutterWidth = this.props.width/7;
        let aperturePixels = (this.props.width*0.12)*(aperture/11)
        d3.select("#left-shutter").transition().attr("x", this.props.width/2-shutterWidth-aperturePixels+aperturePixels*this.props.xOffset)
        d3.select("#right-shutter").transition().attr("x", this.props.width/2+aperturePixels+aperturePixels*this.props.xOffset)
    }

    componentDidUpdate(prevProps, prevState){
        this.setShuttersAperture(this.state.aperture);
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                aperture: Math.max(0, Math.ceil(Math.random()*15)-4)
                // aperture: 11
            })
        }, 1000)
    }

    
    render() {
        let shutterWidth = this.props.width/7;
        let shutterHeight = this.props.height/1.49;
        let statusOpen = this.state.aperture > 0;
        return (
            <div className="shutters-container" ref="container">
                <div>
                    Status: <span className={"status-circle-"+(statusOpen ?'open':'closed')}></span> {this.state.aperture > 0 ? 'Open' : 'Closed'}
                </div>
                <svg
                    className="svg-container"
                    height={this.props.height}
                    width={this.props.width}>
                    <rect id={"left-shutter"}
                        x={this.props.width/2-shutterWidth}
                        y={0+this.props.yOffset*shutterHeight}
                        width={shutterWidth}
                        height={shutterHeight}
                        fill={'#00aa00'}
                        opacity={0.8}
                        strokeWidth={2}
                        stroke={"rgb(0,0,0)"}
                    />
                    <rect id={"right-shutter"}
                            x={this.props.width/2}
                            y={0+this.props.yOffset*shutterHeight}
                            width={shutterWidth}
                            height={shutterHeight}
                            fill={'#00aa00'}
                            opacity={0.8}
                            strokeWidth={2}
                            stroke={"rgb(0,0,0)"}
                    />
                </svg>
                <div>
                    Aperture: {this.state.aperture} m
                </div>
            </div>
        );
    }
}


export default Shutters;