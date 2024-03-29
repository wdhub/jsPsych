/**
 * Repetitively used functions
 * 
 */

// load local file
function loadFile(name) {
    let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
    xhr.open('GET', name, false);
    xhr.overrideMimeType("text/html;charset=utf-8");
    xhr.send(null);
    return xhr.status === okStatus ? xhr.responseText : null;
}

export {
    loadFile,

};