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
        this.margin={ top: 10, right: 30, bottom: 20, left: 120 }
         
    }

    createSlider(dom){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        width = width - this.margin.left - this.margin.right;
        var svg = d3.select(dom).append('svg').attr('class', 'd3 slider-container').attr('width', width).attr('height', 50);

        // var g = svg.append("g").attr('class', 'slider')
        var x = d3.scaleTime().domain([this.state.start, this.state.end]).range([0,width]);
        svg.append("g")
        .attr("class", "x")
        .attr("transform", "translate(0," + 30 + ")")
        .call(d3.axisBottom(x).ticks(this.ticks));
    }

    updateSlider(dom, dataUpdate){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        width = width-this.props.margin.left-this.props.margin.right
        d3.select(dom).select('.x').remove();
        var x = d3.scaleTime().domain([this.state.start, this.state.end]).range([0,width]);
        var svg = d3.select(dom).select('.slider-container');
        var self = this;
        if(this.brush==null || dataUpdate){
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

            svg.append("g") 
            .attr("class", "brush")
            .call(this.brush);

        }
        svg.append("g")
        .attr("class", "x")
        .attr("transform", "translate(0," + 30 + ")")
        .call(d3.axisBottom(x).ticks(this.ticks));
       
    }

    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this);
        var child = dom.childNodes[1].childNodes;
        this.createSlider(child[0]);
    }

    componentDidUpdate(){
        var dom = ReactDOM.findDOMNode(this);
        var child = dom.childNodes[1].childNodes;
        this.updateSlider(child[0], false);
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
            // console.log(data);
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
    // (number of seconds since 1994-01-01 00:00:00 UTC.) match that of the MJV
    toDate(numberDate){
        var date = new Date(1994,0,1);
        let seconds = date.getSeconds() + numberDate;
        date.setSeconds(seconds);
        return date;
    }

    render() {
        return (
            // <div class="row">
            <div className = "charts-container" >
                <h5>Date-range summary</h5>
                <div className="row"><div className="col-md-12"></div></div>
                <div className="row">
                <div className="col-md-12 histogram-container">
                    <Histogram data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks} margin={this.margin}/>
                </div></div>
                <div className="row">
                <div className="col-md-12 timeline-container">
                     <Timeline data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks} margin={this.margin}/>
                </div></div>
                
            </div>
            // </div>
        );
    }
    
}
  

export default Charts;
