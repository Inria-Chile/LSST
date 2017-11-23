import React, { Component } from 'react'
import './Louvers.css';
// import * as d3 from 'd3';
import {DEMO_MODE} from '../../../Utils/Utils';
import openSocket from 'socket.io-client';

class Louvers extends Component {

    constructor(props){
        super(props);
        this.data = [];
        this.distanceToCamera = 12;
        this.cameraFOV = 20;
        this.louverIndexs = [...Array(34).keys()];
        this.state = {
            openLouvers: this.louverIndexs,
            louversAperture: [...Array(34).keys()].map(() => 0),
            selectedLouverAperture: 69,
            selectedLouverInfoPos: [40, 40],
        }
        this.socket = openSocket(window.location.origin + '/louvers');
        console.log('Louvers\' socket listening', this.socket.on('Louvers', msg => this.receiveLouversData(msg)));
    }

    receiveLouversData = (msg) => {
        // console.log('receiveLouversData', msg);
        if(msg.position_actual){
            this.setState({
                louversAperture: msg.position_actual
            });
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
        if(DEMO_MODE){
            setInterval( () => {
                let openLouvers = this.getRandomSubarray(this.louverIndexs, Math.ceil(Math.random()*this.louverIndexs.length));
                let louversAperture = [...Array(34).keys()].map(() => Math.random()*100);
                this.setState({
                    openLouvers: openLouvers,
                    louversAperture: louversAperture,
                })
            }, 5000)
        }
    }

    onLouverMouseOver = (louverIndex) => {
        return (pos) => {
            let savedPos = pos;
            return () => {
                this.setState(
                    {
                        selectedLouverIndex: louverIndex,
                        selectedLouverInfoPos: [savedPos[0],savedPos[1]],
                    }
                )
            }
        }

    }

    onLouverMouseOut = (louverIndex) => {
        this.setState(
            {
                selectedLouverIndex: -1,
            }
        )
        return () => 0;
    }

    
    render() {
        let center = [this.props.width/2, this.props.height/2];
        let baseRadius = this.props.width/3.3;
        let baseHorizontalRadius = this.props.width/3.5;
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
        let tripleAngles = [-25-90, 0-90, 25-90, 50-90, 130-90, 155-90, 180-90, 205-90];
        let frontLouversAngles = [-45-90, 225-90];
        let radii = [baseRadius, baseRadius+baseRadius/6, baseRadius+2*baseRadius/6];
        let labelRadius = baseRadius+3.5*baseRadius/6;
        let horizontalRadii = [baseHorizontalRadius, baseHorizontalRadius+baseHorizontalRadius/8, baseHorizontalRadius+baseHorizontalRadius/9+baseHorizontalRadius/6];
        let horizontalLabelRadius = baseHorizontalRadius+baseHorizontalRadius/11+2.8*baseHorizontalRadius/6;
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
                                props.working = true;
                                props.aperture = this.state.louversAperture[louverIndex];
                                props.onLouverMouseOver = this.onLouverMouseOver(louverIndex);
                                props.onLouverMouseOut = this.onLouverMouseOut;
                                props.louverLabelRadius = labelRadius;
                                props.selected = this.state.selectedLouverIndex === louverIndex;
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
                                props.working = true;
                                props.aperture = this.state.louversAperture[louverIndex];
                                props.onLouverMouseOver = this.onLouverMouseOver(louverIndex);
                                props.onLouverMouseOut = this.onLouverMouseOut;
                                props.louverLabelRadius = labelRadius;
                                props.selected = this.state.selectedLouverIndex === louverIndex;
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
                                props.working = true;
                                props.aperture = this.state.louversAperture[louverIndex];
                                props.onLouverMouseOver = this.onLouverMouseOver(louverIndex);
                                props.onLouverMouseOut = this.onLouverMouseOut;
                                props.louverLabelRadius = horizontalLabelRadius;
                                props.selected = this.state.selectedLouverIndex === louverIndex;
                                return (
                                    <Louver key={"L"+louverIndex++} {...props}/>
                                )
                            });
                        })
                    }
                    <text id='louver-aperture-text' x={this.state.selectedLouverInfoPos[0]} y={this.state.selectedLouverInfoPos[1]}>
                        {this.state.selectedLouverIndex >= 0 ? Math.round(this.state.louversAperture[this.state.selectedLouverIndex]) + '%' : ''}
                    </text>
                </svg>
            </div>
        );
    }
}

class Louver extends Component {
    
    render() {
        let xDisp = this.props.x + this.props.r*Math.cos(this.props.angle*Math.PI/180);
        let yDisp = this.props.y + this.props.r*Math.sin(this.props.angle*Math.PI/180);
        let xLabelDisp = this.props.x + this.props.louverLabelRadius*Math.cos(this.props.angle*Math.PI/180);
        let yLabelDisp = this.props.y + this.props.louverLabelRadius*Math.sin(this.props.angle*Math.PI/180);
        if(this.props.angle > 0){
            yLabelDisp += 3;
        }
        let rot = this.props.angle;
        let sep = this.props.separation;
        let nRects = this.props.nLouvers;
        let labelPos = [xLabelDisp, yLabelDisp];
        return (
            <g className={this.props.selected ? 'selected' : ''}>
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
                                fillOpacity={this.props.aperture/100}
                                transform = {"rotate("+rot+" "+(xOffset)+" "+(yOffset)+")"}
                                onMouseOver={this.props.onLouverMouseOver(labelPos)}
                                />
                        )
                    })
                }
                {
                    <rect  onMouseOut={this.props.onLouverMouseOut}
                        x={xDisp-this.props.width/2} 
                        y={yDisp-this.props.height/2}
                        height={this.props.height}
                        width={this.props.width*nRects+(nRects-1)*sep}
                        fillOpacity={0.0}
                        fill={'blue'}
                        transform = {"rotate("+rot+" "+(xDisp)+" "+(yDisp)+")"}
                        onMouseOver={this.props.onLouverMouseOver(labelPos)}
                        />
                }
            </g>
        );
    }
}


export default Louvers;