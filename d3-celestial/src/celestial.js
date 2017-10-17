/* global settings, bvcolor, projections, projectionTween, poles, eulerAngles, euler, transformDeg, getData, getPlanets, getGridValues, Canvas, halfπ, $, px, Round, has, isArray, form, geo, fldEnable, setCenter, interpolateAngle */
var Celestial = {
  version: '0.6.2',
  container: null,
  data: []
};

var ANIMDISTANCE = 300.035,  // Rotation animation threshold, ~2deg in radians
    ANIMSCALE = 1.4,       // Zoom animation threshold, scale factor
    ANIMINTERVAL_R = 2000, // Rotation duration scale in ms
    ANIMINTERVAL_P = 0, // Projection duration in ms
    ANIMINTERVAL_Z = 1500; // Zoom duration scale in ms
    
var cfg, prjMap, prjMapStatic, zoom, map, mapStatic, circle;

// Show it all, with the given config, otherwise with default settings
Celestial.display = function(config) {
  var par, container = Celestial.container,
      animations = [], current = 0, repeat = false, aID;
  
  //Mash config with default settings
  cfg = settings.set(config); 
  cfg.center = cfg.center || [0,0];     
  if (!cfg.lang || cfg.lang.search(/^de|es$/) === -1) cfg.lang = "name";
  
  var parent = $(cfg.container);
  if (parent) { 
    par = "#"+cfg.container;
    var st = window.getComputedStyle(parent, null);
    if (!parseInt(st.width) && !cfg.width) parent.style.width = px(parent.parentNode.clientWidth); 
  } else { 
    par = "body"; 
    parent = null; 
  }
   
  var margin = [16, 16],
      width = getWidth(),
      proj = getProjection(cfg.projection);
  var mousedown = false;
  var mousePosition = null;
  var lastSeletedCell = null;
  var lastClickedCell = null;
  var selectedPolygons = [];  
  var mappedIds = {};
  var displayedObservations = null;
  var allPolygons = [];
  var self = this;
  
  var selectedCell = null;
  if (cfg.lines.graticule.lat && cfg.lines.graticule.lat.pos[0] === "outline") proj.scale -= 2;
  
  if (!proj) return;
      
  var trans = cfg.transform || "equatorial",
      ratio = proj.ratio,
      height = width / ratio,
      scale = proj.scale * width/1024,
      adapt = 1,
      rotation = getAngles(cfg.center),
      path = cfg.datapath || "";
      path = path.replace(/([^\/]$)/, "$1\/");
  
      
  if (par != "body") $(cfg.container).style.height = px(height);
  
  prjMap = Celestial.projection(cfg.projection).rotate(rotation).translate([width/2, height/2]).scale(scale);
  prjMapStatic = Celestial.projection(cfg.projection).rotate(rotation).translate([width/2, height/2]).scale(scale);

  var zoomRedraw = function(){
    redraw("zoom");
  }

  zoom = d3.geo.zoom().projection(prjMap).center([width/2, height/2]).scaleExtent([scale, scale*5]).on("zoom.redraw", zoomRedraw);

  var canvas = d3.selectAll("#"+cfg.container + "canvas");
  if (canvas[0].length === 0) canvas = d3.select(par).append("canvas");
  canvas.attr("width", width).attr("height", height);
  var context = canvas.node().getContext("2d");  

  
  var graticule = d3.geo.graticule().minorStep([45,30]);
  map = d3.geo.path().projection(prjMap).context(context);
  mapStatic = d3.geo.path().projection(prjMapStatic).context(context);


  // 
  // PIXEL TO ANGLE
  //
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  canvas[0][0].addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas[0][0], evt);
    mousePosition = prjMap.invert([mousePos.x, mousePos.y]);
    if(cfg.cellHoverCallback)
      checkMouseInsideCell(cfg.cellHoverCallback);
  }, false);

  canvas[0][0].addEventListener('mousedown', function(evt) {
    mousedown = true;
    if(cfg.cellClickCallback)
      checkMouseClickedCell(cfg.cellClickCallback);
  });

  canvas[0][0].addEventListener('mouseup', function(evt) {
    mousedown = false;
  });  

  //parent div with id #celestial-map or body
  if (container) container.selectAll("*").remove();
  else container = d3.select(par).append("container");

  if (cfg.interactive) canvas.call(zoom);
  else canvas.attr("style", "cursor: default!important");
  
  setClip(proj.clip);

  // d3.select(window).on('resize', resize);

  if (cfg.controls === true && $("celestial-zoomin") === null) {
    d3.select(par).append("input").attr("type", "button").attr("id", "celestial-zoomin").attr("value", "\u002b").on("click", function () { zoomBy(1.111); });
    d3.select(par).append("input").attr("type", "button").attr("id", "celestial-zoomout").attr("value", "\u2212").on("click", function () { zoomBy(0.9); });
  }
  
  if (cfg.location === true) {
    circle = d3.geo.circle().angle([90]);  
    container.append("path").datum(circle).attr("class", "horizon");
    if ($("loc") === null) geo(cfg);
    else rotate({center:Celestial.zenith()});
    fldEnable("horizon-show", proj.clip);
  }
  
  if (cfg.form === true && $("params") === null) form(cfg);
  if ($("error") === null) d3.select("body").append("div").attr("id", "error");


  function load() {
    //Celestial planes
    for (var key in cfg.lines) {
      if (!has(cfg.lines, key)) continue;
      if (key === "graticule") {
        container.append("path").datum(graticule).attr("class", "graticule"); 
				if (has(cfg.lines.graticule, "lon") && cfg.lines.graticule.lon.pos.length > 0) 
          container.selectAll(".gridvalues_lon")
            .data(getGridValues("lon", cfg.lines.graticule.lon.pos))
            .enter().append("path")
            .attr("class", "graticule_lon"); 
				if (has(cfg.lines.graticule, "lat") && cfg.lines.graticule.lat.pos.length > 0) 
          container.selectAll(".gridvalues_lat")
            .data(getGridValues("lat", cfg.lines.graticule.lat.pos))
            .enter().append("path")
            .attr("class", "graticule_lat"); 
      } else {
        container.append("path")
          .datum(d3.geo.circle().angle([90]).origin(transformDeg(poles[key], euler[trans])) )
          .attr("class", key);
      }
    }
    var key = "telescopeRange"
    container.append("path")
      .datum(d3.geo.circle().angle([70]).origin(transformDeg(poles[key], euler[trans])) )
      .attr("class", key);

    //Polygon grid data outline
    d3.json(path + "grid.geojson", function(error, json) {
      if (error) { 
        window.alert("Your Browser doesn't support local file loading or the file doesn't exist. See readme.md");
        return console.warn(error);  
      }

      var polys = getData(json, trans);
      container.selectAll(".grid-polygons")
         .data(polys.features, function(d){return d.properties.id;})
         .enter().append("path")
         .attr("class", function(d){return "mw " + d.properties.id;})
         .attr("count", function(d){return d.properties.count;});
      redraw("load");
      container.selectAll(".mw").each(function(d) {
        for(var i=0;i<d.geometry.coordinates;i++)
          if(d.geometry.coordinates[i][0] > 180)
            d.geometry.coordinates[i][0] = d.geometry.coordinates[i][0]-360;
      });
      selectedPolygons = container.selectAll(".mw");    
    }); 


    //Add moon
    container.selectAll(".moon")
      .data([cfg.moon])
      .enter().append("path")
      .attr("class", "moon");

    //Add sun
    container.selectAll(".sun")
      .data([cfg.sun])
      .enter().append("path")
      .attr("class", "sun");

    if (Celestial.data.length > 0) { 
      Celestial.data.forEach( function(d) {
        if (has(d, "file")) d3.json(d.file, d.callback);
        else setTimeout(d.callback, 0);
      }, this);
    }
  }
  
  // Zoom by factor; >1 larger <1 smaller 
  function zoomBy(factor) {
    if (!factor || factor === 1) return;
    var sc0 = prjMap.scale(),
        sc1 = sc0 * factor,
        ext = zoom.scaleExtent(),
        interval = ANIMINTERVAL_Z * Math.sqrt(Math.abs(1-factor));
        
    if (sc1 < ext[0]) sc1 = ext[0];
    if (sc1 > ext[1]) sc1 = ext[1];
    var zTween = d3.interpolateNumber(sc0, sc1);
    d3.select({}).transition().duration(interval).tween("scale", function () {
        return function(t) {
          var z = zTween(t);
          prjMap.scale(z); 
          redraw("zoom"); 
        };      
    }).transition().duration(0).tween("scale", function () {
      zoom.scale(sc1); 
      redraw("zoom"); 
    });
    return interval;
  }  
  
  function apply(config) {
    cfg = cfg.set(config); 
    redraw("zoom");
  }


  function rotate(config) {
    var cFrom = cfg.center, 
        rot = prjMap.rotate(),
        sc = prjMap.scale(),
        interval = ANIMINTERVAL_R,
        keep = false, 
        cTween, zTween, oTween,
        oof = cfg.orientationfixed;
    
    if (Round(rot[1], 1) === -Round(config.center[1], 1)) keep = true; //keep lat fixed if equal
    cfg = cfg.set(config);
    var d = Round(d3.geo.distance(cFrom, cfg.center), 2);
    var o = d3.geo.distance([cFrom[2],0], [cfg.center[2],0]);
    if (d < ANIMDISTANCE && o < ANIMDISTANCE) {  
      rotation = getAngles(cfg.center);
      prjMap.rotate(rotation);
      redraw("rotate");
    } else {
      // Zoom interpolator
      if (sc > scale * ANIMSCALE) zTween = d3.interpolateNumber(sc, scale);
      else zTween = function () { return sc; };
      // Orientation interpolator
      if (o === 0) oTween = function () { return rot[2]; };
      else oTween = interpolateAngle(cFrom[2], cfg.center[2]);
      if (d > 3.14) cfg.center[0] -= 0.01; //180deg turn doesn't work well
      cfg.orientationfixed = false;  
      // Rotation interpolator
      if (d === 0) cTween = function () { return cfg.center; };
      else cTween = d3.geo.interpolate(cFrom, cfg.center);
      interval = (d !== 0) ? interval * d : interval * o; // duration scaled by ang. distance
      d3.select({}).transition().duration(interval).tween("center", function () {
        return function(t) {
          var c = getAngles(cTween(t));
          c[2] = oTween(t);
          var z = t < 0.5 ? zTween(t) : zTween(1-t);
          if (keep) c[1] = rot[1]; 
          prjMap.scale(z);
          prjMap.rotate(c);
          redraw("rotate");
        };
      }).transition().duration(0).tween("center", function () {
        cfg.orientationfixed = oof;
        rotation = getAngles(cfg.center);
        prjMap.rotate(rotation);
        redraw("rotate");
      });
    }
    return interval;
  }
  
  function resize(set) {
    width = getWidth();
    if (cfg.width === width && !set) return;
    height = width/ratio;
    scale = proj.scale * width/1024;
    canvas.attr("width", width).attr("height", height);
    zoom.scaleExtent([scale, scale*5]).scale(scale);
    prjMap.translate([width/2, height/2]).scale(scale);
    if (parent) parent.style.height = px(height);
    redraw("resize");
  }

  function reproject(config) {
    var prj = getProjection(config.projection);
    if (!prj) return;
    
    var rot = prjMap.rotate(), ctr = prjMap.center(), sc = prjMap.scale(), ext = zoom.scaleExtent(),
        prjFrom = Celestial.projection(cfg.projection).center(ctr).translate([width/2, height/2]).scale([ext[0]]),
        interval = ANIMINTERVAL_P, 
        delay = 0, 
        rTween = d3.interpolateNumber(ratio, prj.ratio);

    if (proj.clip != prj.clip) interval = 0;   // Different clip = no transition
    
    var prjTo = Celestial.projection(config.projection).center(ctr).translate([width/2, width/prj.ratio/2]).scale([prj.scale * width/1024]);
    var bAdapt = cfg.adaptable;
    var drawTelescopeRange = cfg.telescopeRange.show;

    if (sc > ext[0]) {
      delay = zoomBy(0.1);
      setTimeout(reproject, delay, config);
      return delay + interval;
    }
    
    // fldEnable("horizon-show", prj.clip);
    
    prjMap = projectionTween(prjFrom, prjTo);
    
    cfg.adaptable = false;
    cfg.telescopeRange.show = false;

    d3.select({}).transition().duration(interval).tween("projection", function () {
      return function(_) {
        prjMap.alpha(_).rotate(rot);
        map.projection(prjMap);
        setClip(prj.clip);
        ratio = rTween(_);
        height = width/ratio;
        canvas.attr("width", width).attr("height", height);
        if (parent) parent.style.height = px(height);
        redraw("projection");
      };
    }).transition().duration(0).tween("projection", function () {
      proj = prj;
      ratio = proj.ratio;
      height = width / proj.ratio;
      scale = proj.scale * width/1024;
      canvas.attr("width", width).attr("height", height);
      if (parent) parent.style.height = px(height);
      cfg.projection = config.projection;
      prjMap = Celestial.projection(config.projection).rotate(rot).translate([width/2, height/2]).scale(scale);
      map.projection(prjMap);
      setClip(proj.clip); 
      zoom.projection(prjMap).scaleExtent([scale, scale*5]).scale(scale);
      cfg.adaptable = bAdapt;
      cfg.telescopeRange.show = drawTelescopeRange;
      prjMapStatic = Celestial.projection(config.projection).translate([width/2, height/2]).scale(scale);
      mapStatic.projection(prjMapStatic);
      redraw("projection");
    });
    return interval;
  }

  function checkMouseInsideCell(callback){
    var selectedPolygons = container.selectAll(".mw");
    selectedPolygons.each(function(d) {
      if(Celestial.inside(mousePosition, d.geometry.coordinates[0])){
        if(lastSeletedCell != d){
          var fieldID = findFieldId(d, displayedObservations);
          lastSeletedCell = d;
          callback(fieldID, d);
        }
        return;
      }
    });
  }

  function checkMouseClickedCell(callback){
    var selectedPolygons = container.selectAll(".mw");
    selectedPolygons.each(function(d) {
      if(Celestial.inside(mousePosition, d.geometry.coordinates[0])){
        var fieldID = findFieldId(d, displayedObservations);
        lastClickedCell = d;
        callback(fieldID, d);
        self.redraw();
        return;
      }
    });
  }

  function drawGridPolygons(){
    var totalObs = 0;
    var maxFieldObs = 0;
    var style = cfg.polygons.style;
    var selectedPolygons = container.selectAll(".mw").filter(function(d){
      return d.properties.count.length > 0; 
    });
    selectedPolygons.each(function(d) {
      var fieldObs = 0;
      for(var i=0;i<d.properties.count.length;++i){
        var filterName = d.properties.count[i][0];
        if(cfg.polygons.displayedFilters.indexOf(filterName) < 0)
          continue;
        totalObs += d.properties.count[i][1];
        fieldObs += d.properties.count[i][1];
      }
      if(fieldObs > maxFieldObs)
        maxFieldObs = fieldObs;
    });
    selectedPolygons.each(function(d) {
      context.beginPath();
      var fieldObs = 0;

      for(var i=0;i<d.properties.count.length;++i){
        var filterName = d.properties.count[i][0];
        if(cfg.polygons.displayedFilters.indexOf(filterName) < 0)
          continue;
        fieldObs += d.properties.count[i][1];
      }
      var colors = [], weights = [];
      for(var i=0;i<d.properties.count.length;i++){
        var filterName = d.properties.count[i][0];
        if(cfg.polygons.displayedFilters.indexOf(filterName) < 0)
          continue;
        if(cfg.polygons.displayedFilters.length === 6){
          colors.push([200,200,200]);
          weights.push(d.properties.count[i][1]/fieldObs);
          continue;
        }
        var hexColor = cfg.polygons.filterColors[filterName];
        colors.push(hex2rgb(hexColor));
        weights.push(d.properties.count[i][1]/fieldObs);
      }
      var paintColor = rgb2hex(blendColors(colors, weights));
      context.fillStyle = cfg.background.fill;
      if(!(paintColor === '#000000')){
        context.fillStyle = paintColor;
        context.globalAlpha = Math.min(1.0, Math.pow(fieldObs/maxFieldObs, 1.0/2.0));
      }
      map(d);
      context.fill();
      if(lastClickedCell && lastClickedCell.properties.id === d.properties.id){
        context.globalAlpha = 1.0;
        map(lastClickedCell);
        context.strokeStyle = '#00ff00';
        context.stroke();
      }
    });
  }

  function drawMoon(){
    container.selectAll(".moon").each(function(d) {
        // if (clip(d.pos)) {
          var r = cfg.moon.size * width/960;
          // console.log(cfg.moon.size, width/960)
          var pt = prjMap(d.pos);
          setStyle(cfg.moon.style);
          // context.fillStyle = d.style.fill; 
          // context.globalAlpha = 1.0; 
          context.beginPath();
          context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          context.stroke();
        // }
    });
  }

  function drawSun(){
    container.selectAll(".sun").each(function(d) {
        // if (clip(d.pos)) {
          var r = cfg.sun.size * width/960;
          // console.log(cfg.sun.size, width/960)
          var pt = prjMap(d.pos);
          setStyle(cfg.sun.style);
          // context.fillStyle = d.style.fill; 
          // context.globalAlpha = 1.0; 
          context.beginPath();
          context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          context.stroke();
        // }
    });
  }

  Celestial.updateCell = function(n, count){
    if(count)
      d3.selectAll(".t"+n).each(function(d){d.properties.count = count;})
    else
      d3.selectAll(".t"+n).each(function(d){
        d.properties.count = (parseInt(d.properties.count) + 10) + "";
      })    
  }

  findFieldId = function(selectedPolygon, observations){
    var keys = Object.keys(mappedIds);
    var polygonID = selectedPolygon.properties.id;
    for(var i=0;i<keys.length;++i){
      var key = keys[i];
      if(mappedIds[key] == polygonID)
        return key;
    }
    return null;
  }

  findPolygonId = function(selectedPolygons, obs){
    var polygonID = null;
    var fieldID = obs['fieldID'];
    if(mappedIds[fieldID]){
      polygonID = mappedIds[fieldID];
    } else {
      var id = obs['fieldID'];
      var ra = obs['fieldRA'];
      ra > 180 ? ra = ra-360 : ra = ra;
      var dec = obs['fieldDec'];
      var filterName = obs['filterName'];
      var newCount = obs['count'];
      selectedPolygons.each(function(d) {
        if(Celestial.inside([ra,dec], d.geometry.coordinates[0])){
          polygonID = d.properties.id;
          mappedIds[fieldID] = polygonID;
        }
      });
    }
    return polygonID;
  }

  Celestial.updateCellsOld2 = function(observations){
    // if(displayedObservations && displayedObservations.length==observations.length && displayedObservations.every(function(v,i) { return v === observations[i]})){
    //   return;
    // }
    console.log('updateCells')
    displayedObservations = observations;
    selectedPolygons.each(function(d) {
      for(var i=0;i<d.properties.count.length;++i)
            d.properties.count[i][1] = 0;
    });
    for(var i=0;i<observations.length;++i){
      var obs = observations[i];
      var id = obs['fieldID'];
      var ra = obs['fieldRA'];
      ra > 180 ? ra = ra-360 : ra = ra;
      var dec = obs['fieldDec'];
      var filterName = obs['filterName'];
      var newCount = obs['count'];
      var polygonId = findPolygonId(selectedPolygons, obs);


      selectedPolygons.each(function(d){
        if(polygonId == d.properties.id){
          // console.log('INSIDE', polygonId, d)  
          var added = false;
          for(var i=0;i<d.properties.count.length;++i){
            if(d.properties.count[i][0] == filterName){
              d.properties.count[i][1] = newCount;
              added = true;
            }
          }
          if(!added){
            d.properties.count.push([filterName, newCount]);
            if(lastClickedCell && lastClickedCell.properties.id === d.properties.id && cfg.cellUpdateCallback){
              var fieldID = findFieldId(d, displayedObservations);
              lastClickedCell = d;
              cfg.cellUpdateCallback(fieldID, d);
            }
          }
        }
      });
    }
  }

  Celestial.updateCells = function(observations){
    // if(displayedObservations && displayedObservations.length==observations.length && displayedObservations.every(function(v,i) { return v === observations[i]})){
    //   return;
    // }
    displayedObservations = observations;
    selectedPolygons.each(function(d) {
      for(var i=0;i<d.properties.count.length;++i)
            d.properties.count[i][1] = 0;
    });
    var groupedObs = {};
    for(var i=0;i<observations.length;++i){
      var obs = observations[i];
      var key = 'id:'+obs['fieldID']+'filter'+obs['filterName'];
      if(groupedObs[key])
        groupedObs[key] = {obs: obs, count: groupedObs[key]['count']+1};
      else
        groupedObs[key] = {obs: obs, count: 1};      
    }

    var keys = Object.keys(groupedObs);
    for(var i=0;i<keys.length;++i){
      var key = keys[i];
      var obs = groupedObs[key]['obs'];
      var newCount = groupedObs[key]['count'];
      var id = obs['fieldID'];
      var ra = obs['fieldRA'];
      ra > 180 ? ra = ra-360 : ra = ra;
      var dec = obs['fieldDec'];
      var filterName = obs['filterName'];
      var polygonId = findPolygonId(selectedPolygons, obs);
      
      selectedPolygons.filter(function(d){
        return polygonId == d.properties.id
      }).each(function(d){
        d.properties.count.push([filterName, newCount]);
        if(lastClickedCell && lastClickedCell.properties.id === d.properties.id && cfg.cellUpdateCallback){
          var fieldID = findFieldId(d, displayedObservations);
          lastClickedCell = d;
          cfg.cellUpdateCallback(fieldID, d);
        }
      });
    }
  }
  
  function realRedraw(){

    var rot = prjMap.rotate();
    
    if (cfg.adaptable) adapt = Math.sqrt(prjMap.scale()/scale);
    if (!adapt) adapt = 1;
    
    if (cfg.orientationfixed) {
      rot[2] = cfg.center[2]; 
      prjMap.rotate(rot);
    }
    cfg.center = [-rot[0], -rot[1], rot[2]];
    
    // setCenter(cfg.center, cfg.transform);
    clear();
    
    drawOutline();

    //Draw grid polygons on the canvas
    if (cfg.polygons.show) {
      drawGridPolygons();
    }

    if (cfg.moon && cfg.moon.show) {
      drawMoon();
    }

    if (cfg.sun && cfg.sun.show) {
      drawSun();
    }
    
    for (var key in cfg.lines) {
      if (!has(cfg.lines, key)) continue;
      if (cfg.lines[key].show !== true) continue;
      setStyle(cfg.lines[key]);
      container.selectAll("."+key).attr("d", map);  
      context.stroke();
    }

    //telescope
    var key = 'telescopeRange';
    if (cfg[key].show) {
      setStyle(cfg[key]);
      container.selectAll("."+key).attr("d", function(x){
        return mapStatic(x);		
      });  
      context.stroke();
    }

    if (has(cfg.lines.graticule, "lon")) {
      setTextStyle(cfg.lines.graticule.lon);
      container.selectAll(".graticule_lon").each(function(d, i) { 
        if (clip(d.geometry.coordinates)) {
          var pt = prjMap(d.geometry.coordinates);
          gridOrientation(pt, d.properties.orientation);
          context.fillText(d.properties.value, pt[0], pt[1]); 
        }
      });
    }
    
    if (has(cfg.lines.graticule, "lat")) {
      setTextStyle(cfg.lines.graticule.lat);
      container.selectAll(".graticule_lat").each(function(d, i) { 
        if (clip(d.geometry.coordinates)) {
          var pt = prjMap(d.geometry.coordinates);
          gridOrientation(pt, d.properties.orientation);
          context.fillText(d.properties.value, pt[0], pt[1]); 
        }
      });
	  }
    
    drawOutline(true);

    if (Celestial.data.length > 0) { 
      Celestial.data.forEach( function(d) {
        d.redraw("Celestial.data");
      });
    }
    
//    drawOutline(true);
    
    if (cfg.location && cfg.horizon.show && !proj.clip) {
      circle.origin(Celestial.nadir());
      setStyle(cfg.horizon);
      container.selectAll(".horizon").datum(circle).attr("d", map);  
      context.fill();    
      if (cfg.horizon.stroke) context.stroke();    
    }

    if (cfg.controls) { 
      zoomState(prjMap.scale());
    }
  }

  function redraw(msg) {
    // window.requestAnimationFrame(realRedraw);
    // console.log(msg);
    realRedraw();
  }
    
  function drawOutline(stroke) {
    var rot = prjMap.rotate();
    
    prjMap.rotate([0,0]);
    setStyle(cfg.background);
    container.selectAll(".outline").attr("d", map);
    if (stroke) context.stroke(); else context.fill();
    prjMap.rotate(rot);
  }

  // Helper functions -------------------------------------------------
  Celestial.inside = function(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    if(!point)
      return false;
    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];

      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  };

  function clip(coords) {
    return proj.clip && d3.geo.distance(cfg.center, coords) > halfπ ? 0 : 1;
  }

  function setStyle(s) {
    context.fillStyle = s.fill || null;
    context.strokeStyle = s.stroke || null;
    context.lineWidth = s.width || null;
    context.globalAlpha = s.opacity || 1;  
    context.font = s.font || null;
    if (has(s, "dash")) context.setLineDash(s.dash); else context.setLineDash([]);
    context.beginPath();
  }

  function setTextStyle(s) {
    context.fillStyle = s.fill;
    context.textAlign = s.align || "left";
    context.textBaseline = s.baseline || "bottom";
    context.globalAlpha = s.opacity || 1;  
    context.font = s.font;
  }
  
  function zoomState(sc) {
    var czi = $("celestial-zoomin"),
        czo = $("celestial-zoomout");
    if (!czi || !czo) return;
    czi.disabled = sc >= scale*4.99;
    czo.disabled = sc <= scale;    
  }
  
  function setClip(setit) {
    if (setit) {
      prjMap.clipAngle(90);
      container.selectAll(".outline").remove();
      container.append("path").datum(d3.geo.circle().angle([90])).attr("class", "outline");
    } else {
      prjMap.clipAngle(null);
      container.selectAll(".outline").remove();
      container.append("path").datum(graticule.outline).attr("class", "outline"); 
    }        
  }
  
  function gridOrientation(pos, orient) {
    var o = orient.split(""), h = "center", v = "middle"; 
    for (var i = o.length-1; i >= 0; i--) {
      switch(o[i]) {
        case "N": v = "bottom"; break;
        case "S": v = "top"; break;
        case "E": h = "left"; pos[0] += 2; break;
        case "W": h = "right";  pos[0] -= 2; break;
      }
    }
    context.textAlign = h;
    context.textBaseline = v;
    return pos;
  }
  
  function clear() {
    context.clearRect(0, 0, width + margin[0], height + margin[1]);
  }
  
  function getWidth() {
    if (cfg.width && cfg.width > 0) return cfg.width;
    if (parent) return parent.clientWidth - margin[0];
    return window.innerWidth - margin[0]*2;
  }
  
  function getProjection(p) {
    if (!has(projections, p)) return;
    var res = projections[p];
    if (!has(res, "ratio")) res.ratio = 2;  // Default w/h ratio 2:1    
    return res;
  }
  
  function getAngles(coords) {
    if (coords === null) return [0,0,0];
    var rot = eulerAngles.equatorial; 
    if (!coords[2]) coords[2] = 0;
    return [rot[0] - coords[0], rot[1] - coords[1], rot[2] + coords[2]];
  }
  
  
  function animate() {
    if (!animations || animations.length < 1) return;

    var d, a = animations[current];
    
    switch (a.param) {
      case "projection": d = reproject({projection:a.value}); break;
      case "center": d = rotate({center:a.value}); break;
      case "zoom": d = zoomBy(a.value);
    }
    if (a.callback) setTimeout(a.callback, d);
    current++;
    if (repeat === true && current === animations.length) current = 0;
    d = a.duration === 0 || a.duration < d ? d : a.duration;
    if (current < animations.length) aID = setTimeout(animate, d);
  }
  
  function stop() {
    clearTimeout(aID);
    //current = 0;
    //repeat = false;
  }

  Celestial.goToDate = function(date){
    var lon = -70,
    lat = 0,
    zone = date.getTimezoneOffset();
    var tz = date.getTimezoneOffset();
    var dtc = new Date(date.valueOf() + (zone - tz) * 60000);

    if (lon !== "" && lat !== "") {
      geopos = [parseFloat(lat), parseFloat(lon)];
      zenith = Celestial.getPoint(horizontal.inverse(dtc, [90, 0], geopos), cfg.transform);
      zenith[2] = 0;
      Celestial.rotate({center:zenith, horizon:cfg.horizon});
    }
  }
  
  // Exported objects and functions for adding data
  this.container = container;
  this.clip = clip;
  this.map = map;
  this.mapProjection = prjMap;
  this.context = context;
  this.setStyle = setStyle;
  this.setTextStyle = setTextStyle;
  this.redraw = redraw; 
  this.resize = function(config) { 
    if (config && has(config, "width")) cfg.width = config.width; 
    resize(true); 
  }; 
  this.reload = function(config) { 
    if (!config || !has(config, "transform")) return;
    trans = cfg.transform = config.transform; 
    if (trans === "equatorial") graticule.minorStep([45,30]);
    else  graticule.minorStep([45,30]);
    container.selectAll("*").remove(); 
    setClip();
    container.append("path").datum(circle).attr("class", "horizon");
    load(); 
  }; 
  this.apply = function(config) { apply(config); }; 
  this.reproject = function(config) { return reproject(config); }; 
  this.rotate = function(config) { if (!config) return cfg.center; return rotate(config); }; 
  this.zoomBy = function(factor) { if (!factor) return prjMap.scale()/scale; return zoomBy(factor); };
  this.color = function(type) {
    if (!type) return "#000";
    return "#000";
  };
  this.animate = function(anims, dorepeat) { 
    if (!anims) return; 
    animations = anims; 
    current = 0; 
    repeat = dorepeat ? true : false; 
    animate(); 
  };
  this.stop  = function(wipe) {
    stop();
    if (wipe === true) animations = [];
  };
  this.go = function(index) {
    if (animations.length < 1) return;
    if (index && index < animations.length) current = index;
    animate(); 
  };
  
  load();
};
