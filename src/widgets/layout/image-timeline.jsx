import WidgetManager from '../widget-manager';


var ImageTimelineWidget = React.createClass({
  shouldComponentUpdate(nextProps, nextState){
    const props = this.props;
    const state = this.state;
    if (props.file !== nextProps.file)
    {
      alert('Upload finish!');
    }
    return true;
  },

  render() {
    /*
    var timeline_config = {
     width: "100%",
     height: "100%",
     source: 'https://docs.google.com/spreadsheet/pub?key=0Agl_Dv6iEbDadHdKcHlHcTB5bzhvbF9iTWwyMmJHdkE&amp;output=html'
    }*/
    const url=this.props.url||this.props.file||'http://lab2.armadillo.fr/campus-aar-api/timeline?uri=http://campus-aar.fr/asa/aar.owl';
    const src="../../javascripts/lib/timelineJS/ImageTimeline.html?url="+encodeURIComponent(url);
    return (
        <iframe  width='100%' height='650' frameBorder="0"  src={src}/>
      );
  }
});

WidgetManager.registerWidget("ImageTimeline", {
    component: ImageTimelineWidget,
    icon: "sliders",
    config: [
      {key: "file",   type: "filereader"},
      {key: "url",  type: "input"}
    ],
}
);


module.exports = ImageTimelineWidget;