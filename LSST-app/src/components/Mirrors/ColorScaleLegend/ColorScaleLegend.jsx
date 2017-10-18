import React, { Component } from 'react'
import './ColorScaleLegend.css';
import Ticks from './Ticks';

class ColorScaleLegend extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let rectStyle = {
            fill: 'url("#'+this.props.colormapID+'")'
        }
        let nColors = 10;
        let xOffset = 20;
        let yOffset = 10;
        let textOffset = 20;
        let ticksOffset = this.props.width/5;
        return (
            <div className="legend-container" ref="container">
                <svg id="legend-svg" width={this.props.width} height={this.props.height}>
                    <g transform={"translate("+xOffset+","+yOffset+")"}>
                        <defs>
                            <linearGradient id={this.props.colormapID} x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
                            {
                                [...Array(nColors).keys()].map((i) => {
                                    return (
                                        <stop key={"offset"+i} offset={i/(nColors-1)*100+"%"} stopColor={this.props.colormap(i/(nColors-1))} stopOpacity="1"></stop>
                                    )
                                    
                                })
                            }
                            </linearGradient>
                        </defs>
                        <rect className="colormap-rect" x1="0" y1="0" width={ticksOffset} height={this.props.height-textOffset} 
                                transform={"translate("+ticksOffset+","+0+")"} style={rectStyle}></rect>
                        <Ticks max={this.props.max} min={this.props.min} height={this.props.height} ticksOffset={0} textOffset={textOffset} />
                    </g>
                </svg>
            </div>
        );
    }
}


export default ColorScaleLegend;