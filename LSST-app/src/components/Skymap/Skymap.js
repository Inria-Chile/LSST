import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

const makeCelestial = window.makeCelestial;

class Skymap extends Component {

  getCelestial(){
    return this.Celestial;
  }

  setupCelestial(containerId){
    var config = {
      width: 0,     // Default width, 0 = full parent width; height is determined by projection
      projection: "aitoff",
      transform: "equatorial", // Coordinate transformation: equatorial (default), ecliptic, galactic, supergalactic
      center: null,       // Initial center coordinates in equatorial transformation [hours, degrees, degrees], 
                          // otherwise [degrees, degrees, degrees], 3rd parameter is orientation, null = default center
      orientationfixed: true,  // Keep orientation angle the same as center[2]
      background: { fill: "#000000", stroke: "#000000", opacity: 1 }, // Background style
      adaptable: true,    // Sizes are increased with higher zoom-levels
      interactive: true,  // Enable zooming and rotation with mousewheel and dragging
      form: false,        // Display settings form
      location: false,    // Display location settings 
      controls: false,     // Display zoom controls
      lang: "",           // Language for names, so far only for constellations: de: german, es: spanish
      container: containerId,   // ID of parent element, e.g. div
      datapath: "./lib/data/",  // Path/URL to data files, empty = subfolder 'data'
      polygons: {
        show: false,    // Show grid polygons
        style: { fill: "#ff00ff", opacity: 0.45 }
      },
      horizon: {  //Show horizon marker, if geo-position is set
        show: true, 
        stroke: "#00ffff", // Line
        width: 3.0, 
        fill: "#00ffff", // Area below horizon
        opacity: 0.9
      },  
      lines: {
        graticule: { show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,      // Show graticule lines 
          lon: {pos: ["center"], fill: "#eee", font: "18px Helvetica, Arial, sans-serif"}, 
          lat: {pos: ["center"], fill: "#eee", font: "18px Helvetica, Arial, sans-serif"}},
        equatorial: { show: true, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },    // Show equatorial plane 
        ecliptic: { show: true, stroke: "#66cc66", width: 1.3, opacity: 0.7 },      // Show ecliptic plane 
        galactic: { show: true, stroke: "#cc6666", width: 1.3, opacity: 0.7 },     // Show galactic plane 
        supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 } // Show supergalactic plane 
      },
      moon: {
        show: true,
        pos : [30, 315],
        style: { fill: "#cccccc", opacity: "1.0" }
      }
    };
    var Celestial = makeCelestial();
    Celestial.display(config);
    Celestial.cfg = config;
    this.Celestial = Celestial;
  }

  componentDidMount() {
    // var mainNode = this.refs.skymapDiv;
    var nodeRef = this.refs[this.props.nodeRef];
    nodeRef.id = this.props.nodeRef;
    // set el height and width etc.
    this.setupCelestial(nodeRef.id);
  }

  render() {
    return (
      <div ref={this.props.nodeRef} className={this.props.className}></div>
    );
  }
}

export default Skymap;
