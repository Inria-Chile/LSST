import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Skymap from './Skymap';

class MainSkymap extends Component {

    getCelestial(){
        return this.skymap.getCelestial();
    }

    drawFrame = () => {
        // console.log('drawFrame MainSkymap');
        var Celestial = this.skymap.getCelestial();
        var step = 1.6;

        // reqID = window.requestAnimationFrame(animate);
        var rot = Celestial.rotate();
        rot[0] = rot[0] === 180 - step ? -180 : rot[0] + step;
        rot[2] = 0;
        Celestial.rotate({center:rot});
        Celestial.updateCell(Math.floor(Math.random()*857));
    }

    render() {
        return (
            <Skymap ref={instance => { this.skymap = instance; }} nodeRef='mainNode' className="mainSkymap" />
        );
    }
}

export default MainSkymap;
