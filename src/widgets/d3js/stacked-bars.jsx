import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';

var Bar = function(){
    var w = 260,
        h = 260;


var sales = [
  { "date": "2014-01-01", "hoodies": 6, "jackets": 2, "snuggies": 3 },
  { "date": "2014-01-02", "hoodies": 7, "jackets": 5, "snuggies": 2 },
  { "date": "2014-01-03", "hoodies": 8, "jackets": 7, "snuggies": 3 }
];
var load_data = function() { 

var stack = d3.stack().keys(["hoodies", "jackets", "snuggies"]);

var stacked = d3.stack(sales);
    
    var maxY = d3.max(stacked, function(d) {
  return d3.max(d, function(d) {
    return d[1];
  });
});

var y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, maxY]);

var x = d3.scaleTime()
  .range([0, width])
  .domain(d3.extent(sales, function(d) {
    return new Date(Date.parse(d.date));
  }))
  .nice(4);

var svg = d3.select('svg.stack');
var color = d3.scaleOrdinal(d3.schemeCategory10);

// bind a <g> tag for each layer
var layers = svg.selectAll('g.layer')
  .data(stacked, function(d) { return d.key; })
    .enter()
      .append('g')
        .attr('class', 'layer')
        .attr('fill', function(d) { return color(d.key); })

// bind a <rect> to each value inside the layer
layers.selectAll('rect')
  .data(function(d) { return d; })
  .enter()
    .append('rect')
      .attr('x', function(d) { return x(new Date(Date.parse(d.data.date))); })
      .attr('width', width / 3)
      .attr('y', function(d) {
        // remember that SVG is y-down while our graph is y-up!
        // here, we set the top-left of this bar segment to the
        // larger value of the pair
        return y(d[1]);
      }).attr('height', function(d) {
        // since we are drawing our bar from the top downwards,
        // the length of the bar is the distance between our points
        return y(d[0]) - y(d[1]);
      });

 };

    return {
      
        load_data: load_data
    };


   
}();


// function loadDimension(dimension){
//   var url = makeUrl(dimension + ',cnt');
//   load_url(url, dimension, null, function(v){filterDimension(dimension, v);});
// }

var StackedBar= React.createClass({
    mixins: [WidgetMixin],

    makeBaseUrl: function(props){
        var select = props.dimension + ',cnt';
        var filters = props.filters;
        var options = '?format=csv&select=' + select;
        if (filters){
            for (var k in filters){
                if (filters.hasOwnProperty(k)) {
                    options += "&" + k + "=" + encodeURIComponent(filters[k]);
                }
            }
        }
        return this.context.api + '/stats' + options;
    },
    makeUrl: function(props){
        return this.makeBaseUrl(props);
    },

    loadChart: function(props){
        var chart = this.refs.chart;
        var legend = this.refs.legend;
        Bar.load_data();
                
    },

    componentDidMount: function () {
        this.loadChart(this.props);
    },
    componentWillUpdate: function (nextProps, nextState) {
        this.loadChart(nextProps);
        // if (nextProps.count != this.props.count){
        //   // this.flush();
        // }
        return false;
    },
    render: function(){
        var { hideLegend } = this.props;
        var legendDisplay = hideLegend ? "none" : "table-cell";
        return (
            <div>
                {/*<a href={this.makeBaseUrl(this.props)} target="_blank">Source data</a>*/}
                <div ref="chart" style={{display:"table-cell", verticalAlign: "middle"}} />
                <div style={{display: legendDisplay, verticalAlign: "middle"}}>
                    <div  ref="legend" style={{height: "300px", overflowY: "scroll"}} />
                </div>
            </div>
        )
    }
});




WidgetManager.registerWidget("StackedBar", {
    component: StackedBar,
    defaultValue: {type: 'StackedBar'},
    config: [
    {key: "data", type: "input"}
    ]
});

module.exports = StackedBar;

