import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import Shutters from './Shutters/Shutters';
import DomePosition from './DomePosition/DomePosition';
import Louvers from './Louvers/Louvers';
import './Dome.css';

class Dome extends PureComponent {

    static viewName = 'status';
    
    constructor(props) {
        super(props);
        this.state = {
            shuttersAperture: 0
        }
    }
    
    updateShuttersAperture = (aperture) => {
        this.setState({
            shuttersAperture: aperture
        });
    }

    componentDidUpdate(prevProps, prevState){
    }

    render() {
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
                            <DomePosition width={330} height={300} id="dome-top" aperture={this.state.shuttersAperture} scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5>Top</h5>
                            <Shutters width={500} height={300} id="shutters" aperture={this.state.shuttersAperture} updateShuttersAperture={this.updateShuttersAperture} scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                        </div>
                        <div className="col-6">
                            <h5>Side</h5>
                            <Shutters width={500} height={300} id="shutters" aperture={this.state.shuttersAperture} updateShuttersAperture={this.updateShuttersAperture} scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Louvers width={700} height={700} id="louvers" scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dome;
