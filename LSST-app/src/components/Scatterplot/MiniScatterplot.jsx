import React, { PureComponent } from 'react'
import Scatterplot from './Scatterplot';


class MiniScatterplot extends PureComponent {

    constructor(props){
        super(props);
        this.scatterplot=null;
    }

    render() {
        return (
        <div className="scatterplot-container" onClick={ () => this.props.onScatterplotClick()}>
            <h4> Right Ascention / Declination </h4>
            <Scatterplot height={183} displayedData={this.props.displayedData}/>
        </div>
        );
    }
}


export default MiniScatterplot;
