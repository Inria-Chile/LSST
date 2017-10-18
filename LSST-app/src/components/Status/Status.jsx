import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import M1M3 from '../Mirrors/M1M3/M1M3';
import Shutters from '../Shutters/Shutters';
import DomePosition from '../DomePosition/DomePosition';
import Louvers from '../Louvers/Louvers';
import './Status.css';
import * as d3 from 'd3';

class Status extends Component {

    static viewName = 'status';
    
    constructor(props) {
        super(props);
        this.state = {
            shuttersAperture: 0
        }
    }
    
    updateShuttersAperture = (aperture) => {
        this.setState({
            shuttersAperture: aperture
        });
    }

    componentDidUpdate(prevProps, prevState){
    }

    render() {
        let mirrorSize = 300;
        return (
            <div className="status-container">
                <div>
                    <h2>
                        REAL TIME STATUS
                    </h2>
                </div>
                <div className="main-container">
                    <div className="left-container">
                        <div className="main-skymap-wrapper">
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m3" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(360, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m4" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m5" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(270, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m6" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(270, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m7" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(140, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m8" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(140, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m7" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(60, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m8" scale={0.8} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(60, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                        </div>
                    </div>
                    <div className="right-container">
                        <Shutters width={500} height={300} id="shutters" aperture={this.state.shuttersAperture} updateShuttersAperture={this.updateShuttersAperture} scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                        <DomePosition width={330} height={300} id="dome-top" aperture={this.state.shuttersAperture} scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                        <Louvers width={700} height={700} id="louvers" scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Status;
