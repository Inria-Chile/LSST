import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import DomePosition from './DomePosition/DomePosition';
import DomePerspectives from './DomePerspectives/DomePerspectives';
import DomeAzimuthTimeSeries from './TimeSeries/DomeAzimuthTimeSeries/DomeAzimuthTimeSeries';
import DomeElevationTimeSeries from './TimeSeries/DomeElevationTimeSeries/DomeElevationTimeSeries';
import TimeSeriesLegend from './TimeSeries/TimeSeriesLegend';
import './Dome.css';
import openSocket from 'socket.io-client';

class Dome extends PureComponent {

    static viewName = 'dome';

    constructor(props) {
        super(props);
        this.state = {
            shuttersAperture: 0,
            domeAzimuth: 0,
            domeTargetAzimuth: 0,
            domeOptimalAzimuth: 0,
            telescopeElevation: 20,
            telescopeTargetElevation: 20,
            telescopeOptimalElevation: 20,
            mountAzimuth: 0,
        }
        this.socket = openSocket(window.location.origin + '');        
        console.log('SCOKERT', this.socket.on('Rotator', msg => console.log(msg)));
    }

    updateShuttersAperture = (aperture) => {
        this.setState({
            shuttersAperture: aperture
        });
    }

    updateDomePos = (az, el) => {
        this.setState({
            domeAzimuth: az,
            telescopeElevation: el
        })
    }

    componentDidUpdate(prevProps, prevState) {
    }

    normalizeAngle = (angle, max) => {
        return ((angle % max) + max) % max;
    }

    componentDidMount() {
        setInterval(() => {
            let newAzimuth = this.normalizeAngle(this.state.domeTargetAzimuth, 360);
            let domeTargetAzimuth = this.normalizeAngle(this.state.domeTargetAzimuth + ((Math.random() - 0.1) * 20), 360);
            let domeOptimalAzimuth = this.normalizeAngle(newAzimuth + ((Math.random() - 0.1) * 6), 360);
            
            let newElevation = this.normalizeAngle(this.state.telescopeTargetElevation, 90);
            let telescopeTargetElevation = this.normalizeAngle((Math.random() - 0.1) * 15, 90);
            let telescopeOptimalElevation = this.normalizeAngle(newElevation + Math.random() * 3, 90);
            let newMountAzimuth = newAzimuth + ((Math.random() - 0.1) * 30);
            this.setState({
                domeAzimuth: newAzimuth,
                domeTargetAzimuth: domeTargetAzimuth,
                domeOptimalAzimuth: domeOptimalAzimuth,
                telescopeElevation: newElevation,
                telescopeTargetElevation: telescopeTargetElevation,
                telescopeOptimalElevation: telescopeOptimalElevation,
                mountAzimuth: newMountAzimuth
            })
        }, 2000)
    }

    render() {
        let legendData = [
            { label: 'Current value', color: '#ddd', lineDash: 0 }, 
            { label: 'Target', color: '#5e8ba9', lineDash: 0 }, 
            { label: 'Optimal', color: '#3e6b89', lineDash: 7 }, 
        ];
        
        return (
            <div className="dome-container">
                <div>
                    <h2>
                        Dome
                    </h2>
                </div>
                <div className="container pull-left">
                    <div className="row">
                        <div className="col-12">
                            <DomePosition width={330} height={300} id="dome-top" scale={1.4} xOffset={-0.05} yOffset={0.15}
                                shuttersAperture={this.state.shuttersAperture} domeAzimuth={this.state.domeAzimuth}
                                telescopeElevation={this.state.telescopeElevation} mountAzimuth={this.state.mountAzimuth} updateDomePos={this.updateDomePos} />
                        </div>
                    </div>
                    <DomePerspectives shuttersAperture={this.state.shuttersAperture} updateShuttersAperture={this.updateShuttersAperture} />
                    <div className='time-series-container'>
                        <div>
                            <h5>Azimuth</h5>
                            <DomeAzimuthTimeSeries domeAzimuth={this.state.domeAzimuth}
                                domeTargetAzimuth={this.state.domeTargetAzimuth}
                                domeOptimalAzimuth={this.state.domeOptimalAzimuth}
                                width={600} height={350} />
                        </div>
                        <div>
                            <h5>Elevation</h5>
                            <DomeElevationTimeSeries telescopeElevation={this.state.telescopeElevation}
                                telescopeTargetElevation={this.state.telescopeTargetElevation}
                                telescopeOptimalElevation={this.state.telescopeOptimalElevation}
                                width={600} height={350} />
                        </div>
                    </div>
                        <TimeSeriesLegend legendData={legendData}/>
                </div>
            </div>
        );
    }
}

export default Dome;
