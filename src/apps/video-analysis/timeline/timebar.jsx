import './timebar.css';
import TimelineContainer from './timeline-container';
import formatTime from 'utils/format-time';
import Marker from './marker';
import VideoFrame from '../video-frame';
import { lerp } from 'utils/lerp';
import classNames from 'classnames';

const TEXT_SPACING = 40;
var SCALE = 1;

var clamp = function(value, min, max){
    if (value < min) return min;
    else if (value > max) return max;
    return value;
};

var drawLine = function(ctx, x, height, color){
    x = Math.round(x);
    height = Math.round(height);
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.moveTo(x/SCALE,0);
    ctx.lineTo(x/SCALE,height/SCALE);
    ctx.stroke();
};

var drawText = function(ctx, txt, x, y, color){
    ctx.strokeStyle=color;
    ctx.font = "10px";
    ctx.textAlign = "center";
    x = Math.round(x);
    y = Math.round(y);
    ctx.fillText(txt, x/SCALE, y/SCALE);
};

var rgb = function(r, g, b){
    return "rgb("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+")";
};

var colorFor = function(width){
    if (width > 30){
        return "#000";
    } else if (width > 15){
        return "#666";
    } else if (width >= 5) {
        var v = lerp(width, 5, 15, 0xff, 0x66);
        //console.log(rgb(v, v, v));
        return rgb(v, v, v);
    } else {
        return rgb(255, 255, 255);
    }
};

var drawLines = function(ctx, begin, end, duration, height, canShowText){
    var w = ctx.canvas.width;
    var minW = w / ((end-begin)/duration);
    if ((minW < 5) || isNaN(minW)){
        return;
    }
    var color = colorFor(minW);
    height = ctx.canvas.height*height;
    // console.log(minW);
    var start = (Math.floor(begin/duration)*duration);
    var showText = minW >= TEXT_SPACING*SCALE;
    for(var m=start; m<=end; m+=duration){
        var x = (m-begin) * w / (end-begin);
        drawLine(ctx, x, height, color);
        if (showText && canShowText && (m != 0)){
            drawText(ctx, formatTime(m), x, ctx.canvas.height*0.96, color);
        }
    }
    return showText;
};

var draw = function(canvas, begin, end){
    var ctx = canvas.getContext('2d');
    var style = window.getComputedStyle(canvas);
    SCALE = (window.devicePixelRatio) || 1;
    canvas.width = Math.round(parseFloat(style.width))*SCALE;
    canvas.height = Math.round(parseFloat(style.height))*SCALE;
    // console.log(canvas.width, canvas.height);
    // checkHdpi();
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    ctx.translate(0.5, 0.5);
    ctx.scale(SCALE, SCALE);
    var canShowText = true;
    var sizes = [
        { duration: 1,   height: 0.15},
        { duration: 5,   height: 0.20},
        { duration: 10,  height: 0.25},
        { duration: 30,  height: 0.30},
        { duration: 60,  height: 0.40},
        { duration: 300, height: 0.50},
        { duration: 600, height: 0.60}
    ];
    sizes.forEach(({duration, height}) => {
        canShowText &= !drawLines(ctx, begin, end, duration, height, canShowText);
    });
    // ctx.fillStyle = "#fff";
    // ctx.fillRect(0, 0, canvas.);
};


var ProgressBar = React.createClass({
    render(){
        var width = (this.props.progress*100)+'%';
        return (
            <div className="vt-progress">
                <div style={{height: 10, width, backgroundColor: 'red'}} />
            </div>
        );
    }
});

var Tooltip = React.createClass({

    getInitialState(){
        return {
            visible: false,
            x: 0,
            arrowX: 0,
            currentTime: 0,
        };
    },

    computePos(e){
        const { duration, viewportLeft=0, viewportRight=1 } = this.props;
        // X ratio
        var parent = this.refs.parent;
        var rect = parent.getBoundingClientRect();
        const baseX = clamp(e.pageX - rect.left, 0, rect.width);
        const x = clamp(baseX, 60, rect.width-60); // Avoid side overflows
        const arrowX = clamp(baseX - x, -60+8, 60-9); // Center arrow on mouse
        // Adjust time according to viewport
        const ratio = (viewportLeft+(baseX/rect.width)*(viewportRight-viewportLeft));
        const currentTime = ratio*this.props.duration;
        return { x, arrowX, currentTime };
    },

    onMouseEnter(e){
        this.setState({
            visible: true,
            ...(this.computePos(e))
        });
        e.stopPropagation();
        e.preventDefault();
    },

    onMouseMove(e) {
        this.setState(this.computePos(e));
        e.stopPropagation();
        e.preventDefault();
    },

    onMouseLeave(e){
        this.setState({visible: false});
    },

    render(){
        return (
            <div ref="parent" style={{position: "absolute", left: 0, top: 0, right: 0, bottom: 0}}
                 onMouseMove={this.onMouseMove} 
                 onMouseEnter={this.onMouseEnter} 
                 onMouseLeave={this.onMouseLeave}>
                {this.renderTooltip()}
            </div>
        )
    },

    renderTooltip(){
        const { duration } = this.props;
        const { x, arrowX, visible, currentTime } = this.state;
        if (!visible) return undefined;
        return (
            <div style={{position: 'relative', left: x}}>
                <div className="vt-tooltip visible">
                    <div className="vt-tooltip-img">
                        <VideoFrame src={"/test/api/videos/"+this.props.videoId+"/preview"} cols={16} rows={8} width={53}
                                    height={40} duration={duration} currentTime={currentTime} scale={120/53} />
                    </div>
                    <div className="vt-tooltip-txt">
                        {formatTime(currentTime)}
                    </div>
                    <span className="vt-tooltip-arrow" style={{left: arrowX}}/>
                </div>
            </div>
        );
    }
});

var TimebarCanvas = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    refresh(){
        //console.log('componentDidUpdate');
        const { viewportLeft, viewportRight, duration } = this.props;
        var canvas = this.refs.canvas;
        if (canvas){
            var begin = viewportLeft * duration;
            var end = viewportRight * duration;
            draw(canvas, begin, end);
        }
    },

    componentDidUpdate(){
        this.refresh();
        // Resize on video events...
    },

    componentDidMount(){
        this.refresh();
        this.resizeListener = () => {
            this.forceUpdate(); // Size changed !!
        };
        window.addEventListener('resize', this.resizeListener, false);
    },

    componentWillUnmount(){
        window.removeEventListener('resize', this.resizeListener, false);
    },

    render(){
        return <canvas ref="canvas" className="vt-timeline-canvas" height="22"/>;
    }
})

var Timebar = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        showTimes: React.PropTypes.bool // Show/hide the dynamic canvas time
    },

    getDefaultProps(){
        return {
            showTimes: false
        }
    },

    handleClick(evt){
        if (this.props.onClick){
            const { duration, viewportLeft=0, viewportRight=1 } = this.props;
            // this.props.onClick(evt);
            var node = this.refs.container;
            var rect = node.getBoundingClientRect();
            const baseX = evt.pageX - rect.left;
            const ratio = (viewportLeft+(baseX/rect.width)*(viewportRight-viewportLeft));
            // console.log(ratio*duration);
            this.props.onClick(ratio*duration);
        }
    },

    render(){
//        console.log('timebar pros');
//        console.log(this.props);
        const { currentTime, duration, showTimes, viewportLeft, viewportRight } = this.props;
        var progress = duration ? (currentTime / duration) : 0;
        return (
            <div ref="container" className={classNames("vt-timebar", {"vt-timebar-show-times": showTimes})}
                    onClick={this.handleClick}>
                {showTimes 
                    ? <TimebarCanvas 
                            viewportLeft={viewportLeft} 
                            viewportRight={viewportRight}
                            duration={duration} /> 
                    : undefined}
                <TimelineContainer {...this.props}>
                    <ProgressBar progress={progress} />
                    <Marker {...this.props} />
                </TimelineContainer>
                <Tooltip {...this.props} />
            </div>
        );
    }
});

module.exports = Timebar;