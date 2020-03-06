import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
var LineChart = require('zingchart-react').line;
var BarChart = require('zingchart-react').bar;
var AreaChart = require('zingchart-react').area;


var myLineValues = [
    { text : "First Series", values : [0,1,2,2,4,6,7] },
    { text : "Second Series", values : [18,12,7,14,1,19,4] },
    { text : "Third Series", values : [0,1,12,12,4,6,17] },
    { text : "Fourth Series", values : [18,22,17,4,1,9,4] },
    { text : "Fifth Series", values : [4,2,7,3,23,7,2] },
    { text : "Sixth Series", values : [10,6,8,2,6,3,9] },
];

var myBarValues = [
    { text : "First Series", values : [0,1,2,2,4,6,7] }
];

var myAreaValues = [
    { text : "First Series", values : [0,1,2,2,4,6,7] },
    { text : "Second Series", values : [18,12,7,14,1,19,4] },
    { text : "Third Series", values : [0,1,12,12,4,6,17] },
    { text : "Fourth Series", values : [18,22,17,4,1,9,4] },
];

var years={values : ["A","B","C"]};
var fetchdata = function(uri){
  


          
       
fetch(uri).then(function(response){
          
          return response.json();
         }).then(function(json){
          let  dataList= json.buckets;
           return dataList;
            });








  };



/*
var LineChartWidget = React.createClass({
   mixins: [WidgetMixin],



render(){
   
 return (
<div>
  <h1> teest </h1>
  <LineChart id="chart1" height="300" width="600" series={myLineValues}
   legend="true" theme="light" title="Hello Line Chart"/>
</div>
)
}
});

*/


/////////////////////////////////////////



var LineChartWidget = React.createClass({
    mixins: [WidgetMixin],
     getInitialState(){
  
   return { 

   Linedata :[],
   chartType:""

   };
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
      var url=props.url;
      var querytype =props.querytype;
      console.log(url);
       

       //"http://localhost:3000/pcu/api/view/sales/doc/groupby/Retailer country/Year"
    
      fetch(url)
      .then((response) =>response.json())
      .then((findresponse) => { 
       let data = [];
       if (querytype == "groupbyMultiple"){
         let dataInfo = findresponse.group_by_field1.buckets; 
         
         dataInfo.forEach (d => {

             let valuesinit=d.group_by_field2.buckets;
             let values=valuesinit.map( v =>{ return v.doc_count})

            data.push({"text": d.key,"values": values});

          });

       }else{
       // http://localhost:3000/pcu/api/view/sales/doc/groupby/Revenue


         let dataInfo = findresponse.group_by_field.buckets; 
         
         dataInfo.forEach (d => {
          let values= [];
          values.push(d.doc_count);
          
                       data.push({"text": d.key,"values": values});

          });






       }

        this.setState ({chartType: props.chart});
        this.setState ({Linedata: data});
         return data;
       })

        
    },

  




    componentDidMount: function () {
        this.loadChart(this.props);
    },
    componentWillUpdate: function (nextProps, nextState) {
            
      //  
        if ((nextProps.url != this.props.url)|| (nextProps.chart != this.props.chart)){
          this.loadChart(nextProps);
          console.log("ICI");
         this.flush();
         }
        return false;
    },
    render: function(){
       // var { hideLegend } = this.props;
      //  var legendDisplay = hideLegend ? "none" : "table-cell";

      var url=this.props.url;
      var query =this.props.querytype;
      var charttype= this.props.chart;
      
      switch(this.state.chartType){
        case "BarChart":
         return (
             <div>
              <BarChart id="chart2" height="300" width="600" series={this.state.Linedata}
              legend="true" theme="dark" title="Hello Bar Chart"/>
              </div>
             );

        case "AreaChart":
         return (
             <div>
               <AreaChart id="chart3" height="300" width="600" series={this.state.Linedata}
               legend="true" theme="slate" title="Hello Area Chart"/>
              </div>
             );

        default:
          return (
             <div>
               <LineChart id="chart1" height="300" width="600" series={this.state.Linedata}
         legend="true" theme="light" title=" Chart" sacle-x={years} />
              </div>
             );



     }

    }
});





WidgetManager.registerWidget("LineChart", {
    component: LineChartWidget,
    config: [
     {key:"chart",  type: "selector", values: ['BarChart','LineChart','AreaChart'] },
     {key: "url",  type: "input"},
     {key: "title",  type: "input"},
     {key: "querytype",  type: "selector", values: ['avg','groupbyMultiple','groupby']}
    ]
});

module.exports = LineChart;