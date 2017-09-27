import React, { Component } from 'react'
import './DomePosition.css';
import * as d3 from 'd3';

class DomePosition extends Component {

    constructor(props){
        super(props);
        this.data = [];
        this.distanceToCamera = 10;
        this.state = {
            data: [],
            cameraAngle: 0,
            domeAngle: 0
        }

    }

    setDomeAngle = (angle, prevAngle) => {
        d3.select("#dome-top").transition().duration(1000).attr("transform", "rotate("+angle+")");
    }

    componentDidUpdate(prevProps, prevState){
        let prevAngle = 0;
        if(prevState.state)
            prevAngle = prevState.state.domeAngle;
        this.setDomeAngle(this.state.domeAngle, prevAngle);
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                domeAngle: Math.max(0, Math.ceil(Math.random()*360))
                // aperture: 11
            })
        }, 2000)
    }

    
    render() {
        // style={{transform: `rotate(${this.state.domeAngle}deg)`}}
        let domeApertureAngle = 2*Math.atanh(this.props.aperture/(2*this.distanceToCamera));
        let cameraFOV = 20;
        return (
            <div className="dome-position-container" ref="container">
                <h4>Dome Position</h4>
                <svg id="dome-top"
                        className="svg-container"
                    height={this.props.height}
                    width={this.props.width}>
                    <g 
                        height={this.props.height}
                        width={this.props.width}>
                    <line x1={this.props.width/2} y1={this.props.height/2} 
                        x2={0} y2={ this.props.height/2+this.props.width/2*Math.tan(domeApertureAngle/2) } 
                        strokeWidth={2} stroke={"rgb(255,0,0)"} />
                    <line x1={this.props.width/2} y1={this.props.height/2} 
                        x2={0} y2={ this.props.height/2-this.props.width/2*Math.tan(domeApertureAngle/2) } 
                        strokeWidth={2} stroke={"rgb(255,0,0)"} />

                    <circle id={"test-circle"}
                        cx={this.props.width/2}
                        cy={this.props.height/2}
                        key={'overlay'}
                        fill={'red'}
                        r={5}
                        pointerEvents="all"
                    />
                    <line x1={this.props.width/2} y1={this.props.height/2} 
                        x2={0} y2={ this.props.height/2+this.props.width/2*Math.tan(Math.PI/180*cameraFOV/2) } 
                        strokeWidth={2} stroke={"rgb(0,0,255)"} />
                    <line x1={this.props.width/2} y1={this.props.height/2} 
                        x2={0} y2={ this.props.height/2-this.props.width/2*Math.tan(Math.PI/180*cameraFOV/2) } 
                        strokeWidth={2} stroke={"rgb(0,0,255)"} />
                    </g>
                </svg>
                {/* <svg>
                    <line x1={this.props.width/2} y1={this.props.height/2} 
                        x2={0} y2={ this.props.height/2+this.props.width/2*Math.tan(cameraFOV/2) } 
                        strokeWidth={2} stroke={"rgb(0,0,255)"} />
                    <line x1={this.props.width/2} y1={this.props.height/2} 
                        x2={0} y2={ this.props.height/2-this.props.width/2*Math.tan(cameraFOV/2) } 
                        strokeWidth={2} stroke={"rgb(0,0,255)"} />
                </svg> */}
            </div>
        );
    }
}


export default DomePosition;