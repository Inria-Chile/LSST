import React, { Component } from 'react'

class Indicator extends Component {
    constructor(props){
        super(props);
        this.offsetTop = 5;
        this.offsetLeft = 10;
        this.offset =9;
        this.size=6;
    }

    render() {
      
        return (
            <g>
                 <rect 
                    x={this.props.bckgx-.5} 
                    y={this.props.y} 
                    width={this.props.width+.5} 
                    height={this.props.height} 
                    className="slot"/>

                {this.props.indicators.map((indicator, index)=>{
                    return(
                        <rect 
                        x={this.props.x-this.offsetLeft} 
                        y={this.offsetTop+this.props.y + index*this.offset} 
                        width={this.size} 
                        height={this.size} 
                        className="indicator"
                        key = {index}/>
                    )
                 
                })
                }
            </g>
            
        );
    }
}
export default Indicator;
