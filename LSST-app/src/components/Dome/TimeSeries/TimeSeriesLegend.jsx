import React, { PureComponent } from 'react'
import './TimeSeriesLegend.css';


class TimeSeriesLegend extends PureComponent {
    static LineColors = {
        'azimuth': '#ddd', 
        'target': '#5e8ba9', 
        'optimal': '#5e8ba9'
    }

    render() {
        return (
            <div className='timeseries-legend'>
                {this.props.legendData.map((element) => {
                    return (
                        <div key={element.label} className='timeseries-legend-element'>
                            <svg height="30" width="40">
                                <line x1="0" y1="15" x2="35" y2="15" style={{stroke: element.color, strokeDasharray: element.lineDash, strokeWidth:7}}/> 
                            </svg> 
                            <span>
                                {element.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        );
    }
}


export default TimeSeriesLegend;