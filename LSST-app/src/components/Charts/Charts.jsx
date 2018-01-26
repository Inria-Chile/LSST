import React, { Component } from 'react';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import Slider from './Slider/Slider'; 
import './Charts.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import {lsstEpoch} from '../Utils/Utils'
import {lsstToJs} from '../Utils/Utils'
// import {lsstEpoch} from '../Utils/Utils'


class Charts extends Component {

    constructor(props){
        super(props);
        var today = new Date();
        today.setDate(today.getDate() + 1);
        this.tomorrow=today;
        this.state={
            data: null, 
            dataStart: new Date(), 
            dataEnd: today,
            timeWindowStart: new Date(),
            timeWindowEnd: today,
            
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
                dataStart: new Date(lsstToJs(start)),
                timeWindowStart: new Date(lsstToJs(start)),
                dataEnd:new Date(lsstToJs(end)),
                timeWindowEnd:new Date(lsstToJs(end)),
            })
            if(this.g){
                this.g.remove();
                this.g=null;
            }
        }
       
    }

    setData(data){
        // let data = data;
        if(data && data.length > 0){
            if(this.props.mode==="playback"){
                this.setState({
                    data:data
                });
            }
            else{
                this.setState({
                    data:data, 
                    dataStart:data[0].expDate, 
                    dataEnd:data[data.length-1].expDate,
                    timeWindowStart:data[0].expDate,
                    timeWindowEnd:data[data.length-1].expDate
                });
            }
           
            
        }
        else{
            this.setState({
                data:null, 
                dataStart:new Date(), 
                dataEnd: this.tomorrow,
                timeWindowStart:new Date(),
                timeWindowEnd:this.tomorrow
            });
        }
        var dom = ReactDOM.findDOMNode(this);
        this.slider.updateSlider(dom, true);
    }

    setSelection = (timeWindowStart, timeWindowEnd)=>{
        this.setState({
            timeWindowStart: timeWindowStart,
            timeWindowEnd: timeWindowEnd
        })

    }

    createPBLine(){
        if(this.g==null){
            let dom = ReactDOM.findDOMNode(this);
            let svg = dom.childNodes[dom.childNodes.length-1];
            let width = dom.offsetWidth;
            this.svg=svg;
            this.x= d3.scaleTime().domain([this.state.timeWindowStart, this.state.timeWindowEnd])
            .range([this.margin.left,width-this.margin.right-15]);
          
            if(this.props.mode==="playback"){
                let g = d3.select(svg).append("g");
                this.g = g;
                let x = this.x(this.state.timeWindowStart);
                this.drawPBLine(x, this.state.timeWindowStart);
            }
        }
    }

    updatePBLine(currentTime){
        this.x.domain([this.state.timeWindowStart, this.state.timeWindowEnd]);
        let x = this.x(currentTime);
       
        if(this.state.timeWindowStart<=currentTime && currentTime < this.state.timeWindowEnd){
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
        .attr("y",10)
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

    handleDrag(){
        // console.log("handle drag")
    }

    handleZoom(event){
        let timeWindowStart = this.state.timeWindowStart;
        let timeWindowEnd = this.state.timeWindowEnd;
        let delta = (this.state.timeWindowEnd-this.state.timeWindowStart)/1000 //seconds elapsed between the two dates
        let wheelDirection = event.deltaY/Math.abs(event.deltaY)
        let change = (delta/10)*(wheelDirection)
        
        timeWindowStart.setSeconds(timeWindowStart.getSeconds()-change);
        timeWindowEnd.setSeconds(timeWindowEnd.getSeconds()+change);
        
        if(timeWindowStart > this.state.dataStart && timeWindowEnd < this.state.dataEnd && delta > 60){
            this.setSelection(timeWindowStart,timeWindowEnd);
            this.slider.setSelection(timeWindowStart,timeWindowEnd);
        }
        else if(timeWindowStart <= this.state.dataStart || timeWindowEnd >= this.state.dataEnd){
            this.setSelection(this.state.dataStart, this.state.dataEnd);
            this.slider.setSelection();
        }
    }

    render() {

        return (
            <div className = "charts-container" onDrag={()=> this.handleDrag()} onWheel={(e)=> this.handleZoom(e)}>
                <h5>Date-range summary</h5>
                    <Slider ref={instance => { this.slider = instance; }}
                     start={this.state.dataStart} end={this.state.dataEnd} margin={this.margin} setExtent={this.setSelection}/>
                    <Histogram ref={instance => { this.histogram = instance; }} 
                    data={this.state.data} start={this.state.timeWindowStart} end={this.state.timeWindowEnd} ticks={this.ticks} margin={this.margin}/>
                    <Timeline ref={instance => { this.timeline = instance; }}
                     data={this.state.data} start={this.state.timeWindowStart} end={this.state.timeWindowEnd} ticks={this.ticks} margin={this.margin}/>

                    <svg id="charts" className="d3 charts" width="100%" height="280px"></svg>
                     
            </div>
        );
    }
    
}
  

export default Charts;
