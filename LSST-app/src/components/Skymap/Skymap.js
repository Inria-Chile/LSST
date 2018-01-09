import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import { filterColors } from "../Utils/Utils"
import Script from 'react-load-script'

const makeCelestial = window.makeCelestial;

class Skymap extends PureComponent {
  containerId = null;

  getCelestial() {
    return this.Celestial;
  }

  getConfig() {
    return this.Celestial.cfg;
  }

  getDefaultConfig = () => {
    let hoverCallback = this.props.cellHoverCallback;
    let clickCallback = this.props.cellClickCallback;
    let updateCallback = this.props.cellUpdateCallback;
    return {
      width: 0,     // Default width, 0 = full parent width; height is determined by projection
      projection: "aitoff",
      transform: "equatorial", // Coordinate transformation: equatorial (default), ecliptic, galactic, supergalactic
      center: null,       // Initial center coordinates in equatorial transformation [hours, degrees, degrees], 
      orientationfixed: true,  // Keep orientation angle the same as center[2]
      background: { fill: "#1c2935", stroke: "#1c2935", width: 2.6, opacity: 1.0 }, // Background style
      adaptable: true,    // Sizes are increased with higher zoom-levels
      interactive: false,  // Enable zooming and rotation with mousewheel and dragging
      form: false,        // Display settings form
      location: false,    // Display location settings 
      controls: false,     // Display zoom controls
      cellHoverCallback: hoverCallback ? hoverCallback : null,
      cellClickCallback: clickCallback ? clickCallback : null,
      cellUpdateCallback: updateCallback ? updateCallback : null,
      lang: "",           // Language for names, so far only for constellations: de: german, es: spanish
      container: this.containerId,   // ID of parent element, e.g. div
      datapath: "./lib/data/",  // Path/URL to data files, empty = subfolder 'data'
      polygons: {
        show: true,    // Show grid polygons
        style: { fill: "#ff00ff", opacity: 0.45 },
        // filterColors: {
        //   "u": "#0000ff",
        //   "g": "#008000",
        //   "r": "#ffff00",
        //   "i": "#ff0000",
        //   "z": "#ee82ee",
        //   "y": "#ffffff"
        // },
        filterColors: filterColors,
        displayedFilters: ["u", "g", "r", "i", "z", "y"]
      },
      lines: {
        graticule: {
          show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,      // Show graticule lines 
          lon: { pos: ["center"], fill: "#eee", font: "0.9em Helvetica, Arial, sans-serif", min:0, max:350, step:30 },
          lat: { pos: ["center"], fill: "#eee", font: "0.9em Helvetica, Arial, sans-serif", min:-90, max:90, step:30 },
          ra: {min:0, max:23, step:3}
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
        pos : [300, 10],
        size: 15,
        style: { fill: "#bbbbbb", stroke: "#ffffff", opacity: "1" }
      },
      sun: {
        show: true,
        pos : [30, 10],
        size: 15,
        style: { fill: "#cccc00", stroke: "#ffff00", opacity: "1" }
      },
    };
  }

  setupCelestial() {
    var config = this.getDefaultConfig();
    var Celestial = makeCelestial();
    Celestial.display(config);
    Celestial.cfg = config;
    this.Celestial = Celestial;
    if(this.props.onLoaded)
      this.props.onLoaded();
  }

  setFontSize(fsize) {
    var config = this.Celestial.cfg;
    config.lines.graticule.lon.font = fsize + "em Helvetica, Arial, sans-serif";
    config.lines.graticule.lat.font = fsize + "em Helvetica, Arial, sans-serif";
    this.updateConfig(config);
  }

  setGridOpacity(opacity) {
    var config = this.Celestial.cfg;
    if(opacity === 0)
      config.lines.graticule.show = false;
    config.lines.graticule.opacity = opacity;    
    this.updateConfig(config);
  }

  setDisplayedFilters(filtersArray) {
    var config = this.Celestial.cfg;
    config.polygons.displayedFilters = filtersArray;
    this.updateConfig(config);
  }

  setSidebar = (show) => {
    this.sidebar.setState({
      sidebarOpen: show
    })
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
    this.Celestial.cfg = config;
  }

  componentDidMount() {
    var nodeRef = this.refs[this.props.nodeRef];
    nodeRef.id = this.props.nodeRef;
    this.containerId = nodeRef.id;
    // this.setupCelestial();
  }

  render() {
    let cel = this.getCelestial();
    if(cel){
      let cfg = this.Celestial.cfg;
            
      cfg.lines.ecliptic.show = this.props.showEcliptic;
      cfg.lines.galactic.show = this.props.showGalactic;
      cfg.moon.show = this.props.showMoon;
      cfg.telescopeRange.show = this.props.showTelescopeRange;
      cel.apply(cfg);

      cfg.projection = this.props.projection;
      cel.reproject(cfg);
      
      cel.cfg = cel.cfg;
    }

    return (
      //
      <div  ref={this.props.nodeRef} className={this.props.className}>
        <Script
          url="/lib/d3.geo.projection.min.js"
          onError={ (x) => console.log(x+'onereror')}
          onLoad={ (x) => this.setupCelestial()}
        />
      </div>
    );
  }
}

export default Skymap;
