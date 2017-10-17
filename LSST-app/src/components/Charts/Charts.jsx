import React, { Component } from 'react';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import Slider from './Slider/Slider'; 
import './Charts.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';


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

    drawPBLine(){
        let dom = ReactDOM.findDOMNode(this);
        let svg = dom.childNodes[dom.childNodes.length-1];
        let width = dom.offsetWidth;
        this.svg=svg;
        this.x= d3.scaleTime().domain([this.state.startAt, this.state.endAt]).range([0,width]);
        
        
        if(this.props.mode==="playback"){
            let g = d3.select(svg).append("g");
            this.g = g;
            g.append("line")
            .attr("x1", this.x(this.state.startAt)+this.margin.left)
            .attr("y1", 10)
            .attr("x2", this.x(this.state.startAt)+this.margin.left)
            .attr("y2", 230)
            .attr("stroke", "white")
            .attr("height","100%")
            .attr("class", "pbline")
            
        }
    }

    updatePBLine(end){
        this.g.remove();
        let g = d3.select(this.svg).append("g");
        this.g = g;
        this.x.domain([this.state.startAt, this.state.endAt]);
        this.currentTime+=7;
        console.log(this.state.startAt)
        let newTime = this.state.startAt.setSeconds(this.state.startAt.getSeconds()+this.currentTime);
        let x = this.x(newTime)+this.currentTime+this.margin.left;
        
        g.append("line")
        .attr("x1", x)
        // .attr("x1", this.x(end)+this.margin.left)
        .attr("y1", 10)
        .attr("x2", x)
        // .attr("x2", this.x(end)+this.margin.left)
        .attr("y2", 230)
        .attr("stroke", "white")
        .attr("height","100%")
        .attr("class", "pbline")
        
    }

    componentDidMount() {
        this.drawPBLine();
    }

    setDisplayedDateLimits(end){
        this.updatePBLine(end)
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

                    <svg id="charts" className="d3 charts" width="100%" height="300px"></svg>
                     
            </div>
        );
    }
    
}
  

export default Charts;
