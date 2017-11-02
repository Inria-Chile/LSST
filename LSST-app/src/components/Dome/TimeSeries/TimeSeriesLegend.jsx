import React, { PureComponent } from 'react'
import { LineChart } from 'react-d3-components'
import * as d3 from 'd3';
import './TimeSeriesLegend.css';


class TimeSeriesLegend extends PureComponent {
    static LineColors = {
        'azimuth': '#ddd', 
        'target': '#5e8ba9', 
        'optimal': '#5e8ba9'
    }
    
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: 'azimuth', color: 'red', lineDash: 0 }, 
                { label: 'target', color: 'blue', lineDash: 0 }, 
                { label: 'optimal', color: 'green', lineDash: 5 }, 
            ],
        };
    }

    render() {
        return (
            <div className='timeseries-legend'>
                {this.state.data.map((element) => {
                    return (
                        <div key={element.label} className='timeseries-legend-element'>
                            <svg height="30" width="40">
                                <line x1="0" y1="15" x2="30" y2="15" style={{stroke: element.color, strokeDasharray: element.lineDash, strokeWidth:5}}/> 
                            </svg> 
                            {element.label}
                        </div>
                    )
                })}
            </div>
        );
    }
}


export default TimeSeriesLegend;