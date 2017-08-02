import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Skymap from '../Skymap/Skymap';
import MainSkymap from '../Skymap/MainSkymap';
import MiniSkymaps from '../Skymap/MiniSkymaps';
import Chart from '../HistogramD3/Chart';
import './Survey.css';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.children = [];
    }

    drawFrame = (timestamp) => {
        // console.log('Parent Drawframe')
        this.children.forEach(function (child) {
            child.drawFrame(timestamp);
        });
        requestAnimationFrame(this.drawFrame);
    }

    componentDidMount() {
        requestAnimationFrame(this.drawFrame);
    }

    render() {
        return (
            <div className="survey-container">
                 <Chart />
                 {/* <MainSkymap ref={instance => { this.children.push(instance); }} />  */}
                 {/* <MiniSkymaps ref={instance => { this.children.push(instance); }} />  */}
            </div>
        );
    }
}

export default Survey;
