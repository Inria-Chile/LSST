import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import DomePosition from './DomePosition/DomePosition';
import DomePerspectives from './DomePerspectives/DomePerspectives';
import DomeAzimuthTimeSeries from './TimeSeries/DomeAzimuthTimeSeries/DomeAzimuthTimeSeries';
import DomeElevationTimeSeries from './TimeSeries/DomeElevationTimeSeries/DomeElevationTimeSeries';
import TimeSeriesLegend from './TimeSeries/TimeSeriesLegend';
import './Dome.css';

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
            let newAzimuth = this.normalizeAngle(this.state.domeAzimuth + ((Math.random() - 0.5) * 90), 360);
            let domeTargetAzimuth = this.normalizeAngle(this.state.domeAzimuth, 360);
            let domeOptimalAzimuth = this.normalizeAngle(newAzimuth + ((Math.random() - 0.5) * 30), 360);
            let newElevation = this.normalizeAngle((Math.random() - 0.5) * 90, 90);
            let telescopeTargetElevation = this.normalizeAngle(this.state.telescopeElevation, 90);
            let telescopeOptimalElevation = this.normalizeAngle(newElevation + Math.random() * 10, 90);
            let newMountAzimuth = newAzimuth + ((Math.random() - 0.5) * 30);
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
            { label: 'Optimal', color: '#5e8ba9', lineDash: 7 }, 
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
                                width={700} height={400} />
                        </div>
                        <div>
                            <h5>Elevation</h5>
                            <DomeElevationTimeSeries telescopeElevation={this.state.telescopeElevation}
                                telescopeTargetElevation={this.state.telescopeTargetElevation}
                                telescopeOptimalElevation={this.state.telescopeOptimalElevation}
                                width={700} height={400} />
                        </div>
                    </div>
                        <TimeSeriesLegend legendData={legendData}/>
                </div>
            </div>
        );
    }
}

export default Dome;
