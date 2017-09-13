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

export const filterColors = {
    u:'#377eb8',
    g:'#4daf4a',
    r:'#bf4042',
    i:'#e68019',
    z:'#eded1d',
    y:'#8e5a96'
};

export const typesOfScience = ["Dark Matter","Dark Energy","Solar System", "Changing Sky", "Milky Way"];

export function lstToTypeOfScience(lst){
    if(lst < 0.6)
        return typesOfScience[0]
    if(lst < 1.2)
        return typesOfScience[1]
    if(lst < 1.8)
        return typesOfScience[2]
    if(lst < 2.4)
        return typesOfScience[3]
    return typesOfScience[4]
}