import React, { Component } from 'react';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import Slider from './Slider/Slider'; 
import './Charts.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import {lsstEpoch} from '../Utils/Utils'

class Charts extends Component {

    constructor(props){
        super(props);
        var today = new Date();
        today.setDate(today.getDate() + 1);
        this.tomorrow=today;
        this.state={
            data: null, 
            start: new Date(), 
            end: today,
            startAt: new Date(),
            endAt: today,
            
        };
        this.margin={ top: 0, right: 40, bottom: 20, left: 120 }
        this.histogram = null;
        this.timeline = null;
        this.slider=null;
        this.g=null;
        this.svg=null;
        this.x=null;
        this.currentTime= 0;
        this.hiddenStyle = "visibility:hidden;";
        this.visibleStyle = "visibility:visible;";
        
    }

    setDate(start,end){
        if(this.props.mode==="playback"){
            this.setState({
                start: this.toDate(start),
                startAt: this.toDate(start),
                end:this.toDate(end),
                endAt:this.toDate(end),
            })
    
        }
       
    }

    setData(data){
        let newData = JSON.parse(JSON.stringify(data));
        newData.sort((a,b)=>{
            if(a.expDate > b.expDate) return 1;
            if(a.expDate < b.expDate) return -1;
            return 0;
        })

        newData.map((d)=>{
            // console.log("numeric", d.expDate)
            d.expDate=this.toDate(d.expDate);
            // console.log("date",d.expDate)
            return null;
        });
        if(data && data.length > 0){
            if(this.props.mode==="playback"){
                this.setState({
                    data:newData
                });
            }
            else{
                this.setState({
                    data:newData, 
                    start:newData[0].expDate, 
                    end:newData[newData.length-1].expDate,
                    startAt:newData[0].expDate,
                    endAt:newData[newData.length-1].expDate
                });
            }
           
            
        }
        else{
            this.setState({
                data:null, 
                start:new Date(), 
                end: this.tomorrow,
                startAt:new Date(),
                endAt:this.tomorrow
            });
        }
        var dom = ReactDOM.findDOMNode(this);
        this.slider.updateSlider(dom, true);
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

    setSelection = (startAt, endAt)=>{
        this.setState({
            startAt: startAt,
            endAt: endAt
        })

    }

    createPBLine(){
        if(this.g==null){
            let dom = ReactDOM.findDOMNode(this);
            let svg = dom.childNodes[dom.childNodes.length-1];
            let width = dom.offsetWidth;
            this.svg=svg;
            this.x= d3.scaleTime().domain([this.state.startAt, this.state.endAt])
            .range([this.margin.left,width-this.margin.right-15]);
          
            if(this.props.mode==="playback"){
                let g = d3.select(svg).append("g");
                this.g = g;
                let x = this.x(this.state.startAt);
                this.drawPBLine(x, this.state.startAt);
            }
        }
    }

    updatePBLine(currentTime){
        this.x.domain([this.state.startAt, this.state.endAt]);
        let x = this.x(currentTime);
       
        if(this.state.startAt<=currentTime && currentTime < this.state.endAt){
            this.togglePBLine(this.visibleStyle);
            this.movePBLine(x, currentTime);
        }
        else{
           this.togglePBLine(this.hiddenStyle);
        }
    }

    togglePBLine(style){
        this.g.select("#mainLine").attr("style",style);
        this.g.select("#topLine").attr("style",style);
        this.g.select("#bottomLine").attr("style",style);
        this.g.select("#lineText").attr("style",style);
    }

    movePBLine(x, date){
        this.g.select("#mainLine").transition().duration(1)
        .attr("x1",x)
        .attr("x2",x);

        this.g.select("#lineText").transition().duration(1)
        .attr("x",x-25)
        .text(date.toDateString());

        this.g.select("#topLine").transition().duration(1)
        .attr("x1",x-5)
        .attr("x2",x+5);

        this.g.select("#bottomLine").transition().duration(1)
        .attr("x1",x-5)
        .attr("x2",x+5);
    }

    drawPBLine(x, date){
        this.g.append("line")
        .attr("x1", x)
        .attr("y1", 20)
        .attr("x2", x)
        .attr("y2", 240)
        .attr("class", "pbLine")
        .attr("id","mainLine")

        this.g.append("text")
        .text(date.toDateString())
        .attr("x",x-25)
        .attr("y",15)
        .attr("class","pbText")
        .attr("id","lineText")

        this.g.append("line")
        .attr("x1", x-5)
        .attr("y1", 20)
        .attr("x2", x+5)
        .attr("y2", 20)
        .attr("class", "pbLine")
        .attr("id","topLine")

        this.g.append("line")
        .attr("x1", x-5)
        .attr("y1", 240)
        .attr("x2", x+5)
        .attr("y2", 240)
        .attr("class", "pbLine")
        .attr("id","bottomLine")
    }
    
    componentDidUpdate(){
        this.createPBLine();        
    }

    setDisplayedDateLimits(end){
        let newDate = (end.getTime()*1000+lsstEpoch);
        this.updatePBLine(new Date(newDate));
    }

    render() {
        return (
            <div className = "charts-container" >
                <h5>Date-range summary</h5>
                    <Slider ref={instance => { this.slider = instance; }}
                     start={this.state.start} end={this.state.end} margin={this.margin} setExtent={this.setSelection}/>
                    <Histogram ref={instance => { this.histogram = instance; }} 
                    data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks} margin={this.margin}/>
                    <Timeline ref={instance => { this.timeline = instance; }}
                     data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks} margin={this.margin}/>

                    <svg id="charts" className="d3 charts" width="100%" height="280px"></svg>
                     
            </div>
        );
    }
    
}
  

export default Charts;
