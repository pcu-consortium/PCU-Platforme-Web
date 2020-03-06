
import WidgetManager from 'widgets/widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { LayoutMixin } from 'widgets/core/cms';
import { renderWidget } from 'widgets/core/cms';
import { Tab, Tabs, FormControl, Row, Col, Grid, Input, Table, thead, tbody, tr, td, th, ControlLabel, DropdownButton, MenuItem, ButtonGroup, FormGroup,Form, Radio, Thumbnail} from 'react-bootstrap';
import Select from 'react-select';
//var View= require('./view.js');
//var Query= require('./query.js');

// fj start
var dimensions = ['text','keyword','date','boolean','ip'];
var measures = ['integer','long','double','float'];

var PieChart = require('widgets/d3js/pie-chart');
// fj end

/***************************************************************************************************/
/*                                                                                                 */
/*  ADMIN Interface                                                                 */
/*                                                                                                 */
/***************************************************************************************************/

var WelcomeWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
 
render() {

return (

<Grid>
    <Row>
    <Col xs={6} md={4}>
      <Thumbnail src="/images/images.jpeg" alt="242x200">
        <h3>Api REST VUE</h3>
      
        <p>
          <Button bsStyle="primary" href="http://localhost:3000/pcu/api-docs/">Acceder</Button>&nbsp;
        
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="/images/images.jpeg" alt="242x200">
        <h3>Config VUE</h3>
        
        <p>
          <Button bsStyle="primary" href={'ViewConfig'}>Acceder</Button>&nbsp;
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="/images/images.jpeg" alt="242x200">
        <h3>Config A/B Testing</h3>
        <p></p>
        <p>
           <Button bsStyle="primary"  href={'ABTestingConfig'}>Acceder</Button>&nbsp;
        </p>
      </Thumbnail>
    </Col>
    </Row>
  </Grid>

  )
}

});


/***********************************************************************************************************/

var ViewConfigWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    return {
      allindexes:{},
      indexselected:'',
      entityselected:'',
      attributechecked:[],
      esentities:{},
      esentity:{}
    };
  },

  getAllIndexes(){
   
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url: urlapi+'/elastic/indices/_all',
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({allindexes: data});
        }
      });
    },

  getEntities(esindex){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);;
    var self=this;
    $.ajax({
      url:     urlapi+ '/elastic/indices/'+esindex,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({esentities: data});
        }
      });
    },

  getEntity(esindex,estype){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url:  urlapi+ '/elastic/indices/'+esindex+'/'+estype,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({esentity: data});
        }
      });
    },

  IndexSelected(event){
    this.setState({indexselected: event.target.value},function(){this.setState({entityselected: "tutu"})});
    //this.setState({entityselected: ""});
    // avant pas les 2 lignes ci-dessus        this.setState({indexselected: event.target.value});
    console.log(event.target.name,event.target.value,this.state.indexselected);
  },

  EntitySelected(event){
    this.setState({entityselected: event.target.value});
    console.log(event.target.name,event.target.value,this.state.entityselected);
  },

  AttributeChecked(input){
    if (input.target.checked) {
        this.state.attributechecked.push(input.target.value);
        console.log(this.state.attributechecked);
       }
    else {
       var attr = this.state.attributechecked;
       attr.map((val,index) => { if (val==input.target.value) attr.splice(index,1); });
       this.state.attributechecked=attr;
        console.log(this.state.attributechecked);
     }
  },

  render(){
    var urlapi=this.props.api;
    var sttd={  textAlign: 'center', 
                width: '30' }
    
    if ( Object.keys(this.state.allindexes).length==0 )
       this.getAllIndexes();
    
    var allindexes = this.state.allindexes;
    var tblindexes=[];
    var tblentities=[];
    var tblattributes=[];
    var i=0;
    var j=0;
    var k=0;
    var l=0;
    var pindex;
    var pmapping;
    var pentity;
    var pproperties;
    var phits;
    var tblaggs = ['avg','max','min','sum','coun(*)','count(distinct)','count(not blanks)'];
    
    if  ( Object.keys(this.state.allindexes).length!=0 ) {
       Object.entries(allindexes).forEach(([pkey,pvalue]) => { tblindexes.push(pkey) });
       console.log('tblindexes',tblindexes);
       }

    if (this.state.indexselected!="") {
       Object.entries(allindexes).forEach(([pkey,pvalue]) => { if (pkey==this.state.indexselected) pindex=pvalue; });
       console.log('pindex',pindex);
       Object.entries(pindex).forEach(([pkey,pvalue]) => { if (pkey=='mappings') pmapping=pvalue; });
       console.log('pmapping',pmapping);
       Object.entries(pmapping).forEach(([pkey,pvalue]) => { tblentities.push(pkey) });
       console.log('tblentities',tblentities);
    }
    else {
      tblentities=[];
      }

    if (this.state.entityselected!="") {
       Object.entries(pmapping).forEach(([pkey,pvalue]) => { if (pkey==this.state.entityselected) pentity=pvalue; });
       console.log('pentity',pentity);
       Object.entries(pentity).forEach(([pkey,pvalue]) => { if (pkey=='properties') pproperties=pvalue; });
       console.log('pproperties',pproperties);
       Object.entries(pproperties).forEach(([pkey,pvalue]) => { tblattributes.push({"name": pkey, "type": pvalue.type}); });
       console.log('tblattributes',tblattributes);
    }

    var self=this;
    return (
      <div>
        <Table striped bordered condensed hover>
          <tr>
            <th style={{ width: 200 }}>Index</th>
            <td><select style={{ width: 250 }} name="sindex" onChange={self.IndexSelected}>
                <option>Choisir un index</option>        
                {tblindexes.map((i) => {
                  return <option value={i}>{i}</option>;
                  }
                )}
                </select>
            </td>
          </tr>
          <tr>
            <th style={{ width: 200 }}>Entité</th>
            <td><select style={{ width: 250 }} name="sentity" onChange={self.EntitySelected}>
                <option>Choisir une entité</option>
                {tblentities.map((i) => {
                  return <option value={i}>{i}</option>;
                  }
                )}
                </select>
            </td>
          </tr>
          <tr>
            <th style={{ width: 200 }}>Attributs de l'entité</th> 
            <td>
              <Table striped bordered condensed hover>
                {
                //<th style={{ width: 30 }}></th>
                }
                <th style={{ width: 150 }}>Name</th>
                <th>Type</th>
                {tblattributes.map((i) => {
                  return <tr>
                    {
                     //<td style={sttd}>
                     // <input type="checkbox" onChange={self.AttributeChecked} value={i.name}/>
                     //</td>
                    }
                    <td style={{ width: 150 }}>{i.name}</td>
                    <td>{i.type}</td>
                  </tr>;
                  }
                )}
              </Table>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'right'}}><Button href={'ViewConfigViewList?index='+this.state.indexselected+'&entity='+self.state.entityselected}>Configurer vues</Button><Button href={'ViewConfigList?index='+this.state.indexselected+'&entity='+self.state.entityselected}>Configurer requêtes</Button></td> 
          </tr>
        </Table>
      </div>
      );
    }
});

/***********************************************************************************************************/

var ViewConfigParamsWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    var urlindex=this.getParameterByName('index','');
    console.log('urlindex',urlindex);
    var urlentity=this.getParameterByName('entity','');
    console.log('urlentity',urlentity);
    return {
      indexselected:urlindex,
      entityselected:urlentity,
      attributeselected:'',
      requestnselected:'',
      requestdselected:'',
      esentity:{},
      paramList:[],
      paramid:0,
      savedQuery: {}
    };
  },

  getEntity(esindex,estype){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url:  urlapi+ '/elastic/indices/'+esindex+'/'+estype,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({esentity: data});
        }
      });
    },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

  delConfig(id){
    console.log('id',id);
    var temparr=[];
    for (var i = 0; i< this.state.paramList.length ; i ++)
      if (this.state.paramList[i].id!=id)
         temparr.push(this.state.paramList[i]);
    console.log('temparr',temparr);
    this.setState({ paramList: temparr });
    },

  addConfig(){
    if (this.state.attributeselected!="") {
      var tmp=this.state.paramList;
      //if (this.state.attributeselected=="Age") {
          //tmp.push( {"id": this.state.paramid, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "", "groupby": "1", "orderby": "1", "sortby": "desc" });
          tmp.push( {"id": this.state.paramid, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "", "groupby": "", "orderby": "", "sortby": "" });
          this.setState({paramList:tmp, paramid:this.state.paramid+1});
      //    }
      //if (this.state.attributeselected=="Salary") {
      //    tmp.push( {"id": this.state.paramid, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "avg", "groupby": "", "orderby": "", "sortby": "" });
      //    tmp.push( {"id": this.state.paramid+1, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "min", "groupby": "", "orderby": "", "sortby": "" });
      //    tmp.push( {"id": this.state.paramid+2, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "max", "groupby": "", "orderby": "", "sortby": "" });
      //    this.setState({paramList:tmp, paramid:this.state.paramid+1});
      //    }
      //this.setState({paramList:tmp, paramid:this.state.paramid+3});
      //console.log('this.state.paramList',this.state.paramList);
      }
    },

  addConfigDemo(){
      var tmp=this.state.paramList;
      tmp.push( {"id": this.state.paramid, "attribute": "Age", "type": this.state.attributetypeselected, "agg": "", "groupby": "1", "orderby": "1", "sortby": "desc" });
      this.setState({paramList:tmp, paramid:this.state.paramid+1});
      tmp.push( {"id": this.state.paramid+1, "attribute": "Salary", "type": this.state.attributetypeselected, "agg": "avg", "groupby": "", "orderby": "", "sortby": "" });
      tmp.push( {"id": this.state.paramid+2, "attribute": "Salary", "type": this.state.attributetypeselected, "agg": "min", "groupby": "", "orderby": "", "sortby": "" });
      tmp.push( {"id": this.state.paramid+3, "attribute": "Salary", "type": this.state.attributetypeselected, "agg": "max", "groupby": "", "orderby": "", "sortby": "" });
      this.setState({paramList:tmp, paramid:this.state.paramid+3});
      console.log('this.state.paramList',this.state.paramList);
    },

  saveConfig(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    var tmp1={};
    tmp1={"name": self.state.requestnselected, "description": self.state.requestdselected, "config": JSON.stringify(self.state.paramList)};
    console.log("tmp1",tmp1);
    $.ajax({
      url: urlapi+'/query',
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(tmp1),
      success(data){
         console.log("saved");
         self.setState({savedQuery:data});
        }
      });
    },

  RequestNameUpdated(event){
    this.setState({requestnselected:event.target.value});
    },

  RequestDescUpdated(event){
    this.setState({requestdselected:event.target.value});
    },

  AttributeSelected(value){
    this.setState({attributeselected:value});
    },

  render(){
    var urlapi=this.props.api;
    var esentity = this.state.esentity;
    var pindex;
    var pmapping;
    var pentity;
    var pproperties;
    var tblattributes=[];
    var paramList = this.state.paramList;
    console.log('this.state.paramList',this.state.paramList);

    if ( Object.keys(this.state.esentity).length==0 ) {
       this.getEntity(this.state.indexselected,this.state.entityselected);
       }

    if ( Object.keys(this.state.esentity).length!=0 ) {
      Object.entries(esentity).forEach(([pkey,pvalue]) => { if (pkey==this.state.indexselected) pindex=pvalue; });
      console.log('pindex',pindex);
      Object.entries(pindex).forEach(([pkey,pvalue]) => { if (pkey=='mappings') pmapping=pvalue; });
      console.log('pmapping',pmapping);
      Object.entries(pmapping).forEach(([pkey,pvalue]) => { if (pkey==this.state.entityselected) pentity=pvalue; });
      console.log('pentity',pentity);
      Object.entries(pentity).forEach(([pkey,pvalue]) => { if (pkey=='properties') pproperties=pvalue; });
      console.log('pproperties',pproperties);
      Object.entries(pproperties).forEach(([pkey,pvalue]) => { tblattributes.push({"key": tblattributes.length ,"label": pkey+' ('+pvalue.type+')', "value": pkey, "type": pvalue.type}); });
      console.log('tblattributes',tblattributes);
    }

    var self=this;
    return (
      <div>
        <Table striped bordered condensed hover>
          <tr>
            <th rowSpan="2" style={{ width: 200 }}>
              <span style={{ fontSize: '18px' }}>{self.state.indexselected}</span>
              <br/>
              <span style={{ paddingLeft: '10px', fontSize: '14px', color: 'red' }}>{self.state.entityselected}</span>
              <br />
              <br />
              <span style={{ fontSize: '12px'}}>Liste des attributs</span>
              <br />
              <Select placeholder="Veuillez choisir un attribut" name="sattributes" multi={false} removeSelected={true} options={tblattributes} onChange={self.AttributeSelected} value={this.state.attributeselected}/>
              <br/>
              <Button onClick={self.addConfig}>Créer</Button>
              <Button onClick={self.addConfigDemo}>Créer Démo</Button>
            </th>
            <th style={{ width: 200 }}>Configuration</th> 
          </tr>
          <tr>
            <td>
              <Table striped bordered condensed hover>
                <tr>
                  <th style={{ width: 200 }}>Attribut</th>
                  <th style={{ width: 100 }}>Type</th>
                  <th style={{ width: 100 }}>Aggregation</th>
                  <th style={{ width: 100 }}>Grouper (position)</th>
                  <th style={{ width: 100 }}>Trier (position)</th>
                  <th style={{ width: 100 }}>Trier (sens)</th>
                  <th>Actions</th>
                </tr>
                {paramList.map((i) => {
                  return <QueryTable  querydata={i}/>; 
                  }
                )}

              </Table>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right'}}></td>
            <td style={{ textAlign: 'right'}}>
              <table style={{cellPadding: "5", cellSpacing: "5"}}>
                <tr>
                  <td>Nom requête</td>
                  <td>
                    <Input style={{width: 480}} type="text" name="req" onChange={self.RequestNameUpdated}/>
                  </td>
                  <td rowSpan="2" style={{ verticalAlign: "bottom", textAlign: 'right'}}>
                    <Button onClick={self.saveConfig}>Enregistrer</Button>
                    <Button href={'ViewConfigList?index='+this.state.indexselected+'&entity='+self.state.entityselected}>Retour</Button>
                  </td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    <Input style={{width: 480}} type="text" name="des" onChange={self.RequestDescUpdated}/>
                  </td>
                </tr>
              </table>
            </td> 
          </tr>
        </Table>
      </div>
      );
    }
});

var QueryTable= React.createClass({

  GroupUpdated(event){
    this.props.querydata.groupby=event.target.value;
    },

  OrderUpdated(event){
    this.props.querydata.orderby=event.target.value;
    },

  AggSelected(event){
    this.props.querydata.agg=event;
    /*var temparr=[];
    for (var i = 0; i< this.state.paramList.length ; i ++)
      if (this.state.paramList[i].id!=id)
         temparr.push(this.state.paramList[i]);
    console.log('temparr',temparr);
    this.setState({ paramList: temparr });*/
    },

  SortSelected(event){
    this.props.querydata.sortby=event;
    /*var temparr=[];
    for (var i = 0; i< this.state.paramList.length ; i ++)
      if (this.state.paramList[i].id!=id)
         temparr.push(this.state.paramList[i]);
    console.log('temparr',temparr);
    this.setState({ paramList: temparr });*/
    },

render()
{
var tblaggs = [{"label": "avg", "value": "avg"},{"label": "max", "value": "max"},{"label": "min","value": "min"},{"label": "sum","value": "sum"}];
var tblsort = [{"label": "asc", "value": "asc"},{"label": "desc", "value": "desc"}];

var i=this.props.querydata;
var self=this;
return(
    <tr>
      <td style={{ width: 200 }}>{i.attribute}</td>
      <td style={{ width: 100 }}>{i.type}</td>
      <td style={{ width: 200 }}>
      <Select placeholder="?" multi={false} name={i} options={tblaggs} onChange={self.AggSelected} value={i.agg}/>
      </td>
      <td style={{ width: 100 }}><Input type="text" defaultValue={i.groupby} name={i} onChange={self.GroupUpdated}/></td>
      <td style={{ width: 200 }}><Input type="text" defaultValue={i.orderby} name={i} onChange={self.OrderUpdated}/></td>
      <td style={{ width: 100 }}><Select placeholder="?" multi={false} name={i} options={tblsort} onChange={self.SortSelected} value={i.sortby}/></td>
      <td>
        <Button onClick= {()=>self.delConfig(i.id)}>Supprimer</Button>
      </td>
    </tr>
);
}
});

/***********************************************************************************************************/

var ViewConfigParams1Widget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

 
  getInitialState(){
    var urlindex=this.getParameterByName('index','');
    console.log('urlindex',urlindex);
    var urlentity=this.getParameterByName('entity','');
    console.log('urlentity',urlentity);
    return {
      indexselected:urlindex,
      entityselected:urlentity,
      requestnselected:'',
      requestdselected:'',
      esentity:{},
      paramListColumns:[],
      paramListRows:[],
      paramIdColumns:0,
      paramIdRows:0,
      savedQuery: {}
    };
  },

  getEntity(esindex,estype){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url:  urlapi+ '/elastic/indices/'+esindex+'/'+estype,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({esentity: data});
        }
      });
    },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

  delConfigColumns(id){
    var temparr = [];
    var ii = 0;
    for (var i = 0; i < this.state.paramListColumns.length ; i ++)
        if (this.state.paramListColumns[i].id != id)
           temparr.push(this.state.paramListColumns[ii++]);
    this.setState({ paramListColumns: temparr, paramIdColumns: ii });
    },

  delConfigRows(id){
    var temparr = [];
    var ii = 0;
    for (var i = 0; i < this.state.paramListRows.length ; i ++)
        if (this.state.paramListRows[i].id != id)
           temparr.push(this.state.paramListRows[ii++]);
    this.setState({ paramListRows: temparr, paramIdRows: ii });
    },
  
  addConfigColumns(params,event){
    event.preventDefault();
    if (params.value != "") {
       var tmp = this.state.paramListColumns;
       tmp.push( { "area": "Columns", "id": this.state.paramIdColumns, "attribute": params.value, "type": params.type, "function": "" } );
       this.setState( { paramListColumns: tmp, paramIdColumns: this.state.paramIdColumns+1 } );
       }
    },

  addConfigRows(params,event){
    event.preventDefault();
    if (params.value != "") {
       var tmp = this.state.paramListRows;
       tmp.push( { "area": "Rows", "id": this.state.paramIdRows, "attribute": params.value, "type": params.type, "function": "" } );
       this.setState( { paramListRows: tmp, paramIdRows: this.state.paramIdRows+1 } );
       }
      },

  saveConfig(){
    var url = this.context.api ;
    var urlapi = window.location.origin.concat(url);
    var self = this;
    var tmp1 = {};
    tmp1 = {"name": self.state.requestnselected, "description": self.state.requestdselected, "config": JSON.stringify(self.state.paramListColumns), "content": JSON.stringify(self.state.paramListRows)};
    $.ajax({
      url: urlapi+'/query',
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(tmp1),
      success(data){
        self.setState({savedQuery:data});
        }
      });
    },

  RequestNameUpdated(event){
    this.setState({requestnselected:event.target.value});
    },

  RequestDescUpdated(event){
    this.setState({requestdselected:event.target.value});
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

  render(){
    var urlapi=this.props.api;
    var esentity = this.state.esentity;
    var pindex;
    var pmapping;
    var pentity;
    var pproperties;
    var tblattributes=[];
    var tbldimensions=[];
    var tblmeasures=[];
    var paramListColumns = this.state.paramListColumns;
    var paramListRows = this.state.paramListRows;

    if ( Object.keys(this.state.esentity).length==0 ) {
       this.getEntity(this.state.indexselected,this.state.entityselected);
       }

    if ( Object.keys(this.state.esentity).length!=0 ) {
      Object.entries(esentity).forEach(([pkey,pvalue]) => { if (pkey==this.state.indexselected) pindex=pvalue; });
      Object.entries(pindex).forEach(([pkey,pvalue]) => { if (pkey=='mappings') pmapping=pvalue; });
      Object.entries(pmapping).forEach(([pkey,pvalue]) => { if (pkey==this.state.entityselected) pentity=pvalue; });
      Object.entries(pentity).forEach(([pkey,pvalue]) => { if (pkey=='properties') pproperties=pvalue; });
      Object.entries(pproperties).forEach(([pkey,pvalue]) => { 
        tblattributes.push({"key": tblattributes.length ,"label": pkey+' ('+pvalue.type+')', "value": pkey, "type": pvalue.type});
        if (dimensions.indexOf(pvalue.type)>-1)
           tbldimensions.push({"key": tbldimensions.length ,"label": pkey+' ('+pvalue.type+')', "value": pkey, "type": pvalue.type, "sort": tbldimensions.length });
        if (measures.indexOf(pvalue.type)>-1)
           tblmeasures.push({"key": tblmeasures.length ,"label": pkey+' ('+pvalue.type+')', "value": pkey, "type": pvalue.type, "sort": tblmeasures.length});                  
      });
    }

    var self=this;
    return (
      <div>
        <Table striped bordered condensed hover>
          <tr>
            <td colSpan="2">
              <table>
                <tr>
                  <th>
                    <span style={{ paddingRight: '10px', fontSize: '18px' }}>Index</span>
                  </th>
                  <th>
                    <span style={{ fontSize: '18px', color: 'red' }}>{self.state.indexselected}</span>
                  </th>
                  <th>
                    <span style={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '18px' }}>Type</span>
                  </th>
                  <th>
                    <span style={{ fontSize: '18px', color: 'red' }}>{self.state.entityselected}</span>
                  </th>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', backgroundColor: '#c0c0c0'}}>Select attributes ...</span>
              <br />
              <br />
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Dimensions</span>
              <br />
              <table>
                <tr>
                  <th style={{ width: 150, textAlign: "left", color: '#0F0' }}>Attribute</th>
                  <th style={{ width: 100, textAlign: "center", color: '#0F0' }}>Columns</th>
                  <th style={{ width: 100, textAlign: "center", color: '#0F0' }}>Rows</th>
                </tr>
                {tbldimensions.map((j) => {
                    console.log('j',j.label);
                    return <DimensionLigne dimensiondata={j} onClickCols={self.addConfigColumns} onClickRows={self.addConfigRows}/>; 
                    }
                )}
              </table>
              <br />
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Measures</span>
              <br />
              <table>
                <tr>
                <th style={{ width: 150, textAlign: "left", color: '#0F0' }}>Attribute</th>
                  <th style={{ width: 100, textAlign: "center", color: '#0F0' }}>Columns</th>
                  <th style={{ width: 100, textAlign: "center", color: '#0F0' }}>Rows</th>
                </tr>
                {tblmeasures.map((j) => {
                    console.log('j',j.label);
                    return <MeasureLigne  measuredata={j} onClickCols={self.addConfigColumns} onClickRows={self.addConfigRows}/>; 
                    }
                )}
              </table>              
            </td>
            <td>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', backgroundColor: '#c0c0c0'}}>Build query ...</span>
              <br />
              <br />
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Columns</span>
              <Table striped bordered condensed hover>
                <tr>
                  <th style={{ width: 200 }}>Attribute</th>
                  <th style={{ width: 100 }}>Function</th>
                  <th>Actions</th>
                </tr>
                {paramListColumns.map((i) => {
                     return <QueryTableColumns  querydata={i} onClickColumns={self.delConfigColumns}/>; 
                  }
                )}
              </Table>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Rows</span>
              <Table striped bordered condensed hover>
                <tr>
                <th style={{ width: 200 }}>Attribute</th>
                  <th style={{ width: 100 }}>Aggregation</th>
                  <th>Actions</th>
                </tr>
                {paramListRows.map((i) => {
                  return <QueryTableRows  querydata={i} onClickRows={self.delConfigRows}/>; 
                  }
                )}
              </Table>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', backgroundColor: '#c0c0c0'}}>Save query ...</span>
              <br />
              <br />
              <Table striped bordered condensed hover>
                <tr>
                  <td style={{width: 80}}>Nom</td>
                  <td>
                    <Input style={{width: '100%'}} type="text" name="req" onChange={self.RequestNameUpdated}/>
                  </td>
                </tr>
                <tr>
                  <td style={{width: 80}}>Description</td>
                  <td>
                    <Input style={{width: '100%'}} type="text" name="des" onChange={self.RequestDescUpdated}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ verticalAlign: "middle", textAlign: 'right'}}>
                    <Button onClick={self.saveConfig}>Save</Button>
                    <Button href={'ViewConfigList?index='+this.state.indexselected+'&entity='+self.state.entityselected}>Back</Button>
                  </td>
                </tr>
              </Table>
            </td>
          </tr>
        </Table>
      </div>
      );
    }
});

var DimensionLigne= React.createClass({
  render()
    {
    var self=this;
    return(
        <tr>
          <td style={{ width: 200, verticalAlign: "middle", textAlign: "left" }}>{self.props.dimensiondata.value}</td>
          <td style={{ width: 100, verticalAlign: "middle", textAlign: "center" }}><a href="#" onClick={(e) => self.props.onClickCols(self.props.dimensiondata,e)}>+</a></td>
          <td style={{ width: 100, verticalAlign: "middle", textAlign: "center" }}><a href="#" onClick={(e) => self.props.onClickRows(self.props.dimensiondata,e)}>+</a></td>
        </tr>
      );
    }
});
  
var MeasureLigne= React.createClass({
  render()
  {
  var self=this;
  return(
      <tr>
          <td style={{ width: 200, verticalAlign: "middle", textAlign: "left" }}>{self.props.measuredata.value}</td>
          <td style={{ width: 100, verticalAlign: "middle", textAlign: "center" }}><a href="#" onClick={(e) => self.props.onClickCols(self.props.measuredata,e)}>+</a></td>
          <td style={{ width: 100, verticalAlign: "middle", textAlign: "center" }}><a href="#" onClick={(e) => self.props.onClickRows(self.props.measuredata,e)}>+</a></td>
      </tr>
    );
  }
});

var QueryTableColumns= React.createClass({

  FunctionSelected(event){
    this.props.querydata.function=event;
    },

  render() {
    var tblfunctions = [{"label": "year", "value": "year"},{"label": "month", "value": "month"}];
    var self=this;
    return(
        <tr>
          <td style={{ width: 200 }}>{self.props.querydata.attribute}</td>
          <td style={{ width: 200 }}>
          <Select placeholder="?" multi={false} name={self.props.querydata} options={tblfunctions} onChange={self.FunctionSelected} value={self.props.querydata.function}/>
          </td>
          <td>
            <Button onClick={(e)=>self.props.onClickColumns(self.props.querydata.id,e)}>Supprimer</Button>
          </td>
        </tr>
    );
    }
});

var QueryTableRows= React.createClass({

  FunctionSelected(event){
    this.props.querydata.function=event;
    },

  render() {
    var tblfunctions = [{"label": "avg", "value": "avg"},{"label": "max", "value": "max"},{"label": "min","value": "min"},{"label": "sum","value": "sum"},{"label": "coun(*)","value": "coun(*)"},{"label": "count(not blanks)","value": "count(not blanks)"},{"label": "count(distinct)","value": "count(distinct)"}];
    var self=this;
    return(
        <tr>
          <td style={{ width: 200 }}>{self.props.querydata.attribute}</td>
          <td style={{ width: 200 }}>
          <Select placeholder="?" multi={false} name={self.props.querydata} options={tblfunctions} onChange={self.FunctionSelected} value={self.props.querydata.function}/>
          </td>
          <td>
            <Button onClick={(e)=>self.props.onClickRows(self.props.querydata.id,e)}>Supprimer</Button>
          </td>
        </tr>
    );
    }
});

/***********************************************************************************************************/

var ViewConfigListWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    var urlindex=this.getParameterByName('index','');
    console.log('urlindex',urlindex);
    var urlentity=this.getParameterByName('entity','');
    console.log('urlentity',urlentity);
    return {
      indexselected:urlindex,
      entityselected:urlentity,
      attributeselected:'',
      requestselected:'',
      queryList:[],
      paramList:[],
      paramid:0,
      savedQuery: {},
      results:[],
      aggs:[],
      viewQuery:[]
    };
  },

  getQueryList(esindex,estype){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    if (this.state.queryList.length > 0) {
       return ;
       }

    var self=this;
    $.ajax({
      url:  urlapi+ '/queryList/'+esindex+'/'+estype,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({queryList: data});
        }
      });
    //var queryList=[{"id": "1", "name": "name1","description": "description1"},{"id": "2", "name": "name2","description": "description2"},{"id": "3", "name": "name3","description": "description3"}];
    //self.setState({queryList: queryList});
    },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

  addConfig(){
    if (this.state.attributeselected!="") {
      var tmp=this.state.paramList;
      if (this.state.attributeselected=="Age") {
          tmp.push( {"id": this.state.paramid, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "", "groupby": "1", "orderby": "1", "sortby": "desc" });
          this.setState({paramList:tmp, paramid:this.state.paramid+1});
          }
      if (this.state.attributeselected=="Salary") {
          tmp.push( {"id": this.state.paramid, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "avg", "groupby": "", "orderby": "", "sortby": "" });
          tmp.push( {"id": this.state.paramid+1, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "min", "groupby": "", "orderby": "", "sortby": "" });
          tmp.push( {"id": this.state.paramid+2, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "max", "groupby": "", "orderby": "", "sortby": "" });
          this.setState({paramList:tmp, paramid:this.state.paramid+1});
          }
      this.setState({paramList:tmp, paramid:this.state.paramid+3});
      console.log('this.state.paramList',this.state.paramList);
      }
    },

  delQuery(id){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    console.log('delQuery id',id);
    var temparr=[];
    for (var i = 0; i< this.state.queryList.length ; i ++)
      if (this.state.queryList[i]._id!=id)
         temparr.push(this.state.queryList[i]);
    console.log('temparr',temparr);
    this.setState({ queryList: temparr });

    var self=this;
    $.ajax({
      url:   urlapi+'/query/'+id,
      type: "DELETE",
      contentType: 'application/json',
      success(data) {
        alert(data);
        }
      });
    },

  viewQuery(i){
    console.log('viewQuery i',i);
    var tmp=[];
    tmp.push(i);
    this.setState({viewQuery: tmp});
    },

  
    esQuery1(i){
      var body = 
        {
          "aggs": {
            "group_by_age": {
              "range": {
                "field": "Age",
                "ranges": [
                  {
                    "from": 20,
                    "to": 30
                  },
                  {
                    "from": 30,
                    "to": 40
                  },
                  {
                    "from": 40,
                    "to": 50
                  },
                  {
                    "from": 50,
                    "to": 60
                  }
                ]
              },
              "aggs": {
                "group_by_salary": {
                    "field": "Salary"
                }
              }
            }
          }
        } 
       
      return body;
      },
    
      esQuery1(i){
        var body = {
          "aggs": {
            "avg_age": {
                "avg": {
                    "field": "Age"
                }
            }
          }
        }
        return body;
        },
      
        esQuery(i){
          var data = JSON.parse(i.content);
          var body = [];
          body.push('{"aggs": {');
          data.map((p,index) => {
            if (body.length==1)
              body.push('"'+p.function+'_'+p.attribute.toLowerCase()+'": { "'+p.function+'": { "field": "'+p.attribute+'" }}');
            else
              body.push(', "'+p.function+'_'+p.attribute.toLowerCase()+'": { "'+p.function+'": { "field": "'+p.attribute+'" }}');
          })
          var data = JSON.parse(i.config);
          data.map((p,index) => {
            if (body.length==1)
              body.push('"groupby_'+p.attribute.toLowerCase()+'": { "terms": { "field": "'+p.attribute+'.keyword" }}');
            else
              body.push(', "groupby_'+p.attribute.toLowerCase()+'": { "terms": { "field": "'+p.attribute+'.keyword" }}');
          })
          body.push('}}');
          console.log('body',body.join(''));
          return body.join('');
        },

/*  execQuery(id){
    console.log('execQuery id',id);
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url:   urlapi+'/viewes/'+self.state.indexselected+'/'+self.state.entityselected+'/search/*',
      type: "GET",
      contentType: 'application/json',
      success(data) {
         console.log('execQuery data',data);
         self.setState({results: data});
        }
      });
    },
*/

execQuery(i){
  console.log('execQuery i',i);
  var url = this.context.api ;
  var urlapi=window.location.origin.concat(url);
  var self=this;
  var body = "";
  body = self.esQuery(i);
  console.log('body',body);
  $.ajax({
    //url:   urlapi+'/view/'+self.state.indexselected+'/'+self.state.entityselected+'/metrics/Age',
    //url:   urlapi+'/metric/viewmatrix/'+self.state.indexselected,
    //url:   urlapi+'/viewes/'+self.state.indexselected+'/'+self.state.entityselected+'/search/*',
    url:   urlapi+'/myquery/'+self.state.indexselected+'/'+self.state.entityselected,
    type: "POST",
    contentType: 'application/json',
    data: body, //JSON.parse(body),
    success(data) {
       console.log('execQuery data',data);
       console.log('results',data);
       self.setState({results: data.hits.hits, aggs: data.aggregations});
      }
    });
  },

  chartQuery(id){
    console.log('chartQuery id',id);
    //http://localhost:3000/pcu/page/piechart?query=a
    },

    render(){
      var tblattributes=[];
      var tblhits=this.state.results;
      var tblaggregs=this.state.aggs;
      var tblheaders=[];
      var tblrows=[];
      var tblaheaders=[];
      var tblarows=[];
      var tbl=[];
      var tbla=[];
      var url = this.context.api ;
      var urlapi=window.location.origin.concat(url);
      var queryList = this.state.queryList;
      var nbColumns = 0;
      var nbColumnsa = 0;
      var ij= 0;
      var kl= 0;
      var tbuck=[];
      console.log('this.state.queryList',this.state.queryList);
      //var paramList = this.state.paramList;
      //console.log('this.state.paramList',this.state.paramList);
  
      if ( Object.keys(this.state.queryList).length==0 ) {
         this.getQueryList(this.state.indexselected,this.state.entityselected);
         }
  
         console.log('tblhits',tblhits);
  
         if ( Object.keys(tblhits).length!=0 ) {
        Object.entries(tblhits).forEach(([pkey,pvalue]) => { 
          ij = 0;
          tbl=[];
          Object.entries(pvalue._source).forEach(([ppkey,ppvalue]) => {
            ij += 1;
            if ( nbColumns==0 ) tblheaders.push(ppkey);
            tbl.push(ppvalue);
            })
            tblrows.push({"value": tbl});
            nbColumns = nbColumns==0 ? ij : nbColumns;
          })
        } 
  
        console.log('tblaggs',tblaggregs);
  
        if ( Object.keys(tblaggregs).length!=0 ) {
          Object.entries(tblaggregs).forEach(([pkey,pvalue]) => { 
            if (pvalue.buckets) {
              pvalue.buckets.map((p,i) => {
                tbuck.push({"field": pkey, "key": p.key, "doc_count": p.doc_count});
                })
              }
            else {
              tblaheaders.push(pkey);
              tblarows.push({"value": pvalue.value});
              }
            })
          } 
    
        console.log('tblheaders',tblheaders);
        console.log('tblrows',tblrows);
        console.log('tblaheaders',tblaheaders);
        console.log('tblarows',tblarows);
        console.log('tbuck',tbuck);
         
        /*if ( Object.keys(this.state.results).length!=0 ) {
  
         Object.entries(allindexes).forEach(([pkey,pvalue]) => { if (pkey==this.state.indexselected) pindex=pvalue; });
         console.log('pindex',pindex);
         Object.entries(pindex).forEach(([pkey,pvalue]) => { if (pkey=='mappings') pmapping=pvalue; });
         console.log('pmapping',pmapping);
         Object.entries(pmapping).forEach(([pkey,pvalue]) => { if (pkey==this.state.entityselected) pentity=pvalue; });
         console.log('pentity',pentity);
         Object.entries(pentity).forEach(([pkey,pvalue]) => { if (pkey=='properties') pproperties=pvalue; });
         console.log('pproperties',pproperties);
         Object.entries(pproperties).forEach(([pkey,pvalue]) => { tblattributes.push({"name": pkey, "type": pvalue.type}); });
         console.log('tblattributes',tblattributes);       
  */
      var viewQuery=this.state.viewQuery;
      var self=this;
      return (
        <div>
          <table>
            <tr>
              <th><span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', backgroundColor: '#c0c0c0'}}>Entity</span></th> 
            </tr>
          </table>
          <table>
            <tr>
              <th>
                <span style={{ paddingRight: '10px', fontSize: '18px' }}>Index</span>
              </th>
              <th>
                <span style={{ fontSize: '18px', color: 'red' }}>{self.state.indexselected}</span>
              </th>
              <th>
                <span style={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '18px' }}>Type</span>
              </th>
              <th>
                <span style={{ fontSize: '18px', color: 'red' }}>{self.state.entityselected}</span>
              </th>
            </tr>
          </table>
          <table>
            <tr>
              <th><span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', backgroundColor: '#c0c0c0'}}>Requêtes</span></th> 
            </tr>
          </table>
          <div style={{ height: '300px', overflowX: 'auto' }}>
            <Table striped bordered hover style={{ border: '1px solid #000' }}>
              <thead>
              <tr>
                <th style={{ width: 200, backgroundColor: '#ccc', border: '1px solid #000'}}>Nom</th>
                <th style={{ backgroundColor: '#ccc', border: '1px solid #000' }}>Description</th>
                <th style={{ width: 400, backgroundColor: '#ccc', border: '1px solid #000' }}>Actions</th>
              </tr>
              </thead>
              <tbody>
              {queryList.map((i,index) => {
                // <Button href={'ViewConfigQuerySyntax?index='+this.state.indexselected+'&entity='+self.state.entityselected+'&id='+i._id}>Requête</Button>
                // onClick1= {()=>self.chartQuery(i)}
                return <tr key={index}>
                  <td style={{ width: 200, border: '1px solid #000' }}>{i.name}</td>
                  <td style={{ border: '1px solid #000' }}>{i.description}</td>
                  <td style={{ whiteSpace: 'nowrap', textAlign: "right", width: 400, border: '1px solid #000'}}>
                    <Button onClick= {()=>self.viewQuery(i)}>Requête</Button>
                    <Button onClick= {()=>self.execQuery(i)}>Résultat</Button>
                    <Button href={'piechart?query='+i._id}>Chart</Button>
                    <Button onClick= {()=>self.delQuery(i._id)}>Supprimer</Button>
                  </td>
                </tr>;
                }
              )}
              </tbody>
            </Table>
          </div>
          <table>
            <tr>
              <td style={{ textAlign: 'right'}}>
                  <Button href={'ViewConfigParams1?index='+this.state.indexselected+'&entity='+self.state.entityselected}>Créer requête</Button>
                  <Button href={'ViewConfig?index='+this.state.indexselected+'&entity='+self.state.entityselected}>Retour</Button>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <th><span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', backgroundColor: '#c0c0c0'}}>Requête</span></th> 
            </tr>
          </table>
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <th style={{ width: 200 }}>Requête</th><th>Syntaxe</th>
                </tr>
                {
                  viewQuery.map((i) => {
                    return <tr><td style={{ width: 200 }}>{i.name}</td><td>{i.config}{i.content}</td></tr>
                    }
                  )
                }
              </tbody>
            </Table>          
          </div>
          <table>
            <tr>
              <th><span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', backgroundColor: '#c0c0c0'}}>Résultats</span></th> 
            </tr>
          </table>
          <div style={{ overflow: 'auto' }}>
            <Table striped bordered hover style={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  {tblaheaders.map((title,indx) => 
                    <th key={indx} style={{whiteSpace: 'nowrap', border: '1px solid #000', backgroundColor: '#ccc'}}>{title}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                {tblarows.map((row, i) =>
                    <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}} key={i}>{row.value}</td>
                )}
                </tr>
              </tbody>
            </Table>
          </div>
          <div style={{ overflow: 'auto' }}>
            <Table striped bordered hover style={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{whiteSpace: 'nowrap', border: '1px solid #000', backgroundColor: '#ccc'}}>Field</th>
                  <th style={{whiteSpace: 'nowrap', border: '1px solid #000', backgroundColor: '#ccc'}}>Value</th>
                  <th style={{whiteSpace: 'nowrap', border: '1px solid #000', backgroundColor: '#ccc'}}>Count</th>
                </tr>
              </thead>
              <tbody>
                {tbuck.map((row, i) =>
                <tr key={i}> 
                  <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}}>{row.field}</td>
                  <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}}>{row.key}</td>
                  <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}}>{row.doc_count}</td>
                </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div style={{ overflow: 'auto' }}>
            <Table striped bordered hover style={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  {tblheaders.map((title,indx) => 
                    <th key={indx} style={{whiteSpace: 'nowrap', border: '1px solid #000', backgroundColor: '#ccc'}}>{title}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {tblrows.map((row, i) =>
                  <tr key={i}>
                    {row.value.map((col, j) =>
                      <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}} key={j}>{col}</td>
                    )}
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        );
      }
  });
  
/*
*/


                  /*var LigneA= React.createClass({

  render() {
    var row=this.props.row;

    row.map((i) => {
      console.log('rowi',i);
      return <td key={i}>{i}</td>
      });
    }
});

//href={'ViewConfigQuerySyntax?id='+i.id+'&index='+this.state.indexselected+'&entity='+self.state.entityselected}

/***********************************************************************************************************/

var ViewConfigViewListWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    var urlindex=this.getParameterByName('index','');
    console.log('urlindex',urlindex);
    var urlentity=this.getParameterByName('entity','');
    console.log('urlentity',urlentity);
    return {
      indexselected:urlindex,
      entityselected:urlentity,
      attributeselected:'',
      requestselected:'',
      viewList:[],
      paramList:[],
      paramid:0,
      savedQuery: {},
      results: []
    };
  },

  getViewList(esindex,estype){
    /*
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url:  urlapi+ '/viewList/'+esindex+'/'+estype,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({viewList: data});
        }
      });
    */
    var viewList=[{"id": "1", "name": "view1","description": "description1"},{"id": "2", "name": "view2","description": "description2"},{"id": "3", "name": "view3","description": "description3"}];
    this.setState({viewList: viewList});
    },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

  /*addConfig(){
    if (this.state.attributeselected!="") {
      var tmp=this.state.paramList;
      if (this.state.attributeselected=="Age") {
          tmp.push( {"id": this.state.paramid, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "", "groupby": "1", "orderby": "1", "sortby": "desc" });
          this.setState({paramList:tmp, paramid:this.state.paramid+1});
          }
      if (this.state.attributeselected=="Salary") {
          tmp.push( {"id": this.state.paramid, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "avg", "groupby": "", "orderby": "", "sortby": "" });
          tmp.push( {"id": this.state.paramid+1, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "min", "groupby": "", "orderby": "", "sortby": "" });
          tmp.push( {"id": this.state.paramid+2, "attribute": this.state.attributeselected, "type": this.state.attributetypeselected, "agg": "max", "groupby": "", "orderby": "", "sortby": "" });
          this.setState({paramList:tmp, paramid:this.state.paramid+1});
          }
      this.setState({paramList:tmp, paramid:this.state.paramid+3});
      console.log('this.state.paramList',this.state.paramList);
      }
    },*/

  render(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var viewList = this.state.viewList;
    console.log('this.state.viewList',this.state.viewList);
    //var paramList = this.state.paramList;
    //console.log('this.state.paramList',this.state.paramList);
    var results={};


    if ( Object.keys(this.state.viewList).length==0 ) {
       this.getViewList(this.state.indexselected,this.state.entityselected);
       }

    if ( Object.keys(this.state.results).length!=0 ) {
       results = this.state.results;
       Object.entries(results).forEach(([pkey,pvalue]) => { if (pkey=='hits') phits=pvalue; });
       console.log('phits',phits);
       Object.entries(phits).forEach(([pkey,pvalue]) => { if (pkey=='hits') phits=pvalue; });
       console.log('phits',phits);
       var str="";
       Object.entries(phits).forEach(([pkey,pvalue]) => { 
         str="";
         Object.entries(pvalue._source).forEach(([pkey1,pvalue1]) => {
          str = str + (str.length>0 ? ',' : '') + '"'+pkey1+'":"'+pvalue1+'"';
         })
         str = '{'+str+'}';
         tblhits.push(JSON.parse(str));
       });
       console.log('tblhits',tblhits);
    } 

    var self=this;
    return (
      <div>
        <Table striped bordered condensed hover>
          <tr>
            <th rowSpan="2" style={{ width: 200 }}>
              <span style={{ fontSize: '18px' }}>{self.state.indexselected}</span>
              <br/>
              <span style={{ paddingLeft: '10px', fontSize: '14px', color: 'red' }}>{self.state.entityselected}</span>
            </th>
            <th>Vues</th> 
          </tr>
          <tr>
            <td>
              <Table striped bordered condensed hover>
                <tr>
                  <th style={{ width: 200 }}>Nom</th>
                  <th>Description</th>
                  <th style={{ width: 280 }}>Actions</th>
                </tr>
                {viewList.map((i) => {
                  return <tr>
                    <td style={{ width: 200 }}>{i.name}</td>
                    <td>{i.description}</td>
                    <td style={{ textAlign: "right", width: 280}}>
                      <Button onClick= {()=>self.viewQuery(i.id)}>Requêtes</Button>
                    </td>
                  </tr>;
                  }
                )}
              </Table>
            </td>
          </tr>
          <tr>
            <td></td>
            <td style={{ textAlign: 'right'}}>
              <Button href={'ViewConfig?index='+this.state.indexselected+'&entity='+self.state.entityselected}>Retour</Button>
            </td>
          </tr>
        </Table>
      </div>
      );
    }
});

/***********************************************************************************************************/


var ViewConfigQuerySyntaxWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    var urlindex=this.getParameterByName('index','');
    console.log('urlindex',urlindex);
    var urlentity=this.getParameterByName('entity','');
    console.log('urlentity',urlentity);
    var urlid=this.getParameterByName('id','');
    console.log('urlid',urlid);
    return {
      indexselected:urlindex,
      entityselected:urlentity,
      queryid:urlid,
      query:[]
    };
  },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

  getQuery(id){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    if ( Object.keys(this.state.query).length!=0 ) {
       return ;
       }

    var self=this;
    $.ajax({
      url:  urlapi+ '/query/'+id,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({query: data});
        }
      });
    },

  render() {
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var tblquery=[];
    tblquery.push(this.state.query);
    console.log("tblquery",tblquery);

   if ( Object.keys(this.state.query).length==0 )
      this.getQuery(this.state.queryid);

    var self=this;
    return (
      <div>
        <Table striped bordered condensed hover>
          <tr>
            <th style={{ width: 200 }}>Requête</th>
            <th>Syntaxe</th>
          </tr>
          {tblquery.map((i) => {
            console.log("i",i);
            return <tr>
              <td style={{ width: 200 }}>{i.name}</td>
              <td>{i.esquery}</td>
            </tr>;
            }
           )}
          <tr>
            <td colSpan="2" style={{ textAlign: 'right'}}><Button href={'ViewConfigList?index='+self.state.indexselected+'&entity='+self.state.entityselected}>Retour</Button></td> 
          </tr>
        </Table>
      </div>
      );
    }
});

/***********************************************************************************************************/

WidgetManager.registerWidget("ViewConfig", {
    component: ViewConfigWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("ViewConfigParams", {
    component: ViewConfigParamsWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("ViewConfigParams1", {
  component: ViewConfigParams1Widget,
  config: [
  ]
}
);

WidgetManager.registerWidget("ViewConfigList", {
    component: ViewConfigListWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("ViewConfigViewList", {
    component: ViewConfigViewListWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("ViewConfigQuerySyntax", {
    component: ViewConfigQuerySyntaxWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("Welcome", {
    component: WelcomeWidget ,
 config: [
    ]
}
);
