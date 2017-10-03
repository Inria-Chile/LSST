import React, { Component } from 'react'
import Scatterplot from './Scatterplot';

class MainScatterplot extends Component {

    constructor(props){
        super(props);
        this.state={
            data:null
        };
        this.scatterplot=null;
    }

    setData(data){
        if(data && data.length > 0){
            this.setState({
                data:data
            });
            this.scatterplot.setData(data);
        }
    }


    render() {
        return (
            <div className="scatterplot">
                <Scatterplot ref={instance => {this.scatterplot=instance;}} height={500}/>
            </div>
            );
    }
}

// MainScatterplot.defaultProps = {
// height: 500
// };

export default MainScatterplot;
