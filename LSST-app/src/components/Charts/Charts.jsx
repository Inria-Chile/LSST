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
            pb: true
        };
        this.margin={ top: 0, right: 40, bottom: 20, left: 120 }
        this.histogram = null;
        this.timeline = null;
        this.slider=null;
         
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
            console.log(newData[0])
            console.log(newData[newData.length-1])
            
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

    // drawPBLine(dom){
    //     if(this.state.pb){
    //         let height = dom.offsetHeight;
    //         let svg = d3.select("svg");
    //         console.log(svg)
    //         svg.append("line")
    //         .attr("x1", 10)
    //         .attr("y1", 10)
    //         .attr("x2", 10)
    //         .attr("y2", 100)
    //         .attr("stroke", "white")
    //         .attr("height","100%")
    //         .attr("transform", "translate(" +100 + "," + -50 + ")");
            
    //     }
    // }

    // componentDidMount() {
    //     var dom = ReactDOM.findDOMNode(this);
    //     console.log(dom)
    //     this.drawPBLine(dom);
    //   }



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

                    <svg id="charts" className="d3 charts" width="100%" height="250px"></svg>
                     
            </div>
        );
    }
    
}
  

export default Charts;
