import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

class Sidebar extends Component {

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

    toggleSidebar = (e) => {
        this.props.setSidebar(!this.state.sidebarOpen);
    }

    setProjection = (e) => {
        this.setState({projection: e.target.value});
        this.props.setProjection(e.target.value);
    }

    render() {
        return (
            <div className={"sidebar " + (this.state.sidebarOpen ? 'sidebar-open' : '')}>
                <button type="button" onClick={this.toggleSidebar} className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div className="checkbox">
                    <label><input type="checkbox" value="" onChange={this.toggleEcliptic} defaultChecked={this.state.showEcliptic}/> Ecliptic plane</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" value="" onChange={this.toggleGalactic} defaultChecked={this.state.showGalactic}/> Galactic plane</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" value="" onChange={this.toggleTelescopeRange} defaultChecked={this.state.showTelescopeRange}/> Elevation limit</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" value="" onChange={this.toggleMoon} defaultChecked={this.state.showMoon}/> Moon</label>
                </div>
                <label>
                    Barebones 
                    <select className="selectpicker" onChange={this.setProjection}>
                        <option>airy</option>
                        <option>aitoff</option>
                        <option>armadillo</option>
                        <option>august</option>
                        <option>azimuthalEqualArea</option>
                        <option>azimuthalEquidistant</option>
                    </select>
                </label>
            </div>
        );
    }
}

export default Sidebar;
