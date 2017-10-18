import React, { Component } from 'react'

class ColorScaleLegend extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let tickStyle = {
            opacity: 1,
        };
        let textStyle = {
            textAnchor: 'end'
        }
        return (
            <g className="legend axis" transform={"translate("+(this.props.ticksOffset)+", 0)"}>
                <g className="tick" transform={"translate(0,"+(this.props.height-this.props.textOffset)+")"} style={tickStyle}>
                    <line x1={this.props.textOffset-6} y1="0" x2={this.props.textOffset} y2="0"></line>
                    <text dy=".32em" x="9" y="0" style={textStyle}>{this.props.min}</text>
                </g>
                {/* <g className="tick" transform="translate(0,300)" style={tickStyle}>
                    <line x2="6" y2="0"></line>
                    <text dy=".32em" x="9" y="0" style={textStyle}>-2</text>
                </g>
                <g className="tick" transform="translate(0,240.00000000000003)" style={tickStyle}>
                    <line x2="6" y2="0"></line>
                    <text dy=".32em" x="9" y="0" style={textStyle}>-1</text>
                </g>
                <g className="tick" transform="translate(0,180)" style={tickStyle}>
                    <line x2="6" y2="0"></line>
                    <text dy=".32em" x="9" y="0" style={textStyle}>0</text>
                </g>
                <g className="tick" transform="translate(0,120.00000000000001)" style={tickStyle}>
                    <line x2="6" y2="0"></line>
                    <text dy=".32em" x="9" y="0" style={textStyle}>1</text>
                </g>
                <g className="tick" transform="translate(0,59.999999999999986)" style={tickStyle}>
                    <line x2="6" y2="0"></line>
                    <text dy=".32em" x="9" y="0" style={textStyle}>2</text>
                </g> */}
                <g className="tick" transform="translate(0,0)" style={tickStyle}>
                    <line x1={this.props.textOffset-6} y1="0" x2={this.props.textOffset} y2="0"></line>
                    <text dy=".32em" x="9" y="0" style={textStyle}>{this.props.max}</text>
                </g>
            </g>
        );
    }
}


export default ColorScaleLegend;