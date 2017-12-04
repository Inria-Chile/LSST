import React, { Component } from 'react'
import Slot from '../Slot/Slot';
import PDU from '../PDU/PDU';

class Rack extends Component {

    constructor(props){
        super(props);
        this.split=2;
    }

    displayPopUp=(details, pos, hOf1)=>{
        this.props.displayPopUp(details,pos,hOf1,this.props.index);
    }
    componentWillUpdate(){
        // console.log("updated")
    }

    render() {
        let xend = this.props.x+this.props.width-this.props.structureWidth;
        let xpdu = this.props.x+this.props.structureWidth+this.split;
        let ypdu = this.props.y+this.props.height-this.props.height/10;
        let widthPdu = this.props.width-2*this.props.structureWidth-2*this.split;
        let heightPdu = this.props.height/10;
        let xtext = xpdu+widthPdu-widthPdu/2;
        let ytext = ypdu+heightPdu-heightPdu/2;
        let slotWidth = widthPdu;
        let totalSlotHeight = this.props.height-heightPdu;
        let id ="rack-"+this.props.index;
        // console.log("gonna render")
        return (
            <g id={id}className="rack-active">
                <text x={xtext} y={this.props.y}
                transform="translate(-35,-30)"
                className="text">{this.props.name}</text>


                <text x={xtext} y={this.props.y}
                transform="translate(-35,-10)"
                className="text">Rack {this.props.index+1}</text>


                <rect x={this.props.x} y={this.props.y} 
                width={this.props.structureWidth} height={this.props.height} 
                className="slot"/>

                <rect x={xend} 
                y={this.props.y} 
                width={this.props.structureWidth} height={this.props.height} 
                className="slot"/>

                {this.props.hasPdu && 
                <PDU x = {xpdu} y = {ypdu} width = {widthPdu} height = {heightPdu}
                xtext = {xtext} ytext = {ytext}/>
                }
                
                <Slot 
                x={xpdu}
                y={this.props.y}
                width={slotWidth} 
                totalHeight={totalSlotHeight-this.split}
                details = {this.props.slot}
                displayPopUp={this.displayPopUp}
                alert={this.props.alert}
                
                />
            </g>
        );
    }
}
export default Rack;