import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import FrontView from './FrontView/FrontView';
import SideView from './SideView/SideView';
import Louvers from './Louvers/Louvers';
import './DomePerspectives.css';
import {DEMO_MODE} from '../../Utils/Utils';

class DomePerspectives extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            topWindScreenPos: 3.5,//min
            bottomWindScreenPos: 20,//min
        }
    }

    componentDidMount(prevProps, prevState){
        if(DEMO_MODE){
            setInterval( () => {
                this.props.updateShuttersAperture(11);
                let angle_0 = 35;
                let angle = Math.max(3.5, Math.ceil(Math.random()*(90-angle_0-10)));
                this.setState({
                    topWindScreenPos: angle,
                    bottomWindScreenPos: 90-(angle+angle_0),
                })
            }, 2000)
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.telescopeElevation !== nextProps.telescopeElevation){
            this.setState({
                topWindScreenPos: Math.min(70, 90-(nextProps.telescopeElevation+11)).toFixed(2),//min
                bottomWindScreenPos: Math.max(5, Math.min(50, (nextProps.telescopeElevation-11)).toFixed(2)),//min
            })
        }
    }

    render() {
        let statusOpen = this.props.shuttersAperture > 0;
        return (
            <div className="dome-perspectives-container">
                <div className="row">
                    <div className="col-6">
                        <h5>Front</h5>
                        <FrontView width={500} height={300} id="shutters" shuttersAperture={this.props.shuttersAperture} updateShuttersAperture={this.props.updateShuttersAperture} 
                                topWindScreenPos={this.state.topWindScreenPos} bottomWindScreenPos={this.state.bottomWindScreenPos} scale={1.4} xOffset={0} yOffset={-0.0}/>
                    </div>
                    <div className="col-6">
                        <h5>Side</h5>
                        <SideView width={500} height={300} id="shutters" shuttersAperture={this.props.shuttersAperture} updateShuttersAperture={this.props.updateShuttersAperture} 
                                topWindScreenPos={this.state.topWindScreenPos} bottomWindScreenPos={this.state.bottomWindScreenPos} scale={1.4} xOffset={0} yOffset={-0.0}/>                    </div>
                </div>
                <div className="row dome-perspectives-bottom">
                    <div className="col-8">
                        <h5>Top</h5>
                        <Louvers width={500} height={500} id="louvers" scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                    </div>
                    <div className="col-4 dome-perspectives-info">
                        <div>
                            Shutters status: <span className={"status-circle-"+(statusOpen ?'open':'closed')}> </span>
                                    <span className="dome-data">{this.props.shuttersAperture > 0 ? 'Open' : 'Closed'}</span>
                        </div>
                        <div>
                            Aperture: <span className="dome-data">{this.props.shuttersAperture} m </span>
                        </div>
                        <div>
                            Top windscreen position: <span className="dome-data">{this.state.topWindScreenPos} </span>
                        </div>
                        <div>
                            Bottom windscreen position: <span className="dome-data">{this.state.bottomWindScreenPos} </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DomePerspectives;
