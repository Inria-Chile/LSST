import React, { Component } from 'react'
import * as d3 from 'd3';
// import { scaleBand, scaleLinear } from 'd3-scale'
import ReactDOM from 'react-dom';
import './Timeline.css'
import { scienceProposals, lstToTypeOfScienceNumber } from "../Utils/Utils"


class Timeline extends Component {

  drawAxes(dom, lanes, y,x, height, width, start){

    dom.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (height-50) + ")")
    .attr("class", "xAxis")
    .call(d3.axisBottom(x)
    .tickValues(x.domain())
    .tickFormat((date)=>{
      return date.toLocaleDateString();
    }));

    dom.append("g").selectAll(".laneText")
    .data(lanes)
    .enter().append("text")
    .text(function(d) {return d;})
    .attr("x", -15)
    .attr("y", function(d, i) {return y(i + .5);})
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");

    dom.append("g").selectAll(".laneBckg")
    .data(lanes)
    .enter().append("rect")
    .attr("x", x(start))
    .attr("y", function(d,i){return y(i)})
    .attr("width", width)
    .attr("height", 14)
    .attr("class", "bckg");

    dom.append("line")
    .attr("x1", -5)
    .attr("y1", y(0))
    .attr("x2", -5)
    .attr("y2", y(5))
    .attr("stroke", "white")


  }

  createTimeline(dom, props) {
    let elem = ReactDOM.findDOMNode(this);
    // let width = elem.offsetWidth;
    let lanes = scienceProposals,
    laneLength = lanes.length,
    data = this.adaptData(),
    // m = [0, 40, 20, 120], //top right bottom left
    margin = this.props.margin,
    // w = width - m[1] - m[3],
    width = elem.offsetWidth - margin.right- margin.left,
    height = props.height - margin.top - margin.bottom,
    mainHeight = height  - 50;
    var y1 = d3.scaleLinear()
    .domain([0, laneLength])
    .range([0, mainHeight]);
    var chart = d3.select(dom)
    .append("svg")
    .attr("width", elem.offsetWidth)
    .attr("height", height)
    .attr("class", "chart");
    chart.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", mainHeight);
    
    var g = chart.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("width", width)
          .attr("height", mainHeight)
          .attr("class", "main");

    if(data && data.length > 0){
      var start = this.props.start;
      var end = this.props.end;
      var x1 = d3.scaleTime().domain([start,end]).range([0,width]);
      this.drawAxes(g,lanes,y1,x1,height,width,start);

      var itemRects = g.append("g")
      .attr("clip-path", "url(#clip)");
        var rects = itemRects.selectAll("rect")
                .data(data);
    
    rects.enter().append("rect")
      .attr("class", function(d) {return "item";})
      .attr("x", function(d) {
        return x1(new Date(d.expDate));
      })
      .attr("y", function(d) {return y1(d.lst)+1.3;})
      .attr("width", function(d) { 
        var copiedDate = new Date(new Date(d.expDate).getTime());
        var seconds = copiedDate.getSeconds()+d.expTime;
        copiedDate.setSeconds(seconds);
        return (x1(copiedDate)-x1(new Date(d.expDate)));
      }).attr("height", function(d) {return .8 * y1(1);});

    rects.exit().remove();
    }
    else{
      var today = new Date();
      today.setDate(today.getDate() + 1);
      var x = d3.scaleTime().domain([new Date(), today]).range([0,width]);
      this.drawAxes(g,lanes,y1,x,height,width, new Date());
    }
  }

  adaptData(){
    let data = JSON.parse(JSON.stringify(this.props.data));
    if(data!=null){
      data.map((d)=>{
        var st = lstToTypeOfScienceNumber(d.lst);
        d.lst = st;
        return null;
      });
    }
    return data;
    // console.log(data);
  }

  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    this.adaptData();
    this.createTimeline(dom, this.props);
  }

  componentDidUpdate(){
    var dom = ReactDOM.findDOMNode(this);
    this.adaptData();
    this.removeTimeline(dom);    
    this.createTimeline(dom, this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props && JSON.stringify(this.props) === JSON.stringify(nextProps)){//Component should not update
      return false;
    }
    return true;
  }

  removeTimeline(dom){
    d3.select(dom).select('svg').remove();
  }


  render() {
    return (
      <div ref="container">
        <h4> {this.props.title} </h4>
      </div>
    );
  }
}

Timeline.defaultProps = {
  height: 150,

};

export default Timeline;
