import React, { Component } from 'react'
import * as d3 from 'd3';
// import { scaleBand, scaleLinear } from 'd3-scale'
import ReactDOM from 'react-dom';
import './Timeline.css'
import { scienceProposals, lstToTypeOfScienceNumber } from "../Utils/Utils"


class Timeline extends Component {

  drawAxes(dom, lanes, y,x, yposition, width, xposition){

    dom.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (yposition-50) + ")")
    .attr("class", "yAxis")
    .call(d3.axisBottom(x).ticks(this.props.ticks));

    dom.append("g").selectAll(".laneText")
    .data(lanes)
    .enter().append("text")
    .text(function(d) {return d;})
    .attr("x", -15)
    .attr("y", function(d, i) {return y(i + .5);})
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");


    dom.append("g").selectAll(".laneLines")
    .data(lanes)
    .enter().append("line")
    .attr("x1", 0)
    .attr("y1", function(d,i) {return y(i)+1;})
    .attr("x2", width)
    .attr("y2", function(d,i) {return y(i)+1;})
    .attr("stroke", "lightgray")

  }

  createTimeline(dom, props) {
    let elem = ReactDOM.findDOMNode(this);
    let width = elem.offsetWidth;
    let lanes = scienceProposals,
    laneLength = lanes.length,
    data = this.adaptData(),
    m = [0, 40, 20, 120], //top right bottom left
    w = width - m[1] - m[3],
    h = props.height - m[0] - m[2],
    mainHeight = h  - 50;
    var y1 = d3.scaleLinear()
    .domain([0, laneLength])
    .range([0, mainHeight]);
    var chart = d3.select(dom)
    .append("svg")
    .attr("width", width)
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
      this.drawAxes(g,lanes,y1,x1,h,w,m[1]);

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
      var x = d3.scaleTime().domain([new Date(), today]).range([0,w]);
      this.drawAxes(g,lanes,y1,x,h,w,m[1]);
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
