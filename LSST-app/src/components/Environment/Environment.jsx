import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Environment.css';
import DraggableTitle from '../Utils/DraggableTitle';
import {LineChart} from 'react-easy-chart';
import update from 'react-addons-update';
import openSocket from 'socket.io-client';
import moment from 'moment';

class Environment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: null,
            precipitation: null,
            dewPoint: null,
            humidity: null,
            pressure: null,
            temperatureArray: [],
            precipitationArray: [],
            dewPointArray: [],
            humidityArray: [],
            pressureArray: [],
        }
        this.socket = openSocket(window.location.origin + '/weather');
        this.openRows = 0;
        console.log('Environment\'s socket listening', this.socket.on('Weather', msg => this.receiveEnvironmentData(msg)));
    }

    receiveEnvironmentData = (msg) => {
        let maxArrayLength = 12;
        this.setState({
            temperature: msg.ambient_temp,
            humidity: msg.humidity,
            pressure: msg.pressure,
            precipitation: 1,
            dewPoint: 1,
            temperatureArray: update(this.state.temperatureArray, {
                $push: [{x: moment(Date.now()).format('H:mm:ss'), y:this.state.temperature}],
                $splice: this.state.temperatureArray.length > maxArrayLength ? [[0,1]] : [[0,0]],
            }),
            precipitationArray: update(this.state.precipitationArray, {
                $push: [{x: moment(Date.now()).format('H:mm:ss'), y:this.state.precipitation}],
                $splice: this.state.precipitationArray.length > maxArrayLength ? [[0,1]] : [[0,0]],
            }),
            humidityArray: update(this.state.humidityArray, {
                $push: [{x: moment(Date.now()).format('H:mm:ss'), y:this.state.humidity}],
                $splice: this.state.humidityArray.length > maxArrayLength ? [[0,1]] : [[0,0]],
            }),
            pressureArray: update(this.state.pressureArray, {
                $push: [{x: moment(Date.now()).format('H:mm:ss'), y:this.state.pressure}],
                $splice: this.state.pressureArray.length > maxArrayLength ? [[0,1]] : [[0,0]],
            }),
            dewPointArray: update(this.state.dewPointArray, {
                $push: [{x: moment(Date.now()).format('H:mm:ss'), y:this.state.dewPoint}],
                $splice: this.state.dewPointArray.length > maxArrayLength ? [[0,1]] : [[0,0]],
            }),
        });
    }

    componentDidMount() {
        this.setState({
            temperature: 32,
            precipitation: 1,
            dewPoint: 1,
            humidity: 57,
            pressure: 770,
        })
    }
    
    getLimits(array, tolerance, minimum) {
        return [Math.max(minimum, Math.min(...array.map(x => x.y))-tolerance), Math.max(...array.map(x => x.y))+tolerance];
    }

    toggleRow = (row) => {
        switch(row){
            case 'temperature':
                this.setState({displayTemperaturePlot: !this.state.displayTemperaturePlot});
                break;
            case 'precipitation':
                this.setState({displayPrecipitationPlot: !this.state.displayPrecipitationPlot});
                break;
            case 'humidity':
                this.setState({displayHumidityPlot: !this.state.displayHumidityPlot});
                break;
            case 'pressure':
                this.setState({displayPressurePlot: !this.state.displayPressurePlot});
                break;
            case 'dewPoint':
                this.setState({displayDewPointPlot: !this.state.displayDewPointPlot});
                break;
            default:
                return;
        }
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if(this.openRows !== this.getNumberOfOpenRows()) {
            this.props.setOpenRows(this.getNumberOfOpenRows());
            this.openRows = this.getNumberOfOpenRows();
        }
    }
    
    getNumberOfOpenRows = () => {
        let openRows = 0;
        if(this.state.displayTemperaturePlot)
            openRows++;
        if(this.state.displayPrecipitationPlot)
            openRows++;
        if(this.state.displayHumidityPlot)
            openRows++;
        if(this.state.displayPressurePlot)
            openRows++;
        if(this.state.displayDewPointPlot)
            openRows++;
        return openRows;
    }

    render() {
        let temperature = this.props.temperature;
        return (
            <div className="environment-container">
                <DraggableTitle title='Environment'/>
                <div className='table-wrapper'>
                    <table>
                        <tbody>
                            <tr onClick={() => this.toggleRow('temperature')}>
                                <td className='telemetry-name'>Temperature</td>
                                {
                                    temperature ?
                                    <td>{(temperature*9/5+32).toFixed(1)}ºF / {temperature.toFixed(1)}ºC</td>
                                    :
                                    <td>Unavailable</td>
                                }
                                {
                                    <td className={this.state.displayTemperaturePlot ? 'plot-column':'hidden'}>
                                        <div className={'plot-div'}>
                                            <LineChart
                                                margin={{top: 10, right: 30, bottom: 30, left: 70}}
                                                data={[this.state.temperatureArray]}
                                                xType={'time'}
                                                datePattern={'%H:%M:%S'}
                                                width={450}
                                                height={100}
                                                axisLabels={{x: '', y: 'ºC'}}
                                                interpolate={'cardinal'}
                                                lineColors={['red']}
                                                yDomainRange={this.getLimits(this.state.temperatureArray, 5, -Infinity)}
                                                axes
                                                xTicks={3}
                                                yTicks={3}
                                                tickTimeDisplayFormat={'%H:%M:%S'}
                                            />
                                        </div> 
                                    </td>
                                }
                            </tr>
                            <tr onClick={() => this.toggleRow('humidity')}>
                                <td className='telemetry-name'>Humidity</td>
                                {
                                    this.state.humidity ?
                                    <td>{this.state.humidity.toFixed(1)}%</td>
                                    :
                                    <td>Unavailable</td>
                                }
                                {
                                    <td className={this.state.displayHumidityPlot ? 'plot-column':'hidden'}>
                                        <div className={'plot-div'}>
                                            <LineChart
                                                margin={{top: 10, right: 30, bottom: 30, left: 70}}
                                                data={[this.state.humidityArray]}
                                                xType={'time'}
                                                datePattern={'%H:%M:%S'}
                                                width={450}
                                                height={100}
                                                axisLabels={{x: '', y: '%'}}
                                                interpolate={'cardinal'}
                                                lineColors={['red']}
                                                yDomainRange={this.getLimits(this.state.humidityArray, 5, 0)}
                                                axes
                                                xTicks={3}
                                                yTicks={3}
                                                tickTimeDisplayFormat={'%H:%M:%S'}
                                            />
                                        </div>
                                    </td>
                                }
                            </tr>
                            <tr onClick={() => this.toggleRow('pressure')}>
                                <td className='telemetry-name'>Pressure</td>
                                {
                                    this.state.pressure ?
                                    <td>{this.state.pressure.toFixed(1)} mmHg</td>
                                    :
                                    <td>Unavailable</td>
                                }
                                {
                                    <td className={this.state.displayPressurePlot ? 'plot-column':'hidden'}>
                                        <div className={'plot-div'}>
                                            <LineChart
                                                margin={{top: 10, right: 30, bottom: 30, left: 70}}
                                                data={[this.state.pressureArray]}
                                                xType={'time'}
                                                datePattern={'%H:%M:%S'}
                                                width={450}
                                                height={100}
                                                axisLabels={{x: '', y: 'mmHg'}}
                                                interpolate={'cardinal'}
                                                lineColors={['red']}
                                                yDomainRange={this.getLimits(this.state.pressureArray, 5, 0)}
                                                axes
                                                xTicks={3}
                                                yTicks={3}
                                                tickTimeDisplayFormat={'%H:%M:%S'}
                                            />
                                        </div>
                                    </td>
                                }
                            </tr>
                            <tr onClick={() => this.toggleRow('precipitation')}>
                                <td className='telemetry-name'>Precipitation</td>
                                {
                                    this.state.precipitation ?
                                    <td>{this.state.precipitation.toFixed(1)}mm</td>
                                    :
                                    <td>Unavailable</td>
                                }
                                {
                                    <td className={this.state.displayPrecipitationPlot ? 'plot-column':'hidden'}>
                                        <div className={'plot-div'}>
                                            <LineChart
                                                margin={{top: 10, right: 30, bottom: 30, left: 70}}
                                                data={[this.state.precipitationArray]}
                                                xType={'time'}
                                                datePattern={'%H:%M:%S'}
                                                width={450}
                                                height={100}
                                                axisLabels={{x: '', y: 'mm'}}
                                                interpolate={'cardinal'}
                                                lineColors={['red']}
                                                yDomainRange={this.getLimits(this.state.precipitationArray, 5, 0)}
                                                axes
                                                xTicks={3}
                                                yTicks={3}
                                                tickTimeDisplayFormat={'%H:%M:%S'}
                                            />
                                        </div>
                                    </td>
                                }
                            </tr>
                            <tr onClick={() => this.toggleRow('dewPoint')}>
                                <td className='telemetry-name'>Dew Point</td>
                                {
                                    this.state.dewPoint ?
                                    <td>{(this.state.dewPoint*9/5+32).toFixed(1)}ºF / {this.state.dewPoint.toFixed(1)}ºC</td>
                                    :
                                    <td>Unavailable</td>
                                }
                                {
                                    <td className={this.state.displayDewPointPlot ? 'plot-column':'hidden'}>
                                        <div className={'plot-div'}>
                                            <LineChart
                                                margin={{top: 10, right: 30, bottom: 30, left: 70}}
                                                data={[this.state.dewPointArray]}
                                                xType={'time'}
                                                datePattern={'%H:%M:%S'}
                                                width={450}
                                                height={100}
                                                axisLabels={{x: '', y: 'ºC'}}
                                                interpolate={'cardinal'}
                                                lineColors={['red']}
                                                yDomainRange={this.getLimits(this.state.dewPointArray, 5, 0)}
                                                axes
                                                xTicks={3}
                                                yTicks={3}
                                                tickTimeDisplayFormat={'%H:%M:%S'}
                                            />
                                        </div>
                                    </td>
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
