import React, { PureComponent } from 'react'
import './FrontView.css';
import * as d3 from 'd3';

class FrontView extends PureComponent {
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
        if(!prevProps || prevProps.aperture !== this.props.shuttersAperture){
            this.setShuttersAperture(this.props.shuttersAperture);
        }
        this.setWindScreensPositions(this.props.topWindScreenPos, this.props.bottomWindScreenPos);
    }

    componentDidMount() {
        
    }

    
    render() {
        return (
            <div className="shutters-container" ref="container">
                <svg
                    className="svg-container"
                    height={this.props.height}
                    width={this.props.width}>
                    <rect id={"top-screen"}
                        className={"windscreen"}
                        x={this.props.width/2-this.screenWidth/2}
                        y={this.props.yOffset*this.shutterHeight}
                        width={this.screenWidth}
                        height={0}
                        opacity={0.99}
                        strokeWidth={2}
                        stroke={"rgb(0,0,0)"}
                    />
                    <rect id={"bottom-screen"}
                        className={"windscreen"}
                        x={this.props.width/2-this.screenWidth/2}
                        y={this.screenHeight*(Math.sin(Math.PI/180*(90-90)))+this.props.yOffset*this.shutterHeight}
                        width={this.screenWidth}
                        height={this.screenHeight*Math.sin(Math.PI/180*(90))}
                        opacity={0.99}
                        strokeWidth={2}
                        stroke={"rgb(0,0,0)"}
                    />
                    <rect id={"left-shutter"}
                        className={"shutter"}
                        x={this.props.width/2-this.shutterWidth}
                        y={0+this.props.yOffset*this.shutterHeight}
                        width={this.shutterWidth}
                        height={this.shutterHeight}
                        opacity={0.99}
                        strokeWidth={2}
                        stroke={"rgb(0,0,0)"}
                    />
                    <rect id={"right-shutter"}
                            className={"shutter"}
                            x={this.props.width/2}
                            y={0+this.props.yOffset*this.shutterHeight}
                            width={this.shutterWidth}
                            height={this.shutterHeight}
                            opacity={0.99}
                            strokeWidth={2}
                            stroke={"rgb(0,0,0)"}
                    />
                </svg>
            </div>
        );
    }
}


export default FrontView;