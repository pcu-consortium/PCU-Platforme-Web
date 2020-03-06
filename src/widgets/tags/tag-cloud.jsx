
import WidgetManager from '../widget-manager';

var TagResult = {"took":2,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":139,"max_score":0.0,"hits":[]},"aggregations":{"tags":{"doc_count_error_upper_bound":0,"sum_other_doc_count":354,"buckets":[{"key":"Sociologie","doc_count":53},{"key":"Archéobotanique","doc_count":23},{"key":"Archéologie","doc_count":23},{"key":"Archéologie de l'environnement, paléoenvironnement","doc_count":23},{"key":"Archéologie littorale","doc_count":23},{"key":"Archéologie préhistorique","doc_count":23},{"key":"Archéologie préventive","doc_count":23},{"key":"Archéologie rurale","doc_count":23},{"key":"Education informelle","doc_count":17},{"key":"Formation tout au long de la vie","doc_count":17},{"key":"Génie informatique","doc_count":17},{"key":"Technologie éducative","doc_count":17},{"key":"Technologies de l'information et de la communication","doc_count":17},{"key":"Histoire culturelle","doc_count":11},{"key":"Histoire","doc_count":8},{"key":"Histoire sociale","doc_count":8},{"key":"Histoire des peuples","doc_count":6},{"key":"ALAM","doc_count":5},{"key":"Anthropologie","doc_count":5},{"key":"Anthropologie culturelle","doc_count":4},{"key":"Arts visuels","doc_count":4},{"key":"Sociologie des migrations","doc_count":4},{"key":"Sociologie des rapports sociaux","doc_count":4},{"key":"Ethnologie","doc_count":3},{"key":"Histoire moderne","doc_count":3},{"key":"Sciences et études littéraires","doc_count":3},{"key":"Sociologie de l'intégration","doc_count":3},{"key":"Sociologie de la culture","doc_count":3},{"key":"Wahnsinn","doc_count":3},{"key":"cinéma","doc_count":3},{"key":"indétermination","doc_count":3},{"key":"linguistique","doc_count":3},{"key":"littérature","doc_count":3},{"key":"« la condition fœtale »","doc_count":3},{"key":"Anthropologie des religions","doc_count":2},{"key":"Création littéraire","doc_count":2},{"key":"Emile Durkheim","doc_count":2},{"key":"Ethnomusicologie","doc_count":2},{"key":"GSPM","doc_count":2},{"key":"Histoire de la musicologie","doc_count":2},{"key":"Howard Becker, « Outsiders »","doc_count":2},{"key":"INSEE","doc_count":2},{"key":"Luc Boltanski et Laurent Thévenot","doc_count":2},{"key":"Michel Callon et Bruno Latour","doc_count":2},{"key":"Normalität","doc_count":2},{"key":"Pierre Bourdieu","doc_count":2},{"key":"Sociologie de la musique","doc_count":2},{"key":"Sociologie de la vie quotidienne","doc_count":2},{"key":"Théâtre et spectacle","doc_count":2},{"key":"Vietnam","doc_count":2}]}}};
TagResult = TagResult.aggregations.tags.buckets;
TagResult = TagResult.map(tag => {return {text: tag.key, size: tag.doc_count};});

var TagCloudHelper = function(){

    var sizeMode = function(mode){
        switch(mode){
            case "linear": return x => x;
            case "loglog": return x => 1+Math.log(1+Math.log(x));
            case "log":
            default: return x => 1+Math.log(x);
        }
    };

    var init = function(domEl, tags, options){
        var angleCount = options.angleCount || 2;
        var angleLimit = (typeof options.angleLimit != 'undefined') ? options.angleLimit : 45;
        var fontSize = options.fontSize || 80;
        var sizeFunction = sizeMode(options.sizeMode || "log");
        var fill = d3.scale.category20();

        if (tags.length < 20){
            fontSize *= 2;
        } else if (tags.length >= 60){
            fontSize *= 0.75;
        }

        var maxSize = 0;
        tags = tags.map(function(tag){
            var size = sizeFunction(tag.size);
            if (size > maxSize) maxSize = size;
            return {text: tag.text, size: size};
        });
        // Normalize size
        tags.forEach(function(tag){
            tag.size = tag.size*fontSize/maxSize;
        });
//tags = tags.concat(tags);
        var scale = d3.scale.linear();
        scale.domain([0, angleCount - 1]).range([-angleLimit, angleLimit]);
        d3.layout.cloud().size([1000, 1000])//.spiral("archimedean")
            .words(tags)
            .rotate(function() {
                return scale(~~(Math.random() * angleCount))
            })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

        function draw(words) {
            while (domEl.firstChild) {
                domEl.removeChild(domEl.firstChild);
            }
            d3.select(domEl)
                .append("div")
                    .classed("svg-container", true)
                .append("svg")
                    .attr("width", 1000)
                    .attr("height", 1000)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 1000 1000")
                    .classed("svg-content-responsive", true)
                .append("g")
                    .attr("transform", "translate(500,500)")
                .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .classed("svg-text-clickable", true)
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                .on("mouseover", function(d){
                    d3.select(this).style("font-size", function(d) { return (d.size*1.05) + "px"; });
                })
                .on("mouseout", function(d){
                    d3.select(this).style("font-size", function(d) { return d.size + "px"; });
                })
                    .text(function(d) { return d.text; })
                    .on("click", function(d){
                        if (options.onClick){
                            options.onClick(d.text);
                        }
                    }) ;
        }
    };

    return {
        init: init
    };

}();

var TagCloud = React.createClass({
    //mixins: [React.addons.PureRenderMixin],/**/

    getDefaultProps(){
      return {
          tags: [],
          angleCount: 2,
          angleLimit: 45,
          sizeMode: "loglog",
          fontSize: 60
      };
    },

    refresh(){
        var options = jQuery.extend(false, {}, this.props);
        options.onClick = this.handleClick;
        TagCloudHelper.init(this.refs.root, this.props.tags, options);
    },

    shouldComponentUpdate(nextProps){
        var equalValues = function(obj1, obj2, keys){
            for(var i=0; i<keys.length; i++){
                var key = keys[i];
                if (obj1[key] !== obj2[key]){
                    return false;
                }
            }
            return true;
        };
        var props = this.props;
        var toCompare = ["angleCount", "angleLimit", "sizeMode", "fontSize"];
        if (!equalValues(props, nextProps, toCompare)){
            return true;
        }
        // Compare tags
        var tags1 = props.tags, tags2 = nextProps.tags;
        if (tags1 === tags2){
            return false;
        }
        if (tags1.length !== tags2.length){
            return true;
        }
        for(var i=0; i<tags1.length; i++){
            if (!equalValues(tags1[i], tags2[i], ["text", "size"])){
                return true;
            }
        }
        return false;
    },

    componentDidMount(){
        this.refresh();
    },

    componentDidUpdate(){
        console.log("didUpdate");
        this.refresh();
    },

    handleClick(value){
        console.log(value);
    },

    render(){
        console.log("render");
        return (
            <div ref="root" style={{position: 'relative'}}>
            </div>
        );
    }
});

var TagCloudWidget = React.createClass({
    getDefaultProps: function(){
        return {tags: TagResult}
    },

    render: function(){
        return <TagCloud {...this.props} />;
    }
});

WidgetManager.registerWidget("TagCloud", {
    component: TagCloudWidget,
    config: [
        {key: "angleCount", type: "number"},
        {key: "angleLimit", type: "number"},
        {key: "fontSize", type: "number"},
        {key: "sizeMode", type: "selector", values: ["linear", "log", "loglog"]}
    ],
    defaultValue: {type: 'TagCloud', icon: 'tags', angleCount: 3, angleLimit: 45, sizeMode: "log"}
});

module.exports = TagCloudWidget;
