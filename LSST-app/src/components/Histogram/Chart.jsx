import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Bars from './Bars'
import data from './data'
import Axes from './Axes'
// import ResponsiveWrapper from './ResponsiveWrapper'


class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
    this.state = {
        svgDimensions : {
            width: 800,
            height :500
        },
    }
  }

  updateDimensions() {
      console.log("updatedimensions");
      console.log(window.innerWidth);
      console.log(this.refs.container.offsetWidth);
      if(window.innerWidth <= this.refs.container.offsetWidth){
          console.log("change");
          this.setState({svgDimensions : {width: window.innerWidth, height: 500}});
      }
      else {
          this.setState({svgDimensions : {width: 800,  height: 500}});
      }
    // if(window.innerWidth < 500) {
    //   this.setState({ width: 450, height: 102 });
    // } else {
    //   let update_width  = window.innerWidth-100;
    //   let update_height = Math.round(update_width/4.4);
    //   this.setState({ width: update_width, height: update_height });
    // }
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 };
    var svgDimensions = this.state.svgDimensions;
    const maxValue = Math.max(...data.map(d => d.value))
    
    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      // scaleBand domain should be an array of specific values
      // in our case, we want to use movie titles
      .domain(data.map(d => d.title))
      .range([margins.left, svgDimensions.width - margins.right])
  
     // scaleLinear type
    const yScale = this.yScale
       // scaleLinear domain required at least two values, min and max       
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
    <div ref="container">
        <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
        
      </svg>
        </div>
    )
  }
}
export default Chart
// export default ResponsiveWrapper(Chart)
