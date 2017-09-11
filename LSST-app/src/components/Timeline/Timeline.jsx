import React, { Component } from 'react'
import * as d3 from 'd3';
// import { scaleBand, scaleLinear } from 'd3-scale'
import ReactDOM from 'react-dom';
import './Timeline.css'



class Timeline extends Component {

  drawAxes(dom, lanes, y,x, yposition, xposition, xticks){

    dom.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (yposition-50) + ")")
    .call(d3.axisBottom(x).ticks(xticks));

    dom.append("g").selectAll(".laneText")
    .data(lanes)
    .enter().append("text")
    .text(function(d) {return d;})
    .attr("x", -xposition)
    .attr("y", function(d, i) {return y(i + .5);})
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");


  }

  createTimeline(dom, props) {
    let elem = ReactDOM.findDOMNode(this);
    let width = elem.offsetWidth;
    var lanes = ["Dark Matter","Dark Energy","Solar System", "Changing Sky", "Milky Way"],
    laneLength = lanes.length,
    data = this.props.data,
    m = [20, 15, 15, 120], //top right bottom left
    w = width - m[1] - m[3],
    h = props.height - m[0] - m[2],
    mainHeight = h  - 50;
    var y1 = d3.scaleLinear()
    .domain([0, laneLength])
    .range([0, mainHeight]);
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

    if(data && data.length > 0){
      var start = this.props.start;
      var end = this.props.end;
      var x1 = d3.scaleTime().domain([start,end]).range([0,w]);
      this.drawAxes(g,lanes,y1,x1,h,m[1],10);
          g.append("g").selectAll(".laneLines")
    .data(data)
    .enter().append("line")
    .attr("x1", m[1])
    .attr("y1", function(d) {return y1(d.lst-2);})
    .attr("x2", w)
    .attr("y2", function(d) {return y1(d.lst-2);})
    .attr("stroke", "lightgray")
      var itemRects = g.append("g")
      .attr("clip-path", "url(#clip)");
        var rects = itemRects.selectAll("rect")
                .data(data);
    
    rects.enter().append("rect")
      .attr("class", function(d) {return "item" + (d.lst-1);})
      .attr("x", function(d) {
        return x1(d.expDate);
      })
      .attr("y", function(d) {return y1(d.lst-2) +2.5 ;})
      .attr("width", function(d) {
        var copiedDate = new Date(d.expDate.getTime());
        var seconds = copiedDate.getSeconds()+d.expTime;
        copiedDate.setSeconds(seconds);
        return (x1(copiedDate)-x1(d.expDate));
      }).attr("height", function(d) {return .8 * y1(1);});

    rects.exit().remove();
    }
    else{
      var today = new Date();
      today.setDate(today.getDate() + 1);
      var x = d3.scaleTime().domain([new Date(), today]).range([0,w]);
      // var xticks = d3.utcHour;
      // var xticks = d3.utcDay;
      this.drawAxes(g,lanes,y1,x,h,m[1],10);
    }
  }

  adaptData(){
    var data = this.props.data;
    if(data!=null){
      data.map((d)=>{
        var st = Math.floor(d.lst+1);
        if (st ===0) st = 1;
        d.lst = st;
        return null;
      });
    }
    //inventing science types from this unknown lst quantity

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

  height: 250,
  title: '',
  Legend: true,

};

export default Timeline;
