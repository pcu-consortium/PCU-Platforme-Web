import { ImageSprite } from 'components/image';

var VideoFrame = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        src: React.PropTypes.string,
        cols: React.PropTypes.number,
        rows: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        scale: React.PropTypes.number,
        currentTime: React.PropTypes.number,
        duration: React.PropTypes.number,
        className: React.PropTypes.string
    },

    computeFrame(){
        const { currentTime, duration, cols, rows } = this.props;
        if (duration <= 0){
            return 0;
        }
        var thumbnailCnt = rows * cols;
        var frame = Math.floor(thumbnailCnt * currentTime/duration);
        if (frame >= thumbnailCnt){
            frame = thumbnailCnt-1;
        }
        return frame;
    },

    render(){
        return <ImageSprite {...this.props} frame={this.computeFrame()} />;
    }
});

module.exports = VideoFrame;
