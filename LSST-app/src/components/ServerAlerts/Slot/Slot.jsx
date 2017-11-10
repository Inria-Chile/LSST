import React, { Component } from 'react'

class Slot extends Component {
    constructor(props){
        super(props);
        this.split = 2;
    }

    render() {
        let heightOf1=this.props.totalHeight/9;
        let y = this.props.y;
        console.log("totalHeight",this.props.totalHeight)
        console.log("h of 1",heightOf1)
        return (
            <g>
            {
            this.props.details.map((details, index)=>{
                y =  this.props.y +details.position*heightOf1;

                console.log("pos", details.position)
                console.log("y ", y)

                            return(
                <rect 
                x={this.props.x} 
                y={y} 
                width={this.props.width} 
                height={details.size*heightOf1-this.split} 
                className="slot"/>
            )
            })}
            </g>
            
        );
    }
}
export default Slot;

