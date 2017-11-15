import React, { Component } from 'react'
import Indicators from '../Indicators/Indicators'

class Slot extends Component {
    constructor(props){
        super(props);
        this.split = 2;
    }

    render() {
        let heightOf1=this.props.totalHeight/9;
        let y = this.props.y;
        let indicatorsWidth = this.props.width/10;
        return (
            <g>
            {
            this.props.details.map((details, index)=>{
                y =  this.props.y +details.position*heightOf1;
                return(
                    <g key={index}>
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
                    x={this.props.x+this.props.width}
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

