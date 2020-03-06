
var Marker = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render(){
        const { currentTime, duration } = this.props;
        var ratio = duration ? (currentTime / duration) : 0;
        return (
            <span className="vt-mini-timeline-marker" style={{left: (ratio*100) + '%'}} />
        )
    }
});

module.exports = Marker;
