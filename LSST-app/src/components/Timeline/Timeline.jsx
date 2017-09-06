import React, { Component } from 'react'
import * as d3 from 'd3';
// import { scaleBand, scaleLinear } from 'd3-scale'
import ReactDOM from 'react-dom';
import './Timeline.css'



class Timeline extends Component {


  createTimeline(dom, props) {
    var lanes = ["Dark Matter","Dark Energy","Solar System", "Changing Sky", "Milky Way"],
    laneLength = lanes.length,
    data = this.props.data,
    m = [20, 15, 15, 120], //top right bottom left
    w = props.width - m[1] - m[3],
    h = props.height - m[0] - m[2],
    mainHeight = h  - 50;

var y1 = d3.scaleLinear()
    .domain([0, laneLength])
    .range([0, mainHeight]);

var start = data[0].expDate;
var end = data[data.length-1].expDate;
var x1 = d3.scaleTime().domain([start,end]).range([0,w]);

var chart = d3.select(dom)
      .append("svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h)
      .attr("class", "chart");

chart.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", w)
  .attr("height", mainHeight);

var g = chart.append("g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
      .attr("width", w)
      .attr("height", mainHeight)
      .attr("class", "main");

g.append("g").selectAll(".laneLines")
.data(data)
.enter().append("line")
.attr("x1", m[1])
.attr("y1", function(d) {return y1(d.lst);})
.attr("x2", w)
.attr("y2", function(d) {return y1(d.lst);})
.attr("stroke", "lightgray")

g.append("g").selectAll(".laneText")
.data(lanes)
.enter().append("text")
.text(function(d) {return d;})
.attr("x", -m[1])
.attr("y", function(d, i) {return y1(i + .5);})
.attr("dy", ".5ex")
.attr("text-anchor", "end")
.attr("class", "laneText");

var itemRects = g.append("g")
.attr("clip-path", "url(#clip)");
  var rects = itemRects.selectAll("rect")
          .data(data);
  
  rects.enter().append("rect")
    .attr("class", function(d) {return "item" + (d.lst-1);})
    .attr("x", function(d) {
      return x1(d.expDate);
    })
    .attr("y", function(d) {return y1(d.lst-1) +2.5 ;})
    .attr("width", function(d) {
      var copiedDate = new Date(d.expDate.getTime());
      var seconds = copiedDate.getSeconds()+d.expTime;
      copiedDate.setSeconds(seconds);
      return (x1(copiedDate)-x1(d.expDate))*2;
    }
    )
    .attr("height", function(d) {return .8 * y1(1);});

  rects.exit().remove();

  g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + (h-50) + ")")
  .call(d3.axisBottom(x1).ticks(d3.utcHour));
    
  }

  adaptData(){
    var data = this.props.data;
    //inventing science types from this unknown lst quantity
    data.map((d)=>{
      var st = Math.floor(d.lst+1);
      if (st ===0) st = 1;
      d.lst = st;
      return null;
    });
  }

  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    this.adaptData();
    this.createTimeline(dom, this.props);
        
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
  width: 1000,
  height: 200,
  title: '',
  Legend: true,

};

export default Timeline;
