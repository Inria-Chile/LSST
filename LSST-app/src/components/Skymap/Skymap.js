import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

const makeCelestial = window.makeCelestial;

class Skymap extends Component {
  containerId = null;

  getCelestial() {
    return this.Celestial;
  }

  getConfig() {
    return this.Celestial.cfg;
  }

  getDefaultConfig() {
    return {
      width: 0,     // Default width, 0 = full parent width; height is determined by projection
      projection: "aitoff",
      transform: "equatorial", // Coordinate transformation: equatorial (default), ecliptic, galactic, supergalactic
      center: null,       // Initial center coordinates in equatorial transformation [hours, degrees, degrees], 
      orientationfixed: true,  // Keep orientation angle the same as center[2]
      background: { fill: "#000000", stroke: "#000000", opacity: 1 }, // Background style
      adaptable: true,    // Sizes are increased with higher zoom-levels
      interactive: true,  // Enable zooming and rotation with mousewheel and dragging
      form: false,        // Display settings form
      location: false,    // Display location settings 
      controls: false,     // Display zoom controls
      lang: "",           // Language for names, so far only for constellations: de: german, es: spanish
      container: this.containerId,   // ID of parent element, e.g. div
      datapath: "./lib/data/",  // Path/URL to data files, empty = subfolder 'data'
      polygons: {
        show: true,    // Show grid polygons
        style: { fill: "#ff00ff", opacity: 0.45 },
        filterColors: {
          "u": "#0000ff",
          "g": "#008000",
          "r": "#ffff00",
          "i": "#ff0000",
          "z": "#ee82ee",
          "y": "#ffffff"
        },
        displayedFilters: ["u", "g", "r", "i", "z", "y"]
      },
      lines: {
        graticule: {
          show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,      // Show graticule lines 
          lon: { pos: ["center"], fill: "#eee", font: "0.9em Helvetica, Arial, sans-serif" },
          lat: { pos: ["center"], fill: "#eee", font: "0.9em Helvetica, Arial, sans-serif" }
        },
        equatorial: { show: true, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },    // Show equatorial plane 
        ecliptic: { show: true, stroke: "#66cc66", width: 1.3, opacity: 0.7 },      // Show ecliptic plane 
        galactic: { show: true, stroke: "#cc6666", width: 1.3, opacity: 0.7 },     // Show galactic plane 
        supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 } // Show supergalactic plane 
      },
      telescopeRange: {
        show: true, dash: [10, 10], stroke: "#cccccc", width: 2.3, opacity: 0.7
      },
      moon: {
        show: true,
        pos: [30, 315],
        style: { fill: "#cccccc", opacity: "1.0" }
      }
    };
  }

  setupCelestial() {
    var config = this.getDefaultConfig();
    var Celestial = makeCelestial();
    Celestial.display(config);
    Celestial.cfg = config;
    this.Celestial = Celestial;
  }

  setFontSize(fsize) {
    var config = this.Celestial.cfg;
    config.lines.graticule.lon.font = fsize + "em Helvetica, Arial, sans-serif";
    config.lines.graticule.lat.font = fsize + "em Helvetica, Arial, sans-serif";
    this.updateConfig(config);
  }

  setDisplayedFilters(filtersArray) {
    var config = this.Celestial.cfg;
    config.polygons.displayedFilters = filtersArray;
    this.updateConfig(config);
  }

  setEcliptic(show){
    let cfg = this.Celestial.cfg;
    let cel = this.getCelestial();
    cfg.lines.ecliptic.show = show;
    cel.apply(cfg);
  }

  setGalactic = (show) => {
    let cfg = this.Celestial.cfg;
    let cel = this.getCelestial();
    cfg.lines.galactic.show = show;
    cel.apply(cfg);
    cel.cfg = cfg;
  }

  setMoon = (show) => {
    let cfg = this.Celestial.cfg;
    let cel = this.getCelestial();
    cfg.moon.show = show;
    cel.apply(cfg);
    cel.cfg = cfg;
  }

  setTelescopeRange = (show) => {
    let cfg = this.Celestial.cfg;
    let cel = this.getCelestial();
    cfg.telescopeRange.show = show;
    cel.apply(cfg);
    cel.cfg = cfg;
  }

  setSidebar = (show) => {
    this.sidebar.setState({
      sidebarOpen: show
    })
  }

  setProjection = (proj) => {
    let cfg = this.Celestial.cfg;
    let cel = this.getCelestial();
    cfg.projection = proj;
    // cel.reproject(cfg);
    cel.apply(cfg);
    cel.cfg = cfg;
  }

  displayAllFilters() {
    var filters = ["u", "g", "r", "i", "z", "y"];
    this.setDisplayedFilters(filters);
  }

  displayFilter(filter) {
    var filters = [filter];
    this.setDisplayedFilters(filters);
  }

  updateConfig(config) {
    this.Celestial.apply(config);
    // this.Celestial.display(config);
    this.Celestial.cfg = config;
  }

  componentDidMount() {
    // var mainNode = this.refs.skymapDiv;
    var nodeRef = this.refs[this.props.nodeRef];
    nodeRef.id = this.props.nodeRef;
    this.containerId = nodeRef.id;
    // set el height and width etc.
    this.setupCelestial();
  }

  render() {
    return (
      <div ref={this.props.nodeRef} className={this.props.className}></div>
    );
  }
}

export default Skymap;
