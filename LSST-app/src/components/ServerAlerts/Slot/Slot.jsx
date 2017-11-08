import React, { Component } from 'react'

class Slot extends Component {

    render() {
        return (
            <g>
                <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.totalHeight} className="slot"/>
            </g>
        );
    }
}
export default Slot;