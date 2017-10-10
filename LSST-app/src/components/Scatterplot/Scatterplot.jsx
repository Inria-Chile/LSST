import React, { Component } from 'react'
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import './Scatterplot.css';


class Scatterplot extends Component {

    constructor(props){
        super(props);
        this.state={
            displayedData: null
        };
        this.data=null;
    }

    componentDidMount() {
        var dom = ReactDOM.findDOMNode(this);
        this.createScatterplot(dom, this.props);
    }

    componentDidUpdate() {
        var dom = ReactDOM.findDOMNode(this);
        this.removeScatterplot(dom);
        this.createScatterplot(dom, this.props);
    }

    createScatterplot(dom, props){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        let height = this.props.height;

        let svg = d3.select(dom).append('svg').attr('class', 'd3').attr('width', width).attr('height', height);
        let margin = { top: 10, right: 15, bottom: 20, left: 25 };
        width = +svg.attr("width") - margin.left - margin.right;
        height = +svg.attr("height") - margin.top - margin.bottom;
        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");   

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height,0]);
    
        if(this.state.displayedData==null){
            this.setData(this.props.data);
        }
        if(this.state.displayedData!=null){
            let data = this.state.displayedData;
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

    setData(data){
        if(data && data.length > 0){
            this.data = data;
            this.setState({
                displayedData:data
            });
        }
    }
    
    setDisplayedDateLimits(start,end){
        let data = this.data;
        let dataToBeDisplayed = data.filter(function(d){
            
            return d.expDate >= start && d.expDate<= end;
        });
        this.setState({
            displayedData: dataToBeDisplayed
        });

    }

    render() {
        return(
        <div></div>);
    }
}

Scatterplot.defaultProps = {
    height: 300,
  };

export default Scatterplot;
