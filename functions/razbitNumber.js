/**
 * @param {Number} number
 */
module.exports = number => {
    if(number == undefined) return null
    if(isNaN(number)) return number
    let a = String(number);{
        let text= ""
        if(a.length%3!=0 && a.length > 3){
            text = a.substr(0, a.length % 3) + " "
            a = a.substr(a.length % 3)
        }
        while(a.length > 3) {
            text = text + a.substr(0, 3) + " "
            a = a.substr(3)
        }
        text = text + a
        return text
    }
}