import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import Slider from './Slider/Slider'; 
import './Charts.css';
import ReactDOM from 'react-dom';
// import * as d3 from 'd3';
// import * as d3Axis from 'd3-axis';
// import { select as d3Select } from 'd3-selection'



class Charts extends PureComponent {

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
            endAt: today
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

    render() {
        return (
            <div className = "charts-container" >
                <h5>Date-range summary</h5>
                <div className="row">
                <div className="col-md-12 ">
                     <Slider ref={instance => { this.slider = instance; }}
                     start={this.state.start} end={this.state.end} margin={this.margin} setExtent={this.setSelection}/>
                </div></div>
                <div className="row">
                <div className="col-md-12 histogram-container">
                    <Histogram ref={instance => { this.histogram = instance; }} 
                    data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks} margin={this.margin}/>
                </div></div>
                <div className="row">
                <div className="col-md-12 timeline-container">
                     <Timeline ref={instance => { this.timeline = instance; }}
                     data={this.state.data} start={this.state.startAt} end={this.state.endAt} ticks={this.ticks} margin={this.margin}/>
                </div></div>

               
                
            </div>
        );
    }
    
}
  

export default Charts;
