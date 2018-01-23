import React, { Component } from 'react';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import Slider from './Slider/Slider'; 
import './Charts.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import {lsstEpoch} from '../Utils/Utils'
import {lsstToJs} from '../Utils/Utils'


class Charts extends Component {

    constructor(props){
        super(props);
        var today = new Date();
        today.setDate(today.getDate() + 1);
        this.tomorrow=today;
        // this.state={
        //     data: null,        
        // };
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

    // setDate(start,end){
    //     if(this.props.mode==="playback"){
    //         this.setState({
    //             start: new Date(lsstToJs(start)),
    //             startAt: new Date(lsstToJs(start)),
    //             end:new Date(lsstToJs(end)),
    //             endAt:new Date(lsstToJs(end)),
    //         })
    //         if(this.g){
    //             this.g.remove();
    //             this.g=null;
    //         }
    //     }
       
    // }

    setData(){
        // let newData = JSON.parse(JSON.stringify(data));
        // let newData = data;
        // newData.sort((a,b)=>{
        //     if(a.expDate > b.expDate) return 1;
        //     if(a.expDate < b.expDate) return -1;
        //     return 0;
        // });

        // convert dates from numeric to Date objects
        // newData.map((d)=>{
        //     d.expDate = new Date(lsstToJs(d.expDate));
        //     return null;
        // });
        // if(data && data.length > 0){
            // if(this.props.mode==="playback"){
            //     this.setState({
            //         data:newData
            //     });
            // }
            // else{
            //     this.setState({
            //         data:newData, 
            //         start:newData[0].expDate, 
            //         end:newData[newData.length-1].expDate,
            //         startAt:newData[0].expDate,
            //         endAt:newData[newData.length-1].expDate
            //     });
            // }
           
            
        // }
        // else{
            // this.setState({
            //     data:null, 
            //     start:new Date(), 
            //     end: this.tomorrow,
            //     startAt:new Date(),
            //     endAt:this.tomorrow
            // });
        // }
        var dom = ReactDOM.findDOMNode(this);
        this.slider.updateSlider(dom, true);
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
            this.x= d3.scaleTime().domain([this.props.startDate, this.props.endDate])
            .range([this.margin.left,width-this.margin.right-15]);
          
            if(this.props.mode==="playback"){
                let g = d3.select(svg).append("g");
                this.g = g;
                let x = this.x(this.props.startDate);
                this.drawPBLine(x, this.props.startDate);
            }
        }
    }

    updatePBLine(currentTime){
        this.x.domain([this.props.startDate, this.props.endDate]);
        let x = this.x(currentTime);
       
        if(this.props.startDate<=currentTime && currentTime < this.props.endDate){
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
        let start = this.props.startDate;
        let end = this.props.endDate;
        let delta = (end-start)/1000 //seconds elapsed between the two dates
        let wheelDirection = event.deltaY/Math.abs(event.deltaY)
        let change = (delta/10)*(wheelDirection)
        
        start.setSeconds(start.getSeconds()-change);
        end.setSeconds(end.getSeconds()+change);
        if(start > this.props.startDate && end < this.props.endDate && delta > 60){
            this.setSelection(start,end);
            this.slider.setSelection(start,end);
        }
        else if(start <= this.props.startDate || end >= this.props.endDate){
            this.setSelection(this.props.startDate, this.props.endDate);
            this.slider.setSelection();
        }
    }

    render() {

        if(this.props.mode==="playback"){
        //     // this.setState({
        //     //     start: new Date(lsstToJs(this.props.startDate)),
        //     //     startAt: new Date(lsstToJs(this.props.startDate)),
        //     //     end:new Date(lsstToJs(this.props.endDate)),
        //     //     endAt:new Date(lsstToJs(this.props.endDate)),
        //     // })
            if(this.g){
                this.g.remove();
                this.g=null;
            }
        }
       
        return (
            <div className = "charts-container" onDrag={()=> this.handleDrag()} onWheel={(e)=> this.handleZoom(e)}>
                <h5>Date-range summary</h5>
                    <Slider ref={instance => { this.slider = instance; }}
                     start={this.props.startDate}
                     end={this.props.endDate}
                     margin={this.margin}
                     setExtent={this.setSelection}/>
                    
                    <Histogram ref={instance => { this.histogram = instance; }} 
                    data={this.props.data}
                    start={this.props.startDate}
                    end={this.props.endDate}
                    ticks={this.ticks}
                    margin={this.margin}/>
                    
                    <Timeline ref={instance => { this.timeline = instance; }}
                     data={this.props.data}
                     start={this.props.startDate}
                     end={this.props.endDate}
                     ticks={this.ticks}
                     margin={this.margin}/>

                    <svg id="charts" className="d3 charts" width="100%" height="280px"></svg>
                     
            </div>
        );
    }
    
}
  

export default Charts;
