import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import M1M3 from '../M1M3/M1M3';
import Shutters from '../Shutters/Shutters';
import './Status.css';
import * as d3 from 'd3';

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidUpdate(prevProps, prevState){
    }

    render() {
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
                            <M1M3 width={500} height={500} id="m3" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(360, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={500} height={500} id="m4" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={500} height={500} id="m5" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(270, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={500} height={500} id="m6" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(270, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={500} height={500} id="m7" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(140, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={500} height={500} id="m8" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(140, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={500} height={500} id="m7" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(60, 0.9+t*t*0.1, 0.7-t*t*0.58) + "";
                                                                                                })}/>
                            <M1M3 width={500} height={500} id="m8" scale={1.4} margin={20} colormap={d3.scaleSequential(function(t) {
                                                                                                    return d3.hsl(60, 1.0-t*t*0.1, 0.12+t*t*0.58) + "";
                                                                                                })}/>
                        </div>
                    </div>
                    <div className="right-container">
                        <Shutters width={500} height={300} id="shutters" scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Status;