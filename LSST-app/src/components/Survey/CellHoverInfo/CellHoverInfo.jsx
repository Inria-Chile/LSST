import React, { PureComponent } from 'react'
import './CellHoverInfo.css';
import { filterColors, decreaseBrightness } from "../../Utils/Utils"

class CellHoverInfo extends PureComponent {
    
    render() {
        return (
            <div className="hover-div">
                <div>FieldID: {this.props.selectedField && this.props.selectedField.fieldID ? this.props.selectedField.fieldID: ''}</div>
                <div>Timestamp: {this.props.selectedField && this.props.selectedField.expDate ? this.props.selectedField.expDate: ''}</div>
                <div>
                    Filter: {" "}
                    <div className="hover-filter" style={{
                            backgroundColor: filterColors[this.props.selectedField.filterName ] ? filterColors[this.props.selectedField.filterName ]
                                : "#000000", border: decreaseBrightness(filterColors[this.props.selectedField.filterName], 1.3) + ' solid 2px'
                        }}>
                        {
                            this.props.selectedField.filterName ? this.props.selectedField.filterName : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default CellHoverInfo;