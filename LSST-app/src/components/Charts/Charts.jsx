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
            selectionStart: new Date(),
            selectionEnd: today,
            
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
                selectionStart: new Date(lsstToJs(start)),
                dataEnd:new Date(lsstToJs(end)),
                selectionEnd:new Date(lsstToJs(end)),
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
                    selectionStart:data[0].expDate,
                    selectionEnd:data[data.length-1].expDate
                });
            }
           
            
        }
        else{
            this.setState({
                data:null, 
                dataStart:new Date(), 
                dataEnd: this.tomorrow,
                selectionStart:new Date(),
                selectionEnd:this.tomorrow
            });
        }
        var dom = ReactDOM.findDOMNode(this);
        this.slider.updateSlider(dom, true);
    }

    setSelection = (selectionStart, selectionEnd)=>{
        this.setState({
            selectionStart: selectionStart,
            selectionEnd: selectionEnd
        })

    }

    createPBLine(){
        if(this.g==null){
            let dom = ReactDOM.findDOMNode(this);
            let svg = dom.childNodes[dom.childNodes.length-1];
            let width = dom.offsetWidth;
            this.svg=svg;
            this.x= d3.scaleTime().domain([this.state.selectionStart, this.state.selectionEnd])
            .range([this.margin.left,width-this.margin.right-15]);
          
            if(this.props.mode==="playback"){
                let g = d3.select(svg).append("g");
                this.g = g;
                let x = this.x(this.state.selectionStart);
                this.drawPBLine(x, this.state.selectionStart);
            }
        }
    }

    updatePBLine(currentTime){
        this.x.domain([this.state.selectionStart, this.state.selectionEnd]);
        let x = this.x(currentTime);
       
        if(this.state.selectionStart<=currentTime && currentTime < this.state.selectionEnd){
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
        let selectionStart = this.state.selectionStart;
        let selectionEnd = this.state.selectionEnd;
        let delta = (this.state.selectionEnd-this.state.selectionStart)/1000 //seconds elapsed between the two dates
        let wheelDirection = event.deltaY/Math.abs(event.deltaY)
        let change = (delta/10)*(wheelDirection)
        
        selectionStart.setSeconds(selectionStart.getSeconds()-change);
        selectionEnd.setSeconds(selectionEnd.getSeconds()+change);
        
        if(selectionStart > this.state.dataStart && selectionEnd < this.state.dataEnd && delta > 60){
            this.setSelection(selectionStart,selectionEnd);
            // this.slider.setSelection(selectionStart,selectionEnd);
        }
        else if(selectionStart <= this.state.dataStart || selectionEnd >= this.state.dataEnd){
            this.setSelection(this.state.dataStart, this.state.dataEnd);
            // this.slider.setSelection();
        }


        // this.setState({
        //     selectionStart: selectionStart,
        //     selectionEnd: selectionEnd
        // });
    }

    render() {

        return (
            <div className = "charts-container" onDrag={()=> this.handleDrag()} onWheel={(e)=> this.handleZoom(e)}>
                <h5>Date-range summary</h5>
                    <Slider ref={instance => { this.slider = instance; }}
                     dataStart={this.state.dataStart}
                     dataEnd={this.state.dataEnd}
                     selectionStart={this.state.selectionStart}
                     selectionEnd={this.state.selectionEnd}
                     margin={this.margin}
                     setExtent={this.setSelection}
                    />
                    <Histogram ref={instance => { this.histogram = instance; }} 
                    data={this.state.data} start={this.state.selectionStart} end={this.state.selectionEnd} ticks={this.ticks} margin={this.margin}/>
                    <Timeline ref={instance => { this.timeline = instance; }}
                     data={this.state.data} start={this.state.selectionStart} end={this.state.selectionEnd} ticks={this.ticks} margin={this.margin}/>

                    <svg id="charts" className="d3 charts" width="100%" height="280px"></svg>
                     
            </div>
        );
    }
    
}
  

export default Charts;
