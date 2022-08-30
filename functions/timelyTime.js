/**
 * @param {Number} time
 */
module.exports = time => {
    var msec = parseInt(time - Date.now())
    var sec = parseInt(msec / 1000)
    var h = Math.floor(sec % (3600*24) / 3600)
    return `${h}ч.`
}