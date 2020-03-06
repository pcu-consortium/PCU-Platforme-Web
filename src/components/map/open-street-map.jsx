import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './open-street-map.css';

var OpenStreetMap = React.createClass({

  getDefaultProps(){
    return {
      lat: 48.8212037,
      lon: 2.289259,
      zoom: 2,
      markers: []
    };
  },

//   componentDidUpdate(prevProps){
//     const { lat, lon } = this.props;
//     if ((prevProps.lat != lat) && (prevProps.lon != lon)){
//       this.map.setView([this.props.lat, this.props.lon], this.props.zoom);
//     }
//   },
  
//   componentDidMount(){
//     const { lat, lon, markers } = this.props;
//     var el = this.refs.map;
//     this.map = L.map(el);
//     var osm = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// // https://a.tiles.mapbox.com/v4/gregorypotdevin.163edfd1/page.html?access_token=pk.eyJ1IjoiZ3JlZ29yeXBvdGRldmluIiwiYSI6IjE3YjA2NmNlMzFiMGRkMGM3YTcxYjg4NjNiZTdiZDFiIn0.jrtwS-tUbDEU78FzZI3UUg#4/48.83/2.30
//     L.tileLayer(osm, {
//       minZoom: 3,
//       maxZoom: 20,
//       attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
//     }).addTo(this.map);
//     var icon = L.icon({
//       iconUrl: '/images/logo_fmsh_small.png',
//       // iconRetinaUrl: 'my-icon@2x.png',
//       iconSize: [49, 49],
//       iconAnchor: [25, 25],
//       // popupAnchor: [-3, -76],
//       // shadowUrl: 'my-icon-shadow.png',
//       // shadowRetinaUrl: 'my-icon-shadow@2x.png',
//       // shadowSize: [68, 95],
//       // shadowAnchor: [22, 94]
//     });

//     if (markers){
//       markers.forEach(({lat, lon}) => L.marker([lat, lon], {icon}).addTo(this.map));
//     }

//     this.map.setView([this.props.lat, this.props.lon], this.props.zoom);
//   },



  render(){
    return this.renderMap();
    // return (
    //   <div ref="map" style={{maxWidth: '1024px', width: '100%', height: '600px', margin: 'auto'}}>
    //     {this.renderMap()}
    //   </div>
    // );
  },

  renderMap(){
    const { lat, lon, zoom, type } = this.props;
    var markers=this.props.markers;
    const position = [lat, lon];
    console.log('renderMap:',markers);

    if (((markers==undefined)||(markers.length==0))&&(type!='Map'))
    {
      markers=[];
      markers.push({position:{lat:lat,lng:lon}});
    }
    return (
      <Map center={position} zoom={zoom} style={{maxWidth: '1024px', width: '100%', height: '600px', margin: 'auto'}}>
        <TileLayer
          url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map(this.renderMarker)}
      </Map>
    );
  },

  renderMarker(marker, idx){
    const { popupRenderer,type, linkDisplay } = this.props;
    const { key, position, title, to } = marker;
    const pos = [position.lat, position.lng];
    return (
      <Marker key={key} position={pos}>
        {popupRenderer ? <Popup minWidth={500} maxWidth={600}>{popupRenderer(marker)}</Popup> : undefined}
        {title && (type!='Map') ? <Popup><span> <a href={this.context.baseurl+'page/'+to} target="_blank"> {title} </a> </span></Popup> : undefined}
      </Marker>
    );
  }
});

module.exports = {
  OpenStreetMap
};
