import React, { Component } from 'react'
import './Louvers.css';
// import * as d3 from 'd3';

class Louvers extends Component {

    constructor(props){
        super(props);
        this.data = [];
        this.distanceToCamera = 12;
        this.cameraFOV = 20;
        this.louverIndexs = [...Array(34).keys()];
        this.state = {
            openLouvers: this.louverIndexs,
            louversAperture: [...Array(34).keys()].map(() => 0)
        }
    }

    getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }


    componentDidUpdate(prevProps, prevState){
    }

    componentDidMount() {
        setInterval( () => {
            let openLouvers = this.getRandomSubarray(this.louverIndexs, Math.ceil(Math.random()*this.louverIndexs.length));
            let louversAperture = [...Array(34).keys()].map(() => Math.random());
            this.setState({
                openLouvers: openLouvers,
                louversAperture: louversAperture,
            })
        }, 2000)
    }

    
    render() {
        let center = [this.props.width/2, this.props.height/2];
        let baseRadius = this.props.width/3.2;
        let props = {
            x: center[0],
            y: center[1],
            r: 100,
            angle: 30,
            separation: 2,
            nLouvers: 3,
            width: 5,
            height: this.props.width/10,
            working: true,
            aperture: 0.5,
        }
        let tripleAngles = [-25-90, 0-90, 30-90, 50-90, 130-90, 150-90, 180-90, 205-90];
        let frontLouversAngles = [-45-90, 225-90];
        let radii = [baseRadius, baseRadius+baseRadius/6, baseRadius+2*baseRadius/6];
        let horizontalRadii = [baseRadius, baseRadius+baseRadius/8, baseRadius+baseRadius/11+baseRadius/6];
        let horizontals = [-0.7, 0.7];
        let doublePositions = [
            {
                r: radii[0],
                angle: tripleAngles[3]
            },
            {
                r: radii[0],
                angle: tripleAngles[4]
            },
            {
                r: radii[0],
                angle: tripleAngles[7]
            },
            {
                r: radii[0],
                angle: tripleAngles[0]
            },
            {
                r: radii[1],
                angle: frontLouversAngles[0]
            },
            {
                r: radii[1],
                angle: frontLouversAngles[1]
            },
            {
                r: horizontalRadii[0],
                angle: 0
            },
            {
                r: horizontalRadii[1],
                angle: 0
            },
        ];
        let louverIndex = 0;
        return (
            <div className="louvers-container" ref="container">
                <svg 
                    className="svg-container"
                    height={this.props.height}
                    width={this.props.width}>
                    <image id="dome-background" x={this.props.width/4} y={this.props.height/4} width={this.props.width/2} height={this.props.height/2} xlinkHref="/img/dome_top.png" opacity={1.0}/>
                    {/* {<image id="dome-base-background" x={this.props.width/4} y={this.props.height/4} width={this.props.width/2} height={this.props.height/2} xlinkHref="/img/dome_base.png" opacity={1}/>} */}
                    {
                        tripleAngles.map((angle, i) => {
                            return radii.map((radius, j) => {
                                props.nLouvers = 3;
                                doublePositions.find( (pos) => {
                                    if(pos.r === radius && pos.angle === angle){
                                        props.nLouvers = 2;
                                        radius = radius + 5;
                                    }
                                    return 0;
                                });
                                props.angle = angle;
                                props.r = radius;
                                props.working = Math.random() > 0.001;
                                props.aperture = this.state.louversAperture[louverIndex];
                                return (
                                    <Louver key={"L"+louverIndex++} {...props}/>
                                )
                            });
                        })
                    }
                    {
                        frontLouversAngles.map((angle) => {
                            let frontLouversRadii = [radii[1], radii[2]];
                            return frontLouversRadii.map((radius) => {
                                props.nLouvers = 3;
                                doublePositions.find( (pos) => {
                                    if(pos.r === radius && pos.angle === angle){
                                        props.nLouvers = 2;
                                        radius = radius + 5;
                                    }
                                    return 0;
                                });
                                props.angle = angle;
                                props.r = radius;
                                props.working = Math.random() > 0.001;
                                props.aperture = this.state.louversAperture[louverIndex];
                                return (
                                    <Louver key={"L"+louverIndex++} {...props}/>
                                )
                            });
                        })
                    }
                    {   
                        horizontals.map((xOffset) => {
                            return horizontalRadii.map((radius) => {
                                props.nLouvers = 3;
                                doublePositions.find( (pos) => {
                                    if(pos.r === radius && pos.angle === 0){
                                        props.nLouvers = 2;
                                        radius = radius + 5;
                                    }
                                    return 0;
                                });
                                props.angle = 0;
                                props.r = radius;
                                props.y = center[1] + props.height*xOffset;
                                props.working = Math.random() > 0.39;
                                props.aperture = this.state.louversAperture[louverIndex];
                                return (
                                    <Louver key={"L"+louverIndex++} {...props}/>
                                )
                            });
                        })
                    }
                </svg>
            </div>
        );
    }
}

class Louver extends Component {
    
    render() {
        // let xDisp = this.props.x;
        let xDisp = this.props.x + this.props.r*Math.cos(this.props.angle*Math.PI/180);
        // let yDisp = this.props.y;
        let yDisp = this.props.y + this.props.r*Math.sin(this.props.angle*Math.PI/180);
        let rot = this.props.angle;
        let sep = this.props.separation;
        let nRects = this.props.nLouvers;

        return (
            <g>
                {
                    [...Array(nRects).keys()].map((iRect) => {
                        let xOffset = xDisp + iRect*(sep+this.props.width)*Math.cos((rot)*Math.PI/180);
                        let yOffset = yDisp + iRect*(sep+this.props.width)*Math.sin((rot)*Math.PI/180);
                        return (
                            <rect key={iRect.toString()}
                                className={["louver", 
                                            this.props.working ? "working" : "not-working"].join(' ')}
                                x={xOffset-this.props.width/2} 
                                y={yOffset-this.props.height/2}
                                height={this.props.height}
                                width={this.props.width}
                                fillOpacity={this.props.aperture}
                                transform = {"rotate("+rot+" "+(xOffset)+" "+(yOffset)+")"}/>
                        )
                    })
                }
            </g>
        );
    }
}


export default Louvers;