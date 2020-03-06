
// import Coverflow from 'react-coverflow';
// import ResultStore from '../search/result-store';

// var CoverflowWidget = React.createClass({

//   getDefaultProps(){
//     return {
//       query: "",
//     };
//   },

//   componentDidMount(){
//     ResultStore.init(this, this.props.query);
//   },

//   componentDidUpdate(){
//     ResultStore.setQuery(this.props.query);
//   },

//   rowGetter(idx){
//     // console.log('get row', idx, ResultStore.get(idx)._checked);
//     return ResultStore.get(idx);
//   },

//   render(){
//     var count = Math.min(ResultStore.getCount(), 23);
//     var results = [];
//     for(var i=0; i<count; i++) results.push(ResultStore.get(i));

//     return (
//       <Coverflow width="960" height="500" 
//         displayQuantityOfSide={2}
//         navigation={true} >
//         {results.map(this.renderImage)}
//       </Coverflow>
//     );
//   },

//   renderImage({exemplaire, reference, legende}, idx){
//     var img = exemplaire 
//       ? ("/psa/api/exemplaires/" + exemplaire + "/image")
//       : "/images/psa_logo.png";
//     return (
//       <SquareImage key={idx} src={img} alt={legende || reference} />
//     );
//   }
// });

// WidgetManager.registerWidget("Coverflow", {
//     component: CoverflowWidget,
//     icon: "image",
//     config: [
//         {key: "query",  type: "input"}
//     ],
//     defaultValue: {type: 'Coverflow'}
// });


// module.exports = Coverflow;
