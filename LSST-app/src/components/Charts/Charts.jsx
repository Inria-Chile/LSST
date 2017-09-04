import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import './Charts.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection'

class Charts extends Component {
    
    randomData(length, start, end) {
        var array = new Array(length);
        let today = new Date();
        today.setHours(21);
        today.setSeconds(0);
        let secs = 0;
        let hrs = 0;
        for (let i = 0; i < length; i++) {
            today.setSeconds(secs);
            array[i] = {
                expDate: new Date(today.valueOf()),
                expTime: Math.random()*20,
                filter: Math.floor(Math.random()*6)+1,
                st: Math.floor(Math.random()*5)+1
            };
            if(secs == 60) secs = 20;
            else{
                secs=secs+20;
            } 
        }
        return array;
    }

    createSlider(dom, props){
        var svg = d3.select(dom).append('svg').attr('class', 'd3').attr('width', this.props.width).attr('height', 30);
        var margin = { top: 10, right: 10, bottom: 10, left: 10 };
        var width = +svg.attr("width") - margin.left - margin.right;
        var height = +svg.attr("height") - margin.top - margin.bottom;
        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var x = d3.scaleTime().domain([this.props.start, this.props.end]).range([0,width]);
        g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height-15 + ")")
        .call(d3.axisBottom(x).ticks(d3.utcHour));

  
    }

    componentDidMount() {
        var dom = ReactDOM.findDOMNode(this);
        this.createSlider(dom, this.props);
            
    }


    setData(data){
        this.data = data;
        console.log(data);
    }
      
    render() {
        var today = new Date();
        today.setDate(today.getDate() - 1);
        var data = this.randomData(1500, this.props.start, this.props.end);
        return (
            <div className="charts-container">
                <div className="histogram-container">
                    <Histogram data={data}/>
                </div>
                <div className="timeline-container">
                     <Timeline data={data}/>
                </div>
            </div>
        );
    }
    
}

var today = new Date();
today.setDate(today.getDate() - 1);

Charts.defaultProps = {
    width: 1000,
    height: 500,
    title: '',
    start: today,
    end: new Date(),
    data: null
  };
  

export default Charts;
