import React, { Component } from 'react'

class SlotDetails extends Component {

    render() {
        let x = this.props.position[0];
        let y = this.props.position[1]+this.props.hOf1*this.props.details.position;
        return (
            <g z = {1}>
                   <rect 
                        x={x} 
                        y={y} 
                        width={200} 
                        height={200} 
                        className="slotDetails"
                        />
            </g>
            
        );
    }
}
export default SlotDetails;
