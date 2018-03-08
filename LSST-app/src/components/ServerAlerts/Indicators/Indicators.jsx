import React, { Component } from 'react'

class Indicator extends Component {
    constructor(props){
        super(props);
        this.offsetTop = 5;
        this.offsetLeft = 13;
        this.offset =12;
        this.size=8;
    }

    render() {
        return (
            <g>
                 <rect 
                    x={this.props.bckgx-.5} 
                    y={this.props.y} 
                    width={this.props.width+.5} 
                    height={this.props.height} 
                    className={['slot-bar', this.props.selected?'selected':''].join(' ')}/>
                    

                {this.props.indicators.map((indicator, index)=>{
                    return(
                        <rect 
                        x={this.props.x-this.offsetLeft} 
                        y={this.props.height/2 - (this.props.indicators.length/2*(this.size))+this.props.y + index*this.offset - this.size/2} 
                        width={this.size} 
                        height={this.size} 
                        className={this.props.alerts[index] ? "indicator-alert":"indicator"}
                        key = {index}/>
                    )
                 
                })
                }
            </g>
            
        );
    }
}
export default Indicator;
