import React, { PureComponent } from 'react'
import './GenericHistogram.css';
import * as d3 from 'd3';

class GenericHistogram extends PureComponent {
    
    // - total number of visits
    // - date/time of last visit
    // - histograms with number of visits in each filter
    // - airmass histogram (highlight most recent/current observation with a vertical line)
    // - histogram of seeing values (highlight most recent/current observation with a vertical line)
    // - histogram of rotation angle of observations
    // - histogram of number of alerts issued for this field (moving, variable, outburst, new , vanished)
    // - sky brightness histogram 
    // - histogram of time baselines (i.e., time between visits)

    constructor(props){
        super(props);
        this.data = props.data;
        let width = props.width,
            height = props.height;

        let x = d3.scaleLinear()
            .domain(this.props.domain)
            .rangeRound([0, width]);

        let bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(this.props.nBins))(this.data);

        console.log('bins', bins)
        this.state = {
            width: width,
            height: height,
            bins: bins,
            x: x,
            y: () => 0
        }
    }

    componentDidMount(){
        var svg = d3.select("#"+this.props.id),
            height = this.state.height;
        
        var x = this.state.x;
        
        var bins = this.state.bins;

        let y = d3.scaleLinear().nice()
            .domain([0, d3.max(bins, function(d) { return d.length; })])
            .range([height, 0]);

        this.setState({
            y: y
        })


        // add the x Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        console.log("d3.axisBottom(x)", d3.axisBottom(x))
        // add the y Axis
        svg.append("g")
        .call(d3.axisLeft(y));
    }

    render() {
        return (
            <div>
                <svg id={this.props.id} className='histogram' width={this.state.width+100} height={this.state.height+40}>
                    {
                        this.state.bins.map( (d, i) => {
                            return (
                                <rect key={i} className="bar" x="1" transform={"translate(" + this.state.x(d.x0) + "," + this.state.y(d.length) + ")"} 
                                    width={Math.max(0, this.state.x(d.x1) - this.state.x(d.x0) -1)} height={this.props.height - this.state.y(d.length)}></rect>
                            )
                        })
                    }
                </svg>
            </div>
        );
    }
}


export default GenericHistogram;