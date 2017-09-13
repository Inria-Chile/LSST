export const filterColors = {
    u:"#992f8f",
    g:"#2f2fcc",
    r:"#2cdd37",
    i:"#fff704",
    z:"#f19437",
    y:"#c80f0f"
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