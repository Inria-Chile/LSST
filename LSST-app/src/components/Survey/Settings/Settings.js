import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Settings.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        /* establish the initial state of the input field */
        this.state = {
            showEcliptic: true,
            showGalactic: true,
            showMoon: true,
            showTelescopeRange: true,
            sidebarOpen: false,
            projection: "aitoff"
        }
        this.skymap = props.skymap;
    }

    toggleEcliptic = (e) => {
        console.log("toggleEcliptic", e);
        this.setState({showEcliptic: !this.state.showEcliptic});
        this.props.setEcliptic(!this.state.showEcliptic);
    }

    toggleGalactic = (e) => {
        console.log("toggleGalactic", e);
        this.setState({showGalactic: !this.state.showGalactic});
        this.props.setGalactic(!this.state.showGalactic);
    }

    toggleMoon = (e) => {
        console.log("toggleMoon", e);
        this.setState({showMoon: !this.state.showMoon});
        this.props.setMoon(!this.state.showMoon);
    }

    toggleTelescopeRange = (e) => {
        console.log("toggleTelescopeRange", e);
        this.setState({showTelescopeRange: !this.state.showTelescopeRange});
        this.props.setTelescopeRange(!this.state.showTelescopeRange);
    }

    toggleSettings = (e) => {
        this.props.setSettings(!this.state.sidebarOpen);
    }

    setProjection = (e) => {
        this.setState({projection: e.target.value});
        this.props.setProjection(e.target.value);
    }

    handleOutsideClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }
        this.setState({
            sidebarOpen: false
        });
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    toggleSidebar = () => {
        if (!this.state.sidebarOpen) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
    }

    

    render() {
        return (
            <div ref={node => { this.node = node; }}>
                <button className="settings-button" type="button" onClick={this.toggleSidebar} aria-label="Settings">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </button>
                <div className={"sidebar " + (this.state.sidebarOpen ? 'sidebar-open' : '')}>
                    <div className="checkbox">
                        <label className='selectable'>
                            <input type="checkbox" value="" onChange={this.toggleEcliptic} defaultChecked={this.state.showEcliptic}/> Ecliptic plane
                        </label>
                    </div>
                    <div className="checkbox">
                        <label className='selectable'>
                            <input type="checkbox" value="" onChange={this.toggleGalactic} defaultChecked={this.state.showGalactic}/> Galactic plane
                        </label>
                    </div>
                    <div className="checkbox">
                        <label className='selectable'>
                            <input type="checkbox" value="" onChange={this.toggleTelescopeRange} defaultChecked={this.state.showTelescopeRange}/> Elevation limit
                        </label>
                    </div>
                    <div className="checkbox">
                        <label className='selectable'>
                            <input type="checkbox" value="" onChange={this.toggleMoon} defaultChecked={this.state.showMoon}/> Moon
                        </label>
                    </div>
                    <label>
                        Projection: 
                        <select className="selectpicker" defaultValue= "aitoff" onChange={this.setProjection}>
                            <option>aitoff</option>
                            <option>armadillo</option>
                            <option>boggs</option>
                            <option>bromley</option>
                            <option>collignon</option>
                            <option>craster</option>
                            <option>cylindricalEqualArea</option>
                            <option>eckert1</option>
                            <option>eckert2</option>
                            <option>eckert3</option>
                            <option>eckert4</option>
                            <option>eckert5</option>
                            <option>eckert6</option>
                            <option>eisenlohr</option>
                            <option>equirectangular</option>
                            <option>foucaut</option>
                            <option>hammer</option>
                            <option>hatano</option>
                            <option>homolosine</option>
                            <option>mollweide</option>
                            <option>mtFlatPolarParabolic</option>
                            <option>nellHammer</option>
                            <option>robinson</option>
                            <option>sinusoidal</option>
                            <option>wagner4</option>
                            <option>wagner6</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }
}

export default Settings;
