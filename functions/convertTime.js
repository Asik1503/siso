/**
 * @param {Number} time
 */
module.exports = time => {
    let msec = parseInt(time - Date.now())
    let sec = parseInt(msec / 1000)
    seconds = Number(sec)
    var d = Math.floor(seconds / (3600*24))
    var h = Math.floor(seconds % (3600*24) / 3600)
    var m = Math.floor(seconds % 3600 / 60)
    var s = Math.floor(seconds % 60)
    var convertD = (d == 0 ? "" : `${String(d)}д.`)
    var convertH = (h == 0 ? "" : `${d == 0 ? "" : " "}${String(h)}ч.`)
    var convertM = (m == 0 ? "" : `${h == 0 ? "" : " "}${String(m)}м.`)
    var convertS = (s == 0 ? "" : `${m == 0 ? "" : " "}${String(s)}с.`)
    return convertD + convertH + convertM + convertS
}