import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import Indicators from '../Indicators/Indicators'
// import * as d3 from 'd3';


class Slot extends Component {
    constructor(props){
        super(props);
        this.split = 2;
        this.criticalCPU = 0.9;
        this.criticalDisk = 0.9;
        this.criticalTemp = 90;
    }

    displayPopUp=(index, pos, hOf1)=>{
        let details = this.props.details[index];
        this.props.displayPopUp(details,pos,hOf1,null,details.name);
    }

    checkServerStatus(){
        let alerts = this.props.alert;
        let indicators = [];
        for(let i=0;i<this.props.details.length;++i)
            if(this.props.alert.server_id === this.props.details[i].name)
                indicators = this.props.details[i].indicators;
        if(
            (alerts.server_CPU >= this.criticalCPU && indicators.includes('CPU')) ||
            (alerts.server_disk >= this.criticalDisk && indicators.includes('Disk')) ||
            (alerts.server_temperature >= this.criticalTemp && indicators.includes('UPS'))
        ) return 'slot-alert';
        else return "slot";
    }

    render() {
        let heightOf1=this.props.totalHeight/9;
        let y = this.props.y;
        let indicatorsWidth = this.props.width/25;
        let alert = this.props.alert;
        return (
            <g className="slot-container"  width={this.props.width-indicatorsWidth} > 
            {
            this.props.details.map((details, index)=>{
                y =  this.props.y +details.position*heightOf1;
                let ytext = y+heightOf1/3;
                let xtext = this.props.x+10;
                let indicatorsX = this.props.x+this.props.width;
                let indicatorsX2 = this.props.x+this.props.width+30;
                return(
                    <g key={index} 
                    onClick={()=>this.displayPopUp(index,[indicatorsX2,this.props.y], heightOf1)}>
                        <rect 
                        x={this.props.x} 
                        y={y} 
                        width={this.props.width-indicatorsWidth} 
                        height={details.size*heightOf1-this.split} 
                        className={(details.name===alert.server_id)?this.checkServerStatus():"slot"}/>
                        <text 
                        x={xtext} y={ytext}
                        // transform={transformation}
                        className="slot-text">{details.name}</text>
                        <Indicators 
                            x={indicatorsX}
                            y={y}
                            width ={indicatorsWidth}
                            indicators={details.indicators}
                            height={details.size*heightOf1-this.split}
                            bckgx ={this.props.x+indicatorsWidth*24}
                            alertStatus={(details.name===alert.server_id)?this.checkServerStatus():"slot"}
                            alerts={(details.name===alert.server_id)?this.props.getAlertsStatus():[false,false,false]}
                            selected={details.name===this.props.selectedSlotName}
                            // cssClass={(alert===index)?"slot-alert":"slot"}
                        />
                </g>
                )
            })}
            </g>
        );
    }
}
export default Slot;

