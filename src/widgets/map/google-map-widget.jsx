import WidgetManager from '../widget-manager';
// import { AsyncGoogleMap } from 'components/map/async-google-map';

import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
// import InfoBox from "react-google-maps/lib/addons/InfoBox";
import request from "superagent";

// import {default as Marker} from "../../../../src/Marker";

const {update} = React.addons;




var cleanString = function (str) {
  return str.replace(/@fr/g, "").replace(/^"(.+(?="$))"$/, '$1').replace(/\\\"/g, "\"");
};

function groupByLocation(entries){
  var locations = {

  }
  entries.forEach(entry => {
    entry.label = cleanString(entry.label);
    entry.locations.forEach(location => {
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
  render(){
    const { analysis } = this.props;
    return(
      <div>
        <h4>{analysis.label}</h4>
        <p>{analysis.shortDescription}</p>
      </div>
    )
  }
})

var SimpleMap = React.createClass({
  render(){
    const { markers, onMarkerClick, onMarkerCloseInfo, onMarkerRightclick } = this.props;
        // onClick={props.onMapClick}
        // <Marker position={{lat: 48.7, lng: 2.35}} label="A" title="title" defaultAnimation={2} key="test" />
    return (
      <GoogleMap containerProps={{
          style: {
            height: "100%",
          },
        }}
        defaultZoom={3}
        defaultCenter={{lat: 48.7, lng: 2.35}}
      >
        {markers.map((marker, index) => {
          const { analysis, showInfo, ...markerParams } = marker;
          console.log('analysis', analysis);
          var infoBox;
          if (analysis && showInfo){
            infoBox = (
              <InfoWindow closeclick={() => onMarkerCloseInfo(index)}>
                <div>
                  <section>
                    <h3>{marker.title}</h3>
                    <p>{analysis.length} analyses</p>
                    {analysis.map(a => <AnalysisPreview analysis={a} />)}
                  </section>
                </div>
              </InfoWindow>
            );
          }
          return (
            <Marker
              {...markerParams}
              onClick={() => onMarkerClick(index)}
              onRightclick={() => onMarkerRightclick(index)}>
              {infoBox}
            </Marker>
          );
        })}
      </GoogleMap>
    )
  }
});


var GoogleMapWidget = React.createClass({

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

  componentDidMount () {
    request.get("/agora/api/analysis/map")
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.warn(err); 
          return;
        }
        if (!this.isMounted()) return;
        let markers = groupByLocation(res.body).map(marker => ({
          ...marker,
          defaultAnimation: 2
        }));
        console.log('markers', markers);
        this.setState({ markers });
      });
  },

  setShowInfo(idx, showInfo){
    const { markers } = this.state;
    const marker = markers[idx];
    console.log('marker', marker, 'showInfo', showInfo);
    markers[idx] = {
      ...marker,
      showInfo
    };
    this.setState({ markers });
  },

  handleMarkerClick(idx){
    this.setShowInfo(idx, true);
  },

  handleMarkerCloseInfo(idx){
    this.setShowInfo(idx, false);
  },

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  _handle_map_click (event) {
    var {markers} = this.state;
    markers = update(markers, {
      $push: [
        {
          label: "T",
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(),// Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
  },

  // _handle_marker_rightclick (index, event) {
  //   var {markers} = this.state;
  //   markers = update(markers, {
  //     $splice: [
  //       [index, 1]
  //     ],
  //   });
  //   this.setState({ markers });
  // },

          // onMarkerRightclick={this._handle_marker_rightclick}
          // onMapClick={this._handle_map_click}
  render () {
    console.log('render...');
    return (
      <div style={{height: 400}}>
        <SimpleMap
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
          onMarkerCloseInfo={this.handleMarkerCloseInfo}
        />
      </div>
    )
  }
});



WidgetManager.registerWidget("GoogleMap", {
	component: GoogleMapWidget,
	icon: "map-marker",
	config: [
	],
	defaultValue: {type: 'GoogleMap'}
});

module.exports = {
	GoogleMapWidget
};
