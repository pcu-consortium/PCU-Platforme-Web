import WidgetManager from '../widget-manager';
import Router from 'react-router';
import {Tab, Tabs, FormControl, Row, Col, Grid, Input, Table, thead, tbody, tr, td, th, ControlLabel, DropdownButton, MenuItem, ButtonGroup, FormGroup,Form, Radio} from 'react-bootstrap';
import { LayoutMixin } from 'widgets/core/cms';
import WidgetMixin from 'widgets/widget-mixin';
import Select from 'react-select';
import './MultiSelectblue.css';
import './bootstrap-theme.css';


import {UserProfile,UserInfo,UserProfileWidget} from '../users/widget-user.jsx';
import DatePicker from 'react-datepicker';
var moment = require('moment');

import 'react-datepicker/dist/react-datepicker.css';

var roleoptions = [
    { value: 'admin', label: 'admin' },
    { value: 'agora', label: 'agora' },
    { value: 'all', label: 'all' },
    { value: 'pending', label: 'pending' },
    { value: 'other', label: 'other' }
];

var arr=[{user:'user1',password:'password',email:'user1@armadillo.fr',profile:'admin',id:'1'},
         {user:'user2',password:'password',email:'user2@armadillo.fr',profile:'agora',id:'2'},
         {user:'user3',password:'password',email:'user3@armadillo.fr',profile:'all',id:'3'}];
var role=[{role:'Administrateur',data:'all', right: 'all',roleid :'1'}];

var rightoptions = [
    { value: 'consulter', label: 'consulter' },
    { value: 'rechercher', label: 'rechercher' },
    { value: 'all', label: 'all' },
    { value: 'modifier', label: 'modifier' },
    { value: 'créer', label: 'créer' }
];


/***********************************************************************************************/
/* AccountSignup : Création d'un compte utilisateur                                            */
/***********************************************************************************************/


var AccountSignupWidget= React.createClass({
  mixins: [LayoutMixin],
  getInitialState(){
  
   return {
     api:'',
     startDate: moment(),
     saveduser: {},
     sizelogin: 0,
     userdata: [],
     title:[],
     input:'',
    
   };
 },


sendemail() {
 /*var transporter = nodemailer.createTransport({
    service: 'mail.armadillo.fr',
    auth: {
        user: 'florent@armadillo.fr',
        pass: 'cx1936!fj'
    }
 });

 transporter.sendMail(mailOptions, function(error,info) {
    if (error)
       console.log('error sendEmail',error);
    else
       console.log('response SendEmail',info.response);
 })*/
},

adduser() {
  var url = this.context.api ;
  var urlapi=window.location.origin.concat(url);

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ((this.state.saveduser["email"]=="")||(typeof(this.state.saveduser["email"])== 'undefined')|| (this.state.saveduser["email"]===null))
     alert("L'adresse email est obligatoire.");
  else if (!re.test(this.state.saveduser["email"]))
     alert("L'adresse email est incorrecte.");
  else if ((this.state.saveduser["name"]=="")||(typeof(this.state.saveduser["name"])== 'undefined')|| (this.state.saveduser["name"]===null))
     alert("Le champ Nom est obligatoire");
  else if ((this.state.saveduser["firstname"]=="")||(typeof(this.state.saveduser["firstname"])== 'undefined')|| (this.state.saveduser["firstname"]===null))
     alert("Le champ Prénom est obligatoire");
  else if ((this.state.saveduser["username"]=="")||(typeof(this.state.saveduser["username"])== 'undefined')|| (this.state.saveduser["username"]===null))
     alert("Le champ Identifiant est obligatoire");
  else if ((this.state.saveduser["password"]=="" )|| (typeof(this.state.saveduser["password"])== 'undefined')|| (this.state.saveduser["password"]===null))
     alert("Le champ Mot de passe est obligatoire");
  else if (this.state.saveduser["title"]=="")
     alert("Le champ Titre est obligatoire");
  else
     this.verifyLogin(this.state.saveduser["username"],urlapi);
  },

verifyLogin:function(name,urlbase) {
  var self=this;
  $.ajax({
    url:urlbase+'/user/name/'+name,
    type: "GET",
    contentType: 'application/json',
    success(data) {
      var size=data.length;
      console.log("size",size);
      //self.setState({sizelogin : size});
      if (size==0)
         self.storeuser();
      else
         alert("Le champ Identifiant a déjà été attribué à un autre compte. Veuillez donner un autre identifiant.");
      }
    });
  },

storeuser() {
  var url = this.context.api ;
  var urlapi=window.location.origin.concat(url);
  var self=this;
  self.state.saveduser["state"]="Attente";
  console.log('User',self.state.saveduser);
  $.ajax({
    url:  urlapi+'/user',
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(self.state.saveduser),
    success(data){
      console.log('saved !', data);
      //window.location.replace("ProfileSelect?id="+data);
      //  http://localhost:3000/campus/page/ProfileSelect?id=587f3a6cadd99a1f820f8a52
      }
    });
  },

additem(input,event)
   {  
    console.log(input.target.name,input.target.value);
    this.state.saveduser[input.target.name]=input.target.value;
   },

addokitem(input,event)
   {  
    if (input.target.name=="email") {
       var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (!re.test(input.target.value)) {
         alert("Adresse email incorrecte");
         }
       }
    else if ((input.target.name=="name")||(input.target.name=="firstname")||(input.target.name=="username")||(input.target.name=="title")||(input.target.name=="password")) {
       if (input.target.value=="") {
         alert("Ce champ est obligatoire");
         //document.getElementById['id'+input.target.name].focus();
         }
       }
    console.log(input.target.name,input.target.value);
    this.state.saveduser[input.target.name]=input.target.value;
    return false;
   },

  getSchema(urlbase){
    console.log('ici',urlbase);
   
    if (this.state.userdata.length > 0)
      return;
    var self=this;
    $.ajax({
      url: urlbase+'/userschema',
      type: "GET",
      contentType: 'application/json',
      success(data){
       
        self.setState({userdata: data});
      }
    });
  },
  getmultivalue(name,urlbase){
    if (this.state.title.length > 0)
      return;
    var self=this;
    $.ajax({
      url:urlbase+'/multivalue/'+name,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({title: data});
      }
    });
  },
  getUser(id,urlbase){
    $.ajax({
      url:urlbase+'/user',
      type: "GET",
      data:{id:id},
      success: function(response) {
       console.log(response);
     }, error: function(xhr) {
      //Do Something to handle error
     }
    });
  },

  onChange(event, id){
    
    event.preventDefault();
    var file=event.target.files[0];
    var reader = new FileReader();
            console.log("file:",file);
            //this.state.saveduser[id]=event.target.files[0];
           this.state.saveduser["imgurl"]=file.name;
            console.log("filename:",file.name);
            let imageFormData = new FormData();

            imageFormData.append('userPhoto', file);

            var xhr = new XMLHttpRequest();

            xhr.open('post', '/api/photo', true);

            var toto=this;
        //this.updateValue(config.key, '/files/2.png');
        
        xhr.onload = function () {
          if (this.status == 200) {            
            console.log('localfile','/files/'+this.response);
            toto.updateValue(config.key, '/files/'+this.response);
          } else {
            //reject(this.statusText);
          }
        };
    },

  handleChange: function(date) {
    var self=this;

    var dateaux=moment(date).format('YYYY-MM-DD');
     console.log("dateAfter",dateaux);
     self.state.saveduser["birthdate"]=moment(date).format('YYYY-MM-DD');
     self.setState({ startDate: date });
  },

 validateEmail: function (value) {
   
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var res= re.test(value);
    alert(res);
  },

  render() {
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    console.log('location',urlapi);
    
    this.getSchema(urlapi);
    this.getmultivalue("title",urlapi);
    var self=this;
    var userdata=self.state.userdata;
    console.log("Schema",userdata);
    var title=self.state.title;
    var divstyle={backgroundColor: '#F2F2F2'};
    var labelstyle={ color:"#6E6E6E"};
    return(
      <div>
      <Tabs defaultActiveKey={1} bsStyle={'pills'}>
        <Tab eventKey={1} title="Informations personnelles">
          {
          userdata.map(
            function(item) {
              if ((item.id == "title")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 12}}>
                         <Col xs={4}>
                           <h6 style={labelstyle} >{item.val}</h6>
                         </Col>
                        <Col xs={4}>
                          <select id="id{item.id}" style={{ width: 250 }}   onChange={self.addokitem}   name={item.id} >
                             {title.map((i) => {
                               return <option value={i} key={i}>{i}</option>;
                               }
                             )}
                          </select>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              else if (item.val == "imgurl") {
                /*   return(
                <div>
                 <Container>
                      <Row  style={{marginBottom: 12}}>
                          <Col xs={4}>
                               <h6 style={labelstyle} >{item.val}</h6>
                          </Col>
                          <Col xs={4}>
                              <Input type="file"   onChange={self.onChange} style={{width: '100%'}}  name={item.id}/> 
                          </Col>
                      </Row>
                 </Container>
                </div>
                )*/
                }
              else if (item.id=="birthdate") {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                          <h6>{item.val}</h6>
                        </Col>
                        <Col >
                          <DatePicker id="id{item.id}" selected={self.state.startDate} onChange={self.handleChange} peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select" name={item.id} /> 
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              else if((item.id=="name") || (item.id=="firstname") || (item.id=="email")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                               <h6>{item.val} **</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text" onBlur={self.addokitem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              else if ((item.id == "address")||(item.id == "country")||(item.id == "phone")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                            <h6>{item.val}</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text" onBlur={self.additem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              }   
            )
          }
        </Tab>
        <Tab eventKey={2} title="Informations professionnelles">
          {
          userdata.map(
            function(item) {
              if ((item.id == "fonction")||(item.id == "appartenance")||(item.id == "comment")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                            <h6>{item.val}</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text"   onBlur={self.additem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }           
              }   
            )
          }
        </Tab>
        <Tab eventKey={3} title="Identification">
          {
          userdata.map(
            function(item) {
              if (item.id == "username") {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                               <h6>{item.val} **</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text" onBlur={self.addokitem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }           
              else if (item.id == "password") {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                             <h6 style={labelstyle}>{item.val} **</h6>
                          </Col>
                          <Col xs={6}>
                            <input id="id{item.id}" type="password"  onBlur={self.addokitem} pattern=".{5,10}" required title="5 to 10 characters"  name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              }   
            )
          }
        </Tab>
      </Tabs>
      <p></p>
      <h8>** champs obligatoires  </h8> 
      <p></p> 
      <Button onClick={ self. adduser} > Sauvegarder </Button> 
      </div>
    )
  }
});

/***********************************************************************************************/
/* AccountManagement : Gestion des comptes utilisateur                                            */
/***********************************************************************************************/



var AccountManagementWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
    getInitialState(){
    return {
      userdata: arr,
      userlist:[],
      currentuser:arr[0],
      values: [],
    };
  },

  adduser(){
    var temparr=[];
    for (var i = 0; i< this.state.userlist.length ; i ++) {
      temparr.push(this.state.userlist[i]);}
    temparr.push({username:'', password:'', email:'', state:'En attente', profiles:'', tempprofiles:[]});
    this.setState({userlist: temparr});
  },

 getUserList(urlapi){
  console.log("Etatinit",this.state.userlist);
    if (this.state.userlist.length > 0)
     {
      return ;
    }
    
    var self=this;
    $.ajax({
      url:  urlapi+'/usersList',
      type: "GET",
      contentType: 'application/json',
      success(data) {
           self.setState({userlist: data});
      }
    });
   },

storenewuser(idx) {
  var url = this.context.api ;
  var urlapi=window.location.origin.concat(url);
  var self=this;
   self.state.userlist[idx].state="Attente";
     self.state.userlist[idx].tempprofiles="";
  console.log('User',self.state.userlist[idx]);
  $.ajax({
    url:  urlapi+'/user',
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(  self.state.userlist[idx]),
    success(data){
      console.log('saved !', data);
      //window.location.replace("ProfileSelect?id="+data);
      //  http://localhost:3000/campus/page/ProfileSelect?id=587f3a6cadd99a1f820f8a52
      }
    });
  },




  /***/

  saveuser(idx){
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:urlapi+'/user/name/'+self.state.userlist[idx].username,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        var size=data.length;
        if (size==0)
         self.storenewuser(idx);
       else{
          // var urlapi=window.location.origin.concat(self.context.api);
          var id=(self.state.userlist[idx]._id) ? '/'+self.state.userlist[idx]._id : '';
          $.ajax({
            url:  urlapi+'/user'+id,
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(self.state.userlist[idx]),
            success(data){
              console.log('saved !', data);
            }
          });

        }


          // alert("Le champ Identifiant a déjà été attribué à un autre compte. Veuillez donner un autre identifiant.");
        }
      });
  },

 
  /***/

  namechange(event){
     console.log(event);
    this.state.userlist[parseInt(event.target.name)].username=event.target.value;
  },

  passwordchange(event){
    this.state.userlist[parseInt(event.target.name)].password=event.target.value;
    console.log(event.target.name,event.target.value);
  },
  
  statechange(event){
    this.state.userlist[parseInt(event.target.name)].state=event.target.value;
    console.log(event.target.name,event.target.value,this.state.userlist[parseInt(event.target.name)]);
  },

  emailchange(event){
    this.state.userlist[parseInt(event.target.name)].email=event.target.value;
  },

  roleselect(event,idx){
    var pos=idx.indexOf(",");   
    var id=parseInt(idx.substr(pos+1));
    var role=idx.substr(0,pos);
    var temparr=[];
    for (var i=0; i<this.state.userlist.length; i++)
      temparr.push(this.state.userlist[i]);
    temparr[id].profile=role;
    this.setState({ userlist: temparr })
  },

  removeuser(idx){
    var urlapi=window.location.origin.concat(this.context.api);
    var c=confirm('Confirmez-vous la suppression de ce compte utilisateur ?')
    var self=this;
    if (c) {
     
       var temparr=[];
            for (var i=0; i<self.state.userlist.length; i++)
            {
              if (i==idx)
                console.log("l",idx);
              else{
                  console.log("ici",i);
                temparr.push(self.state.userlist[i]);}
            }
              self.setState({ userlist: temparr })



      $.ajax({
          url:   urlapi+'/user/'+self.state.userlist[idx]._id,
          type: "DELETE",
          contentType: 'application/json',
          success(data) {
          
                      alert(data);
            }
      });







    }
  },

  renderroles() {
    return (
      <div>
          <Input type="select" placeholder="Role">
            <option value="1">admin</option>
            <option value="2">agora</option>
            <option value="3">all</option>
            <option value="4">pending</option>
          </Input>            
      </div>
    );
  },


onRadioClik(e){
console.log(e);
},

updateValue(value) {
 
  console.log('yy',value);
 
    this.setState({values: value});
},
getValue(value) {
    console.log('yyyyppp',value);

    if (!this.state.values) {
        return 'Some default text';
    }
    return this.state.values;
},


  radioClick(e){
    //console.log(e);
    //todo change state;
  },

  render() {
  var url = this.context.api ;
  var urlapi=window.location.origin.concat(url);
     this.getUserList(urlapi);
    console.log("UserList",this.state.userlist);
    var userdata=this.state.userlist;
    var self=this;
    var status=['Activé', 'Désactivé', 'Attente'];

    /*
            columns.map(function(item,idx){
          return (
            <th>{item.name}</th>
            )
        })

    */
    return (
    <div>
    <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>Nom utilisateur</th>
        <th>Mot de passe</th>
        <th>Email</th>
        <th>Status</th>
        <th>Profil en Attente</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {       
        userdata.map(
      //            <Input onChange={self.passwordchange} type="text" placeholder="Status" defaultValue={item.state} name={idx}/>
          function(item,idx){
            return(
              <tr>
                <td><Input onChange={self.namechange} type="text" placeholder="Nom" defaultValue={item.username} name={idx}/></td>
                <td><Input onChange={self.passwordchange} type="password" placeholder="password" defaultValue={item.password} name={idx}/></td>
                <td><Input onChange={self.emailchange} type="email" placeholder="Email" defaultValue={item.email} name={idx}/></td>
                <td>
                  <select style={{ width: 100 }} onChange={self.statechange} defaultValue={item.state} name={idx} >
                     {status.map((i) => {
                       return <option value={i} key={i}>{i}</option>;
                       }
                     )}
                  </select>
                </td>
                           
                
                <td>
                 <Input style={{ width: 40 }} type="text"  defaultValue={item.tempprofiles.length} name={idx}/>
                
                </td>


                <td>
                  <Button onClick= {()=>self.removeuser(idx)}>
                   Supprimer
                  </Button>
                
                  <Button onClick= {()=>self.saveuser(idx)}>
                   Enregistrer
                  </Button>
                
                  <Button href={'UserUpdate?id='+item._id} >
                   Modifier
                  </Button>
                </td>
              </tr>
            )
          }
        )
      }
    </tbody>
    </Table>
    <button onClick= {self.adduser}>
      Nouvel Utilisateur
    </button>
    </div>     
    );
  }
});





/***********************************************************************************************/
/* UserView : Visualisation des caractéristiques d'un utilisateur                              */
/***********************************************************************************************/

var ProfileTable= React.createClass({
render()
{
var profiles=this.props.profiledata;
//Profils attribués
return(
 <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6>{this.props.titre}</h6>
            </Col>
            <Col xs={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Portail</th>
                  <th>Profil</th>
                </tr>
                </thead>
                <tbody>
                  {
                      profiles.map(
                        function(item,idx)
                        {
                          return(
                            <tr>
                              <td>{item.portail}</td>
                              <td>{item.profilename}</td>
                            </tr>
                          )
                        }
                      )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        </div>
        

)
}

});


var UserViewWidget= React.createClass({
    mixins: [LayoutMixin],

  getInitialState(){
    var url=window.location.search;
    var uid= url.substring(url.lastIndexOf('=')+1);
   
    return {
      tabsname:["Informations", "Profil", "Rôles"],
      userid:uid,
      userinfo:[],
      userdata:[],
      status:true,
    };
  },

  getSchema(){
    if (this.state.userdata.length > 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/userschema',
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({userdata: data});
        }
    });
  },

  getUser(){
    if ( Object.keys(this.state.userinfo).length> 0)
      return;
    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/user/'+this.state.userid,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({userinfo: data});
        }
    });
  },

  render() {
   
   this.getSchema();
    var userdata = this.state.userdata;
    this.getUser();
    var userinfo = this.state.userinfo;
    var profiles=[];
    Object.keys(userinfo).map(function(key,index){ 
      if (key == "profiles")
         profiles=userinfo[key]; 
    });
    var tempprofiles=[];
    Object.keys(userinfo).map(function(key,index){ 
      if (key == "tempprofiles")
         tempprofiles=userinfo[key]; 
    });
    var noupdate = this.state.status;

    var todisplay=['firstname','name','email','fonction','appartenance','username','password','title','comment','address','country','phone','birthdate','state'];

    return(
      <div>
          <div>
          <Container>
            <Row  style={{marginBottom: 8}}>
              <Col xs={4}>
                <h6><b>INFORMATIONS PERSONNELLES</b></h6>
              </Col>
              <Col xs={6}>
              </Col>
            </Row>
          </Container>
          </div>
          {
          userdata.map(
            function(item) {
              if ((item == "_id")||(item == "__v")||(item == "userid")||(item == "state")||(item == "profiles")||(item == "tempprofiles")||(item == "resetPasswordToken")||(item == "resetPasswordExpires")) {
                }
              else if((item.val == "imgurl") || (item.val == "Image de Profil")) {
               /* return(
                    <div>
                     <Container>
                          <Row  style={{marginBottom: 8}}>
                              <Col xs={4}>
                                 <h6>{item.val}</h6>
                              </Col>
                              <Col xs={6}>
                            <img src="" name="img" />
                              </Col>
                          </Row>
                      </Container>
                    </div>
                  )*/
                }
              else if((item.val == "password") || (item.val=="Mot de passe")) {
                return(
                    <div>
                     <Container>
                          <Row  style={{marginBottom: 8}}>
                              <Col xs={4}>
                                 <h6>{item.val}</h6>
                              </Col>
                              <Col xs={6}>
                            <Input type="password" pattern=".{5,10}" disabled={noupdate} name={item.id} defaultValue={userinfo[item.id]} />
                              </Col>
                          </Row>
                      </Container>
                    </div>
                  )
                }
              else if (item.id == "birthdate") {
                //<DatePicker selected={userinfo[item.id]} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name={item.id} />
                return(
                  <div>
                  <Container>
                    <Row  style={{marginBottom: 8}}>
                      <Col xs={4}>
                        <h6>{item.val}</h6>
                      </Col>
                      <Col xs={6}>
                        <Input type="text" name={item.id} disabled={noupdate} defaultValue={userinfo[item.id].substring(8,10)+'/'+userinfo[item.id].substring(5,7)+'/'+userinfo[item.id].substring(0,4)}/>
                      </Col>
                    </Row>
                  </Container>
                  </div>
                  )
                }           
              else {
                return(
                  <div>
                  <Container>
                    <Row  style={{marginBottom: 8}}>
                      <Col xs={4}>
                        <h6>{item.val}</h6>
                      </Col>
                      <Col xs={6}>
                        <Input type="text" name={item.id} disabled={noupdate} defaultValue={userinfo[item.id]} />
                      </Col>
                    </Row>
                  </Container>
                  </div>
                  )
                }           
              }   
            )
          }
        <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6><b>PROFILS</b></h6>
            </Col>
            <Col xs={6}>
            </Col>
          </Row>
        </Container>
        </div>
        
        <ProfileTable  profiledata={profiles} titre="Profils attribués" /> 
        <ProfileTable  profiledata={tempprofiles} titre="Profils demandés" /> 
       <Button href= {'AccountManagement'}>
         Modifier
       </Button>
      </div>
      )
  }
});


/***********************************************************************************************/
/* UserUpdate : Modification des caractéristiques d'un utilisateur                              */
/***********************************************************************************************/
/***********************************************************************************************/
/* UserUpdate : Modification d'un compte utilisateur                                        */
/***********************************************************************************************/

var ProfilesTable= React.createClass({


getInitialState(){
  return {
     CurrentProfil:[],
     SavedProfil:this.props.profiledata,
     NewProfil:[],
     userid:this.props.userid,
     saveduser:{}
   }},


saveprofile() {
  
  var url = this.props.url ;
  var urlapi=window.location.origin.concat(url);
    var self=this;
  var profilelist=self.props.listprofile;
  var type=self.props.profiletype;

  if (type== "temprofiles"  ){
      var aux=[];
   aux=self.state.NewProfil;
   var a =self.props.profiledata;
   var b=self.state.CurrentProfil;
   var c=b.concat(aux);
   if (a.length== c.length){
   b=[];
   }else{
  for (var i = 0, len = a.length; i < len; i++) {
        for (var j = 0, len = c.length; j < len; j++) {
            if ( (a[i].profilename == c[j].profilename) && (a[i].portail == c[j].portail))  {
                a.splice(i, 1);
            }
        }}
        b=a;
      }

   console.log("profiledata",a);
   console.log("CurrentProfile",b);
  self.state.saveduser["tempprofiles"]=b;
 
   self.state.saveduser["profiles"]=aux.concat(profilelist);
   //not selected profile

    console.log("tprofiles",self.state.saveduser["tempprofiles"]);
    console.log("profiles",self.state.saveduser["profiles"]);
  }else{

    
    self.state.saveduser["profiles"]= self.state.SavedProfil;
    console.log("profiles",self.state.saveduser["profiles"]);
  }
 
  console.log("User", self.state.saveduser);
  console.log("Userid", urlapi+'/user/'+self.state.userid);
  $.ajax({
    url:  urlapi+'/user/'+self.state.userid,
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(self.state.saveduser),
    success(data){
      console.log('saved !', data);
      //location.reload(); 
      
      }
    });
  },


checkprofadd(input){
    console.log("input",input);
    if (input.target.checked) {
        this.state.NewProfil.push({"profilename":input.target.value , "portail":input.target.name});
       }
    else {
       console.log("a été décoché input.target.value",input.target.value);
       var NewProfil = this.state.NewProfil;
       console.log("selectprofiles affect",NewProfil);
       NewProfil.map( function(item,index) {
         if ((item.portail==input.target.name)&&(item.profilename==input.target.value)) {
            NewProfil.splice(index,1);
            
         }
       });
       this.state.NewProfil=NewProfil;
     }
     
    console.log("SelectedProfil",this.state.NewProfil);
  },






checkprofdel(input){
  console.log("Suppression",input);
  if (input.target.checked) {
       this.state.CurrentProfil.push({"profilename":input.target.value , "portail":input.target.name});
       var savedprofiles = this.state.SavedProfil;
    savedprofiles.map( function(item,index) {
       if ((item.portail==input.target.name)&&(item.profilename==input.target.value)) {
          savedprofiles.splice(index,1);
       }
       });
     this.state.SavedProfil=savedprofiles;
    console.log("Sauver",this.state.SavedProfil);




     }
  else {
    this.state. SavedProfil.push({"profilename":input.target.value , "portail":input.target.name});
    
     var currentprofiles = this.state.CurrentProfil;
     currentprofiles.map( function(item,index) {
       if ((item.portail==input.target.name)&&(item.profilename==input.target.value)) {
          currentprofiles.splice(index,1);
       }
       });
     this.state.CurrentProfil=currentprofiles;
   }
   
},


render()
{
  console.log("okkkk");
var profiles=this.props.profiledata;
var type=this.props.profiletype;
var disabled=this.props.disabled;
var  showSave= true;
if (type== "profiles"){
  showSave= false;

}
  
var self=this;
return(
 <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6>{self.props.titre}</h6>
            </Col>
            <Col xs={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Portail</th>
                  <th>Profil</th>
                  <th width="200">Choix</th>
                 
                </tr>
                </thead>
                <tbody>
                  {
                      profiles.map(
                        function(item,idx)
                        {
                          return(
                            <tr>
                            <td>{item.portail}</td>
                              <td>{item.profilename}</td>
                              <td width="200">
                              <input type="checkbox" disabled={disabled} name={item.portail} value={item.profilename} onChange={self.checkprofdel}/> Supprimer
                              { showSave ? <input type="checkbox" disabled={disabled} name={item.portail} value={item.profilename} onChange={self.checkprofadd}/>  : null}  
                               {showSave ? <label for="checkbox_id">Valider</label> :null}
                              </td>
                              
                            </tr>
                          )
                        }
                      )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        <Button onClick={self.saveprofile}> Sauver </Button>   
        </div>
     

)
}

});

var Profiles1Table= React.createClass({


getInitialState(){
  
      return {
     SelectedProfil:[],
     userid:this.props.userid,
    saveduser:{}




      }},





saveprofile() {
   console.log("CurrentProfilici");
  var url = this.props.url ;
  console.log("url",url);
  var urlapi=window.location.origin.concat(url);
  console.log("urlapi",urlapi);
  var self=this;
  console.log("CurrentProfil",self.state.SelectedProfil);
 // self.state.saveduser["state"]="Attente";
 
   self.state.saveduser["tempprofiles"]=self.state.SelectedProfil;

  
 
 console.log("User", self.state.saveduser);
  console.log("Userid", urlapi+'/user/'+self.state.userid);
  $.ajax({
    url:  urlapi+'/user/'+self.state.userid,
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(self.state.saveduser),
    success(data){
      console.log('saved !', data);
      //window.location.replace("ProfileSelect?id="+data);
      //  http://localhost:3000/campus/page/ProfileSelect?id=587f3a6cadd99a1f820f8a52
      }
    });
  },





checkprofadd(input){
  console.log("input",input);
  if (input.target.checked) {
     console.log("a été coché input.target.value",input.target.value);
     this.state.SelectedProfil.push({"profilename":input.target.value , "portail":input.target.name});
     }
  else {
     console.log("a été décoché input.target.value",input.target.value);
     var selectprofiles = this.state.SelectedProfil;
     console.log("selectprofiles affect",selectprofiles);
     selectprofiles.map( function(item,index) {
       if ((item.portail==input.target.name)&&(item.profilename==input.target.value)) {
          selectprofiles.splice(index,1);
          console.log("selectprofiles slice",selectprofiles);
       }
     });
     this.state.SelectedProfil=selectprofiles;
   }
  // this.forceUpdate();
  console.log("SelectedProfil",this.state.SelectedProfil);
},

render()
{
var tempprofiles=this.props.tprofiledata;
var profiles=this.props.pprofiledata;
var profiledata=this.props.profiledata;
var disabled=this.props.disabled;
this.state.SelectedProfil=tempprofiles;
var self=this;
profiledata.map( function(item,idx) {
  profiles.map( function(pitem,pidx) {
    if ((pitem.portail==item.portail)&&(pitem.profilename==item.profilename))
       profiledata.splice(idx,1);
  });
});

profiledata.map( function(item,idx) {
  tempprofiles.map( function(pitem,pidx) {
    if ((pitem.portail==item.portail)&&(pitem.profilename==item.profilename))
       profiledata.splice(idx,1);
  });
});

return(
 <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6>{self.props.titre}</h6>
            </Col>
            <Col xs={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Portail</th>
                  <th>Profil</th>
                  <th width="200">Choix</th>
                </tr>
                </thead>
                <tbody>
                  {
                      profiledata.map(
                        function(item,idx)
                        {
                          return(
                            <tr>
                              <td>{item.portail}</td>
                              <td>{item.profilename}</td>
                               <td width="200"><input type="checkbox" disabled={disabled} name={item.portail} value={item.profilename} onChange={self.checkprofadd}/> Ajouter</td>
                            </tr>
                          )
                        }
                      )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
           <Button onClick={self.saveprofile}> Sauver </Button>   
        </div>
        

)
}

});


var UserUpdateWidget= React.createClass({
    mixins: [LayoutMixin],
    
  getInitialState(){
  
    var url=window.location.search;
    var uid= url.substring(url.lastIndexOf('=')+1);

    return {
      api:'',
      startDate: moment(),
      saveduser: {},
      sizelogin: 0,
      tabsname:["Informations", "Profil", "Rôles"],
      userid:uid,
      userinfo:[],
      userdata:[],
      disabled:true,
      profiledata:[],
      title:[],
      input:'',
    };
  },


  Enable(){

    this.setState( {disabled: !this.state.disabled})

  },

updateuser() {
  var url = this.context.api ;
  var urlapi=window.location.origin.concat(url);

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ((this.state.saveduser["email"]=="")||(typeof(this.state.saveduser["email"])== 'undefined')|| (this.state.saveduser["email"]===null))
     alert("L'adresse email est obligatoire.");
  else if (!re.test(this.state.saveduser["email"]))
     alert("L'adresse email est incorrecte.");
  else if ((this.state.saveduser["name"]=="")||(typeof(this.state.saveduser["name"])== 'undefined')|| (this.state.saveduser["name"]===null))
     alert("Le champ Nom est obligatoire");
  else if ((this.state.saveduser["firstname"]=="")||(typeof(this.state.saveduser["firstname"])== 'undefined')|| (this.state.saveduser["firstname"]===null))
     alert("Le champ Prénom est obligatoire");
  else if ((this.state.saveduser["username"]=="")||(typeof(this.state.saveduser["username"])== 'undefined')|| (this.state.saveduser["username"]===null))
     alert("Le champ Identifiant est obligatoire");
  else if ((this.state.saveduser["password"]=="" )|| (typeof(this.state.saveduser["password"])== 'undefined')|| (this.state.saveduser["password"]===null))
     alert("Le champ Mot de passe est obligatoire");
  else if (this.state.saveduser["title"]=="")
     alert("Le champ Titre est obligatoire");
  else
     this.verifyLogin(this.state.saveduser["username"],urlapi);
  },

verifyLogin:function(name,urlbase) {
  var self=this;
  $.ajax({
    url:urlbase+'/user/name/'+name,
    type: "GET",
    contentType: 'application/json',
    success(data) {
      var size=data.length;
      console.log("size",size);
      //self.setState({sizelogin : size});
      if (size==0)
         self.storeuser();
      else
         alert("Le champ Identifiant a déjà été attribué à un autre compte. Veuillez donner un autre identifiant.");
      }
    });
  },

storeuser() {
  var url = this.context.api ;
  var urlapi=window.location.origin.concat(url);
  var self=this;
 // self.state.saveduser["state"]="Attente";
  console.log('User',self.state.saveduser);
  $.ajax({
    url:  urlapi+'/user/'+self.state.userid,
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(self.state.saveduser),
    success(data){
      console.log('saved !', data);
      //window.location.replace("ProfileSelect?id="+data);
      //  http://localhost:3000/campus/page/ProfileSelect?id=587f3a6cadd99a1f820f8a52
      }
    });
  },

additem(input,event)
   {  
    console.log(input.target.name,input.target.value);
    this.state.saveduser[input.target.name]=input.target.value;
   },

addokitem(input,event)
   {  
    if (input.target.name=="email") {
       var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (!re.test(input.target.value)) {
         alert("Adresse email incorrecte");
         }
       }
    else if ((input.target.name=="name")||(input.target.name=="firstname")||(input.target.name=="username")||(input.target.name=="title")||(input.target.name=="password")) {
       if (input.target.value=="") {
         alert("Ce champ est obligatoire");
         //document.getElementById['id'+input.target.name].focus();
         }
       }
    console.log(input.target.name,input.target.value);
    this.state.saveduser[input.target.name]=input.target.value;
    return false;
   },

  getSchema(urlbase){
    console.log('ici',urlbase);
   
    if (this.state.userdata.length > 0)
      return;
    var self=this;
    $.ajax({
      url: urlbase+'/userschema',
      type: "GET",
      contentType: 'application/json',
      success(data){
       
        self.setState({userdata: data});
      }
    });
  },

  getmultivalue(name,urlbase){
    if (this.state.title.length > 0)
      return;
    var self=this;
    $.ajax({
      url:urlbase+'/multivalue/'+name,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({title: data});
      }
    });
  },

  getUser(id,urlbase){
    if ( Object.keys(this.state.userinfo).length> 0)
      return;

    var urlapi=window.location.origin.concat(this.context.api);
    var self=this;
    $.ajax({
      url:   urlapi+'/user/'+id,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({userinfo: data});
        }
    });
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

  onChange(event, id){
    
    event.preventDefault();
    var file=event.target.files[0];
    var reader = new FileReader();
            console.log("file:",file);
            //this.state.saveduser[id]=event.target.files[0];
           this.state.saveduser["imgurl"]=file.name;
            console.log("filename:",file.name);
            let imageFormData = new FormData();

            imageFormData.append('userPhoto', file);

            var xhr = new XMLHttpRequest();

            xhr.open('post', '/api/photo', true);

            var toto=this;
        //this.updateValue(config.key, '/files/2.png');
        
        xhr.onload = function () {
          if (this.status == 200) {            
            console.log('localfile','/files/'+this.response);
            toto.updateValue(config.key, '/files/'+this.response);
          } else {
            //reject(this.statusText);
          }
        };
    },

  handleChange: function(date) {
    var self=this;

    var dateaux=moment(date).format('YYYY-MM-DD');
     console.log("dateAfter",dateaux);
     self.state.saveduser["birthdate"]=moment(date).format('YYYY-MM-DD');
     self.setState({ startDate: date });
  },

 validateEmail: function (value) {
   
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var res= re.test(value);
    alert(res);
  },

  render() {

    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    
    this.getSchema(urlapi);
    var userdata=this.state.userdata;

    this.getUser(this.state.userid,urlapi);
    var userinfo = this.state.userinfo;

    this.getProfileList();
    var profiledata=this.state.profiledata;

    var profiles=[];
    Object.keys(userinfo).map(function(key,index){ 
      if (key == "profiles")
         profiles=userinfo[key]; 
    });

    var tempprofiles=[];
    Object.keys(userinfo).map(function(key,index){ 
      if (key == "tempprofiles")
         tempprofiles=userinfo[key]; 
    });

    this.getmultivalue("title",urlapi);

    var self=this;
    var title=self.state.title;
    var divstyle={backgroundColor: '#F2F2F2'};
    var labelstyle={ color:"#6E6E6E"};

    var disabled = this.state.disabled;

    return(
      <div>
      <Tabs defaultActiveKey={1} bsStyle={'pills'}>
        <Tab eventKey={1} title="Informations personnelles">
          {
          userdata.map(
            function(item) {
              if ((item.id == "title")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 12}}>
                         <Col xs={4}>
                           <h6 style={labelstyle} >{item.val}</h6>
                         </Col>
                        <Col xs={4}>
                          <select id="id{item.id}" style={{ width: 250 }} disabled={disabled}  onChange={self.addokitem}   name={item.id} >
                             {title.map((i) => {
                               return <option value={i} key={i}>{i}</option>;
                               }
                             )}
                          </select>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              else if (item.val == "imgurl") {
                /*   return(
                <div>
                 <Container>
                      <Row  style={{marginBottom: 12}}>
                          <Col xs={4}>
                               <h6 style={labelstyle} >{item.val}</h6>
                          </Col>
                          <Col xs={4}>
                              <Input type="file"   onChange={self.onChange} style={{width: '100%'}}  name={item.id}/> 
                          </Col>
                      </Row>
                 </Container>
                </div>
                )*/
                }
              else if (item.id=="birthdate") {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                        <Col xs={4}>
                          <h6>{item.val}</h6>
                        </Col>
                        <Col >
                          <DatePicker id="id{item.id}" disabled={disabled} value={userinfo[item.id]} selected={self.state.startDate} onChange={self.handleChange} peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select" name={item.id} /> 
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              else if((item.id=="name") || (item.id=="firstname") || (item.id=="email")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                               <h6>{item.val} **</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text" disabled={disabled} value={userinfo[item.id]} onBlur={self.addokitem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              else if ((item.id == "address")||(item.id == "country")||(item.id == "phone")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                            <h6>{item.val}</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text" disabled={disabled} value={userinfo[item.id]} onBlur={self.additem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              }   
            )
          }
        </Tab>
        <Tab eventKey={2} title="Informations professionnelles">
          {
          userdata.map(
            function(item) {
              if ((item.id == "fonction")||(item.id == "appartenance")||(item.id == "comment")) {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                            <h6>{item.val}</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text" disabled={disabled} value={userinfo[item.id]} onBlur={self.additem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }           
              }   
            )
          }
        </Tab>
        <Tab eventKey={3} title="Identification">
          {
          userdata.map(
            function(item) {
              if (item.id == "username") {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                               <h6>{item.val} **</h6>
                          </Col>
                          <Col xs={6}>
                             <Input id="id{item.id}" type="text" disabled={disabled} value={userinfo[item.id]} onBlur={self.addokitem} name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }           
              else if (item.id == "password") {
                return(
                  <div>
                    <Container>
                      <Row  style={{marginBottom: 8}}>
                          <Col xs={4}>
                             <h6 style={labelstyle}>{item.val} **</h6>
                          </Col>
                          <Col xs={6}>
                            <input id="id{item.id}" type="password" disabled={disabled} value={userinfo[item.id]} onBlur={self.addokitem} pattern=".{5,10}" required title="5 to 10 characters"  name={item.id}/>
                          </Col>
                      </Row>
                    </Container>
                  </div>
                  )
                }
              }   
            )
          }
        </Tab>
        <Tab eventKey={4} title="Rôles">
            <ProfilesTable  url= {self.context.api} userid={self.state.userid}  profiletype="profiles" profiledata={profiles} listprofile={profiles} disabled={disabled} titre="Profils validés" /> 
            <ProfilesTable  url= {self.context.api}  userid={self.state.userid} profiletype="temprofiles" profiledata={tempprofiles} listprofile={profiles} disabled={disabled} titre="Profils demandés" /> 
            <Profiles1Table  url= {self.context.api} userid={self.state.userid} profiledata={ profiledata} disabled={disabled} pprofiledata={profiles} tprofiledata={profiles} titre="Liste des Profils existants" /> 
        </Tab>
        
      </Tabs>
      <p></p>
      <h8>** champs obligatoires  </h8> 
      <p></p> 
      <Button href= {'AccountManagement'}>
         Retour
      </Button>
       
      { !self.state.disabled ?  <Button onClick={self.adduser}> Sauver </Button>: <Button onClick={self.Enable}> Modifier </Button>} 
      </div>
    )
  }
});



/***************************************************************************************************/
/*                                                                                                 */
/*  UserProfileSelectAdmin                                                                    */
/*                                                                                                 */
/***************************************************************************************************/

var ProfileTableCheckbox= React.createClass({



  getInitialState(){
 
    return {
    SelectedProfil:[]
    };
  },





checkprofadd(input){
 
    if (input.target.checked) {
      
       this.state.SelectedProfil.push({"profilename":input.target.value , "portail":input.target.name});
       }
    else {
      
       var selectprofiles = this.state.SelectedProfil;
       ;
       selectprofiles.map( function(item,index) {
         if ((item.portail==input.target.name)&&(item.profilename==input.target.value)) {
            selectprofiles.splice(index,1);
            
         }
       });
       this.state.SelectedProfil=selectprofiles;
     }
    
  },





render()
{
var profiles=this.props.profiledata;
//Profils attribués
return(
 <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6>{this.props.titre}</h6>
            </Col>
            <Col xs={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Portail</th>
                  <th>Profil</th>
                </tr>
                </thead>
                <tbody>
                  {
                      profiles.map(
                        function(item,idx)
                        {
                          return(
                            <tr>
                              tr>
                             <td><input type="checkbox" name={item.portail} value={item.profilename} onChange={self.checkprofadd}/> Autoriser</td>
                              <td>{item.portail}</td>
                              <td>{item.profilename}</td>
                            </tr>
                          )
                        }
                      )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        </div>
        

)
}

});








var UserProfileSelectAdminWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  getInitialState(){
    var url=window.location.search;
    var uid= url.substring(url.lastIndexOf('=')+1);
    return {
      userid:uid,
      userinfo:[],
      profiledata: [],
      CurrentProfil: [],
      SelectedProfil: [],
      portail:[]
    };
  },

  getUser(){
    if ( Object.keys(this.state.userinfo).length> 0)
      return;
    var self=this;
    $.ajax({
      url:  'http://localhost:3000/campus/api/user/'+this.state.userid,
      type: "GET",
      contentType: 'application/json',
      success(data) {
        self.setState({userinfo: data});
        }
    });
  },


  checkprofadd(input){
    console.log("input",input);
    if (input.target.checked) {
       console.log("a été coché input.target.value",input.target.value);
       this.state.SelectedProfil.push({"profilename":input.target.value , "portail":input.target.name});
       }
    else {
       console.log("a été décoché input.target.value",input.target.value);
       var selectprofiles = this.state.SelectedProfil;
       console.log("selectprofiles affect",selectprofiles);
       selectprofiles.map( function(item,index) {
         if ((item.portail==input.target.name)&&(item.profilename==input.target.value)) {
            selectprofiles.splice(index,1);
            console.log("selectprofiles slice",selectprofiles);
         }
       });
       this.state.SelectedProfil=selectprofiles;
     }
     this.forceUpdate();
    console.log("SelectedProfil",this.state.SelectedProfil);
  },

  checkprofdel(input){
    console.log("input",input);
    if (input.target.checked) {
       console.log("a été coché input.target.value",input.target.value);
       this.state.CurrentProfil.push({"profilename":input.target.value , "portail":input.target.name});
       }
    else {
       console.log("a été décoché input.target.value",input.target.value);
       var currentprofiles = this.state.CurrentProfil;
       currentprofiles.map( function(item,index) {
         if ((item.portail==input.target.name)&&(item.profilename==input.target.value)) {
            currentprofiles.splice(index,1);
         }
         });
       this.state.CurrentProfil=currentprofiles;
     }
     console.log("CurrentProfil",this.state.CurrentProfil);
  },

SaveProfile(){
  var profiles=[];
  var tempprofiles=[];
  var userinfo=this.state.userinfo;
  Object.keys(userinfo).map(function(key,index) { 
    if (key == "profiles")
       profiles=userinfo[key]; 
    if (key == "tempprofiles")
       tempprofiles=userinfo[key]; 
    }
  );
  var selectprofiles = this.state.SelectedProfil;
  var currentprofiles = this.state.CurrentProfil;
  console.log("profiles",profiles);
  console.log("tempprofiles",tempprofiles);
  console.log("selectprofiles",selectprofiles);
  console.log("currentprofiles",currentprofiles);
  currentprofiles.map( function(item,idx) {
    profiles.map( function(pitem,pidx) {
      if ((pitem.portail==item.portail)&&(pitem.profilename==item.profilename))
         profiles.splice(pidx,1);
    });
  });
  console.log("profiles",profiles);
  var isnew=true;
  selectprofiles.map( function(item,idx) {
    isnew=true;
    profiles.map( function(pitem,pidx) {
      if ((pitem.portail==item.portail)&&(pitem.profilename==item.profilename))
         isnew=false;
    });
    if (isnew==true)
       profiles.push({"portail":item.portail, "profilename":item.profilename});
  });
  selectprofiles.map( function(item,idx) {
    tempprofiles.map( function(pitem,pidx) {
      if ((pitem.portail==item.portail)&&(pitem.profilename==item.profilename))
         tempprofiles.splice(pidx,1);
    });
  });

  var profile={};
  profile["profiles"]=profiles;
  profile["tempprofiles"]=tempprofiles;
  console.log("profile",profile);
  var url = this.context.api ; 
  var urlapi=window.location.origin.concat(url);
  var id= window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape('id').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");

  $.ajax({
    url:  urlapi+'/user/'+id,
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(profile),
    success(data){
    console.log('saved !', data);
    }
  });

},


render() {
    this.getUser();
    var userinfo = this.state.userinfo;
    console.log("userinfo",userinfo);
    var profiles=[];
    var tempprofiles=[];
    Object.keys(userinfo).map(function(key,index) { 
      if (key == "profiles")
         profiles=userinfo[key]; 
      if (key == "tempprofiles")
         tempprofiles=userinfo[key]; 
      }
    );
    console.log("profiles",profiles);
    console.log("tempprofiles",tempprofiles);
    var self=this;
    return(
      <div>
        <form>
        <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6><b>PROFILS</b></h6>
            </Col>
            <Col xs={6}>
            </Col>
          </Row>
        </Container>
        </div>
        <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6>Profils actuels</h6>
            </Col>
            <Col xs={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Choix</th>
                  <th>Portail</th>
                  <th>Profil</th>
                </tr>
                </thead>
                <tbody>
                  {
                      profiles.map(
                        function(item,idx)
                        {
                          return(
                            <tr>
                              <td><input type="checkbox" name={item.portail} value={item.profilename} onChange={self.checkprofdel}/> Retirer</td>
                              <td>{item.portail}</td>
                              <td>{item.profilename}</td>
                            </tr>
                          )
                        }
                      )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        </div>
        <div>
        <Container>
          <Row  style={{marginBottom: 8}}>
            <Col xs={4}>
              <h6>Profils demandés</h6>
            </Col>
            <Col xs={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Choix</th>
                  <th>Portail</th>
                  <th>Profil</th>
                </tr>
                </thead>
                <tbody>
                  {
                  tempprofiles.map(
                    function(item,idx) {
                      return(
                        <tr>
                          <td><input type="checkbox" name={item.portail} value={item.profilename} onChange={self.checkprofadd}/> Autoriser</td>
                          <td>{item.portail}</td>
                          <td>{item.profilename}</td>
                        </tr>
                      )
                    }
                  )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        </div>
        <Button href= {'AccountManagement'}>
          Retour
        </Button>
        <Button onClick={self.SaveProfile}>
          Valider
        </Button>
        </form>
      </div>
      )
  }
});



    /*
    //profil list
    this.getProfileList();
    var profiledata=this.state.profiledata;
    this.getportailvalue();
    var portaildata=this.state.portail;
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
           return(
             <th>{item}</th>
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


/***********************************************************************************************/
























WidgetManager.registerWidget("AccountSignup", {
    component: AccountSignupWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("AccountManagement", {
    component: AccountManagementWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("UserView", {
    component:  UserViewWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("UserUpdate", {
    component:  UserUpdateWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("UserProfileSelectAdmin", {
    component:  UserProfileSelectAdminWidget,
    config: [
    ]
}
);
module.exports  = { 
  AccountManagementWidget,
  AccountSignupWidget,
  UserViewWidget,
  UserProfileSelectAdminWidget,
  UserUpdateWidget
} ;




