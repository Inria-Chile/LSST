import React, { Component } from 'react'
import './Shutters.css';
import * as d3 from 'd3';

class Shutters extends Component {
    static windScreenColor = '#888';
    static shutterColor = '#55f'

    constructor(props){
        super(props);
        this.data = [];
        this.screenHeight = this.props.height/1.5;
        this.shutterWidth = this.props.width/7;
        this.shutterHeight = this.props.height/1.49;
        this.screenWidth = this.props.width/4.0;
        this.screenHeight = this.props.height/1.5;
        this.state = {
            data: [],
            topWindScreenPos: 3.5,//min
            bottomWindScreenPos: 20,//min
        }
    }
  
    setShuttersAperture = (aperture) => {
        let aperturePixels = (this.props.width*0.12)*(aperture/11);
        d3.select("#left-shutter").transition().attr("x", this.props.width/2-this.shutterWidth-aperturePixels+aperturePixels*this.props.xOffset);
        d3.select("#right-shutter").transition().attr("x", this.props.width/2+aperturePixels+aperturePixels*this.props.xOffset);
    }

    setWindScreensPositions = (topScreen, bottomScreen) => {
        let hTop = this.screenHeight*(1-Math.sin(Math.PI/180*(90-topScreen)));
        let hBot = this.screenHeight*(Math.sin(Math.PI/180*(bottomScreen)));
        
        d3.select("#top-screen").transition().attr("height", hTop);
        d3.select("#bottom-screen").transition().attr("height", hBot).attr("y", this.screenHeight-hBot+this.props.yOffset*this.shutterHeight);;
    }
    
    componentDidUpdate(prevProps, prevState){
        if(!prevProps || prevProps.aperture !== this.props.aperture){
            this.setShuttersAperture(this.props.aperture);
        }
        this.setWindScreensPositions(this.state.topWindScreenPos, this.state.bottomWindScreenPos)
    }

    componentDidMount() {
        setInterval( () => {
            // this.props.updateShuttersAperture(Math.max(0, Math.ceil(Math.random()*15)-4));
            this.props.updateShuttersAperture(11);
            let angle_0 = 25;
            let angle = Math.max(3.5, Math.ceil(Math.random()*(90-angle_0-10)));
            this.setState({
                topWindScreenPos: angle,
                bottomWindScreenPos: 90-(angle+angle_0),
            })
        }, 1000)
    }

    
    render() {
        let statusOpen = this.props.aperture > 0;
        return (
            <div className="shutters-container" ref="container">
                <h4>Shutters status</h4>
                {/* <div>
                    Status: <span className={"status-circle-"+(statusOpen ?'open':'closed')}></span> {this.props.aperture > 0 ? 'Open' : 'Closed'}
                </div> */}
                <svg
                    className="svg-container"
                    height={this.props.height}
                    width={this.props.width}>
                    <rect id={"top-screen"}
                        x={this.props.width/2-this.screenWidth/2}
                        y={this.props.yOffset*this.shutterHeight}
                        width={this.screenWidth}
                        height={0}
                        fill={Shutters.windScreenColor}
                        opacity={0.9}
                        strokeWidth={2}
                        stroke={"rgb(0,0,0)"}
                    />
                    <rect id={"bottom-screen"}
                        x={this.props.width/2-this.screenWidth/2}
                        y={this.screenHeight*(Math.sin(Math.PI/180*(90-90)))+this.props.yOffset*this.shutterHeight}
                        width={this.screenWidth}
                        height={this.screenHeight*Math.sin(Math.PI/180*(90))}
                        fill={Shutters.windScreenColor}
                        opacity={0.9}
                        strokeWidth={2}
                        stroke={"rgb(0,0,0)"}
                    />
                    <rect id={"left-shutter"}
                        x={this.props.width/2-this.shutterWidth}
                        y={0+this.props.yOffset*this.shutterHeight}
                        width={this.shutterWidth}
                        height={this.shutterHeight}
                        fill={Shutters.shutterColor}
                        opacity={0.9}
                        strokeWidth={2}
                        stroke={"rgb(0,0,0)"}
                    />
                    <rect id={"right-shutter"}
                            x={this.props.width/2}
                            y={0+this.props.yOffset*this.shutterHeight}
                            width={this.shutterWidth}
                            height={this.shutterHeight}
                            fill={Shutters.shutterColor}
                            opacity={0.9}
                            strokeWidth={2}
                            stroke={"rgb(0,0,0)"}
                    />
                </svg>
                <div>
                    Status: <span className={"status-circle-"+(statusOpen ?'open':'closed')}></span> {this.props.aperture > 0 ? 'Open' : 'Closed'} <br/>
                    Aperture: {this.props.aperture} m <br/>
                    topWindScreenPos: {this.state.topWindScreenPos} <br/>
                    bottomWindScreenPos: {this.state.bottomWindScreenPos} <br/>
                </div>
            </div>
        );
    }
}


export default Shutters;