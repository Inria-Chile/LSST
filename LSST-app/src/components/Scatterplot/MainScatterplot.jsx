import React, { Component } from 'react'
import Scatterplot from './Scatterplot';

class MainScatterplot extends Component {

    constructor(props){
        super(props);
        this.scatterplot=null;
    }

    setData(data){
        if(data && data.length > 0){
            this.scatterplot.setData(data);
        }
        else{
            this.scatterplot.setData(null);
        }
    }

    makeVisible(){
        let isVisible = this.state.isVisible
        this.setState({
            isVisible:!isVisible
        })
    }

    setDisplayedDateLimits(startDate,endDate){
        this.scatterplot.setDisplayedDateLimits(startDate,endDate);
    }

    render() {
        return (
            <div className="scatterplot">
                <Scatterplot ref={instance => {this.scatterplot=instance;} } data={this.props.data} />
            </div>
            );
    }
}

export default MainScatterplot;
