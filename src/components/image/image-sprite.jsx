
var ImageSprite = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        src: React.PropTypes.string,
        frame: React.PropTypes.number,
        cols: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        scale: React.PropTypes.number,
        className: React.PropTypes.string
    },

    getDefaultProps(){
        return {
            scale: 1
        }
    },

    render(){
        const { className, style, src, frame, cols, width, height, scale } = this.props;
        var x = frame % cols;
        var y = Math.floor(frame / cols);
        var left = x * width;
        var top = y * height;
        var backgroundImage = `url('${src}')`;
        var backgroundPosition = `${-left}px ${-top}px`;
        // var backgroundSize = (scale == 1) ? undefined : ((scale*100) + "%");
        // console.log(scale);
        var scaleStyle = (scale == 1) ? undefined : {    
            zoom:scale,
            "MozTransform":`scale(${scale})`,
            "MozTransformOrigin": "0 0"
        };
        return (
            <div className={className} style={{...style, backgroundImage, backgroundPosition, ...scaleStyle, left, top, width, height}} />
        );
    }
});

module.exports = ImageSprite;
