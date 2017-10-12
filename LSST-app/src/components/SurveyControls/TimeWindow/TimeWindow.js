import React, { Component } from 'react';
import './TimeWindow.css';

class TimeWindow extends Component {
    static timeWindowOptions = {
        "10s": 10,
        "1min": 60,
        "10min": 600,
        "1d": 24*60*60,
        "10d": 240*60*60,
        "1m": 720*60*60,
        "6m": 4320*60*60,
        "1y": 8640*60*60,
        "Max": Infinity,

    }
    constructor(props) {
        super(props);
        this.state = {
            timeWindow: TimeWindow.timeWindowOptions[Object.keys(TimeWindow.timeWindowOptions)[0]],
        }
    }

    setDate = () => {
        this.props.setDataByDate(this.state.startDate, this.state.endDate);
    }

    handleChange = (changeEvent) => {
        let tw = parseInt(changeEvent.target.value, 10)
        this.props.setTimeWindow(tw);
        this.setState({
            timeWindow: tw,
        })
    }

    render() {
        console.log(this.state.timeWindow)
        return (
            <div className="time-window">
                <div>
                    <h6>Time window</h6>
                </div>
                {
                    Object.keys(TimeWindow.timeWindowOptions).map((k, index) => {
                        return (
                            <label key={k} className="time-window-selection-label" htmlFor={k}>
                                <input className="time-window-selection-input" id={k} 
                                        checked={TimeWindow.timeWindowOptions[k]===this.state.timeWindow}
                                        type="radio" name="field" value={TimeWindow.timeWindowOptions[k]}
                                        onChange={this.handleChange}/>
                                <span className="time-window-selection-span">{k}</span>
                            </label>
                        );
                    })
                }
            </div>
        );
    }
}

export default TimeWindow;
