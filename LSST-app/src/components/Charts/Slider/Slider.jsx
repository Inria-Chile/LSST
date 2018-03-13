import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Slider extends Component {

    constructor(props){
        super(props);
        var today = new Date();
        today.setDate(today.getDate() + 1);
        this.tomorrow=today;
        this.brush=null;
        this.ticks=5;
        this.x=null;
    }


    drawBackgoround(dom, width, height,x){
        dom.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width-this.props.margin.right+10)
        .attr("height", 50)
        .attr("class", "bckg");
    }

    createSlider(dom){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        width = width - this.props.margin.left - this.props.margin.right;
        var svg = d3.select(dom).append('svg').attr('class', 'd3 slider-container').attr('width', width).attr('height', 50);
        this.x= d3.scaleTime().domain([this.props.start, this.props.end]).range([0,width]);
        let x = this.x;
        svg.append("g")
        .attr("class", "x")
        .attr("transform", "translate(0," + 30 + ")")
        .call(d3.axisBottom(x).ticks(this.ticks));
        this.drawBackgoround(svg,elem.offsetWidth-130,elem.offsetHeight,x)
    }

    updateSlider(dom, dataUpdate){
        let elem = ReactDOM.findDOMNode(this);
        let width = elem.offsetWidth;
        width = width-this.props.margin.left-this.props.margin.right
        d3.select(dom).select('.x').remove();
        this.x = d3.scaleTime().domain([this.props.start, this.props.end]).range([0,width]);
        let x = this.x;
        var svg = d3.select(dom).select('.slider-container');
        var self = this;
        if(this.brush==null || dataUpdate){
            d3.select(dom).select('.brush').remove();
            this.brush = d3.brushX(x).on("brush", function(){
                var brushValues = d3.brushSelection(this);
                if (brushValues!=null){
                    self.props.setExtent(
                        x.invert(brushValues[0]),
                        x.invert(brushValues[1]));
                }
            });
            svg.append("g") 
            .attr("class", "brush")
            .call(this.brush)
            .call(this.brush.move,x.range());

        }
        svg.append("g")
        .attr("class", "x")
        .attr("transform", "translate(0," + 30 + ")")
        .call(d3.axisBottom(x).ticks(this.ticks));
    }

    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this);
        this.createSlider(dom);
    }

    componentDidUpdate(){
        var dom = ReactDOM.findDOMNode(this);
        this.updateSlider(dom);
    }

    setSelection(start,end){
        let x = this.x;
            var dom = ReactDOM.findDOMNode(this);
        if(start && end && this.x != null){
            d3.select(dom).select('.brush').call(this.brush.move, [x(start),x(end)])
        }
        else{
            d3.select(dom).select('.brush').call(this.brush.move, x.range())
        }
    }

    render() {
        return (
                <div style={{maxWidth: '1400px'}} className='slider-container-div' ref="container"></div>
        );
    }
    
}
  

export default Slider;
