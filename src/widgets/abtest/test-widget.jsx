import WidgetManager from '../widget-manager';
import Router from 'react-router';
import {FormControl, Row, Col, Grid, Input, Thumbnail} from 'react-bootstrap';
import { LayoutMixin } from 'widgets/core/cms';
import WidgetMixin from 'widgets/widget-mixin';
import Select from 'react-select';

var testobjectif = [
    { value: 'duree', label: 'durée de la session' },
    { value: 'clique', label: 'nombre de clique' },
    { value: 'taux', label: 'nombre de recherche'} 
];
var pourcentage=[
	{ value: '100', label: '100%' },
	{ value: '75', label: '75%' },
	{ value: '50', label: '50%'} ,
	{ value: '25', label: '25%'},
	{ value: '10', label: '10%'} ,
	{ value: '5', label: '5%'}  

];

var duretest= [
	{ value: '1', label: '1 semaines' },
	{ value: '2', label: '2 semaines' },
	{ value: '3', label: '3jours'} ];
var TestInputWidget = React.createClass({
	 mixins : [WidgetMixin, LayoutMixin],

  getInitialState() {
    return {

     savedtask: {},
     taskdata: [],
    
    };
  },  
 logChange(val) {
  console.log('Selected: ', val);
},
additem(input,event)
   {  
    console.log(input.target.name,input.target.value);
    this.state.savedtask[input.target.name]=input.target.value;
   },
  render() {
  	var self=this;
  	var divstyle={backgroundColor: '#F2F2F2'};
    var labelstyle={ color:"#6E6E6E"};
    return (
      
    	<div>
    	<Container>
    	<Row  style={{marginBottom: 12}}>
    	<Col xs={4}>
    	<h6 style={labelstyle} >Nom du test</h6>
    	</Col>
    	<Col xs={4}>
    	<Input id="name" type="text" onBlur={self.additem} name="name"/>
    	</Col>

    	</Row>

    	<Row  style={{marginBottom: 12}}>
    	<Col xs={4}>
    	<h6 style={labelstyle} >Auteur</h6>
    	</Col>
    	<Col xs={4}>
    	<Input id="auteur" type="text" onBlur={self.additem} name="auteur"/>
    	</Col>

    	</Row>
    	<Row  style={{marginBottom: 12}}>
    	<Col xs={4}>
    	<h6 style={labelstyle} >Objectif du test</h6>
    	</Col>
    	<Col xs={4}>
    	<Select
    	name="form-field-name"

    	options={testobjectif}
    	onChange={self.logchange}/>
    	</Col>

    	</Row>
        	
    	
    	<Row  style={{marginBottom: 12}}>
    	<Col xs={4}>
    	<h6 style={labelstyle} >Pourcentage du trafic</h6>
    	</Col>
    	<Col xs={4}>
    	<Select    	name="form-field-pourcentage"
    	options={pourcentage}   	onChange={self.logchange}/>
    	</Col>

    	</Row>
      <Row  style={{marginBottom: 12}}>
    	<Col xs={4}>
    	<h6 style={labelstyle} >Durée du test</h6>
    	</Col>
    	<Col xs={4}>
    	<Select    	name="form-field-duree"
    	options={duretest}   	onChange={self.logchange}/>
    	</Col>
    	</Row>

    	</Container>
    	</div>




    );
  }
});





var ConfigureComponent = React.createClass({

 getInitialState(){

   return {
     savedurl: {},
     urllistname:[]

   };
 },


handleChange(event) {
 console.log("OK",event.target);
 this.state.savedurl[event.target.name]=event.target.value;
  console.log("OKk",this.state.savedTask);
},


render() {
   var url=this.props.url;
   var self=this;
  return (
  
     <div>
    <label>URL de la page</label>
    <Input type="text"   onChange={self.handleChange} name="url"/>
     <label>    Nom de la page:</label>
    <Input type="text"   onChange={self.handleChange} name="urlname"/>
    <label>    Description:</label>
    <Input type="text"   onChange={self.handleChange} name="description"/>
    <button onClick={self.handleSubmit}  >valider </button>
    
   </div>


    );
}
});


var TestConfigureWidget = React.createClass({
	 mixins : [WidgetMixin, LayoutMixin],

  getInitialState() {
    return {
    urlnumber:1,
    urllist:[]
    };
  },  

addurl(){
    var temparr=[];
    var urlnumber= this.state.urlnumber+1;
    for (var i = 0; i< this.state.urllist.length ; i ++) {
      temparr.push(this.state.urllist[i]);}
      temparr.push({number:urlnumber});
      this.setState({urllist: temparr});
  },


  render() {
     var urlsl=this.state.urllist;
    return (
      
     
       <div>
       <ConfigureComponent url="e"  />
        {       
        urlsl.map(
      //            <Input onChange={self.passwordchange} type="text" placeholder="Status" defaultValue={item.state} name={idx}/>
          function(item,idx){
            return(
               <ConfigureComponent url={idx}  />
               )})



      }
         <button onClick= {this.addurl}>
      Nouvel URL
    </button>
        </div>
)



  }
});















WidgetManager.registerWidget("TestInput", {
    component: TestInputWidget,
    config: [
    ]
}
);
WidgetManager.registerWidget("TestConfib", {
    component:ConfigureComponent,
    config: [
    ]
}
);




WidgetManager.registerWidget("TestConfig", {
    component:TestConfigureWidget,
    config: [
    ]
}
);


module.exports  = { 
 TestInputWidget,
ConfigureComponent,
 TestConfigureWidget
} ;
