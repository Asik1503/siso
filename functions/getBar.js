const empty = '<:740911673023528993:740969694747426856>'
const bar = ['<:740913920486801459:748597964322242683>', '<:740913941986672700:740968831123718176>', '<:740913953495973988:740969258225500253>', '<:740913963235278890:740969587700662323>', empty]

/**
 * @param {Number} exp
 * @param {Number} nextAt
 */

module.exports = (exp, nextAt) => {
    let procent = exp/nextAt
    let line = ""
    for(let i=0;i<5;i-=-1){
        if(procent > 0.25)
        line += bar[i]
        else line += empty
        procent -=0.25
    }
    return line
}