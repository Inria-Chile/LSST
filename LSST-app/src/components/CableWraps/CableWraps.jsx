import React, { Component } from 'react'
import './CableWraps.css';
import DraggableTitle from '../Utils/DraggableTitle';
import AZCableWrap from './AZCableWrap/AZCableWrap';
import CameraCableWrap from './CameraCableWrap/CameraCableWrap';
// import * as d3 from 'd3';
import openSocket from 'socket.io-client';

class CableWraps extends Component {

    constructor(props){
        super(props);
        this.socket = openSocket(window.location.origin+'');
        this.state={
            cable_wraps: null
        };
        
    }

    drawBackground(g,radio, tau, arc){
        g.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", radio-5)
            .style("fill", "#384b5f");

        g.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", radio-70)
            .style("fill", "#7296b0");

        g.append("path")
            .datum({endAngle: tau})
            .style("fill", "#4d667b")
            .attr("d", arc);
    }

    componentDidMount(){
        this.socket.on('cable_wraps', timestamp => this.receiveMsg(timestamp));
        
    }

    receiveMsg(msg){
        this.setState({
            cable_wraps:msg
        })

    }

    drawLimits(g,radio, start, end){
        g.append("rect")
        .attr("x", 0)
        .attr("y", -radio-10)
        .attr("width", 5)
        .attr("height", 30)
        .style("fill", "#ffffff")

        g.append("rect")
        .attr("x", -radio-10)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 2)
        .style("fill", "#ffffff")

        g.append("text")
        .attr("x", -radio-50)
        .attr("y",5)
        .text(start+"°")
        .style("fill", "#ffffff")

        g.append("rect")
        .attr("x", radio-20)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 2)
        .style("fill", "#ffffff")

        g.append("text")
        .attr("x", radio+15)
        .attr("y",5)
        .text(end+"°")
        .style("fill", "#ffffff")
        
    }


    render() {
        return(
            <div className="cable-wraps-container">
            <DraggableTitle title='Cable Wraps'/>
            <div className="container pull-left">
            <div className="row">
                <div className="cam-cable col-md-6">
                <h4>Camera Cable Wrap</h4>
                <CameraCableWrap 
                    height={300}
                    width={400} 
                    drawBackground={this.drawBackground}
                    drawLimits={this.drawLimits}
                    cable_wrap={(this.state.cable_wraps)?this.state.cable_wraps.camera:null}/>
                </div>
                <div className="az-cable col-md-6">
                <h4>Azimuth Cable Wrap</h4>
                <AZCableWrap 
                    height={300} 
                    width={400} 
                    drawBackground={this.drawBackground}
                    drawLimits={this.drawLimits}
                    cable_wrap={(this.state.cable_wraps)?this.state.cable_wraps.az:null}
                    />
                </div>
            
            </div></div></div>
        );
    }
}
export default CableWraps;
