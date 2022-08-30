/**
 * @param {string} url
 */
module.exports = function(url) {
    if(!url || url == undefined || url == null) return;
    if(url.endsWith(".gif")) return true;
    if(url.endsWith(".png")) return true;
    if(url.endsWith(".jpg")) return true;
    if(url == "reset") return true;
    return false;
}