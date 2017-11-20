import React, { PureComponent } from 'react'
import './FilterIndicator.css';
import { filterColors, decreaseBrightness } from "../../Utils/Utils"

class FilterIndicator extends PureComponent {

    render() {
        let filterName = this.props.filterName;
        return (
            filterName ? 
            <div className="hover-filter" style={{ ...this.props.style, 
                    backgroundColor: filterColors[filterName ] ? filterColors[filterName ]
                        : "#000000", border: decreaseBrightness(filterColors[filterName], 1.3) + ' solid 2px'
                }}>
                {
                    filterName
                }
            </div> :
            <div>
                None
            </div>
        )
    }
}

export default FilterIndicator;