
function formatTime(seconds) {
    //var t = Math.round(seconds*1000)/1000; // Realign milliseconds
    seconds = Math.floor(seconds);
    var hours = Math.floor(seconds / 3600);
    var min = Math.floor((seconds%3600) / 60);
    var sec = seconds % 60;
    return hours + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

module.exports = formatTime;