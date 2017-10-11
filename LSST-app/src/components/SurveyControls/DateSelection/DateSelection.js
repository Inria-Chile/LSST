import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelection.css';
import FaCalendar from 'react-icons/lib/fa/calendar';
import { lsstEpoch } from "../../Utils/Utils"

class DateSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: 0,
            endDate: 0,
            startMomentDate: null,
            endMomentDate: null,
        }
    }

    setDate = () => {
        this.props.setDataByDate(this.state.startDate, this.state.endDate);
    }

    momentDateToNumber = (date) => {
        return date.unix()*1000;
    }

    handleChangeInitial = (date) => {
        this.setState({
            startMomentDate: date,
            startDate: Math.max((date - lsstEpoch)/1000, 0)
        });
    }

    handleChangeEnd = (date) => {
        this.setState({
            endMomentDate: date,
            endDate: Math.max((date - lsstEpoch)/1000, 0)
        });
    }

    componentDidUpdate(prevProps, prevState){
        if((this.state.endDate > this.state.startDate) && prevState && (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate)){
            this.setDate();
        }
    }

    render() {
        return (
            <div className="date-selection">
                <div className="date-inputs-wrapper">
                    <FaCalendar className='calendar-icon' />
                    <div className='date-input date-left'>
                        <DatePicker
                            selected={this.state.startMomentDate}
                            onChange={this.handleChangeInitial}
                            openToDate={moment("1994-01-01")}
                            placeholderText="Select start date"
                            showTimeSelect
                            timeIntervals={15}
                            dateFormat="YYYY/MM/DD hh:mm A"
                        />
                    </div>
                    <div className='date-separator'>
                        to
                    </div>
                    <div className='date-input date-right'>
                        <DatePicker
                            selected={this.state.endMomentDate}
                            onChange={this.handleChangeEnd}
                            openToDate={moment("1994-01-01")}
                            placeholderText="Select end date"
                            showTimeSelect
                            timeIntervals={15}
                            dateFormat="YYYY/MM/DD hh:mm A"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DateSelection;
