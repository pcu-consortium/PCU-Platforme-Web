

import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';

var STacked = function(){


var load_data = function(data, element, legendDiv, data_col, key_col, callback, options) {
	
	/*var data = [
    {col: 'Jan', A: 20, B: 5, C: 10},
    {col: 'Feb', A: 30, B: 10, C: 20}
];*/
        var div = element;
        var options = options ? {...options} : {};
        if (!options.limit) {
            options.limit = 10;
        }
        var inner = (options.type == "pie" ? 0 : 60);
        var flush = function (el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        };

        function key(d) {
            return d.data[data_col];
        }

        // console.log('error', error);
        flush(element);
        flush(legendDiv);
 
      //get keys 

function valuesToArray(obj) {
  return Object.keys(obj);
}

var xData = valuesToArray(key_col[0]);
var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
d3.select(div).selectAll("svg").remove();
var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .35);

var y = d3.scale.linear()
        .rangeRound([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
 
var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dataIntermediate = xData.map(function (c) {
    return data.map(function (d) {
        return {x: d.col, y: d[c]};
    });
});

console.log('DataIntermediate', dataIntermediate);
var dataStackLayout = d3.layout.stack()(dataIntermediate);

x.domain(dataStackLayout[0].map(function (d) {
    return d.x;
}));

y.domain([0,
    d3.max(dataStackLayout[dataStackLayout.length - 1],
            function (d) { return d.y0 + d.y;})
    ])
  .nice();

var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return color(i);
        });

layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());

svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    }    ;

    return {
      
        load_data: load_data
    };
}();



var StackedBarbis= React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps(){
      return {
          keys: {},
          columns: []    };
    },

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
        console.log("RRRRRrefs",this.refs);
        console.log("PROPPP",this.props);
//var load_data = function(data, element, legendDiv, data_col, key_col, callback, options)
         /*   STacked.load_data(this.props.data, chart, legend, props.dimension, null, v =>{
                console.log("click", v);
                if (this.props.onClick){
                    this.props.onClick(props.dimension, v);
                }
            }, props);*/
  STacked.load_data(this.props.data, chart, legend,this.props.columns, this.props.keys, v =>{
                console.log("click", v);
                if (this.props.onClick){
                    this.props.onClick(props.dimension, v);
                }
            }, props);
       
                
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




WidgetManager.registerWidget("StackedBarbis", {
    component: StackedBarbis,
    defaultValue: {type: 'StackedBarbis'},
    config: [
     {key: "keys",  type: "input"},
     {key: "columns",  type: "input"}
    ]
});

module.exports = StackedBarbis;