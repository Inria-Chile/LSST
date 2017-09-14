import React, { Component } from 'react';
// import moment from 'moment';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import ReactDOM from 'react-dom';
import './DateSelection.css';
import 'react-day-picker/lib/style.css';

class DateSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: 0,
            endDate: 0,
        }
    }

    setDate = () => {
        // console.log('setDate', this.state.startDate, this.state.endDate);
        this.props.setDataByDate(this.state.startDate, this.state.endDate);
    }

    render() {
        return (
            <div className="date-selection">
                <div>
                    <h6>DATE SELECTION</h6>
                </div>
                <div className='date-input'>
                    <p>Start:</p>
                    {/* <DayPickerInput placeholder="MM/DD/YYYY" /> */}
                    <input onChange={(e) => this.setState({ startDate: parseInt(e.target.value, 10) })} />
                </div>
                <div className='date-input'>
                    <p>End:</p>
                    {/* <DayPickerInput placeholder="MM/DD/YYYY" /> */}
                    <input onChange={(e) => this.setState({ endDate: parseInt(e.target.value, 10) })} />
                </div>
                <div className='date-input'>
                    <button onClick={this.setDate}>
                        Set
                    </button>
                </div>
            </div>
        );
    }
}

export default DateSelection;
