import WidgetManager from 'widgets/widget-manager';


var UrlWidget = React.createClass({
  render() {
  	var url=this.props.url;
  	var text=this.props.text;  	
    return (
		<a href={url}>{text}</a>
	);
  }
});

WidgetManager.registerWidget("SubPage", {
    component: UrlWidget,
    icon: "external-link",
    config: [
    	{key: "url",    type: "input"},
    	{key: "text",    type: "input"},
    ]
}
);

module.exports = UrlWidget;
