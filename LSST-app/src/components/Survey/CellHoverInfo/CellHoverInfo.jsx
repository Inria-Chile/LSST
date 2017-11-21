import React, { PureComponent } from 'react'
import './CellHoverInfo.css';
import FilterIndicator from '../../Utils/FilterIndicator/FilterIndicator';

class CellHoverInfo extends PureComponent {
    
    render() {
        return (
            <div className="hover-div">
                <div>FieldID: {this.props.selectedField && this.props.selectedField.fieldID ? this.props.selectedField.fieldID: ''}</div>
                <div>Timestamp: {this.props.selectedField && this.props.selectedField.expDate ? this.props.selectedField.expDate: ''}</div>
                <div>
                    Filter: {" "}
                    <FilterIndicator filterName={this.props.selectedField.filterName}/>
                </div>
            </div>
        );
    }
}


export default CellHoverInfo;