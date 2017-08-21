import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import Histogram from '../HistogramD3/Histogram';
import Timeline from '../Timeline/Timeline';
import './Charts.css';

class Charts extends Component {
    
    randomData(length, start, end) {
        var array = new Array(length);
        let today = new Date();
        today.setHours(21);
        today.setSeconds(0);
        let secs = 0;
        let hrs = 0;
        for (let i = 0; i < length; i++) {
            today.setSeconds(secs);
            array[i] = {
                expDate: new Date(today.valueOf()),
                expTime: Math.random()*20,
                filter: Math.floor(Math.random()*6)+1,
                st: Math.floor(Math.random()*5)+1
            };
            if(secs == 60) secs = 20;
            else{
                secs=secs+20;
            } 
        }
        return array;
    }
      
    render() {
        var today = new Date();
        today.setDate(today.getDate() - 1);
        var data = this.randomData(1500, today, new Date());
        data.forEach(function(d){
            // console.log(d);
        })
        return (
            <div className="charts-container">
                <div className="histogram-container">
                    {/* <Histogram data={data}/> */}
                </div>
                <div className="timeline-container">
                     <Timeline data={data}/>
                </div>
            </div>
        );
    }
}

export default Charts;
