import React, { Component } from 'react'


class Rack extends Component {

    constructor(props){
        super(props);
        this.split=2;
    }

    render() {
        let xend = this.props.x+this.props.width-this.props.structureWidth;
        let xpdu = this.props.x+this.props.structureWidth+this.split;
        let ypdu = this.props.y+this.props.height-this.props.height/10;
        let widthPdu = this.props.width-2*this.props.structureWidth-2*this.split;
        let heightPdu = this.props.height/10;
        let xtext = xpdu+widthPdu-widthPdu/2;
        let ytext = ypdu+heightPdu-heightPdu/2;
        return (
            <g>
                <rect x={this.props.x} y={this.props.y} 
                width={this.props.structureWidth} height={this.props.height} 
                className="slot"/>

                <rect x={xend} 
                y={this.props.y} 
                width={this.props.structureWidth} height={this.props.height} 
                className="slot"/>

                <rect x={xpdu} 
                y={ypdu} 
                width={widthPdu} 
                height={heightPdu} 
                className="pdu"/>

                <text x={xtext} y={ytext}
                transform="translate(-20,5)"
                className="text">PDU</text>

                
            </g>
        );
    }
}
export default Rack;