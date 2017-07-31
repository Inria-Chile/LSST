import React, { Component } from 'react';
// import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// import ReactDOM from 'react-dom';
import './DateSelection.css';
import 'react-day-picker/lib/style.css';

class DateSelection extends Component {

    render() {
        return (
            <div className="date-selection">
                <div>
                    <h6>MODE SELECTION</h6>
                </div>
                <div className='date-input'>
                    <p>Start:</p>
                    <DayPickerInput placeholder="MM/DD/YYYY" />
                </div>
                <div className='date-input'>
                    <p>End:</p>
                    <DayPickerInput placeholder="MM/DD/YYYY" />
                </div>
            </div>
        );
    }
}

export default DateSelection;
