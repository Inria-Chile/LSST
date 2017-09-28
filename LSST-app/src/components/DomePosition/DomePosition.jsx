import React, { Component } from 'react'
import './DomePosition.css';
import * as d3 from 'd3';

class DomePosition extends Component {

    constructor(props){
        super(props);
        this.data = [];
        this.distanceToCamera = 12;
        this.cameraFOV = 20;
        this.state = {
            data: [],
            cameraAngle: 0,
            domeAngle: 0
        }

    }

    setDomeAngle = (angle) => {
        let domeApertureAngle = 2*Math.atanh(this.props.aperture/(2*this.distanceToCamera));
        d3.select("#dome-angle").transition().duration(1000).attr("transform", "translate("+this.props.width/2+","+this.props.height/2+")rotate("+angle+")");
        d3.select("#dome-angle-top").transition().attr("y2", -this.props.height/2+this.props.height/2+this.props.width/2*Math.tan(domeApertureAngle/2));
        d3.select("#dome-angle-bot").transition().attr("y2", -this.props.height/2+this.props.height/2-this.props.width/2*Math.tan(domeApertureAngle/2));
    }

    setCameraAngle = (angle) => {
        
        d3.select("#camera-angle").transition().duration(1000).attr("transform", "translate("+this.props.width/2+","+this.props.height/2+")rotate("+angle+")");
        d3.select("#camera-angle-top").transition().attr("y2", -this.props.height/2+this.props.height/2+this.props.width/2*Math.tan(Math.PI/180*this.cameraFOV/2));
        d3.select("#camera-angle-bot").transition().attr("y2", -this.props.height/2+this.props.height/2-this.props.width/2*Math.tan(Math.PI/180*this.cameraFOV/2));

        
    }

    componentDidUpdate(prevProps, prevState){
        this.setDomeAngle(this.state.domeAngle);
            this.setCameraAngle(this.state.cameraAngle);
    }

    componentDidMount() {
        setInterval( () => {
            // let newAngle = Math.max(0, Math.ceil(Math.random()*360));
            let newAngle = this.state.domeAngle + ((Math.random()-0.5)*90);
            let newCameraAngle = newAngle + ((Math.random()-0.5)*30);
            this.setState({
                domeAngle: newAngle,
                cameraAngle: newCameraAngle
                // aperture: 11
            })
        }, 2000)
    }

    
    render() {
        return (
            <div className="dome-position-container" ref="container">
                <h4>Dome Position</h4>
                <svg 
                    className="svg-container"
                    height={this.props.height}
                    width={this.props.width}>
                    <g id="dome-angle"
                        transform={"translate("+this.props.width/2+","+this.props.height/2+")"}
                        height={this.props.height}
                        width={this.props.width}>
                        <image id="dome-background" x={-this.props.width/2} y={-this.props.height/2} width={this.props.width} height={this.props.height} xlinkHref="/img/dome_top.png"/>
                        <line id="dome-angle-top"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} 
                            strokeWidth={4} stroke={'#00aa00'} />
                        <line id="dome-angle-bot"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} 
                            strokeWidth={4} stroke={'#00aa00'} />

                        <circle id={"test-circle"}
                            cx={0}
                            cy={0}
                            key={'overlay'}
                            fill={'#00aa00'}
                            r={5}
                            pointerEvents="all"
                        />
                    </g>
                    <g id="camera-angle"
                        transform={"translate("+this.props.width/2+","+this.props.height/2+")"}
                        height={this.props.height}
                        width={this.props.width}>
                        <line id="camera-angle-top"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} 
                            strokeWidth={4} stroke={'#ee0000'} />
                        <line id="camera-angle-bot"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} 
                            strokeWidth={4} stroke={'#ee0000'} />
                    </g>
                </svg>
                <div className="dome-position-info">
                    Dome azimuth angle: {this.state.domeAngle.toFixed(1)}º <br/>
                    Camera azimuth angle: {this.state.cameraAngle.toFixed(1)}º <br/>
                    Camera FOV: {this.props.aperture}º <br/>
                </div>
            </div>
        );
    }
}


export default DomePosition;