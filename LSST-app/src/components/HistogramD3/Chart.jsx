import React, { Component } from 'react'
import * as d3 from 'd3';
// import { scaleBand, scaleLinear } from 'd3-scale'
import ReactDOM from 'react-dom';
import './Chart.css'



class Chart extends Component {

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  randomData(length, start, end) {
    var array = new Array(length);
    for (let i = 0; i < length; i++) {
      array[i] = { date: this.randomDate(start, end), value: Math.floor(Math.random() * 6) + 1 };
    }
    return array;
  }

  createChart(dom, props) {
    var width = this.props.width;
    var height = this.props.height;
    var today = new Date();
    today.setDate(today.getDate() - 1);
    // console.log(yesterday);
    var data = this.randomData(1000, today, new Date())
    console.log(data);

    var formatCount = d3.format(",.0f");

    var svg = d3.select(dom).append('svg').attr('class', 'd3').attr('width', width).attr('height', height),
      margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleTime()
      .domain([today, new Date()])
      .rangeRound([0, width]);

    var bins = d3.histogram()
      .value(function (d) { return d.date; })
      .domain(x.domain())
      .thresholds(x.ticks(d3.utcHour))(data);

    var y = d3.scaleLinear().domain([0, d3.max(bins, (d) => { return d.length; })]).range([height, 0]);

    var bar = g.selectAll(".bar")
      .data(bins)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", (d) => { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

    bar.append("rect")
      .attr("x", 1)
      .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
      .attr("height", (d) => { return height - y(d.length); });

    bar.append("text")
      .attr("dy", ".75em")
      .attr("y", 6)
      .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
      .attr("text-anchor", "middle")
      .text(function (d) { return formatCount(d.length); });

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  }

  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    this.createChart(dom, this.props);
  }

  shouldComponentUpdate() {
    var dom = ReactDOM.findDOMNode(this);
    this.createChart(dom, this.props);
  }

  render() {
    return (
      <div>
        <h4> {this.props.title} </h4>
      </div>
    );
  }
}

Chart.defaultProps = {
  width: 1000,
  height: 400,
  title: '',
  Legend: true,

};

export default Chart;
