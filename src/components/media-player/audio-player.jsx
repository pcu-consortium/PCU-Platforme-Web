import './media-player.css';
import ReactDOM from 'react-dom';

// TODO : cleanup display code
var AudioPlayer = React.createClass({

    getDefaultProps(){
        return {
            drawMode: 'squares'
        }
    },

    componentDidMount(){
        var component = this;
        var Visualizer = function() {
            this.file = null, //the current file
                this.fileName = null, //the current file name
                this.audioContext = null,
                this.source = null, //the audio source
                this.animationId = null,
                this.status = 0, //flag for sound is playing 1 or stopped 0
                this.forceStop = false,
                this.allCapsReachBottom = false
        };
        Visualizer.prototype = {
            ini(audio, canvas) {
                this.audio = audio;
                this.canvas = canvas;
                this._prepareAPI();
            },
            _prepareAPI() {
                console.log('_prepareAPI');
                //fix browser vender for AudioContext and requestAnimationFrame
                window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
                window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
                window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
                try {
                    this.audioContext = new AudioContext();
                    this._start();
                } catch (e) {
                    console.log(e);
                }
            },
            _start() {
                console.log('_start');
                var audioContext = this.audioContext;
                if (audioContext === null) {
                    return;
                };
                this._visualize(audioContext);
            },
            _visualize(audioContext) {
                console.log('_visualize');
                var audioBufferSouceNode = audioContext.createMediaElementSource(this.audio);
                //var audioBufferSouceNode = audioContext.createBufferSource();
                var analyser = audioContext.createAnalyser(),
                    that = this;
                //connect the source to the analyser

                audioBufferSouceNode.connect(analyser);
                //connect the analyser to the destination(the speaker), or we won't hear the sound
                analyser.connect(audioContext.destination);
                //then assign the buffer to the buffer source node
                //audioBufferSouceNode.buffer = buffer;
                ////play the source
                //if (!audioBufferSouceNode.start) {
                //    audioBufferSouceNode.start = audioBufferSouceNode.noteOn //in old browsers use noteOn method
                //    audioBufferSouceNode.stop = audioBufferSouceNode.noteOff //in old browsers use noteOn method
                //};
                //stop the previous sound if any
                if (this.animationId !== null) {
                    cancelAnimationFrame(this.animationId);
                }
                if (this.source !== null) {
                    this.source.stop(0);
                }
                //audioBufferSouceNode.start(0);
                this.status = 1;
                this.source = audioBufferSouceNode;
                audioBufferSouceNode.onended = function() {
                    that._audioEnd(that);
                };
                //this._updateInfo('Playing ' + this.fileName, false);
                //this.info = 'Playing ' + this.fileName;
                //document.getElementById('fileWrapper').style.opacity = 0.2;
                this._drawSpectrum(analyser);
            },
            _drawSpectrum(analyser) {
                var that = this,
                    canvas = this.canvas,
                    cwidth = canvas.width,
                    cheight = canvas.height - 2,
                    meterWidth = 10, //width of the meters in the spectrum
                    gap = 2, //gap between meters
                    capHeight = 2,
                    meterSquareHeight = 5,
                    meterSquareSpacing = 1,
                    capStyle = '#fff',
                    meterNum = 800 / (10 + 2), //count of the meters
                    capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
                console.log('canvas', canvas);
                var ctx = canvas.getContext('2d'),
                    gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(1, '#0f0');
                gradient.addColorStop(0.5, '#ff0');
                gradient.addColorStop(0, '#f00');
                var drawMeter = () => {
                    var array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    // Stop code, doesn't work ? Could manual
                    //if (that.status === 0) {
                    //    //fix when some sounds end the value still not back to zero
                    //    for (var i = array.length - 1; i >= 0; i--) {
                    //        array[i] = 0;
                    //    }
                    //    that.allCapsReachBottom = true;
                    //    for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                    //        that.allCapsReachBottom = that.allCapsReachBottom && (capYPositionArray[i] === 0);
                    //    }
                    //    if (that.allCapsReachBottom) {
                    //        cancelAnimationFrame(that.animationId); //since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
                    //        return;
                    //    }
                    //}
                    var step = Math.round(array.length / meterNum); //sample limited data from the total array
                    ctx.clearRect(0, 0, cwidth, cheight);
                    var drawMode = component.props.drawMode;
                    for (var i = 0; i < meterNum; i++) {
                        var value = array[i * step];
                        if (capYPositionArray.length < Math.round(meterNum)) {
                            capYPositionArray.push(value);
                        }
                        ctx.fillStyle = capStyle;
                        //draw the cap, with transition effect
                        if (value < capYPositionArray[i]) {
                            ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                        } else {
                            ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                            capYPositionArray[i] = value;
                        }

                        if (drawMode == 'squares'){
                            function color(c){
                                if (c < 0) return 0;
                                else if (c > 255) return 255;
                                return Math.round(c);
                            }
                            for(var y=cheight-meterSquareHeight; y>cheight - value + capHeight; y-=(meterSquareSpacing + meterSquareHeight)){
                                var red = color(((cheight-y) / (cheight/2)) * 255); // Red at the top
                                var green = color((y / (cheight/2)) * 255); // Green at the bottom
                                ctx.fillStyle = "rgb(" + red + "," + green + ",0)";
                                ctx.fillRect(i * 12 /*meterWidth+gap*/ , y, meterWidth, meterSquareHeight); //the meter
                            }
                            //ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
                        } else {
                            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
                            ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
                        }
                    }
                    that.animationId = requestAnimationFrame(drawMeter);
                };
                this.animationId = requestAnimationFrame(drawMeter);
            },
            _audioEnd(instance) {
                if (this.forceStop) {
                    this.forceStop = false;
                    this.status = 1;
                    return;
                }
                this.status = 0;
                var text = 'HTML5 Audio API showcase | An Audio Viusalizer';
                document.getElementById('fileWrapper').style.opacity = 1;
                document.getElementById('info').innerHTML = text;
                instance.info = text;
                document.getElementById('uploadedFile').value = '';
            },
            _updateInfo(text, processing) {
                var infoBar = document.getElementById('info'),
                    dots = '...',
                    i = 0,
                    that = this;
                infoBar.innerHTML = text + dots.substring(0, i++);
                if (this.infoUpdateId !== null) {
                    clearTimeout(this.infoUpdateId);
                }
                if (processing) {
                    //animate dots at the end of the info text
                    var animateDot = function() {
                        if (i > 3) {
                            i = 0
                        }
                        infoBar.innerHTML = text + dots.substring(0, i++);
                        that.infoUpdateId = setTimeout(animateDot, 250);
                    };
                    this.infoUpdateId = setTimeout(animateDot, 250);
                };
            }
        };

        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        new Visualizer().ini(this.getElement(), canvas);
    },

    getElement(){
        return ReactDOM.findDOMNode(this.refs.audio);
    },

    render(){
        const { src } = this.props;
        return (
            <div className="media-player">
                <canvas ref="canvas" width="800" height="350"></canvas>
                <audio ref="audio" controls autoPlay src={src} />
            </div>
        )
    }
});

module.exports = {
    AudioPlayer
};