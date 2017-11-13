import React, { Component } from 'react'

class Slot extends Component {
    constructor(props){
        super(props);
        this.split = 2;
    }

    render() {
        let heightOf1=this.props.totalHeight/9;
        let y = this.props.y;
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
                    width={this.props.width} 
                    height={details.size*heightOf1-this.split} 
                    className="slot"/>

                    <text x={this.props.x} y={y}
                    transform="translate(10,25)"
                    className="text">{details.name}</text>
                    <div>lala</div>
                </g>
                )
            })}
            </g>
            
        );
    }
}
export default Slot;

