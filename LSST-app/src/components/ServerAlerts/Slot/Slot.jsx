import React, { Component } from 'react'
import Indicators from '../Indicators/Indicators'


class Slot extends Component {
    constructor(props){
        super(props);
        this.split = 2;
   
    }

    displayPopUp=(index, pos, hOf1)=>{
        let details = this.props.details[index];
        this.props.displayPopUp(details,pos,hOf1);
    }
    render() {
        let heightOf1=this.props.totalHeight/9;
        let y = this.props.y;
        let indicatorsWidth = this.props.width/10;
        return (
            <g className="slot-container" >
            {
            this.props.details.map((details, index)=>{
                y =  this.props.y +details.position*heightOf1;
                let indicatorsX = this.props.x+this.props.width;
                let indicatorsX2 = this.props.x+10;
                return(
                    <g key={index} 
                    onClick={()=>this.displayPopUp(index,[indicatorsX2,this.props.y+10], heightOf1)}>
                        <rect 
                        x={this.props.x} 
                        y={y} 
                        width={this.props.width-indicatorsWidth} 
                        height={details.size*heightOf1-this.split} 
                        className="slot"/>

                        <text x={this.props.x} y={y}
                        transform="translate(10,25)"
                        className="text">{details.name}</text>

                        <Indicators 
                        x={indicatorsX}
                        y={y}
                        width ={indicatorsWidth}
                        indicators={details.indicators}
                        height={details.size*heightOf1-this.split}
                        bckgx ={this.props.x+indicatorsWidth*9}/>
                </g>
                )
            })}
            </g>
        );
    }
}
export default Slot;

