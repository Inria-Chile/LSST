import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelection.css';

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
        console.log(date.unix()-757393200);
        return date.unix()-757393200;
    }

    handleChangeInitial = (date) => {
        this.setState({
            startMomentDate: date,
            startDate: Math.max(0, this.momentDateToNumber(date))
        });
    }

    handleChangeEnd = (date) => {
        this.setState({
            endMomentDate: date,
            endDate: Math.max(0, this.momentDateToNumber(date))
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
                    <div className='date-input date-left'>
                        {/* <p>Start:</p> */}
                        {/* <DayPickerInput placeholder="MM/DD/YYYY" /> */}
                        <DatePicker
                            selected={this.state.startMomentDate}
                            onChange={this.handleChangeInitial}
                            openToDate={moment("1994-01-01")}
                            placeholderText="Select start date"
                            showTimeSelect
                            timeIntervals={15}
                            dateFormat="YYYY/MM/DD hh:mm A"
                        />
                        {/* <input onChange={(e) => this.setState({ startDate: parseInt(e.target.value, 10) })} /> */}
                    </div>
                    <div className='date-separator'>
                        to
                    </div>
                    <div className='date-input date-right'>
                        {/* <p>End:</p> */}
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
                {/* <div className='date-input'>
                    <button onClick={this.setDate}>
                        Set
                    </button>
                </div> */}
            </div>
        );
    }
}

export default DateSelection;
