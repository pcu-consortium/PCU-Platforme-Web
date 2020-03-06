
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';

var Pie = function(){
    // var w = 440,
    //    h = 440,
    //    r = 200,
    var w = 260,
        h = 260,
        r = 120,
        color = d3.scale.category10(),
        rect_size = 22,
        rect_padding = 2,
        mapped_colors = [];

    function type(d) {
        d.cnt = +d.cnt;
        return d;
    }


    function init_rect(r, padding){
        return r.attr("x", padding)
            .attr("y", padding)
            // .attr("stroke", "#FFF")
            // .attr("stroke-width", "1px")
            .attr("width", rect_size-2*padding)
            .attr("height", rect_size-2*padding);
    }

    function load_url(url, element, legendDiv, data_col, key_col, callback, options) {
        console.log("load_url", url);

        d3.csv(url, type, function (error, data) {
            if (error) {
                console.warn(error);
                return;
            }
            load_data(data, element, legendDiv, data_col, key_col, callback, options);
        });
    }

    var load_data = function(data, element, legendDiv, data_col, key_col, callback, options) {
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

        // data = [{"label":"ONE", "value":194},
        //         {"label":"TWO", "value":567},
        //         {"label":"THREE", "value":1314},
        //         {"label":"FOUR", "value":793},
        //         {"label":"FIVE", "value":1929},
        //         {"label":"SIX", "value":1383}];
        if (!(data_col in mapped_colors)){
            mapped_colors[data_col] = [];
        }
        var color_map = mapped_colors[data_col];
        data.sort(function(a, b){  return d3.descending(a.cnt, b.cnt);  });
        data = data.filter(function(a){
            return a[data_col].indexOf("Na") != 0;
        });
        var nextIdx = 0;
        data.forEach(function(a){
            if (!(a[data_col] in color_map)){
                color_map[a[data_col]] = color(nextIdx);
                // console.log(a[data_col] + " => " + color(nextIdx));
                nextIdx++;
            }
        });
        if (key_col != null){
            var navigatorsBycontinent = d3.nest()
                .key(function(d) { return d['key_col']; })
                .entries(data)
                .reverse().filter(function(d){
                    return d.key.indexOf("Na") != 0;
                })
                .sort(function(a, b){return d3.ascending(a.key, b.key);});
            navigatorsBycontinent.forEach(function(a){
                a.values = a.values.slice(0, options.limit);
            });
            // console.log(navigatorsBycontinent);

            var label = d3.select("form").selectAll("label")
                .data(navigatorsBycontinent)
                .enter().append("label");

            function change_label(d){
                change(d.values);
            }

            label.append("input")
                .attr("type", "radio")
                .attr("name", "continent")
                .attr("value", function(d) { return d.key; })
                // .on("change", function(d){console.log('c');change(d);})
                .on("change", change_label)
                .filter(function(d, i) { return d.key == 'Europe'; })
                .each(change_label)
                .property("checked", true);

            label.append("span")
                .text(function(d) { return d.key; });
        } else {
            var final_data;
            if (data.length > options.limit){
                final_data = data.slice(0, options.limit);
                var other = [];
                other[data_col] = 'other';
                other.is_other = true;
                other.cnt = 0;
                for(var i = options.limit; i<data.length; i++){
                    other.cnt += data[i].cnt;
                }
                final_data.push(other);
            } else {
                final_data = data;
            }
            change(final_data);
        }


        function change(filtered_data){
            var pie = d3.layout.pie(filtered_data)
                .value(function(d) { return d.cnt; })
                .sort(null); // sort(null) disables automatic sorting

            var total = d3.sum(filtered_data, function(d) {
                return d3.sum(d3.values(d));
            });

            function percent(value){
                return (value*100 / total).toFixed(2) + "%";
            }

            d3.select(div).selectAll("svg").remove();

            // h = filtered_data.length * rect_size;
            // if (h < r*2) {
            //   h = r*2;
            // }

            var vis = d3.select(div)
                .append("svg:svg")
                .data([filtered_data])
                .attr("width", w)
                .attr("height", h)
                .append("svg:g")
                .attr("class", "pie-slice")
                .attr("transform", "translate(" + r * 1.1 + "," + r * 1.1 + ")")

            var textTop, textBottom;
            var arc = d3.svg.arc()
                .innerRadius(inner)
                .outerRadius(r);
            var textArc = d3.svg.arc()
                .innerRadius(inner)
                .outerRadius((inner == 0) ? r*1.5 : r);


            var arcOver = d3.svg.arc()
                .innerRadius(inner == 0 ? 0 : (inner + 5))
                .outerRadius(r + 5);

            function getSlices(data){
                return vis.selectAll("g.slice").filter(function(d, i) {
                    return d.data == data;
                });
            }
            function getOtherSlices(data){
                return vis.selectAll("g.slice").filter(function(d, i) {
                    return d.data != data;
                });
            }

            function getLegends(data){
                var legend = d3.select(legendDiv).select("svg.legend");
                return legend.selectAll("g").filter(function(d, i) {
                    return d == data;
                });
            }
            function getOtherLegends(data){
                var legend = d3.select(legendDiv).select("svg.legend");
                return legend.selectAll("g").filter(function(d, i) {
                    return d != data;
                });
            }
            function highlight(data){
                getSlices(data).each(function(d){
                    var _this = d3.select(this);
                    _this.select("path").transition()
                        .duration(200)
                        .attr("d", arcOver)
                    // .style("opacity", 1)
                    if (textTop){
                        textTop.text(_this.datum().data[data_col])
                            .attr("y", -10);
                        textBottom.text(percent(_this.datum().data.cnt))
                            .attr("y", 10);
                    }
                });
                getOtherSlices(data).each(function(d){
                    var _this = d3.select(this);
                    _this.select("path").style("opacity", 0.3);
                });
                // getLegends(data).each(function(d){
                //     var _this = d3.select(this);
                //     _this.select("tspan")
                //         .transition()
                //         .style("font-weight", "bold");
                //     _this.select("rect").transition(),
                // });
                getLegends(data).each(function(d){
                    d3.select(this).style("opacity", 1);
                });
                getOtherLegends(data).each(function(d){
                    d3.select(this).style("opacity", 0.3);
                })
            }
            function unhighlight(data){
                getSlices(data).each(function(d){
                    var _this = d3.select(this);
                    _this.select("path").transition()
                        .duration(100)
                        .attr("d", arc);
                    if (textTop){
                        textTop.text( "TOTAL" )
                            .attr("y", -10);
                        textBottom.text(percent(total));
                    }
                });
                getOtherSlices(data).each(function(d){
                    var _this = d3.select(this);
                    _this.select("path").style("opacity", 1);
                });
                getOtherLegends(data).each(function(d){
                    d3.select(this).style("opacity", 1);
                });
                // getLegends(data).each(function(d){
                //     var _this = d3.select(this)
                //     _this.select("tspan")
                //         .transition()
                //         .style("font-weight", "");
                //     init_rect(_this.select("rect").transition(), rect_padding);

                // });
            }

            var arcs = vis.selectAll("g.slice")
                .data(pie, key)
                .enter()
                .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    highlight(d3.select(this).datum().data);
                })
                .on("mouseout", function(d) {
                    unhighlight(d3.select(this).datum().data);
                })
                .on("click", function(d) {
                    callback(d3.select(this).datum().data[data_col]);
                });

            arcs.append("svg:path")
                .attr("fill", function(d, i) { return color_map[d.data[data_col]]; } )
                .attr("d", arc);
            arcs.append("text")
                .attr("transform", function(d) { return "translate(" + textArc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .style("text-anchor", "middle")
                .style("fill", "#FFF")
                .style("font-size", "13px")
                .style("font-weight", "200")
                .data(filtered_data)
                .filter(function(d, i) {
                    return (d.cnt / total) >= 0.1;
                })
                .text(function(d) { return percent(d.cnt); });

            var legend = d3.select(legendDiv).append("svg")
                .attr("class", "legend")
                .attr("width", 190)
                .attr("height", (filtered_data.length * rect_size) + "px")
                .selectAll("g")
                .data(filtered_data)
                .enter()
                .append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * rect_size + ")"; })
                .on("mouseover", function(d) {
                    highlight(d);
                })
                .on("mouseout", function(d) {
                    unhighlight(d);
                })
                .on("click", function(d) {
                    callback(d[data_col]);
                });

            if (inner > 0){
                textTop = vis.append("text")
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .style("opacity", (inner == 0 ? 0 : 1))
                    .attr("class", "textTop")
                    .text( "TOTAL" )
                    .attr("y", -10)
                textBottom = vis.append("text")
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .style("opacity", (inner == 0 ? 0 : 1))
                    .attr("class", "textBottom")
                    .text(percent(total))//total.toFixed(2) + "m")
                    .attr("y", 10);
            }

            legend.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill-opacity", "0")
                .attr("width", "100%")
                .attr("height", rect_size);
            init_rect(legend.append("rect"), rect_padding)
                .style("fill", function(d, i) { return color_map[d[data_col]]; });

            legend.append("text")
                .attr("x", rect_size + rect_padding + 1)
                .attr("y", 9 + rect_padding)
                .attr("dy", ".35em")
                .append("tspan")
                .style("font-weight", "")
                .text(function(d) { return d[data_col] + " (" + percent(d.cnt) + ")"; });
        }
    };

    return {
        load_url: load_url,
        load_data: load_data
    };
}();


// function loadDimension(dimension){
//   var url = makeUrl(dimension + ',cnt');
//   load_url(url, dimension, null, function(v){filterDimension(dimension, v);});
// }

var PieChart = React.createClass({
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
        if (this.props.data){
            Pie.load_data(this.props.data, chart, legend, props.dimension, null, v =>{
                console.log("click", v);
                if (this.props.onClick){
                    this.props.onClick(props.dimension, v);
                }
            }, props);
        } else {
            var url = this.makeUrl(props);
            console.log(url);
            Pie.load_url(url, chart, legend, props.dimension, null, v =>{
                console.log("click", v);
                if (this.props.onClick){
                    this.props.onClick(props.dimension, v);
                }
            }, props);
        }
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


//
//var PieDrillDown = React.createClass({
//    mixins: [StatsFilterMixin, Router.State, Router.Navigation],
//    getInitialState: function () {
//        return {
//            'count': 10,
//            'display': 'pie',
//        };
//    },
//
//    onSelectorChange: function(type, v){
//        var newState = {};
//        newState[type] = v;
//        console.log('state', newState);
//        this.setState(newState)
//    },
//
//    render: function(){
//        var dimensions = this.props.dimensions;
//        var filters = this.getFilters();
//        var remainingDimensions = filter(dimensions, (function(d){return !filters[d];}));
//        // <div className="fill-parent" style={{position: "relative", overflow: "hidden", top: "0px"}}>
//        // style={{position: "absolute", top: "90px", overflowY: "scroll"}}
//        return (
//            <div className="fluid-container">
//                <h3>DrillDown</h3>
//                <div className="row">
//                    <div className="col-md-6">
//                        <h4>Filters</h4>
//                        <StatsFilters filters={this.props.filters} />
//                    </div>
//                    <div className="col-md-6">
//                        <h4>Options</h4>
//                        <p>
//                            Display : <Selector type="display" onChange={this.onSelectorChange} values={['pie', 'donut']} defaultValue={'pie'}/>
//                        </p>
//                        <p>
//                            Max values : <Selector type="count" onChange={this.onSelectorChange} values={[10, 20, 50]} defaultValue={10}/>
//                        </p>
//                    </div>
//                </div>
//                <hr />
//                <div  className="row" >
//                    {
//                        remainingDimensions.map(function(d){
//                            return (
//                                <div key={d} className="col-md-6">
//                                    <h5>{d}</h5>
//                                    <PieChart dimension={d} type={this.state.display} filters={filters} limit={this.state.count} onClick={this.addFilter} />
//                                </div>
//                            )
//                        }.bind(this))
//                    }
//                </div>
//            </div>
//        )
//    }
//});



WidgetManager.registerWidget("PieChart", {
    component: PieChart,
    defaultValue: {type: 'PieChart'},
    config: [
    ]
});

module.exports = PieChart;

