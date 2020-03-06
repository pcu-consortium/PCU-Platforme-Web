
import WidgetManager from '../widget-manager';

var VideoWidget = React.createClass({
    getDefaultProps(){
        return {
            ratio: "16/9"
        }
    },

    getUrl(){
        var matches = this.props.url.match("youtube.com/embed");
        if (matches){
            return this.props.url; // Embed url
        }
        matches = this.props.url.match("youtube.com/.*v=([^&]*)");
        if (matches){
            return "https://www.youtube.com/embed/" + matches[1];
        }
        return this.props.url;
    },

    render(){
        var url = this.getUrl();
        var className = this.props.ratio == "16/9" ? "videoWrapper16_9" : "videoWrapper4_3";
        return (
            <div style={{width: this.props.width, textAlign: "center", margin: "auto"}}>
                <div className={className}>
                    <iframe width="640" height="480" src={url} frameBorder="0" allowFullscreen></iframe>
                </div>
            </div>
        );
    }
});

WidgetManager.registerWidget("Video", {
    component: VideoWidget,
    icon: "video-camera",
    config: [
        {key: "url", type: "input"},
        {key: "ratio", type: "selector", values: ["16/9", "4/3"]},
        {key: "width", type: "input"}
    ],
    defaultValue: {type: 'Video', url: "https://www.youtube.com/watch?v=C0DPdy98e4c", ratio: "4/3", width: "100%"}
});

module.exports = VideoWidget;