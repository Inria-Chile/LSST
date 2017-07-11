import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './MiniSkymaps.css';

const makeCelestial = window.makeCelestial;

class MiniSkymaps extends Component {

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
        show: true,    // Show grid polygons
        style: { fill: "#ff00ff", opacity: 0.45 }
      },
      lines: {
        graticule: { show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,      // Show graticule lines 
          // grid values: "outline", "center", or [lat,...] specific position
          lon: {pos: ["center"], fill: "#eee", font: "18px Helvetica, Arial, sans-serif"}, 
          // grid values: "outline", "center", or [lon,...] specific position
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
  }

  componentDidMount() {
    var node1Div = this.refs.node1Div;
    var node2Div = this.refs.node2Div;
    var node3Div = this.refs.node3Div;
    var node4Div = this.refs.node4Div;
    var node5Div = this.refs.node5Div;
    var node6Div = this.refs.node6Div;
    node1Div.id = "node1";
    node2Div.id = "node2";
    node3Div.id = "node3";
    node4Div.id = "node4";
    node5Div.id = "node5";
    node6Div.id = "node6";
    // set el height and width etc.
    this.setupCelestial(node1Div.id);
    this.setupCelestial(node2Div.id);
    this.setupCelestial(node3Div.id);
    this.setupCelestial(node4Div.id);
    this.setupCelestial(node5Div.id);
    this.setupCelestial(node6Div.id);
  }

  render() {
    return (
      <div className="minimap-container">
        <div className="minimap" ref="node1Div"></div>
        <div className="minimap" ref="node2Div"></div>
        <div className="minimap" ref="node3Div"></div>
        <div className="minimap" ref="node4Div"></div>
        <div className="minimap" ref="node5Div"></div>
        <div className="minimap" ref="node6Div"></div>
      </div>
    );
  }
}

export default MiniSkymaps;
