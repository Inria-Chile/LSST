/* global Celestial, settings, $, px, has, isNumber, findPos */

function setUnit(trans, old) {
  var cx = $("centerx");
  if (!cx) return null;
  
  if (old) {
    if (trans === "equatorial" && old !== "equatorial") {
      cx.value = (cx.value/15).toFixed(1);
      if (cx.value < 0) cx.value += 24;
    } else if (trans !== "equatorial" && old === "equatorial") {
      cx.value = (cx.value * 15).toFixed(1);
      if (cx.value > 180) cx.value -= 360;
    }
  }
  if (trans === 'equatorial') {
    cx.min = "0";
    cx.max = "24";
    $("cxunit").innerHTML = "h";
  } else {
    cx.min = "-180";
    cx.max = "180";
    $("cxunit").innerHTML = "\u00b0";
  }
  return cx.value;
}

function setCenter(ctr, trans) {
  var cx = $("centerx"), cy = $("centery"), cz = $("centerz");
  if (!cx || !cy) return;
  
  if (ctr === null) ctr = [0,0,0]; 
  if (ctr.length <= 2) ctr[2] = 0;
  //config.center = ctr; 
  if (trans !== "equatorial") cx.value = ctr[0].toFixed(1); 
  else cx.value = ctr[0] < 0 ? (ctr[0] / 15 + 24).toFixed(1) : (ctr[0] / 15).toFixed(1); 
  
  cy.value = ctr[1].toFixed(1);
  cz.value = ctr[2] !== null ? ctr[2].toFixed(1) : 0;
}

// Set max input limits depending on data
function setLimits() {
  var t, rx = /\d+(\.\d+)?/g,
      s, d, res = {s:6, d:6},
      config =  Celestial.settings();

  d = config.dsos.data;
  
  //test dso limit
  t = d.match(rx);
  if (t !== null) {
    res.d = parseFloat(t[t.length-1]);
  }

  if (res.d != 6) {
    $("dsos-limit").max = res.d;
    $("dsos-namelimit").max = res.d;
  }
   
   s = config.stars.data;
  
  //test star limit
  t = s.match(rx);
  if (t !== null) {
    res.s = parseFloat(t[t.length-1]);
  }

  if (res.s != 6) {
    $("stars-limit").max = res.s;
    $("stars-namelimit").max = res.s;
  }

  return res;
}
