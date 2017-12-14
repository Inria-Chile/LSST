import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Environment.css';
import DraggableTitle from '../Utils/DraggableTitle';
import openSocket from 'socket.io-client';

class Environment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: null,
            humidity: null,
            pressure: null,
            temperatureArray: [],
            humidityArray: [],
            pressureArray: [],
        }
        this.socket = openSocket(window.location.origin + '/environment');      
        console.log('Environment\'s socket listening', this.socket.on('Environment', msg => this.receiveEnvironmentData(msg)));
    }

    componentDidMount() {
        this.setState({
            temperature: 32,
            humidity: 57,
            pressure: 770,
            temperatureArray: [],
            humidityArray: [],
            pressureArray: [],
        })
    }

    componentWillReceiveProps() {
        let maxArrayLength = 100;
        this.state.temperatureArray.push(this.props.temperature);
        this.state.humidityArray.push(this.props.humidity);
        this.state.pressureArray.push(this.props.pressure);
        
        if (this.state.temperatureArray.length > maxArrayLength)
            this.state.temperatureArray.shift();
        if (this.state.humidityArray.length > maxArrayLength)
            this.state.humidityArray.shift();
        if (this.state.pressureArray.length > maxArrayLength)
            this.state.pressureArray.shift();
    }

    render() {
        return (
            <div className="environment-container">
                <DraggableTitle title='Environment'/>
                <div className='table-wrapper'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='telemetry-name'>Temperature</td>
                                {
                                    this.state.temperature ?
                                    <td>{(this.state.temperature*9/5+32).toFixed(1)}ºF / {this.state.temperature.toFixed(1)}ºC</td>
                                    :
                                    <td>Unavailable</td>
                                }
                            </tr>
                            <tr>
                                <td className='telemetry-name'>Humidity</td>
                                {
                                    this.state.humidity ?
                                    <td>{this.state.humidity}%</td>
                                    :
                                    <td>Unavailable</td>
                                }
                            </tr>
                            <tr>
                                <td className='telemetry-name'>Pressure</td>
                                {
                                    this.state.pressure ?
                                    <td>{this.state.pressure} mmHg</td>
                                    :
                                    <td>Unavailable</td>
                                }
                            </tr>
                        </tbody>
                    </table>                    
                </div>
            </div>
        );
    }
}

export default Environment;
