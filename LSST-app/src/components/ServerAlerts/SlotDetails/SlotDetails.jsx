import React, { Component } from 'react'

class SlotDetails extends Component {

    constructor(props){
        super(props);
        this.offset=10;
        this.width = 200;
        this.height = 50;

    }


    render() {

        let indicators = this.props.details.indicators;
        let height = 50*(indicators.length+1);
        this.height = height;
        let indicatorHeight = this.height/(indicators.length+1)-this.offset;
        let x = this.props.position[0]-this.offset;
        let y = this.props.position[1]+this.props.hOf1*this.props.details.position;
        let indicatorY = y+ indicatorHeight;
        console.log(this.props)
        return (
            <g z = {1}>
                   <rect 
                        x={x} 
                        y={y} 
                        width={this.width} 
                        height={this.height} 
                        className="slotDetails"
                    />
                     <text
                        x={x+this.offset} 
                        y={y+this.offset*2.5} 
                        className="text"
                    >{this.props.details.name}</text>
                    { indicators.map((indicator, index)=>{
                        return(
                            <g key={index}>
                                <rect 
                                x={x+this.offset} 
                                y={indicatorY+this.offset/2+this.height/4*index} 
                                width={this.width-2*this.offset} 
                                height={indicatorHeight} 
                                className={(this.props.alerts)?"indicator-alert":"indicator"}                                /> 
                                <text
                                x={x+this.offset*2} 
                                y={indicatorY+this.offset/2+this.height/4*index + this.offset*2.5} 
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
