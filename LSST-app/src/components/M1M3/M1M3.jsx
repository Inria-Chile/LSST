import React, { Component } from 'react'
import './M1M3.css';
import { checkStatus, parseJSON } from "../Utils/Utils"

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
  
  componentDidMount() {
  }

  componentDidUpdate(){
  }

  
  render() {
    return (
        <div className="mirror-container" ref="container">
            <svg
                className="svg-container"
                height={this.props.height}
                width={this.props.width}>
                <circle
                    cx={this.state.xRadius*this.props.scale+this.props.margin}
                    cy={this.state.yRadius*this.props.scale+this.props.margin}
                    key={'dsadsadsa'}
                    fill={'#04070a'}
                    r={this.state.maxRadius*this.props.scale*1.05}/>
                <g className="scatter">
                    {this.state.data.map(act => (
                        <circle
                            cx={(act.position[0] + this.state.xRadius)*this.props.scale+this.props.margin}
                            cy={(act.position[1] + this.state.yRadius)*this.props.scale+this.props.margin}
                            key={act.actuatorID}
                            fill={this.props.colormap(Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2))/this.state.maxRadius)}
                            r={8}/>
                        )
                    )}
                </g>
            </svg>
        </div>
    );
  }
}


export default M1M3;