import React, { Component } from 'react'

class PDU extends Component {

    render() {
        return (
            <g>
              
               <rect x={this.props.x} 
                y={this.props.y} 
                width={this.props.width} 
                height={this.props.height} 
                className="pdu"/>

                <text x={this.props.xtext} y={this.props.ytext}
                transform="translate(-20,5)"
                className="text">PDU</text>

       
            </g>
        );
    }
}
export default PDU;