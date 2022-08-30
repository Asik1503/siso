const colors = require("colors")

/**
 * @param {String} text 
*/
module.exports.log = text => {
    console.log(`${colors.yellow.bold("LINK: ")}${text}`)
}

/**
 * @param {String} text
*/
module.exports.error = text => {
    console.log(`${colors.red.bold("ERROR: ")}${text}`)
}

/**
 * @param {String} text
*/
module.exports.info = text => {
    console.log(`${colors.green.bold("LOAD: ")}${text}`)
}