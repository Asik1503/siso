/**
 * @param {string} hex
 */
module.exports = hex => {
    if(hex.startsWith("#") && hex.length == 7) return true
    else return false
}