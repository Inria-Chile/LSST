import React, { Component } from 'react'
import Scatterplot from './Scatterplot';

class MainScatterplot extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="scatterplot">
                <Scatterplot displayedData={this.props.data} />
            </div>
            );
    }
}

export default MainScatterplot;
