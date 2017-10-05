// export const filterColors = {
//     u:"#992f8f",
//     g:"#2cdd37",
//     r:"#c80f0f",
//     i:"#f19437",
//     z:"#fff704",
//     y:"#ffffff"
// };

// export const filterColors = {
//     u:'#80b1d3',
//     g:'#8dd3c7',
//     r:'#fb8072',
//     i:'#fdb462',
//     z:'#ffffb3',
//     y:'#bebada'
// };

// export const filterColors = {
//     u:'#377eb8',
//     g:'#4daf4a',
//     r:'#bf4042',
//     i:'#e68019',
//     z:'#eded1d',
//     y:'#8e5a96'
// };


let decreaseBrightness = function(hex, f){
    let rgb = hexToRgb(hex);
    rgb = [Math.round(rgb[0]*f), Math.round(rgb[1]*f), Math.round(rgb[2]*f)];
    return rgb2hex(rgb);
}

let hexToRgb = function(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length=== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255];
    }
    throw new Error('Bad Hex');
}

let rgb2hex = function(rgb) {
    var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
    return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

export const scienceProposals = ["NES","SCP","WFD", "GP", "DD"];

export function lstToTypeOfScience(lst){
    if(lst < 0.6)
        return scienceProposals[0]
    if(lst < 1.2)
        return scienceProposals[1]
    if(lst < 1.8)
        return scienceProposals[2]
    if(lst < 2.4)
        return scienceProposals[3]
    return scienceProposals[4]
}

export function lstToTypeOfScienceNumber(lst){
    if(lst < 0.6)
        return 0
    if(lst < 1.2)
        return 1
    if(lst < 1.8)
        return 2
    if(lst < 2.4)
        return 3
    return 4
}

export const filterColors = {
    u:decreaseBrightness('#377eb8', 0.7),
    g:decreaseBrightness('#4daf4a', 0.7),
    r:decreaseBrightness('#bf4042', 0.7),
    i:decreaseBrightness('#e68019', 0.7),
    z:decreaseBrightness('#eded1d', 0.7),
    y:decreaseBrightness('#8e5a96', 0.7)
};


    
export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
}

export function parseJSON(response) {
    return response.json();
}