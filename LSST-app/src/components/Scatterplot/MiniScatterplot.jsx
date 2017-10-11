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
        else this.scatterplot.setData(null);
    }


    handleClick(){
        this.props.onScatterplotClick()
    }

    setDisplayedDateLimits(startDate,endDate){
        this.scatterplot.setDisplayedDateLimits(startDate,endDate);
    }

    render() {
        return (
        <div className="scatterplot-container" onClick={ () => this.handleClick()}>
            <h4> Right Ascention / Declination </h4>
            <Scatterplot ref={instance => {this.scatterplot=instance;}} height={183}/>
        </div>
        );
    }
}


export default MiniScatterplot;
