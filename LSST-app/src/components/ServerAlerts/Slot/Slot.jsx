import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import Indicators from '../Indicators/Indicators'
// import * as d3 from 'd3';


class Slot extends Component {
    constructor(props){
        super(props);
        this.split = 2;
   
    }

    displayPopUp=(index, pos, hOf1)=>{
        let details = this.props.details[index];
        this.props.displayPopUp(details,pos,hOf1);
    }

    // componentDidMount(){
    //     var dom = ReactDOM.findDOMNode(this);
    //     this.drawSlots(dom);
    // }

    // drawSlots=(dom)=>{
    //     let heightOf1=this.props.totalHeight/9;
    //     let slotsContainer = d3.select(dom);
    //     let data = this.props.details;
    //     let x = this.props.x;
    //     let y = this.props.y;
    //     let width = this.props.width;
    //     let indicatorsWidth = this.props.width/10;
    //     let split = this.split;
    //     let alert = this.props.alert;
    //     let slots = slotsContainer.selectAll(".slot-container").select("g")
    //         .data(data).enter()
    //         // .append("g")
    //         // .append("rect")
    //         // .attr("x",x)
    //         // .attr("y",function(d){console.log(d);return y+d.position*heightOf1})
    //         // .attr("width",width-indicatorsWidth)
    //         // .attr("height",function(d){return d.size*heightOf1-split})
    //         // .attr("class",function(d,i){return (alert===i)?"slot-alert":"slot" })
    //         .append("text")
    //         .text(function(d){
    //             return d.name;
    //         })
    //         .style("font-size", function(d){
    //             console.log(heightOf1)
    //             console.log(d.size)
    //         })
    //         .attr("x",x)
    //         .attr("y",function(d){
    //             return y+d.position*heightOf1+5})
    //         .attr("class", "slot-text")
            
    //     // .append("g").attr("class","thisisaest");
    // }


    render() {
        let heightOf1=this.props.totalHeight/9;
        let y = this.props.y;
        let indicatorsWidth = this.props.width/10;
        let alert = this.props.alert;
        // console.log(alert)
        return (
            <g className="slot-container"  width={this.props.width-indicatorsWidth} > 
            {
            this.props.details.map((details, index)=>{
                // console.log(alert===index)
                y =  this.props.y +details.position*heightOf1;
                let ytext = y+heightOf1/3;
                let xtext = this.props.x+10;
                // let transformation = "scale(0.8, 0.8) translate("+xtext+","+ytext+")"; 
                let indicatorsX = this.props.x+this.props.width;
                let indicatorsX2 = this.props.x+10;
                return(
                    <g key={index} 
                    onClick={()=>this.displayPopUp(index,[indicatorsX2,this.props.y+10], heightOf1)}>
                        <rect 
                        x={this.props.x} 
                        y={y} 
                        width={this.props.width-indicatorsWidth} 
                        height={details.size*heightOf1-this.split} 
                        className={(alert===index)?"slot-alert":"slot"}/>
                        <text 
                        x={xtext} y={ytext}
                        // transform={transformation}
                        className="slot-text">{details.name}</text>
                        <Indicators 
                        x={indicatorsX}
                        y={y}
                        width ={indicatorsWidth}
                        indicators={details.indicators}
                        height={details.size*heightOf1-this.split}
                        bckgx ={this.props.x+indicatorsWidth*9}
                        // cssClass={(alert===index)?"slot-alert":"slot"}
                        />
                </g>
                )
            })}
            </g>
        );
    }
}
export default Slot;

