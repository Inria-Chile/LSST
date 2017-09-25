import React, { Component } from 'react'
import './M1M3.css';
import { checkStatus, parseJSON } from "../Utils/Utils"
import * as d3 from 'd3';

class M1M3 extends Component {

  constructor(props){
    super(props);
    this.data = [];
    this.state = {
        data: [],
        xRadius: 0,
        yRadius: 0,
        maxRadius: 0
    }
    fetch('m1m3/actuators', {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
        let yMax = -Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let xMin = Infinity;
        let maxRadius = 0;
        data.results.forEach(act => {
            if(xMax < act.position[0])
                xMax = act.position[0];
            if(xMin > act.position[0])
                xMin = act.position[0];
            if(yMax < act.position[1])
                yMax = act.position[1];
            if(yMin > act.position[1])
                yMin = act.position[1];
            if(maxRadius < Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2)))
                maxRadius = Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2));
        });
        this.setState({
            data: data.results,
            xRadius: (xMax - xMin)/2,
            yRadius: (yMax - yMin)/2,
            maxRadius: maxRadius
        })
    });
  }
  
    zoomed = () => {
        let xRadius = this.state.xRadius;
        let yRadius = this.state.yRadius;
        let scale = this.props.scale;
        let id = this.props.id;
        d3.event.transform.x = Math.min(0, Math.max(d3.event.transform.x, 2*xRadius*scale - 2*xRadius*scale * d3.event.transform.k));
        d3.event.transform.y = Math.min(0, Math.max(d3.event.transform.y, 2*yRadius*scale - 2*yRadius*scale * d3.event.transform.k));
        d3.select('#scatter-'+id).attr("transform", d3.event.transform);
        d3.select('#background-circle-'+id).attr("transform", d3.event.transform);
    }

    componentDidUpdate(prevProps, prevState){
        d3.select('#circle-overlay-'+this.props.id).call(d3.zoom().scaleExtent([1, Infinity]).on("zoom", this.zoomed));
    }

    componentDidMount() {
    }

    
    render() {
        return (
            <div className="mirror-container" ref="container">
                <svg
                    className="svg-container"
                    height={this.props.height + "px"}
                    width={this.props.width + "px"}>
                    <circle id={"background-circle-"+this.props.id}
                        cx={this.state.xRadius*this.props.scale+this.props.margin}
                        cy={this.state.yRadius*this.props.scale+this.props.margin}
                        key={'background'}
                        fill={'#04070a'}
                        r={this.state.maxRadius*this.props.scale*1.05}
                        pointerEvents="all"
                        />
                    <g id={"scatter-"+this.props.id} className="scatter">
                        {this.state.data.map(act => (
                            <circle
                                cx={(act.position[0] + this.state.xRadius)*this.props.scale+this.props.margin}
                                cy={(act.position[1] + this.state.yRadius)*this.props.scale+this.props.margin}
                                key={act.actuatorID}
                                fill={this.props.colormap(Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2))/this.state.maxRadius)}
                                r={this.state.maxRadius/18}/>
                            )
                        )}
                    </g>
                    <circle id={"circle-overlay-"+this.props.id}
                        cx={this.state.xRadius*this.props.scale+this.props.margin}
                        cy={this.state.yRadius*this.props.scale+this.props.margin}
                        key={'overlay'}
                        fill={'none'}
                        r={this.state.maxRadius*this.props.scale*1.05}
                        pointerEvents="all"
                        />
                </svg>
            </div>
        );
    }
}


export default M1M3;