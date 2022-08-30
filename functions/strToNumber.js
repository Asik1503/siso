/**
 * @param {string} line
 */
module.exports = line => {
    return parseInt(line.replace(/ /g, ""))
}