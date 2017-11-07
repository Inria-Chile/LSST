import React, { PureComponent } from 'react'
import './SideView.css';
import * as d3 from 'd3';

class SideView extends PureComponent {
    static windScreenColor = '#888';
    static shutterColor = '#55f'

    constructor(props){
        super(props);
        let endOffset = -13;
        let startOffset = 15;
        this.bottomScreenAngle = 10;
        this.topScreenAngle = 70;
        this.radius = this.props.width/2.1;
        this.xCenter = this.props.width/2*1.24;
        this.yCenter = this.props.height*0.85;
        this.arcLength = ((90+endOffset) - (0 + startOffset*(1-0/90) + endOffset*(0/90)))*Math.PI/180*this.radius;
        this.startPos = this.polarToCartesian(this.xCenter, this.yCenter, this.radius, 0 + startOffset*(1-0/90) + endOffset*(0/90));
        this.endPos = this.polarToCartesian(this.xCenter, this.yCenter, this.radius, 90+endOffset);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        this.setWindScreensPositions(this.props.topWindScreenPos, this.props.bottomWindScreenPos);
    }

    polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        var angleInRadians = (angleInDegrees+180) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    setWindScreensPositions = (topScreenAngle, bottomScreenAngle) => {
        d3.select("#bottom-windscreen-sideview").transition().duration(3000).attr("stroke-dashoffset", this.arcLength*(90-bottomScreenAngle)/90);
        d3.select("#top-windscreen-sideview").transition().duration(3000).attr("stroke-dashoffset", (1-this.arcLength)*(90-topScreenAngle)/90);
    }

    render() {
        
        return (
            <div className="shutters-container-sideview" ref="container">
                <svg
                    className="svg-container-sideview"
                    height={this.props.height}
                    width={this.props.width}>
                    <image id="dome-background" x={0} y={0} width={this.props.width} height={this.props.height} xlinkHref="/img/dome_side.png" opacity={1.0}/>
                    <path id="bottom-windscreen-sideview" className="windscreen-sideview" strokeDashoffset={this.arcLength*(90-this.bottomScreenAngle)/90} strokeDasharray={this.arcLength+" "+this.arcLength}
                        d = {[
                        "M", this.xCenter, this.yCenter, 
                        "M", this.startPos.x, this.startPos.y, 
                        "A", this.radius, this.radius, 0, 0, 1, this.endPos.x, this.endPos.y,
                        "M", this.xCenter, this.yCenter
                    ].join(" ")}/>
                    <path id="top-windscreen-sideview" className="windscreen-sideview" strokeDashoffset={(1-this.arcLength)*(this.topScreenAngle)/90} strokeDasharray={this.arcLength+" "+this.arcLength}
                        d = {[
                        "M", this.xCenter, this.yCenter, 
                        "M", this.startPos.x, this.startPos.y, 
                        "A", this.radius, this.radius, 0, 0, 1, this.endPos.x, this.endPos.y,
                        "M", this.xCenter, this.yCenter
                    ].join(" ")}/>
                </svg>
            </div>
        );
    }
}


export default SideView;