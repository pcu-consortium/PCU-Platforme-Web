import WidgetManager from '../widget-manager';
import Router from 'react-router';
import {FormControl, Row, Col, Grid, Input, Thumbnail} from 'react-bootstrap';
import { LayoutMixin } from 'widgets/core/cms';
import WidgetMixin from 'widgets/widget-mixin';
import Select from 'react-select';
import './MultiSelectblue.css';
import './bootstrap-theme.css';

var rightoptions = [
    { value: 'all', label: 'all' },
    { value: 'consulter', label: 'consulter' },
    { value: 'rechercher', label: 'rechercher' },
    { value: 'créer', label: 'créer' },
    { value: 'modifier', label: 'modifier' }
];

var tasknamelist=[];
/***************************************************************************************************/
/*                                                                                                 */
/*  SampleComponent interface                                                                     */
/*                                                                                                 */
/***************************************************************************************************/

var showResults= false; 


var SampleComponent = React.createClass({

 getInitialState(){

   return {
     savedTask: {},
     tasklistname:[]

   };
 },


 handleSubmit() {
   var urlapi=this.props.api;
   console.log("Saved Task",this.state.savedTask);

  $.ajax({
    url:   urlapi+'/task',
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(this.state.savedTask),
    success(data){
      console.log('saved !', data);
      this.state.tasklistname.push( {"value": this.state.savedTask.taskname, "label": this.state.savedTask.taskname});

  alert('Nouvelle Tache ajoutée', data);
  this.context.taskname=  this.state.tasklistname;
 
      
    }

  });
    console.log("ICI");
  
  showResults=false ;
},

handleChange(event) {
 console.log("OK",event.target);
 this.state.savedTask[event.target.name]=event.target.value;
  console.log("OKk",this.state.savedTask);
},


render: function() {
   var showdiv=this.props.show;
   console.log("SHOw",showdiv);
   console.log("Context",this.context.taskname);
   this.state.tasklistname=this.context.taskname;
   var self=this;
  return (
  
     <div>
    <label>Nouvelle Tache:</label>
    <Input type="text"   onChange={self.handleChange} name="taskname"/>
    <label>
    Description:</label>
    <Input type="text"   onChange={self.handleChange} name="description"/>
    <button onClick={self.handleSubmit}  >sauvegarder tache</button>
    
   </div>


    );
}
});

SampleComponent.contextTypes = {
  taskname: React.PropTypes.array
};



/***************************************************************************************************/
/*                                                                                                 */
/*  Task Creation Interface                                                                        */
/*                                                                                                 */
/***************************************************************************************************/

var TaskCreateWidget = React.createClass({
    mixins : [WidgetMixin, LayoutMixin],

  getInitialState() {
    return {
      savedTask: {},
      tasklistname:[]
      }
  },

  /****/

  newtask() {
    var temparr=[];
    for (var i = 0; i< this.state.tasklistname.length ; i ++) {
        temparr.push(this.state.tasklistname[i]);}
    temparr.push({taskname:'', description: ''});
    this.setState({tasklistname: temparr});
  },

  /****/

  removetask(idx) {
    var urlapi=window.location.origin.concat(this.context.api);
    var c=confirm('Confirmez-vous la suppression ?')
    if (c)
       this.verifyTask(this.state.tasklistname[idx].taskname,urlapi,idx);
  },

  verifyTask:function(name,urlbase,idx) {
    var self=this;
    $.ajax({
      url:urlbase+'/profiletask/name/'+name,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        var size=data.length;
        if (size==0)
           self.deletetask(idx);
        else
           alert("Cette tâche est utilisée actuellement dans "+String(size)+" profil(s). Vous devez la retirer de ce(s) profil(s) avant de la supprimer.");
        }
    });
  },

  deletetask(idx) {
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/task/'+this.state.tasklistname[idx]._id,
      type: "DELETE",
      contentType: 'application/json',
      success(data){
        alert(data);
      }
    });
    var temparr=[];
    for (var i = 0; i< this.state.tasklistname.length ; i ++)
        temparr.push(this.state.tasklistname[i]);
    temparr.splice(idx,1);
    this.setState({ tasklistname: temparr });
  },

  /****/

  savetask(idx) {
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    var name=this.state.tasklistname[idx].taskname;
    $.ajax({
      url:urlapi+'/task/name/'+name,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        var size=data.length;
        if (size==0)
           self.addtask(idx);
        else
           alert("Cette tâche existe déjà.");
        }
    });
  },

  addtask:function(idx) {
    var urlapi=window.location.origin.concat(this.context.api);
    var id=(this.state.tasklistname[idx]._id) ? '/'+this.state.tasklistname[idx]._id : '';
    var self=this;
    $.ajax({
      url:   urlapi+'/task'+id,
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(self.state.tasklistname[idx]),
      success(data) {
        self.state.tasklistname[idx]._id=String(data);
        alert("La tâche "+String(self.state.tasklistname[idx].taskname)+" a été enregistrée");
        }
    });
  },

  /****/

  handleChange(event) {
    this.state.savedTask[event.target.name]=event.target.value;
    console.log("OKk",this.state.savedTask);
  },

  namechange(event) {
    console.log(event);
    this.state.tasklistname[parseInt(event.target.name)].taskname=event.target.value;
  },

  descriptionchange(event) {
    this.state.tasklistname[parseInt(event.target.name)].description=event.target.value;
  },

  gettasklist(urlapi) {
    if (this.state.tasklistname.length > 0)
      return;
  
    var self=this;
    $.ajax({
      url:   urlapi+'/taskList',
      type: "GET",
      contentType: 'application/json',
      success(data) {
    
        self.setState({ tasklistname: data});
      }
    });
  },

  render() {
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    this.gettasklist(urlapi);
    var taskdata=this.state.tasklistname;
    var self=this;
     
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Tâche </th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {       
            taskdata.map(
                function(item,idx){
                  return(
                   <tr>
                      <td><Input onChange={self.namechange} type="text" placeholder="Nom" defaultValue={item.taskname} name={idx}/></td>
                      <td><Input onChange={self.descriptionchange} type="text" placeholder="Description" defaultValue={item.description} name={idx}/></td>
                      <td>
                        <button onClick= {()=>self.removetask(idx)}>
                         Supprimer
                        </button>
                        <button onClick= {()=>self.savetask(idx)}>
                         Enregistrer
                        </button>
                      </td>
                    </tr>
                  )
                }
              )
            }
          </tbody>
          </Table>
          <button onClick= {self.newtask}>
            Nouvelle Tâche
          </button>
        </div>     
      );
    }
});

/***************************************************************************************************/
/*                                                                                                 */
/*  Profile creation interface                                                                     */
/*                                                                                                 */
/***************************************************************************************************/

var ProfileCreateWidget = React.createClass({
 mixins : [WidgetMixin, LayoutMixin],


 getInitialState(){
    
   return {
     savedprofile: {},
     profiledata: [],
     portail:[],
     taskname:[]
   };
 },

  
   getChildContext() {
    return {taskname: this.state.taskname}
  } ,



  additem(input,event)
   {  
      this.state.savedprofile[input.target.name]=input.target.value;
   },
  addTask(input,event)
 {
   this.state.savedprofile[input.target.name]=input.target.value;

 },

 getProfileSchema(){
    if (this.state.profiledata.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/profilschema',
      type: "GET",
      contentType: 'application/json',
      success(data){
       console.log("DataY",data);
       self.state.profiledata=data;
        self.setState({ profiledata: data});
      }
    });
  },

getportailvalue(){
    if (this.state.portail.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/portail',
      type: "GET",
      contentType: 'application/json',
      success(data) {
    
        self.setState({portail: data});
      }
    });
  },

gettaskvalue(){
    if (this.state.taskname.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/taskname',
      type: "GET",
      contentType: 'application/json',
      success(data) {
    
        self.setState({ taskname: data});
      }
    });
  },

/***/

saveProfile() {
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    var profilename=this.state.savedprofile.profilename;
    var portail=this.state.savedprofile.portail;
    $.ajax({
      url:urlapi+'/profileportail/name/'+profilename+'/'+portail,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        var size=data.length;
        if (size==0)
           self.updateProfile();
        else
           alert("Cette occurence "+profilename+"/"+portail+" existe déjà.");
        }
    });
  },

updateProfile() {
  var urlapi=window.location.origin.concat(this.context.api);
  var profilename=this.state.savedprofile.profilename;
  var portail=this.state.savedprofile.portail;
  $.ajax({
    url:   urlapi+'/profile',
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify(this.state.savedprofile),
    success(data){
      alert("Le profil "+profilename+" a été créé pour le portail "+portail+".");
    }
  });
   
},

/***/

transformdata(data)
{

console.log(data);
  var output ={};
  var outputlist=[];
      for(var i = 0; i < data.length; i++) 
       {
          output= {"value": data[i], "label": data[i]};
          outputlist.push(output);
        }

return outputlist;
},

handleChangeP(val) {
    this.state.savedprofile['portail']=val;
  },

handleChangeT(val) {
  var tasklists=this.state.taskname;
  var savedtasks=[];
  var vals = val.split(',');
  var j=0;
  for(var i = 0; i < tasklists.length; i++) {
    console.log('value',tasklists[i].value);
    console.log('split',val.split(','));
    for(var k = 0; k < vals.length; k++) {
      if (tasklists[i].value==vals[k]) {
        savedtasks[j]=tasklists[i]._id;
        j+=1;
        console.log('savedtasks',savedtasks);
        }
      }
    }
    
    this.state.savedprofile['tache']=savedtasks;
    console.log('tache',this.state.savedprofile);
  },

  onClick: function() {

    var actuel=this.state.showResults;
    showResults= this.state.showResults;
    this.setState({showResults: !actuel}) ;
  },
 onClickbis() {
  console.log("hhhhhhhhhhhhhhhhhhhh");
    var actuel=this.state.showResults;
      console.log("List",this.context.taskname);
      this.setState({tasklist: this.context.taskname}) ;
      this.setState({showResults: !actuel}) ;
  }, 

  render() {
  this.getProfileSchema();
  this.getportailvalue();
  this.gettaskvalue();
  var profiledata= this.state.profiledata;
  var portaildata=this.state.portail;
  var out=this.transformdata(portaildata);
  var tasklist=this.state.taskname;
  var divstyle={height: "2500px;"};
  var divstylebis={height: "400px"};
  var urlapi=window.location.origin.concat(this.context.api);
  
  var self=this;
  
  return (
    <div style={divstyle}>
      {
      profiledata.map(
        function(item,idx){
          
          if ((item == "_id")||(item == "__v") ||(item == "profileid"))
          {

          } else if ((item.id == "profilename") ||(item.id == "description")) {
          return (
           <div>
              <Container>
                    <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                             <h6>{item.val}</h6>
                        </Col>
                        <Col xs={6}>
                          <Input type="text" onChange={self.additem} name={item.id}/>
                        </Col>
                    </Row>
                   
                </Container>
            </div>
           )
          } else if ((item.id == "portail")){
            return(
             <div>
              <Container>
                    <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                             <h6>{item.val}</h6>
                        </Col>
                        <Col xs={6}>
                          
                             <Select name={item.id} value="" multi={false} options={out} onChange={self.handleChangeP}/>
                        </Col>
                    </Row>
                   <Row  style={{marginBottom: 8}}>
                   </Row>
                </Container>
             </div>

             )     
          } else if (( item.id="tache")) {
            return(
           <div style1={divstylebis}>
              <Container>
                    <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                             <h6>{item.val}</h6>
                        </Col>
                        <Col xs={6}>
                          <Select name={item.id} value="" multi={true} options={tasklist} onChange={self.handleChangeT}/>
                          <button onClick={self.onClick}  >Ajouter  une nouvelle tache</button>
                          { showResults ? <SampleComponent show={showResults} api={urlapi} /> : null }
                           <button onClick={self.onClickbis} >ajouter la tache au profil</button>
                        </Col>
                    </Row>
                   <Row  style={{marginBottom: 8}}>
                   </Row>
                </Container>
            </div>
          )
        }
      }
        )
      }
     
     <Button onClick= {self.saveProfile} >
           Enregistrer
     </Button>
     <Button href= {'ProfileManagement'} >
           Retour liste des profils
     </Button>
   </div>
    );
  }
});

ProfileCreateWidget.childContextTypes = {
    taskname: React.PropTypes.array,
  };




/***************************************************************************************************/
/*                                                                                                 */
/*  Profile update interface                                                                     */
/*                                                                                                 */
/***************************************************************************************************/

var ProfileUpdateWidget = React.createClass({
 mixins : [WidgetMixin, LayoutMixin],


 getInitialState(){
    
   return {
     schemadata: [],
     savedprofile: {},
     profiledata: [],
     portail:[],
     taskname:[],
     disabled:true
   };
 },
 activate(){
  this.setState( {disabled: !this.state.disabled})

  },

  additem(input,event)
   {  
    this.state.savedprofile[input.target.name]=input.target.value;
    console.log('target',input.target.name+' / '+input.target.value);
   },

  addTask(input,event)
   {
     this.state.savedprofile[input.target.name]=input.target.value;

   },

 getProfileSchema(){
    if (this.state.schemadata.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/profilschema',
      type: "GET",
      contentType: 'application/json',
      success(data){
       self.state.schemadata=data;
       self.setState({ schemadata: data});
      }
    });
  },

  getProfile(id){
    if (this.state.profiledata.length > 0)
      return ;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/profile/'+id,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({profiledata: data});
        }
      });
    console.log('profiledata',this.state.profiledata);
  },

getportailvalue(){
    if (this.state.portail.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/portail',
      type: "GET",
      contentType: 'application/json',
      success(data) {
    
        self.setState({portail: data});
      }
    });
  },

gettaskvalue(){
    if (this.state.taskname.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/taskname',
      type: "GET",
      contentType: 'application/json',
      success(data) {
    
        self.setState({ taskname: data});
      }
    });
  },

/***/

saveProfile() {
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    var profilename=this.state.savedprofile.profilename;
    var portail=this.state.savedprofile.portail;
    if (((profilename=="")||(profilename==this.state.profiledata[0]['profilename']))&&((portail=="")||(portail==this.state.profiledata[0]['portail'])))
       self.updateProfile();
    else {
       $.ajax({
          url:urlapi+'/profileportail/name/'+profilename+'/'+portail,
          type: "GET",
          contentType: 'application/json',
          success(data) {
            var size=data.length;
            if (size==0)
               self.updateProfile();
            else
               alert("Cette occurence "+profilename+"/"+portail+" existe déjà.");
            }
       });
    } 
  },

updateProfile() {
  var urlapi=window.location.origin.concat(this.context.api);
  $.ajax({
    url:   urlapi+'/profile/'+this.state.profiledata[0]['_id'],
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(this.state.savedprofile),
    success(data){
      alert("Le profil a été modifié.");
    }
  });
   
},

/***/


transformdata(data)
{
  var output ={};
  var outputlist=[];
      for(var i = 0; i < data.length; i++) 
       {
          output= {"value": data[i], "label": data[i]};
          outputlist.push(output);
        }

return outputlist;
},

handleChangeP(val) {
    this.state.savedprofile['portail']=val;
    console.log('savedportail',this.state.savedprofile['portail']);
  },

handleChangeT(val) {
  var tasklists=this.state.taskname;
  var savedtasks=[];
  var vals = val.split(',');
  for(var i = 0; i < tasklists.length; i++) {
    for(var k = 0; k < vals.length; k++) {
      if (tasklists[i].value==vals[k]) {
        savedtasks.push(tasklists[i]._id);
        }
      }
    }
  
    if (savedtasks.length>0)
        this.state.savedprofile['tache']=savedtasks;
    else
        this.state.savedprofile['tache']="";
    console.log('savedprofile',this.state.savedprofile);
  },

onClick: function() {
  
  var actuel=this.state.showResults;
  showResults= this.state.showResults;
  this.setState({showResults: !actuel}) ;
    },

 onClickbis() {
    var actuel=this.state.showResults;
      console.log("hhhhhhhhhhhhhhhhhhhh");
      console.log("List",this.context.taskname);
      this.setState({tasklist: this.context.taskname}) ;
      this.setState({showResults: !actuel}) ;
  }, 


render() {
  var id= window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('id').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
  console.log('id',id);
  this.getProfileSchema();
  this.getProfile(id); 
  this.getportailvalue();
  this.gettaskvalue();
  var schemadata= this.state.schemadata;
  var profiledata= this.state.profiledata;
  var portaildata=this.state.portail;
  var out=this.transformdata(portaildata);
  var tasklist=this.state.taskname;
  var divstyle={height: "2500px;"};
  var divstylebis={height: "400px;"};
  var urlapi=window.location.origin.concat(this.context.api);
  if (this.state.profiledata.length>0) {
      var val = this.state.profiledata[0]['tache'];
      var t=[];
      var tasklists=this.state.taskname;
      for(var i = 0; i < tasklists.length; i++) {
        for(var k = 0; k < val.length; k++) {
          if (tasklists[i]._id==val[k]) {
            t.push(tasklists[i].value);
            }
        }
      }
    }


  var self=this;
  
  return (
    <div style={divstyle}>
      {
      schemadata.map(
        function(item,idx){
          console.log('item',item.id);
          console.log('profiledata[0][item.id]',profiledata[0][item.id]);
          if ((item == "_id")||(item == "__v") ||(item == "profileid"))
          {

          } else if ((item.id == "profilename") ||(item.id == "description")) {
          return (
           <div>
              <Container>
                    <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                             <h6>{item.val}</h6>
                        </Col>
                        <Col xs={6}>
                                                   
                        <Input type="text" name={item.id}  key={profiledata[0][item.id]}  onChange={self.additem} defaultValue={profiledata[0][item.id]} disabled = {(self.state.disabled)? "disabled" : ""} />


                        </Col>
                    </Row>
                   
                </Container>
            </div>
           )
          } else if ((item.id == "portail")){
            return(
             <div>
              <Container>
                    <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                             <h6>{item.val}</h6>
                        </Col>
                        <Col xs={6}>
                          <Select name={item.id} value={profiledata[0][item.id]} multi={true} options={out} onChange={self.handleChangeP} disabled = {(self.state.disabled)? "disabled": ""}/>
                        </Col>
                    </Row>
                   <Row  style={{marginBottom: 8}}>
                   </Row>
                </Container>
             </div>

             )     
          } else if (( item.id="tache")) {
            return(
           <div style1={divstylebis}>
              <Container>
                    <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                             <h6>{item.val}</h6>
                        </Col>
                        <Col xs={6}>
                          <Select name={item.id} value={t} multi={true} options={tasklist} onChange={self.handleChangeT} disabled = {(self.state.disabled)? "disabled": ""}/>
                           { !self.state.disabled ?  <button onClick={self.onClick}  >Ajouter  une nouvelle tache</button>: null } 
                          { showResults ? <SampleComponent show={showResults} api={urlapi} /> : null }
                          { !self.state.disabled ?   <button onClick={self.onClickbis} >ajouter la tache au profil</button>: null } 
                      

                        </Col>
                    </Row>
                   <Row  style={{marginBottom: 8}}>
                   </Row>
                </Container>
            </div>
          )
        }
      }
        )
      }
       <Button onClick={self.activate}>
         Modifier
       </Button>

      { !self.state.disabled ?  <Button onClick={self.saveProfile}>  Enregistrer   </Button>: null } 
       
     <Button href= {'ProfileManagement'} >
           Retour liste des profils
     </Button>
   </div>
    );
  }
});


/***************************************************************************************************/
/*                                                                                                 */
/*  Profile view interface                                                                     */
/*                                                                                                 */
/***************************************************************************************************/

var ProfileViewWidget = React.createClass({
 mixins : [WidgetMixin, LayoutMixin],


 getInitialState(){
    
   return {
     schemadata: [],
     profiledata: [],
     portail:[],
     taskname:[]
   };
 },

 getProfileSchema(){
    if (this.state.schemadata.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/profilschema',
      type: "GET",
      contentType: 'application/json',
      success(data){
       self.state.schemadata=data;
       self.setState({ schemadata: data});
      }
    });
  },

  getProfile(id){
    if (this.state.profiledata.length > 0)
      return ;

    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/profile/'+id,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({profiledata: data});
        }
      });
    console.log('profiledata',this.state.profiledata);
  },

getportailvalue(){
    if (this.state.portail.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/portail',
      type: "GET",
      contentType: 'application/json',
      success(data) {
    
        self.setState({portail: data});
      }
    });
  },

  gettaskvalue(){
    if (this.state.taskname.length > 0)
         return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/taskname',
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({ taskname: data});
      }
    });
  },

transformdata(data)
{

console.log(data);
  var output ={};
  var outputlist=[];
      for(var i = 0; i < data.length; i++) 
       {
          output= {"value": data[i], "label": data[i]};
          outputlist.push(output);
        }

return outputlist;
},

render() {
  var id= window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('id').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
  console.log('id',id);
  this.getProfileSchema();
  this.getProfile(id); 
  console.log('this.state.profiledata',this.state.profiledata);
  this.getportailvalue();
  this.gettaskvalue();
  var schemadata= this.state.schemadata;
  console.log('schemadata',this.state.schemadata);
  var profiledata= this.state.profiledata;
  var portaildata=this.state.portail;
  var out=this.transformdata(portaildata);
  var tasklist=this.state.taskname;
  var divstyle={height: "2500px;"};
  var divstylebis={height: "400px;"};
    
  var self=this;
  
  if (profiledata.length>0) {
      var val = profiledata[0]['tache'];
      var t=[];
      var tasklists=this.state.taskname;
      for(var i = 0; i < tasklists.length; i++) {
        for(var k = 0; k < val.length; k++) {
          if (tasklists[i]._id==val[k]) {
            t.push(tasklists[i].value);
            }
        }
      }
    }

  return (
    <div style={divstylebis}>
      {
      schemadata.map(
        function(item,idx){
          if ((item == "_id")||(item == "__v")||(item.id == "profileid")) {
            }
          else if ((item.id == "profilename")||(item.id == "description")) {
            return (
              <div>
                <Container>
                  <Row  style={{marginBottom: 8}}>
                    <Col xs={4}>
                      <h6>{item.val}</h6>
                    </Col>
                    <Col xs={6}>
                      <Input type="text" name={item.id} disabled={true} value={profiledata[0][item.id]} />
                    </Col>
                  </Row>
                </Container>
              </div>
              )
            }
          else if (item.id == "portail") {
          return (
            <div>
              <Container>
                <Row  style={{marginBottom: 8}}>
                  <Col xs={4}>
                    <h6>{item.val}</h6>
                  </Col>
                  <Col xs={6}>
                    <Select name={item.id} value={profiledata[0][item.id]} multi={false} options={out} disabled={true}/>
                  </Col>
                </Row>
              </Container>
            </div>
            )
          }
          else if (item.id == "tache") {
          return (
            <div>
              <Container>
                <Row  style={{marginBottom: 8}}>
                  <Col xs={4}>
                    <h6>{item.val}</h6>
                  </Col>
                  <Col xs={6}>
                    <Select name={item.id} value={t} multi={true} options={tasklist} disabled={true}/>
                  </Col>
                </Row>
              </Container>
            </div>
            )
          }
        }
      )
      }
     <Button href= {'ProfileManagement'}>
        Retour
     </Button>
    </div>
    );
  }
});

/***************************************************************************************************/
/*                                                                                                 */
/*  Profile management interface                                                                     */
/*                                                                                                 */
/***************************************************************************************************/


var ProfileManagementWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
  getInitialState(){
    return {
      profiledata: [],
      currentprofile: "",
      values: [],
      portail:[],
      taskname:[]
    };
  },

  getProfileList(){
    if (this.state.profiledata.length > 0) {
      return ;
      }

    var urlapi=window.location.origin.concat(this.context.api);    
    var self=this;
    $.ajax({
      url:   urlapi+'/profileList',
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({profiledata: data});
        }
      });
    console.log('profiledata',self.state.profiledata);
    },


  getportailvalue(){
      if (this.state.portail.length > 0)
        return;

      var urlapi=window.location.origin.concat(this.context.api);
      var self=this;
      $.ajax({
        url:   urlapi+'/portail',
        type: "GET",
        contentType: 'application/json',
        success(data) {
      
          self.setState({portail: data});
        }
      });
    },

  gettaskvalue(){
      if (this.state.taskname.length > 0)
      return;
      var urlapi=window.location.origin.concat(this.context.api);
      var self=this;
      $.ajax({
        url:   urlapi+'/taskname',
        type: "GET",
        contentType: 'application/json',
        success(data) {
      
          self.setState({ taskname: data});
        }
      });
    },

  /***/

  saveprofile(idx){    
    var urlapi=window.location.origin.concat(this.context.api);
    $.ajax({
      url:   urlapi+'/profile/'+this.state.profiledata[idx]._id,
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(this.state.profiledata[idx]),
      success(data){
      console.log('Profile updated !', data);
      }
    });
  },
 
  /***/

handleChangeP(event) {
    //console.log('event',event);
    console.log('event',event);
    //console.log('idx',idx);
    /*this.state.profiledata[idx]['portail']=event.target.value;*/
    console.log('portail',this.state.profiledata);
  },

  
  transformdata(data)
    {

    console.log(data);
      var output ={};
      var outputlist=[];
          for(var i = 0; i < data.length; i++) 
           {
              output= {"value": data[i], "label": data[i]};
              outputlist.push(output);
            }

    return outputlist;
    },

  taskselect(event,idx){
    var pos=idx.indexOf(",");   
    var id=parseInt(idx.substr(pos+1));
    var task=idx.substr(0,pos);
    var temparr=[];
    for (var i=0; i<this.state.profiledata.length; i++)
      temparr.push(this.state.profiledata[i]);
    temparr[id].profile=task;
    this.setState({ profiledata: temparr })
  },

  /****/

  removeprofile(idx){
    var urlapi=window.location.origin.concat(this.context.api);
    var c=confirm('Confirmez-vous la suppression du profil ?')
    if (c)
       this.verifyProfile(this.state.profiledata[idx].profilename,this.state.profiledata[idx].portail,idx);
  },

  verifyProfile:function(profilename,portail,idx) {
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:urlapi+'/userprofile/name/'+profilename+'/'+portail,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        var size=data.length;
        if (size==0)
           self.deleteprofile(idx);
        else
           alert("Ce profil/portail est attribué actuellement pour "+String(size)+" utilisateur(s). Vous devez le retirer de ce(s) utilisateur(s) avant de le supprimer.");
        }
    });
  },

  deleteprofile(idx) {
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
        url:   urlapi+'/profile/'+this.state.profiledata[idx]._id,
        type: "DELETE",
        contentType: 'application/json',
        success(data){
          alert(data);
        }
    });
    var temparr=[];
    for (var i = 0; i< this.state.profiledata.length ; i ++)
        temparr.push(this.state.profiledata[i]);
    temparr.splice(idx,1);
    this.setState({ profiledata: temparr });
  },

  /****/

  rendertasks() {
    return (
      <div>
          <Input type="select" placeholder="Tâche">
            <option value="1">superadmin</option>
            <option value="2">admin</option>
            <option value="3">auteur</option>
            <option value="4">aaa</option>
          </Input>            
      </div>
    );
  },


onRadioClik(e){
console.log(e);
},

updateValue(value,event) {
  console.log('y',event);
  console.log('yy',value);

    this.setState({values: value});
},
getValue(value) {
    
    if (!this.state.values) {
        return 'Some default text';
    }
    return this.state.values;
},

updateFieldValue(event) {
    this.state.profiledata[parseInt(event.target.name)]=event.target.value;
  
},

radioClick(e){
    //console.log(e);
    //todo change state;
  },

  render() {
 
    this.getProfileList();
    console.log("ProfileList",this.state.profiledata);
    var profiledata=this.state.profiledata;
    var self=this;
    this.getportailvalue();
    this.gettaskvalue();
    var portaildata=this.state.portail;
    var portailoptions=this.transformdata(portaildata);
    var taskoptions=this.state.taskname;
    
    return (
    <div>
    <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Portail</th>
        <th>Description</th>
        <th>Tâches</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {       
        profiledata.map(
          function(item,idx){
            // 
            console.log("ITEM",item);
            var val = item.tache;
            
            var t=[];
            var j=0;
            var tasklists=taskoptions;
            console.log("listtache",tasklists);
            for(var i = 0; i < tasklists.length; i++) {
              for(var k = 0; k < val.length; k++) {
                if (tasklists[i]._id==val[k]) {
               //   t[j]=tasklists[i].value;
                 // j+=1;
                   t.push({"value": tasklists[i].value, "label": tasklists[i].value});
                  }
                }
              }
              console.log("Taskarray",t);
            return(
              <tr>
                <td>{item.profilename}</td>
                <td width="200"><Select name="portail" value={item.portail} multi={true} disabled={true} options={portailoptions} /></td>
                <td>{item.description}</td>
                <td> <Select name="tache" value={t} multi={true} disabled={true} options={t} /></td>
                <td>
                  <Button onClick= {()=>self.removeprofile(idx)}>
                    Supprimer
                  </Button>
                  <Button href={'ProfileUpdate?id='+item._id} >
                    Modifier
                  </Button>
                  <Button href={'ProfileView?id='+item._id} >
                   Détails
                  </Button>
                </td>
              </tr>
            )
          }
        )
      }
    </tbody>
    </Table>
    <Button href= {'ProfileCreate'}>
      Créer un profil
    </Button>
    </div>     
    );
  }
});
/***************************************************************************************************/
/*                                                                                                 */
/*  Profile Select                                                                    */
/*                                                                                                 */
/***************************************************************************************************/



var ProfileSelectWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
  getInitialState(){
    return {
      profiledata: [],
      SelectedProfil: [],
      portail:[]


    };
  },

  getProfileList(){
    var urlapi=window.location.origin.concat(this.context.api);
    if (this.state.profiledata.length > 0) {
      return ;
    }
    
    var self=this;
    $.ajax({
      url:  urlapi+'/profileName',
      type: "GET",
      contentType: 'application/json',
      success(data) {

        self.setState({profiledata: data});

      }
    });

  },

  getportailvalue(){
    var urlapi=window.location.origin.concat(this.context.api);
    if (this.state.portail.length > 0)
      return;
    var self=this;
    $.ajax({
      url:   urlapi+'/portail',
      type: "GET",
      contentType: 'application/json',
      success(data) {

        self.setState({portail: data});
      }
    });
  },
  
  handleCheckedPortail(event){
   if( event.target.checked)
   {
    this.state.SelectedProfil.push({"profilename":event.target.value , "portail":event.target.name});
  }else{
    var index=this.state.SelectedProfil.indexOf({"profilename":event.target.value , "portail":event.target.name});
    this.state.SelectedProfil.splice(index,1);
  }
},
SaveProfile(event){
  var tempprofiles={};
  tempprofiles["tempprofiles"]=this.state.SelectedProfil;
  var url = this.context.api ; 
  var urlapi=window.location.origin.concat(url);
  var id= window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('id').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
  $.ajax({
   url:  urlapi+'/user/'+id,
   type: "PUT",
   contentType: 'application/json',
   data: JSON.stringify(tempprofiles),
   success(data){
    console.log('saved !', data);
    window.location.replace("UserUpdate?id="+id);
    
  }
});

},

render() {
    //profil list
    this.getProfileList();
    var profiledata=this.state.profiledata;
    this.getportailvalue();
    var portaildata=this.state.portail;
    var portailbulle=[{portail: 'AGORA', libelle: 'Patrimoine audiovisuel de la recherche en SHS'},{portail: 'AHM', libelle: 'Archive Histoire des Mathématiques'},{portail: 'ARC', libelle: 'Archive Rencontre des Cultures'},{portail: 'HAL', libelle: 'HAL'}];
    console.log("portailbulle",portailbulle);
    var self=this;
    var n=[];

    profiledata.forEach(function(profil) {
      var aux=profil.portail;
      var auxportail=[]; 
      for(var i = 0; i < aux.length; i++) {
       auxportail.push({"name":aux[i], "profile":profil.profilename });
     }
     n[profil.profilename]={"profilename": profil.profilename , "description": profil.description,"portail":auxportail};

   });
    var dataarray=Object.keys(n).map(function(key){return n[key]});
    return (
      <div>
      <Table striped bordered condensed hover>
      <thead>
      <tr>

      <th>Profile</th>
      {
        portaildata.map(
          function(item,idx)
          {
            var bulle="";
            portailbulle.map(
              function(item1,idx1) {
                if (item1.portail==item)
                    bulle = item1.libelle;
              });

           return(
             <th title={bulle}>{item}</th>
             )
         } 

         )

      }


      
      </tr>
      </thead>

      <tbody>
      {       
        dataarray.map(
          function(item,idx){

            return(
              <tr>

              <td> <h6>{item.profilename}</h6>  {item.description}</td>

              {
                item.portail.map(function(item,name){

                  return ( <td> <input name={item.name}    defaultValue= {item.profile} value={item.profile}  type="checkbox"  onClick={self.handleCheckedPortail}/> </td>)
                })

              }

              

              </tr>
              )




          }
          )
      }


      </tbody>


      </Table>
      <Button onClick={self.SaveProfile}>
      Enregistrer les profils choisis
      </Button>
      </div>     
      );
}
});



/***************************************************************************************************/
/*                                                                                                 */
/*  ADMIN Interface                                                                 */
/*                                                                                                 */
/***************************************************************************************************/




var AdminInterfaceWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
 
render() {

return (

<Grid>
    <Row>
    <Col xs={6} md={4}>
      <Thumbnail src="/images/images.jpeg" alt="242x200">
        <h3>Gestion des Utilisateurs</h3>
      
        <p>
          <Button bsStyle="primary" href={'AccountManagement'}>Acceder</Button>&nbsp;
        
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="/images/images2.jpeg" alt="242x200">
        <h3>Gestion des Profils</h3>
        
        <p>
          <Button bsStyle="primary" href={'ProfileManagement'}>Acceder</Button>&nbsp;
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="/images/images3.png" alt="242x200">
        <h3>Gestion des taches</h3>
        <p></p>
        <p>
           <Button bsStyle="primary"  href={'TaskManagement'}>Acceder</Button>&nbsp;
        </p>
      </Thumbnail>
    </Col>
    </Row>
  </Grid>



  )




}




});
















/***************************************************************************************************/
/*                                                                                                 */
/*  Register widgets + exports                                                                     */
/*                                                                                                 */
/***************************************************************************************************/

WidgetManager.registerWidget("ProfileCreate", {
    component:  ProfileCreateWidget,
     config: [
    ]
}
);

WidgetManager.registerWidget("ProfileUpdate", {
    component:  ProfileUpdateWidget,
     config: [
    ]
}
);

WidgetManager.registerWidget("ProfileView", {
    component:  ProfileViewWidget,
     config: [
    ]
}
);

WidgetManager.registerWidget("ProfileManagement", {
    component:  ProfileManagementWidget,
     config: [
    ]
}
);
WidgetManager.registerWidget("ProfileSelect", {
    component: ProfileSelectWidget ,
 config: [
    ]
}
);

WidgetManager.registerWidget("TaskCreate", {
    component: TaskCreateWidget ,
 config: [
    ]
}
);
  
 WidgetManager.registerWidget("AdminInterface", {
    component: AdminInterfaceWidget ,
 config: [
    ]
}
);

module.exports  = { ProfileCreateWidget,
  ProfileUpdateWidget,
  ProfileViewWidget, 
  ProfileSelectWidget,
  ProfileManagementWidget,
  AdminInterfaceWidget,
  TaskCreateWidget
} ;