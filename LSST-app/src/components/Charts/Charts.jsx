import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import './Charts.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
// import * as d3Axis from 'd3-axis';
// import { select as d3Select } from 'd3-selection'

class Charts extends Component {

    constructor(props){
        super(props);
        var today = new Date();
        today.setDate(today.getDate() + 1);
        // this.state={data: this.randomData(1500, this.props.start, this.props.end)};
        this.state={data: null, start: new Date(), end: today};
    
    }
    
    randomData(length, start, end) {
        var array = new Array(length);
        let today = new Date();
        today.setHours(21);
        today.setSeconds(0);
        let secs = 0;
        for (let i = 0; i < length; i++) {
            today.setSeconds(secs);
            array[i] = {
                expDate: new Date(today.valueOf()),
                expTime: Math.random()*20,
                filterName: Math.floor(Math.random()*6)+1,
                lst: Math.floor(Math.random()*5)+1
            };
            if(secs === 60) secs = 20;
            else{
                secs=secs+20;
            } 
        }
        return array;
    }

    createSlider(dom){
        var svg = d3.select(dom).append('svg').attr('class', 'd3 slider-container').attr('width', this.props.width).attr('height', 30);
        var margin = { top: 10, right: 10, bottom: 10, left: 10 };
        var width = +svg.attr("width") - margin.left - margin.right;
        // var height = +svg.attr("height") - margin.top - margin.bottom;
        var g = svg.append("g").attr('class', 'slider').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var x = d3.scaleTime().domain([this.state.start, this.state.end]).range([0,width]);
        g.append("g")
        .attr("class", "x")
        .call(d3.axisBottom(x).ticks(10));

        // var brush = d3.brushX();
        // svg.append("g")
        // .attr("class", "brush")
        // .call(brush);
    }



    updateSlider(dom){
        d3.select(dom).select('.x').remove();
        d3.select(dom).select('.brush').remove();
        var g = d3.select(dom).select(".slider");
        var x = d3.scaleTime().domain([this.state.start, this.state.end]).range([0,this.props.width]);
        g.append("g")
        .attr("class", "x")
        .attr("transform", "translate(0," + this.props.height-15 + ")")
        .call(d3.axisBottom(x).ticks(10));

        var brush = d3.brushX();
        var svg = d3.select(dom).select('.slider-container');
        svg.append("g")
        .attr("class", "brush")
        .call(brush);
    }

    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this);
        this.createSlider(dom);
    }

    componentDidUpdate(){
        var dom = ReactDOM.findDOMNode(this);
        this.updateSlider(dom);
    }


    setData(data){
        let newData = JSON.parse(JSON.stringify(data));
        newData.sort((a,b)=>{
            if(a.expDate > b.expDate) return 1;
            if(a.expDate < b.expDate) return -1;
            return 0;
        })

        newData.map((d)=>{
            d.expDate=this.toDate(d.expDate);
            return null;
        });
        if(data && data.length > 0){
            this.setState({
                data:newData, 
                start:newData[0].expDate, 
                end:newData[newData.length-1].expDate 
            });
        }
        // this.props.data = data;
        // console.log('newData', newData);
    }

    // Date comes from database as number and as MJD.
    // This function is meant to make the numerical date 
    // (number of seconds since 1994-01-01 00:00:00 UTC. *allegedly*) match that of the MJV
    toDate(numberDate){
        var date = new Date(1994,0,1);
        let seconds = date.getSeconds() + numberDate;
        date.setSeconds(seconds);
        return date;
    }

    render() {
        return (
            <div className="charts-container">
                <div className="histogram-container">
                    <Histogram data={this.state.data}/>
                </div>
                <div className="timeline-container">
                     <Timeline data={this.state.data}/>
                </div>
            </div>
        );
    }
    
}


Charts.defaultProps = {
    width: 1000,
    height: 700,
    title: ''
  };
  

export default Charts;
