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

    componentDidMount(){
        let width = this.props.width,
            height = this.props.height;
        let margin = this.props.margin;
        let xLabel = this.props.xLabel;
        let yLabel = this.props.yLabel;
        let svg = d3.select("#"+this.props.id);
        let domain = this.getDomain();
        let x = this.getScale(domain, width);
        let bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(this.props.nBins))(this.props.data);

        let y = d3.scaleLinear().nice()
            .domain([0, d3.max(bins, function(d) { return d.length; })])
            .range([height, 0]);

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("id", this.props.id+"-xAxis")
            .call(d3.axisBottom(x).ticks(this.props.nTicks));

        // add the y Axis
        svg.append("g")
            .attr("id", this.props.id+"-yAxis")
            .call(d3.axisLeft(y).ticks(this.props.nTicks));

        let xAxis = d3.select("#"+this.props.id+"-xAxis");
        let yAxis = d3.select("#"+this.props.id+"-yAxis");

        xAxis.append("text")
            .attr("transform",
            "translate(" + (width/2) + " ," + 
                        (0 + margin/3) + ")")
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(xLabel);


        yAxis.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin/1.5)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yLabel);
    }

    getDomain() {
        let domain = this.props.domain;
        if(!this.props.domain){
            let domainMax = d3.max(this.props.data);
            let domainMin = d3.min(this.props.data);
            domain = [domainMin*0.9, domainMax*1.1];
            if(this.props.data.length === 0 || this.props.data[0] === undefined){
                domain = [1, 1];
            }
        }
        return domain;
    }

    getScale(domain, width) {
        let x;
        if(this.props.logScale)
            x = d3.scaleLog()
                .domain(domain)
                .rangeRound([0, width]);
        else
            x = d3.scaleLinear()
                .domain(domain)
                .rangeRound([0, width]);
        return x;
    }

    render() {
        let width = this.props.width,
            height = this.props.height;
        let domain = this.getDomain();
        
        let x = this.getScale(domain, width);
        let bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(this.props.nBins))(this.props.data);
        let y = d3.scaleLinear().nice()
                .domain([0, d3.max(bins, function(d) { return d.length; })])
                .range([height, 0]);
        let latest = this.props.data[0];


        d3.select('#'+this.props.id+"-xAxis").call(d3.axisBottom(x).ticks(this.props.nTicks, this.props.logScale ? ",.1s" : "d"));
        d3.select('#'+this.props.id+"-yAxis").call(d3.axisLeft(y).ticks(this.props.nTicks));
        return (
            <div>
                <svg id={this.props.id} className='histogram' width={width+this.props.margin} height={height+this.props.margin}>
                    {
                        bins.map( (d, i) => {
                            let rectFill = '';
                            if(d.x0 < latest && d.x1 > latest)
                                rectFill = 'latest'
                            return (
                                <rect key={i} className="bar" x="1" transform={"translate(" + x(d.x0) + "," + y(d.length) + ")"} 
                                    width={Math.max(0, x(d.x1) - x(d.x0))} height={this.props.height - y(d.length)} fill={rectFill}></rect>
                            )
                        })
                    }
                </svg>
            </div>
        );
    }
}


export default GenericHistogram;