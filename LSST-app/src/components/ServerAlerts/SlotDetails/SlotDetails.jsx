import React, { Component } from 'react'

class SlotDetails extends Component {

    constructor(props){
        super(props);
        this.offset=10;
        this.width = 200;
        this.height = 50;
        this.state = {
            displayAnimation:true,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.details.name !== this.props.details.name)
            this.setState({
                displayAnimation: false,
            }, () => {
                this.setState({
                    displayAnimation: true,
                });
            });
    }

    render() {
        let indicators = this.props.details.indicators;
        let height = 50*(indicators.length+1);
        this.height = height;
        let indicatorHeight = this.height/(indicators.length+1)-this.offset;
        let x = this.props.position[0]-this.offset+20;
        let y = this.props.position[1]+this.props.hOf1*this.props.details.position-this.height/2+this.props.details.size*82/2;
        let indicatorY = y+ indicatorHeight;
        let alerts = (this.props.slotName===this.props.alerts.server_id)?this.props.getAlertsStatus():[false,false,false];
        let polygonCoords = indicators.map((indicator, index)=>{
            let indicatorOffset = (index-1)*(indicatorHeight+this.offset);
            if(indicators.length < 3)
                indicatorOffset = 0;
            return [[x-40,y+this.height/2], 
                    [x-20,y+this.height/2], 
                    [x, y+this.height/2+indicatorOffset], 
                    [x+this.offset, y+this.height/2+indicatorOffset], 
                    [x, y+this.height/2+indicatorOffset], 
                    [x-20,y+this.height/2],
                    [x-40,y+this.height/2], ]
        })
        y= y-indicatorHeight/2;
        indicatorY = y+ indicatorHeight;
        let leftSide = x+this.width > window.innerWidth;
        if(leftSide)
            x = x-3.5*this.width;
        return (
            <g z = {1}>
                    <rect 
                        x={x} 
                        y={y} 
                        width={this.width} 
                        height={this.height} 
                        className={["slotDetails"].join(' ')}
                    />
                    {
                        !leftSide &&
                        polygonCoords.map( (pol) => {
                            return <polyline points={pol.map((x) => x.join(',')).join(' ')}
                                    key={pol.toString()} 
                                    className={["details-connectors", this.state.displayAnimation?"animate":""].join(' ')}/>
                        })
                    }
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
                                    className={alerts[index]?"indicator-alert":"indicator"}
                                />
                                <text
                                    x={x+this.offset*2} 
                                    y={indicatorY+this.offset/2+this.height/4*index + this.offset*2.5} 
                                    className="text"
                                    >{indicator}
                                </text>
                            </g>
                          
                        )
                    })}

            </g>

           
            
        );
    }
}
export default SlotDetails;
