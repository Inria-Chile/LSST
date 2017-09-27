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
        this.state={
            data: null, 
            start: new Date(), 
            end: today,
            startAt: new Date(),
            endAt: today
        };
        this.brush=null;
        this.ticks=10;
         
    }

    createSlider(dom){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        width = width - this.props.margin.left - this.props.margin.right;
        var svg = d3.select(dom).append('svg').attr('class', 'd3 slider-container').attr('width', width).attr('height', 30);

        var g = svg.append("g").attr('class', 'slider')
        var x = d3.scaleTime().domain([this.state.start, this.state.end]).range([0,width]);
        g.append("g")
        .attr("class", "x")
        .call(d3.axisBottom(x).ticks(this.ticks));
    }

    updateSlider(dom, dataUpdate){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        width = width-this.props.margin.left-this.props.margin.right
        d3.select(dom).select('.x').remove();
        var g = d3.select(dom).select(".slider");
        var x = d3.scaleTime().domain([this.state.start, this.state.end]).range([0,width]);
        g.append("g")
        .attr("class", "x")
        .call(d3.axisBottom(x).ticks(this.ticks));
        var self = this;
        if(this.brush==null || dataUpdate){
            console.log("newBrush");
            console.log(this.brush)
            console.log(dataUpdate)
            d3.select(dom).select('.brush').remove();
            this.brush = d3.brushX(x).on("brush", function(){
                var brushValues = d3.brushSelection(this);
                if (brushValues!=null){
                    self.setState({
                        startAt: x.invert(brushValues[0]),
                        endAt:x.invert(brushValues[1])
                    });
                }
            });
            var svg = d3.select(dom).select('.slider-container');
            svg.append("g") 
            .attr("class", "brush")
            .call(this.brush);
        }
       
    }

    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this);
        this.createSlider(dom);
    }

    componentDidUpdate(){
        console.log("componentDidUpdate")
        var dom = ReactDOM.findDOMNode(this);
        this.updateSlider(dom, false);
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
                end:newData[newData.length-1].expDate,
                startAt:newData[0].expDate,
                endAt:newData[newData.length-1].expDate
            });
            
        }
        var dom = ReactDOM.findDOMNode(this);
        this.updateSlider(dom, true);
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
                    <Histogram data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks}/>
                </div>
                <div className="timeline-container">
                     <Timeline data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks}/>
                </div>
            </div>
        );
    }
    
}


Charts.defaultProps = {
    height: 700,
    margin: { top: 10, right: 10, bottom: 10, left: 120 }
  };
  

export default Charts;
