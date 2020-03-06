var fs = require('fs');

// Read data and generate compact file with 16 min/max pairs per second.
var sampleRate = 8000; // 8000 samples, int8 samples
var outputRate = 16; // 16 min/max pairs per second should be enough
var bytesPerOutput = sampleRate / outputRate;

var totalCnt = 0;
var cnt = 0; // Current sample count for a given output sample
var acc = {
    min: 0, max: 0
};
var buffer = new Buffer(2048);
var bufferIdx = 0;

var flushBuffer = function(){
    //console.error('flush');
    if (cnt > 0){
        process.stdout.write(buffer);
    }
    bufferIdx = 0;
    buffer = new Buffer(2048);
};
var add = function(value){
    totalCnt++;
    if (value < acc.min){
        acc.min = value;
    }
    if (value > acc.max){
        acc.max = value;
    }
    cnt++;
    //console.error('cnt', cnt);
    if (cnt >= bytesPerOutput){
        buffer.writeInt8(acc.min, bufferIdx++);
        buffer.writeInt8(acc.max, bufferIdx++);
        if (bufferIdx >= buffer.length){
            flushBuffer();
        }
        cnt = 0;
        acc.min = 0;
        acc.max = 0;
    }
};

process.stdin.resume();

process.on('SIGINT', function() {
    console.log('Got SIGINT.  Press Control-D to exit.');
});
process.stdin.on('data', function(chunk) {
    for(var i=0; i<chunk.length; i++){
        add(chunk.readInt8(i));
    }
});
//process.stdin.on('readable', function() {
//    console.error('readable');
//    var chunk = process.stdin.read();
//    console.error('chunk', chunk);
//    if (chunk !== null) {
//        //process.stdout.write('data: ' + chunk);
//        for(var i=0; i<chunk.length; i++){
//            add(chunk.readInt8(i));
//        }
//    }
//});
process.stdin.on('end', function() {
    flushBuffer();
    console.error('read', totalCnt, 'bytes');
    console.error(' => ', totalCnt/sampleRate, 'seconds');
    process.stdout.write('end');
});

//var args = process.argv.slice(2);
//var inputFile = args[0];
//var outputFile = args[1];
//
//fs.open(inputFile, 'rb', function(status, fd) {
//    if (status) {
//        console.log(status.message);
//        return;
//    }
//    // Read 1 second worth of data (8000 bytes)
//    var buffer = new Buffer(8000);
//    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
//        console.log(buffer.toString('utf-8', 0, num));
//    });
//});