import WidgetManager from '../widget-manager';
import { OpenStreetMap } from 'components/map/open-street-map';



var MarkerMapWidget = React.createClass({
  render() {
    return(
    <OpenStreetMap {...this.props}/>
    );
  }
});



WidgetManager.registerWidget("MarkerMap", {
	component: MarkerMapWidget,
	icon: "map-marker",
	config: [
		{key: "lat",    type: "input"},
 		{key: "lon",    type: "input"},
 		{key: "zoom",    type: "input"}
	]
});

module.exports = {
	MarkerMapWidget
};
