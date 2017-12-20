import React, { Component } from 'react'
import * as d3 from 'd3';
import ReactDOM from 'react-dom';

class CameraCableWrap extends Component {

    constructor(props){
        super(props);
        this.g=null;
    }

    removeAZCableWrap(dom){
        this.g.remove();
    }

    createAZCableWrap(dom){
        let radio = 140;
        let width =  this.props.width;
        let height= this.props.height;

        let svg = d3.select(dom).append('svg').attr('class', 'd3').attr('width', width).attr('height', height);
        let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        this.g=g;
        let tau = (1/2)* Math.PI;
        let arc = d3.arc()
        .innerRadius(radio-10)
        .outerRadius(radio)
        .startAngle(-tau);
        this.arc=arc;
        this.props.drawBackground(g, radio, tau, arc);

    }

    componentDidMount() {
        var dom = ReactDOM.findDOMNode(this);
        this.createAZCableWrap(dom);
    }


    render() {
        return(
            <div ref="az-cable-wrap-container"></div>
        );
    }
}

export default CameraCableWrap;
