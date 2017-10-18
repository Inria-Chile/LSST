import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import DomePosition from './DomePosition/DomePosition';
import DomePerspectives from './DomePerspectives/DomePerspectives';
import './Dome.css';

class Dome extends PureComponent {

    static viewName = 'dome';
    
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
                            <DomePosition width={330} height={300} id="dome-top" shuttersAperture={this.state.shuttersAperture} scale={1.4} xOffset={-0.05} yOffset={0.15}/>
                        </div>
                    </div>
                    <DomePerspectives shuttersAperture={this.state.shuttersAperture} updateShuttersAperture={this.updateShuttersAperture}/>
                </div>
            </div>
        );
    }
}

export default Dome;
