import React, { Component } from 'react'
import Slot from '../Slot/Slot';

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
        let index = (this.props.indexY===0)?String(this.props.indexX):String(this.props.indexX+8);
        let slotWidth = widthPdu;
        let totalSlotHeight = this.props.height-heightPdu;

        return (
            <g>

                <text x={xtext} y={this.props.y}
                transform="translate(-25,-10)"
                className="text">Rack {index}</text>


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

                <Slot 
                x={xpdu}
                y={this.props.y}
                width={slotWidth} 
                totalHeight={totalSlotHeight-this.split}/>
            </g>
        );
    }
}
export default Rack;