import './mini-timeline.css';
import Marker from './marker';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function ratioOf(currentTime, begin, end){
    if ((end <= begin) || (begin >= currentTime)) {
        return 0;
    } else if (end < currentTime) {
        return 1;
    } else {
        return (currentTime - begin) / (end - begin);
    }
}

var MiniSegment = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    handleClick(){
        if (this.props.onSelectSegment){
            this.props.onSelectSegment(this.props.segment);
        }
    },

    render(){
        const { hasOverlay, label, begin, end, active, duration, selected } = this.props;
        var leftRatio = (begin/duration);
        if (leftRatio > 1) leftRatio = 1;
        var widthRatio = ((end - begin) / duration);
        if (leftRatio + widthRatio > 1) widthRatio = 1 - leftRatio;
        var left = (leftRatio*100) + '%';
        var width = (widthRatio * 100) + '%';
        var classes = classNames("vt-mini-scrollbar-trackevent", {active, selected});
        if (hasOverlay){
            return (
                <OverlayTrigger placement='top' overlay={<Tooltip>{label}</Tooltip>}>
                    <div className={classes} style={{left, width}} onClick={this.handleClick} />
                </OverlayTrigger>
            );
        } else {
            return (
                <div className={classes} style={{left, width}} onClick={this.handleClick} />
            );
        }
    }
});

var MiniTrack = React.createClass({

    render(){
        const { segments, currentTime, duration, hasOverlay, onSelectSegment, selected } = this.props;
        return (
            <div className="vt-mini-scrollbar-track">
                {segments.map(segment => {
                    var active = (currentTime >= segment.begin) && (currentTime < segment.end);
                    if (!duration){
                        return undefined;
                    }
                    return <MiniSegment {...segment}
                        key={segment.id}
                        active={active}
                        selected={selected==segment.id}
                        segment={segment}
                        duration={duration}
                        onSelectSegment={onSelectSegment}
                        hasOverlay={hasOverlay}  />
                })}
            </div>
        )
    }
});

var MiniTimelineTracks = React.createClass({
    render(){
        const { tracks, currentTime, duration, style, hasOverlay, onSelectSegment, selected } = this.props;
        var timeInfo = { currentTime, duration };
        var timeRatio = currentTime / (duration||3600); // Ensure that duration != 0
        //var classes = classNames("vt-mini-scrollbar-shadow", this.props.className);
        return (
            <div className={this.props.className} style={style}>
                <div className="vt-mini-scrollbar-tracks">
                    {tracks.map((track, idx) => (
                        <MiniTrack {...track} key={idx} {...timeInfo} hasOverlay={hasOverlay} onSelectSegment={onSelectSegment} selected={selected}/>
                    ))}
                </div>
                <Marker {...timeInfo} />
            </div>
        );
    }
});

var MiniTimeline = React.createClass({
    render(){
        return (
            <div className="vt-mini-scrollbar-container">
                <MiniTimelineTracks className="custom-mini-tracks" {...this.props} hasOverlay />
            </div>
        );
    }
});


module.exports = {
    MiniTimeline,
    MiniTimelineTracks
};