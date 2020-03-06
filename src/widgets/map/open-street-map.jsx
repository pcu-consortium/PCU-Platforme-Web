import WidgetManager from '../widget-manager';
import WidgetMixin from '../widget-mixin';
import { AsyncOpenStreetMap } from 'components/map/async-open-street-map';
import request from "superagent";
import { Grid, Row } from 'react-bootstrap';
import SquareImage from 'components/image/square-image';
import MediaElementList from 'apps/search/media-element/media-element-list';
import { imageUrl, defaultImageUrl } from 'apps/search/media-element/media-info';

var cleanString = function (str) {
  if (!str) return str;
  return str.replace(/@fr/g, "").replace(/\\n/g, ' ').replace(/^"(.+(?="$))"$/, '$1').replace(/\\\"/g, "\"");
};

function groupByLocation(entries){
  var locations = {

  }
  entries.forEach(entry => {
    entry.label = cleanString(entry.label);
    entry.shortDescription = cleanString(entry.shortDescription);
    entry.locations.forEach(location => {
      if (!location.location) return; // Invalid location, ignore... TODO : filter out in API ??
      // let key = location.name.toLowerCase();
      // Multiple names can point to the same position, use position as key
      let key = location.location.lat + ', ' + location.location.lng;
      if (!(key in locations)){
        locations[key] = {
          key: key,
          title: location.name,
          position: location.location,
          analysis: [],
          showInfo: key === 'france'
        };
      }
      locations[key].analysis.push(entry);
    })
  });
  return Object.keys(locations).map(key => locations[key]);
}
 

var AnalysisPreview = React.createClass({

  getVideoUrl(){
    const { analysis, baseUrl } = this.props;
    // Strip ID if needed...
    const id = analysis.id.replace(/^<(.*)>$/, '$1');
    return baseUrl + 'video/' + encodeURIComponent(id);
  },

  render(){
    const { analysis } = this.props;
    return <MediaElementList data={analysis} href={this.getVideoUrl()}  />;
  }
});


var OpenStreetMapWidget = React.createClass({
  mixins: [ WidgetMixin ],

  getInitialState(){
    return {
      markers: [
        // {
        //   position: {
        //     lat: 48.7,
        //     lng: 2.35,
        //   },
        //   key: "Taiwan",
        //   defaultAnimation: 2,
        // }
      ],
    };
  },

  getDefaultProps(){
    return {
      markers: []
    }
  },

  componentDidMount () {
    const { site } = this.context;
    request.get(`/${site}/api/analysis/map`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.warn(err); 
          return;
        }
        if (!this.isMounted()) return;
        let markers = groupByLocation(res.body);
        this.setState({ markers });
      });
  },

  render(){
    const markers = [...this.props.markers, ...this.state.markers];
    // WARNING : rebooting map on marker change ???
    return <AsyncOpenStreetMap {...this.props} markers={markers} popupRenderer={this.renderPopup} />
  },

  renderPopup(marker){
    const { analysis } = marker;
    return (
      <div style={{maxHeight: 400, overflowY: 'scroll'}}>
        <section>
          <h4>{marker.title}</h4>
          <p>{analysis.length} analyses</p>
          <Grid fluid style={{padding: 0}}>
            <Row>
              {analysis.map((a, idx) => <AnalysisPreview key={idx} analysis={a} baseUrl={this.context.baseUrl} />)}
            </Row>
          </Grid>
        </section>
      </div>
    )
  }
});

WidgetManager.registerWidget("Map", {
    component: OpenStreetMapWidget,
    icon: "map-marker",
    config: [
    ],
    defaultValue: {
      type: 'Map',
    }
});

module.exports = {
    OpenStreetMapWidget
};
