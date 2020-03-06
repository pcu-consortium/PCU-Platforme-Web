import Marker from './marker';

var TimelineContainer = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getDefaultProps(){
        return {
            viewportLeft: 0,
            viewportRight: 1,
            currentTime: 0,
            duration: 3600
        }
    },

    render(){
        const { viewportLeft, viewportRight, currentTime, duration, onClick } = this.props;
        var timeRatio = currentTime / duration;
        var markerStyle = {
            position: 'absolute',
            height: 'initial',
            left: (timeRatio * 100) + '%', top: -1, bottom: -1
        };
        var left = -(viewportLeft*100/(viewportRight - viewportLeft)) + '%';
        //console.log('left', left);
        var width = (100/(viewportRight - viewportLeft)) + '%';
        return (
            <div onClick={onClick} style={{overflowX: 'hidden', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
                <div style={{position: 'absolute', left, width, top: 0, bottom: 0}}>
                    {this.props.children}
                    <Marker currentTime={currentTime} duration={duration} />
                </div>
            </div>
        )
    }
});

module.exports = TimelineContainer;