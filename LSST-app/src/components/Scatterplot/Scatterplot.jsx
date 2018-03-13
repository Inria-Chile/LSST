import React, { Component } from 'react'
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import './Scatterplot.css';


class Scatterplot extends Component {

    createScatterplot(dom, props){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        let height = this.props.height;
        console.log('height', height)
        let svg = d3.select(dom).append('svg').attr('class', 'd3').attr('width', width).attr('height', height);
        let margin = { top: 30, right: 15, bottom: 20, left: 45 };
        width = +svg.attr("width") - margin.left - margin.right;
        height = +svg.attr("height") - margin.top - margin.bottom;
        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");   

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height,0]);
    
        if(this.props.displayedData==null && this.data!=null){
            this.setData(this.props.data);
        }
        if(this.props.displayedData!=null){
            let data = this.props.displayedData;
            x.domain(d3.extent(data, function(d) { return d.fieldRA; }));
            let maxy = Math.abs(d3.max(data, function(d) { return d.fieldDec; }));
            let miny = Math.abs(d3.min(data, function(d) { return d.fieldDec; }));
            let ydom = maxy;
            if(miny > maxy) ydom = miny;
            y.domain([-ydom,ydom]);

            g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + y.range()[0] / 2 + ")")
            .attr("class", "whiteAxis")
            .call(d3.axisBottom(x).ticks(10));

            g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .attr("class", "whiteAxis")
            .call(d3.axisLeft(y).ticks(10));
  
            g.selectAll("circle").data(data).enter().append("circle")
            .attr("class", "dot")
            .attr("r", 2)
            .attr("cx", function(d){
                return x(d.fieldRA);
            })
            .attr("cy", function(d){
                return y(d.fieldDec);
            })
            .style("fill", function(d) {        
            return "white"    
                });
        }
    }

    removeScatterplot(dom){
        d3.select(dom).select('svg').remove();
    }

    componentDidUpdate(){

        let dom = ReactDOM.findDOMNode(this);

        if(dom){
            
            if ( dom.childNodes.length >0 ){
                this.removeScatterplot(dom);
            }

            this.createScatterplot(dom, this.props);
        }
    }    
    render() {

        return(
        <div></div>);
    }
}

Scatterplot.defaultProps = {
    height: 500,
  };

export default Scatterplot;
