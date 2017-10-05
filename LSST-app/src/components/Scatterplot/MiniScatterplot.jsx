import React, { Component } from 'react'
import Scatterplot from './Scatterplot';


class MiniScatterplot extends Component {

    constructor(props){
        super(props);
        this.scatterplot=null;
    }

    setData(data){
        if(data && data.length > 0){
            this.scatterplot.setData(data);
        }
    }


  handleClick(){
    console.log("handling click")
    this.props.onScatterplotClick()
  }

    render() {
        return (
        <div className="scatterplot-container" onClick={ () => this.handleClick()}>
            <h3> Right Ascention / Declination </h3>
            <Scatterplot ref={instance => {this.scatterplot=instance;}} height={183}/>
        </div>
        );
    }
}


export default MiniScatterplot;
