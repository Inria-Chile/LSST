import React, { Component } from 'react'
import * as d3 from 'd3';
// import { scaleBand, scaleLinear } from 'd3-scale'
import ReactDOM from 'react-dom';
import './Histogram.css'
import { filterColors } from "../Utils/Utils"



class Histogram extends Component {

  constructor(props){
    super(props);
    this.barSpacing = 0.015
     
}
  
  adaptData(data, xScale){
    if(data!=null){
      let newData = [];
      let date = null;
      let item ={
        date: null,
        U: 0,
        G: 0,
        R: 0,
        I: 0,
        Z: 0,
        Y: 0
      };
      data.forEach((d)=>{
        let itemDate = d.expDate;
        if(date==null){
         item.date = d.expDate
         this.addValueToFilter(item, d.filterName, d.expTime);
         date = d.expDate;
        }
        else if((itemDate.toDateString().localeCompare(date.toDateString()) === 0 && 
          itemDate.getHours() === date.getHours()) &&
          itemDate.getMinutes() === date.getMinutes()){
          this.addValueToFilter(item, d.filterName, d.expTime);
        }
        else{
          let newItem ={
            date: item.date,
            U: item.U,
            G: item.G,
            R: item.R,
            I: item.I,
            Z: item.Z,
            Y: item.Y
          };
          newData.push(newItem);
          item ={
            date: d.expDate,
            U: 0,
            G: 0,
            R: 0,
            I: 0,
            Z: 0,
            Y: 0
          };
          date=d.expDate;
          this.addValueToFilter(item, d.filterName, d.expTime);
        }
      });
      newData.push(item);
      // console.log(newData[1]);
      return newData;
    }
    return null;
  }

  adaptData2(data, xScale){
      let newData = [];
      let date = null;
      let item ={
        date: null,
        U: 0,
        G: 0,
        R: 0,
        I: 0,
        Z: 0,
        Y: 0
      };
      data.forEach((d)=>{
        let itemDate = d.expDate;
        if(date==null){
         item.date = d.expDate
         this.addValueToFilter(item, d.filterName, d.expTime);
         date = d.expDate;
        }
        else if(this.barsTouch(date,itemDate, xScale)){
          this.addValueToFilter(item, d.filterName, d.expTime);
        }
        else{
          let newItem ={
            date: item.date,
            U: item.U,
            G: item.G,
            R: item.R,
            I: item.I,
            Z: item.Z,
            Y: item.Y
          };
          newData.push(newItem);
          item ={
            date: d.expDate,
            U: 0,
            G: 0,
            R: 0,
            I: 0,
            Z: 0,
            Y: 0
          };
          date=d.expDate;
          this.addValueToFilter(item, d.filterName, d.expTime);
        }
      });
      newData.push(item);
      // console.log(newData[1]);
      return newData;
  }

  barsTouch(prevDate, nextDate, xScale){
    let prevPosition = xScale(prevDate);
    let nextPosition = xScale(nextDate);
    console.log("prev",prevPosition);
    console.log("next",nextPosition);
    console.log("diff",nextPosition-prevPosition);
    if((nextPosition-prevPosition)<=this.barSpacing) return true;
    else return false;
  }

  addValueToFilter(item,filter,value){
    switch(filter){
      case 1:
        item.U += value;
        break;
      case 2:
        item.G += value;
        break;
      case 3:
        item.R += value;
        break;
      case 4:
        item.I += value;
        break;
      case 5:
        item.Z += value;
        break;
      case 6:
        item.Y += value;
        break;
      case 'u':
        item.U += value;
        break;
      case 'g':
        item.G += value;
        break;
      case 'r':
        item.R += value;
        break;
      case 'i':
        item.I += value;
        break;
      case 'z':
        item.Z += value;
        break;
      case 'y':
        item.Y += value;
        break;
      default:
        break;
    }
  }

  drawAxes(dom,yPosition,xticks,yticks,x,y){
    dom.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + yPosition + ")")
    .call(d3.axisBottom(x).ticks(xticks));
    dom.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y).tickValues(yticks));
  }

  createStackedHistogram(dom, props) {
    var height = this.props.height;
    let elem = ReactDOM.findDOMNode(this);
    let width = elem.offsetWidth;
    var svg = d3.select(dom).append('svg').attr('class', 'd3').attr('width', width).attr('height', height);
    var margin = { top: 0, right: 15, bottom: 20, left: 120 };
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x,y,xticks,yticks;
    var start = this.props.start;
    var end = this.props.end;
    x = d3.scaleTime().domain([start, end]);  
    let data = this.props.data;
    if(data!=null){
      let filteredData = data.filter(function(d){
        return d.expDate >= start && d.expDate<= end;
      });  
      let newData = this.adaptData2(filteredData, x);
      
      var keys = ["U", "G", "R", "I","Z", "Y"];
       y = d3.scaleLinear().range([height, 0]);
      var z = d3.scaleOrdinal()
        .range(Object.values(filterColors)).domain(keys);
      
      var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);


      var series = stack(newData);

      var ydom = d3.max(series[series.length - 1], function (d) {return  d[1]; });
      y.domain([0, ydom]).nice();
  
      var layer = svg.selectAll(".layer")
        .data(series)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function (d, i) { return z(i); });
  
      x.range([0,width]);
      layer.selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) {
          return margin.left + x(d.data.date);
        })
        .attr("y", function (d) { 
          return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", function(d){return 10;});
        
       yticks = [0,ydom/5, 2*ydom/5, 3*ydom/5, 4*ydom/5 ,ydom];
       xticks = 20;
       this.drawAxes(g,height,xticks,yticks,x,y);  


    }
    else{
      var today = new Date();
      today.setDate(today.getDate() + 1);
       x = d3.scaleTime().domain([new Date(), today]).range([0,width]);
       y = d3.scaleLinear().range([height, 0]); 
       xticks = 10;
       yticks =5;
      this.drawAxes(g,height,xticks,yticks,x,y);  
    }
    
  }

  removeHistogram(dom){
    d3.select(dom).select('svg').remove();
  }

  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    this.createStackedHistogram(dom, this.props);
  }

  componentDidUpdate(){
    var dom = ReactDOM.findDOMNode(this);
    this.removeHistogram(dom);    
    this.createStackedHistogram(dom, this.props);
  }

  
  render() {
    // let data = this.props.data;
    return (
      <div ref="container">
        <h4> {this.props.title} </h4>
      </div>
    );
  }
}

Histogram.defaultProps = {
  height: 100,
  title: '',
  Legend: true,

};

export default Histogram;
