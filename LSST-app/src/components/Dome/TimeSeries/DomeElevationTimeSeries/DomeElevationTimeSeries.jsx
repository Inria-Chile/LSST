import React, { PureComponent } from 'react'
import { LineChart } from 'react-d3-components'
import * as d3 from 'd3';
// import rd3 from 'rd3';


class DomeElevationTimeSeries extends PureComponent {
    static LineColors = {
        'elevation': '#ddd', 
        'target': '#5e8ba9', 
        'optimal': '#3e6b89'
    }

    constructor(props) {
        super(props);
        let defaultData = [...Array(10).keys()].map( (el, i) => {
            return {x:new Date(new Date().getTime() - (10-i)*2000), y: 0};
        });
        this.state = {
            dataPoints: [],
            data: [
                { label: 'target', values: defaultData.slice()}, 
                { label: 'optimal', values: defaultData.slice()},
                { label: 'elevation', values: defaultData.slice()}, 
            ],
            xScale: d3.scaleTime().domain([new Date(), new Date()]).range([0, this.props.width - 70]),
            yScale: d3.scaleLinear().domain([90, 0]).range([0, this.props.height - 70]),
        };
        
        this.lineDash = {
            'elevation': '0', 
            'target': '0', 
            'optimal': '6'
        }
    }

    componentWillReceiveProps() {
        let newData = this.state.data;
        newData[0].values.push({x: new Date(), y: this.props.telescopeTargetElevation})
        newData[1].values.push({x: new Date(), y: this.props.telescopeOptimalElevation})
        newData[2].values.push({x: new Date(), y: this.props.telescopeElevation})
        
        for(let i=0; i<this.state.data.length; ++i){
            if (newData[i].values.length > 500)
                newData[i].values.shift();
        }
        this.setState({
            data: newData,
        })
    }

    render() {
        this.state.xScale.domain([this.state.data[0].values[0].x, new Date()]);
        return (
            <LineChart
                data={this.state.data}
                x={ x => x.x}
                y={ y => y.y}
                width={this.props.width}
                height={this.props.height}
                margin={{top: 10, bottom: 50, left: 50, right: 20}}
                xScale={this.state.xScale}
                yScale={this.state.yScale}
                colorScale={(label) => this.constructor.LineColors[label]}
                stroke={{strokeWidth: (label) => "3", strokeDasharray: (label) => this.lineDash[label]}}
                yAxis={{tickValues: [0,15,30,45,60,75,90], domain:[0,90]}}
                xAxis={{tickPadding:5, tickArguments: [5], tickFormat: (date) => date.toLocaleTimeString()}}
            />
        );
    }
}


export default DomeElevationTimeSeries;