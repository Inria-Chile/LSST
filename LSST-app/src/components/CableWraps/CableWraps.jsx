import React, { Component } from 'react'
import './CableWraps.css';
import DraggableTitle from '../Utils/DraggableTitle';
import AZCableWrap from './AZCableWrap/AZCableWrap';
import CameraCableWrap from './CameraCableWrap/CameraCableWrap';
import * as d3 from 'd3';

class CableWraps extends Component {

    drawBackground(g,radio, tau, startAngle){

        let arc = d3.arc()
        .innerRadius(radio-10)
        .outerRadius(radio)
        .startAngle(startAngle);
        
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

        g.append("rect")
            .attr("x", 0)
            .attr("y", -radio-10)
            .attr("width", 5)
            .attr("height", 30)
            .style("fill", "#ffffff")
        
        g.append("text")
            .attr("x", 0)
            .attr("y", -radio+40)
            .text("0°")
            .style("fill", "#ffffff")
    }

    render() {
        return(
            <div className="cable-wraps-container">
            <DraggableTitle title='Cable Wraps'/>
            <div className="container pull-left">
            <div className="row">
                <div className="cam-cable col-md-6">
                <h4>CameraCable Wrap</h4>
                <CameraCableWrap height={300} width={300} drawBackground={this.drawBackground}/>
                </div>
                <div className="az-cable col-md-6">
                <h4>Azimuth Cable Wrap</h4>
                <AZCableWrap height={300} width={300} drawBackground={this.drawBackground}/>
                </div>
            
            </div></div></div>
        );
    }
}
export default CableWraps;
