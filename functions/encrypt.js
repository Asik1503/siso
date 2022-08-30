/**
 * @param {string} val
 * @param {string} code
 * @param {Number} studies
 */
module.exports = (val, code, studies) => {
    for(let i = 0;i < studies;i++){
        val = Buffer.from(val).toString(code)
    }
    return val
}