import React, { Component } from 'react'

class SlotDetails extends Component {

    constructor(props){
        super(props);
        this.offset=10;
        this.width = 200;
        this.height = 50;

    }


    render() {
        let x = this.props.position[0]-this.offset;
        let y = this.props.position[1]+this.props.hOf1*this.props.details.position+this.offset*2;
        let indicators = this.props.details.indicators;
        let height = 50*indicators.length;
        this.height = height;
        
        return (
            <g z = {1}>
                   <rect 
                        x={x} 
                        y={y} 
                        width={this.width} 
                        height={this.height} 
                        className="slotDetails"
                    />
                    { indicators.map((indicator, index)=>{
                        return(
                            <g key={index}>
                                <rect 
                                x={x+this.offset} 
                                y={y+this.offset/2+this.height/3*index} 
                                width={this.width-2*this.offset} 
                                height={this.height/indicators.length-this.offset} 
                                className="indicator"
                                /> 
                                <text
                                x={x+this.offset*2} 
                                y={y+this.offset/2+this.height/3*index + this.offset*2.5} 
                                className="text"
                                >{indicator}</text>
                            </g>
                          
                        )
                    })}

            </g>

           
            
        );
    }
}
export default SlotDetails;
