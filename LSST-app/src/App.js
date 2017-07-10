import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Celestial = window.Celestial;

class App extends Component {

  setupCelestial = function(){
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
      container: "celestial-map",   // ID of parent element, e.g. div
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
      
    Celestial.display(config);
  }

  render() {
    this.setupCelestial();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
