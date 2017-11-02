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
        }

    }

    setDomeAzimuth = (angle) => {
        let domeApertureAngle = 2*Math.atanh(this.props.shuttersAperture/(2*this.distanceToCamera));
        d3.select("#dome-angle").transition().duration(1000).attr("transform", "translate("+this.props.width/2+","+this.props.height/2+")rotate("+angle+")");
        d3.select("#dome-angle-top").transition().attr("y2", -this.props.height/2+this.props.height/2+this.props.width/2*Math.tan(domeApertureAngle/2));
        d3.select("#dome-angle-bot").transition().attr("y2", -this.props.height/2+this.props.height/2-this.props.width/2*Math.tan(domeApertureAngle/2));
    }

    setMountAzimuth = (angle) => {
        
        d3.select("#mount-angle").transition().duration(1000).attr("transform", "translate("+this.props.width/2+","+this.props.height/2+")rotate("+angle+")");
        d3.select("#mount-angle-top").transition().attr("y2", -this.props.height/2+this.props.height/2+this.props.width/2*Math.tan(Math.PI/180*this.cameraFOV/2));
        d3.select("#mount-angle-bot").transition().attr("y2", -this.props.height/2+this.props.height/2-this.props.width/2*Math.tan(Math.PI/180*this.cameraFOV/2));

        
    }

    componentDidUpdate(prevProps, prevState){
        this.setDomeAzimuth(this.props.domeAzimuth);
        this.setMountAzimuth(this.props.mountAzimuth);
    }

    componentDidMount() {
    }

    
    render() {
        return (
            <div className="dome-position-container" ref="container">
                {/* <h4>Dome Position</h4> */}
                <svg 
                    className="svg-container"
                    height={this.props.height}
                    width={this.props.width}>
                    <g id="dome-angle"
                        transform={"translate("+this.props.width/2+","+this.props.height/2+")"}
                        height={this.props.height}
                        width={this.props.width}>
                        <image id="dome-background" x={-this.props.width/2} y={-this.props.height/2} width={this.props.width} height={this.props.height} opacity={1.0} xlinkHref="/img/dome_top.png"/>
                        <line id="dome-angle-top"
                            className="dome-angle"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} />
                        <line id="dome-angle-bot"
                            className="dome-angle"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} />

                        <circle id={"test-circle"}
                            className="dome-angle"
                            cx={0} cy={0} r={5}
                            key={'overlay'}
                            pointerEvents="all"
                        />
                    </g>
                    <g id="mount-angle"
                        transform={"translate("+this.props.width/2+","+this.props.height/2+")"}
                        height={this.props.height}
                        width={this.props.width}>
                        <line id="mount-angle-top"
                            className="mount-angle"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} 
                            strokeWidth={4} />
                        <line id="mount-angle-bot"
                            className="mount-angle"
                            x1={0} y1={0} 
                            x2={-this.props.width/2} y2={0} 
                            strokeWidth={4} />
                    </g>
                </svg>
                <div className="dome-position-info">
                    <div className="dome-azimuth-text">
                        <span>Dome azimuth: </span> 
                        <span>{this.props.domeAzimuth.toFixed(1)}º</span>
                    </div>
                    <div>
                        <span className="dome-data-label">Mount azimuth: </span> 
                        <span className="dome-data">{this.props.mountAzimuth.toFixed(1)}º</span>
                    </div>
                    <div>
                        <span className="dome-data-label">Camera FOV: </span> 
                        <span className="dome-data">{this.props.shuttersAperture}º</span>
                    </div>
                </div>
            </div>
        );
    }
}


export default DomePosition;