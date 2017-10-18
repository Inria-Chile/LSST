import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import M1M3 from './M1M3/M1M3';
import ColorScaleLegend from './ColorScaleLegend/ColorScaleLegend';
import './Mirrors.css';
import * as d3 from 'd3';

class Mirrors extends Component {

    static viewName = 'mirrors';
    
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let mirrorSize = 320;
        let mirrorMargin = 30;
        let colormap1 = d3.scaleSequential((t) => d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "");
        let colormap2 = d3.scaleSequential((t) => d3.hsl(270, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
        let colormap3 = d3.scaleSequential((t) => d3.hsl(140, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
        return (
            <div className="mirrors-container">
                <div>
                    <h2>
                        Mirrors
                    </h2>
                </div>
                <div className="container pull-left">
                    <div className="row">
                        <div className="col-6 m1m3-heading-col">
                            <h4>M1M3</h4>
                        </div>
                        <div className="col-6 m2-heading-col">
                            <h4>M2</h4>
                        </div>
                    </div>
                    <div className="row mirror-row">
                        <div className="col-12">
                            <h5>Temperature</h5>
                        </div>
                        <div className="col-5">
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m3" scale={0.83} margin={mirrorMargin} colormap={colormap1}/>
                        </div>
                        <div className="col-5">
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m4" scale={0.83} margin={mirrorMargin} colormap={colormap1}/>
                        </div>
                        <div className="col-2">
                            <ColorScaleLegend max={10} min={0} width={mirrorSize/3} height={mirrorSize} colormapID={"colormap1"} colormap={colormap1}/>
                        </div>
                    </div>
                    <div className="row mirror-row">
                        <div className="col-12">
                            <h5>Force (actuators)</h5>
                        </div>
                        <div className="col-5">
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m5" scale={0.83} margin={mirrorMargin} colormap={colormap2}/>
                        </div>
                        <div className="col-5">
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m6" scale={0.83} margin={mirrorMargin} colormap={colormap2}/>
                        </div>
                        <div className="col-2">
                            <ColorScaleLegend max={10} min={0} width={mirrorSize/3} height={mirrorSize} colormapID={"colormap2"} colormap={colormap2}/>
                        </div>
                    </div>
                    <div className="row mirror-row">
                        <div className="col-12">
                            <h5>Force (hard points)</h5>
                        </div>
                        <div className="col-5">
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m7" scale={0.83} margin={mirrorMargin} colormap={colormap3}/>
                        </div>
                        <div className="col-5">
                            <M1M3 width={mirrorSize} height={mirrorSize} id="m8" scale={0.83} margin={mirrorMargin} colormap={colormap3}/>
                        </div>
                        <div className="col-2">
                            <ColorScaleLegend max={10} min={0} width={mirrorSize/3} height={mirrorSize} colormapID={"colormap3"} colormap={colormap3}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mirrors;
