
import WidgetManager from 'widgets/widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { LayoutMixin } from 'widgets/core/cms';
import { renderWidget } from 'widgets/core/cms';
import { Tab, Tabs, FormControl, CheckBox, Row, Col, Grid, Input, Table, thead, tbody, tr, td, th, ControlLabel, DropdownButton, MenuItem, ButtonGroup, FormGroup,Form, Radio, Thumbnail} from 'react-bootstrap';
import Select from 'react-select';
//var View  = require('./view.js');
//var Query = require('./query.js');
//var Graph = require('./graph.js');

// fj start
var dimensions = ['text','keyword','date','boolean','ip'];
var measures = ['integer','long','double','float'];

var PieChart = require('widgets/d3js/pie-chart');
// fj end

/***************************************************************************************************/
/*                                                                                                 */
/*  PCULdapLogin                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/



var PCULdapLoginWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
 
  getInitialState(){
    return {
      login:'',
      password:'',
      result:''
      };
  },

  setLogin(event){
    this.setState({login:event.target.value});
    },

  setPassword(event){
    this.setState({password:event.target.value});
    },
  
  checkLdapLogin(){
    var login = this.state.login;
    var password = this.state.password;
    var url = this.context.api;
    var currentpage = window.location.href;
    var nextpage = currentpage.replace('PCULdapLogin','PCUMenu');
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url: urlapi+'/ldap/checklogin/'+login+'/'+password,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({result: data});
        if (data=="koid")
          alert("Votre identifiant est errôné ["+data+"]");
        else if (data=="kopw")
          alert("Votre mot de passe est errôné ["+data+"]");
        else if (data=="ok") {
          alert("Votre compte est autorisé. Bienvenue ["+data+"]");
          window.location=nextpage;
        }
        else
          alert("Vous n'avez pas pu être identifier ["+data+"]");
        }
       });
    },
    
  render() {
    var self=this;
    return (
      <Grid>
          <Row>
            <Col>
              <p>Afin d'accéder aux différentes fonctionnalités qui vous sont attribuées, veuillez vous identifier :</p>
              Identifiant: <Input style={{width: 300}} type="text" name="id" onChange={self.setLogin}/>
              Mot de passe: <Input style={{width: 300}} type="password" name="pw" onChange={self.setPassword}/>
              <Button bsStyle="primary" onClick={self.checkLdapLogin}>Accéder</Button>
            </Col>
          </Row>
        </Grid>
    )
  }

});

/***************************************************************************************************/
/*                                                                                                 */
/*  PCUMenu                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/

var PCUMenuWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
 
render() {
  
  return (
    <div>
      <Table width="100%">
        <tr>
          <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
            <a bsStyle="primary" href={'PCUMakeQuery'} target="makej">Requête JSON</a><br></br>
            <a bsStyle="primary" href={'PCUEditQuery'} target="makea">Requête assistée</a>
          </td>
          <td style={{width: '25%', textAlign: 'center', verticalAlign: 'middle'}}><img src="/images/write.png" height="80" width="80"/><h5>Construire</h5></td>
          <td style={{width: '25%', textAlign: 'center', verticalAlign: 'middle'}}><img src="/images/search.png" height="80" width="80"/><h5>Rechercher</h5></td>
          <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
            <a bsStyle="primary" href={'PCUExpandQuery'} target="makee">Rechercher par expansion</a><br></br>
            <a bsStyle="primary" href={'PCUFeelQuery'} target="makef">Rechercher par sentiments</a>
          </td>
        </tr>
      </Table>
      <Table width="100%">
        <tr>
          <td style={{colSpans: '4', width: '100%', textAlign: 'center', verticalAlign: 'middle'}}><img src="/images/pcu_logo.png"/></td>
        </tr>
      </Table>
      <Table width="100%">
        <tr>
         <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
            <a bsStyle="primary" href={'PCUManageQueries'} target="manageR">Mes recherches</a><br></br>
            <a bsStyle="primary" href={'PCUManageGraphics'} target="manageG">Mes graphiques</a><br></br>
            <a bsStyle="primary" href={'PCUManageViews'} target="manageV">Mes présentations</a>
          </td>
          <td style={{width: '25%', textAlign: 'center', verticalAlign: 'middle'}}><img src="/images/classer.png" height="80" width="80"/><h5>Gérer</h5></td>
          <td style={{width: '25%', textAlign: 'center', verticalAlign: 'middle'}}><img src="/images/chart.png" height="80" width="80"/><h5>Afficher</h5></td>
          <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
            <a bsStyle="primary" href={'PCUManageQueries'} target="manageR">Mes recherches</a><br></br>
            <a bsStyle="primary" href={'PCUManageGraphics'} target="manageG">Mes graphiques</a><br></br>
            <a bsStyle="primary" href={'PCUManageViews'} target="manageV">Mes présentations</a>
          </td>
        </tr>
      </Table>
    </div>
    )
  } 

});



/*<table width="100%">
<tr>
  <td colSpan="4" style={{width: '100%', textAlign: 'center', verticalAlign: 'middle'}}><img src="/images/config.png" height="80" width="80"/></td>
</tr>
<tr>
  <td colSpan="4" style={{width: '100%', textAlign: 'center', verticalAlign: 'middle'}}><h5>Services</h5></td>
</tr>
<tr>
  <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
    <a bsStyle="primary" href={'Dashboard'} target="dashboard">API REST Vue 360</a><br></br>
    <a bsStyle="primary" href={'Dashboard'} target="dashboard">API REST Page par bloc</a><br></br>
  </td>
  <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
    <a bsStyle="primary" href={'Dashboard'} target="dashboard">API REST Recherche</a><br></br>
    <a bsStyle="primary" href={'Dashboard'} target="dashboard">API REST Expansion</a><br></br>
  </td>
  <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
    <a bsStyle="primary" href={'Dashboard'} target="dashboard">API REST Sentiments</a><br></br>
    <a bsStyle="primary" href={'Dashboard'} target="dashboard">API REST Recommandations</a><br></br>
  </td>
  <td style={{paddingLeft1: '40px', width: '25%', textAlign: 'left', verticalAlign: 'top'}}>
    <a bsStyle="primary" href={'Dashboard'} target="dashboard">API REST Ldap</a><br></br>
  </td>
</tr>
</table>*/

//<Image src="/images/chart.png" height="128" width="128"/>
//<Image src="/images/config.png" height="128" width="128"/>

/*
*/

/***************************************************************************************************/
/*                                                                                                 */
/*  PCUFeelQuery                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/

var PCUFeelQueryWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  getInitialState(){
    return {
      text:'I love this shirt !\nHowever the hat is ugly ...',
      phrases: [],
      nbphrases: 0,
      phraseschecked: [],
      sentiments:[],
      nbsentiments:0,
      sentimentschecked:[],
      dataout:{}
    };
  },

  updateText(event){
    this.setState({text: event.target.value, phrases: [], nbphrases: 0, sentiments: [], nbsentiments: 0, dataout: {}});
    console.log('text',event.target.value);
    },

  getPhrases(){

    var data=[];
    var phrase='';
    var id=0;
    var text=this.state.text;
    var start=0;
    var pos = text.indexOf('\n');
    while ( pos != -1 ) {
      phrase=text.slice(start,pos);
      if (phrase!='')
        data.push({"id": id, "phrase": phrase, "isChecked": false});
      start=pos+1;
      id++;
      pos = text.indexOf('\n',start);
      }
    data.push({"id":id, "phrase": text.slice(start), "isChecked": false});

    this.setState({phrases: data, nbphrases: data.length , sentiments: [], nbsentiments: 0, dataout: {}});
    
    },

  getSentiments(){

    var tmp=[]; 
    var phrases = this.state.phrases;
    for (var i = 0; i < phrases.length ; i ++)
      if (phrases[i].isChecked)
        tmp.push(phrases[i].phrase);
        
    var datain = {
      "documents" : tmp,
      "tokenize" : 1,
      "lang" : "en",
      "domain" : "fashion",
      "coalesce" : true,
      "splitsentence" : true,
      "prettyprint" : true,
      "classification" : {
        "domain" : "fashion",
        "generalmodels" : [ "sentiment-doc" ],
        "localmodels" : [ "sentiment-sen" ],
        "useProbas" : true
      },
      "prettyPrintOut" : true,
      "expanded" : true
    }
    
    console.log('datain',JSON.stringify(datain));

    var url = this.context.api ;
    var urlapi = window.location.origin.concat(url);
    var self = this;
    $.ajax({
      url: urlapi+'/sentiment-query-api-arma/sentiments',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(datain),
        success(data){
          var dataout = data;
          console.log('data',JSON.stringify(data));
      
          /*
          {
            "sentiments" : [ {
              "sentiment" : {
                "tokens" : [ "I", "love", "this", "shirt", "!" ],
                "sentences-sentiment" : {
                  "sentiment" : "positif",
                  "rating" : 100.0
                },
                "document-sentiment" : {
                  "sentiment" : "positif",
                  "rating" : 100.0
                }
              }
            }, {
              "sentiment" : {
                "tokens" : [ "However", "the", "hat", "is", "ugly", "..." ],
                "sentences-sentiment" : {
                  "sentiment" : "negatif",
                  "rating" : 98.1
                },
                "document-sentiment" : {
                  "sentiment" : "negatif",
                  "rating" : 67.7
                }
              }
            } ]
          }
          */

          var tmp1=[];
          var sentiments=[];
          var sentiment={};
          var total=0;
          var stats=[];

          for (var i = 0; i < dataout.sentiments.length ; i ++) {
            total++;
            sentiment = dataout.sentiments[i].sentiment;
            tmp1.push({"id": i,
                "phrase": tmp[i],
                "tokens": sentiment.tokens.join(' ; '),
                "sentences-sentiment": sentiment.sentences-sentiment.sentiment,
                "sentencessentimentrating": sentiment.sentences-sentiment.rating,
                "documentsentiment": sentiment.document-sentiment.sentiment,
                "documentsentimentrating": sentiment.document-sentiment.rating,
                isChecked: false});
            }
          self.setState({sentiments: tmp1.concat(), nbsentiments: total ,dataout: {}});
          console.log('sentiments',self.state.sentiments);
          //console.log('stats',stats);
        }
        });
    },
    
  checkPhrases(id,event){
    var phrases=this.state.phrases;
    for (var i = 0; i < phrases.length ; i ++)
        if (phrases[i].id == id) {
          phrases[i].isChecked = !phrases[i].isChecked;
        }
    this.setState({ phrases: phrases});
    },

  checkSentiments(id,event){
    var sentiments=this.state.sentiments;
    for (var i = 0; i < sentiments.length ; i ++)
        if (sentiments[i].id == id) {
          sentiments[i].isChecked = !sentiments[i].isChecked;
        }
    this.setState({ sentiments: sentiments});
    },
  
  render(){
    var urlapi=this.props.api;

    var text = this.state.text;
    console.log('text',text);

    var phrases = this.state.phrases;
    var nbphrases = this.state.nbphrases;
    console.log('phrases',phrases);

    var sentiments = this.state.sentiments;
    var nbsentiments = this.state.nbsentiments;
    console.log('sentiments',this.state.sentiments);


    var self=this;

    return (
      <div style={{overflow: 'auto'}}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Texte</span>
        <Table style={{ border: '0px solid #000' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Input style={{height: 200, border: 'solid 1px'}} type="textarea" name="text" onChange={self.updateText} value={text}/>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'center', border: '0px solid #000'}}>
                  <Button bsStyle="primary" onClick={self.getPhrases}>Extraction des phrases</Button>
              </td> 
            </tr>
          </tbody>
        </Table>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Phrases extraites: {nbphrases}</span>
        <Table style={{ border: '0px solid #000'}}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Table bordered condensed hover>
                  <tbody>
                  <tr>
                    <th colSpan='2' style={{ backgroundColor: '#ccc' }}>Phrase</th>
                  </tr>
                  {phrases.map((i) => {
                      return <ListSentiPhrases data={i} onChecked={self.checkPhrases}/>; 
                    }
                  )}
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'center', border: '0px solid #000'}}>
                  <Button bsStyle="primary" onClick={self.getSentiments}>Recherche des sentiments</Button>
              </td> 
            </tr>
          </tbody>
        </Table>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Sentiments: {nbsentiments}</span>
        <Table style={{ border: '0px solid #000' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Table bordered condensed hover>
                  <tbody>
                  <tr>
                    <th colSpan='2' style={{ backgroundColor: '#ccc' }}>Sentiment</th>
                  </tr>
                  {sentiments.map((i) => {
                      return <ListSentiments data={i} onChecked={self.checkSentiments}/>; 
                    }
                  )}
                  </tbody>
                </Table>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      );
      }
    });

  var ListSentiPhrases= React.createClass({

    render() {
      var self=this;
      //<CheckBox name={'p'+self.props.data.id} checkedIcon='checked-square-o' uncheckedIcon='square-o' onPress={(e)=>self.props.onChecked(self.props.data.id,e)} checked={self.props.data.checked}/>
      return(
        <tr>
          <td style={{ width: 10, textAlign: 'center' }}>
            <input type='checkbox' key={'p'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
          </td>
          <td style={{ textAlign: 'left' }}>{self.props.data.phrase}</td>
        </tr>
        );
      }
    });
  
  var ListSentiments= React.createClass({

    render() {
      var self=this; 
      return(
        <tr>
          <td style={{ width: 10, textAlign: 'center' }}>
            <input type='checkbox' key={'d'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
          </td>
          <td style={{ whiteSpace: 'normal', textAlign: 'left' }}>
            <b>Phrase:</b>{self.props.data.phrase}<br></br>            
            <b>Tokens:</b> {self.props.data.tokens}<br></br>
            <b>sentences-sentiment:</b> {self.props.data.sentencessentiment} [{self.props.data.sentencessentimentrating}]<br></br>
            <b>document-sentiment:</b> {self.props.data.documentsentiment} [{self.props.data.documentsentimentrating}]<br></br>
          </td>
        </tr>
        );
      }
    });
  
/***************************************************************************************************/
/*                                                                                                 */
/*  PCUExpandQuery                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/

var PCUExpandQueryWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  getInitialState(){
    return {
      // requête assistée
      text:'Une cuisine du quotidien, simple et bonne. 100 photos pleines pages 100 recettes minimum et des variations.\nRecettes de cuisine du quotidien, simple et bonne.',
      phrases: [],
      nbphrases: 0,
      phraseschecked: [],
      extractions:[],
      nbextractions: 0,
      extractionschecked:[],
      expansions: [],
      nbexpansions: 0,
      expansionschecked: [],
      documents:[],
      nbdocuments:0,
      documentschecked:[],
      dataout:{}
    };
  },

  updateText(event){
    this.setState({text: event.target.value, phrases: [], extractions:[], expansions: []});
    console.log('text',event.target.value);
    },

  getPhrases(){

    // format local
    // var data = [{"id":0, "phrase": "Une cuisine du quotidien, simple et bonne. 100 photos pleines pages 100 recettes minimum et des variations."},
    //             {"id":1, "phrase": "Recettes de cuisine du quotidien, simple et bonne."}
    //            ];

    var data=[];
    var phrase='';
    var id=0;
    var text=this.state.text;
    var start=0;
    var pos = text.indexOf('\n');
    while ( pos != -1 ) {
      phrase=text.slice(start,pos);
      if (phrase!='')
        data.push({"id":id, "phrase": phrase});
      start=pos+1;
      id++;
      pos = text.indexOf('\n',start);
      }
    data.push({"id":id, "phrase": text.slice(start), "isChecked": false});

    this.setState({phrases: data, nbphrases: data.length , extractions:[], nbextractions: 0, expansions: [], nbexpansions: 0, documents: [], nbdocuments: 0, dataout: {}});
    
    },

  getPhrases1(){
    var text=this.state.text;

    // format à envoyer
    // var datain = {
    //     "documents" : [ "Une cuisine du quotidien, simple et bonne. 100 photos pleines pages 100 recettes minimum et des variations.", "Recettes de cuisine du quotidien, simple et bonne." ],
    //     "prettyPrintOut" : true,
    //     "expanded" : false
    //     };
  
    var datain = {
      "text" : text,
      "prettyPrintOut" : true,
      "expanded" : false
      };
  
    console.log('datain',datain);
  
    var url = this.context.api ;
    var urlapi = window.location.origin.concat(url);
    var self = this;
    $.ajax({
      url: urlapi+'/expansion-query-api-arma/phrases',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(datain),
        success(data){
          var dataout = data;
          console.log('dataout',dataout);

          var phrases=[];
          var tmp=[];
      
          for (var i = 0; i < dataout.documents.length ; i ++) {
            phrases = dataout.documents[i].phrases;
            for (var j = 0; j < phrases.length ; j ++) {
              total++;
              tmp.push({"id": dataout.documents[i].id+j, "phrase": phrases[i], "isChecked": false});
              }
            }
          self.setState({phrases: tmp.concat(), nbphrases: total ,extractions: [], nbextractions: 0, expansions: [], nbexpansions: 0, documents: [], nbdocuments: 0, dataout: {}});
          console.log('phrases',self.state.phrases);
          }
        });
    },
  
  getExtractions(){

    // format à envoyer
    // var datain = {
    //     "documents" : [ "Une cuisine du quotidien, simple et bonne. 100 photos pleines pages 100 recettes minimum et des variations.", "Recettes de cuisine du quotidien, simple et bonne." ],
    //     "prettyPrintOut" : true,
    //     "expanded" : false
    //     };

    var tmp=[]; 
    var phrases = this.state.phrases;
    for (var i = 0; i < phrases.length ; i ++)
      if (phrases[i].isChecked)
        tmp.push(phrases[i].phrase);
       
    var datain = {
      "documents" : tmp,
      "prettyPrintOut" : true,
      "expanded" : false
      };

    /*var datain = {
        "documents" : [ "Une cuisine du quotidien, simple et bonne. 100 photos pleines pages 100 recettes minimum et des variations.", "Recettes de cuisine du quotidien, simple et bonne." ],
        "prettyPrintOut" : true,
        "expanded" : false
        };*/

    console.log('datain',datain);

    var url = this.context.api ;
    var urlapi = window.location.origin.concat(url);
    var self = this;
    $.ajax({
      url: urlapi+'/expansion-query-api-arma/extraction',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(datain),
        success(data){
          var dataout = data;
          console.log('data',data);
      
          var tmp=[];
          var keyphrases=[];
          var phraseschecked=[];
          var phrases = self.state.phrases;
          var total=0;
          for (var i = 0; i < phrases.length ; i ++)
            if (phrases[i].isChecked)
              phraseschecked.push(phrases[i].phrase);

          for (var i = 0; i < dataout.documents.length ; i ++) {
            keyphrases = dataout.documents[i].keyphrases;
            for (var j = 0; j < keyphrases.length ; j ++) {
              total++;
              tmp.push({"id": dataout.documents[i].id+j, "phrase": (j==0 ? phraseschecked[i] : ''), "rowspan": keyphrases.length, "keyphrase": keyphrases[j], "isChecked": false});
              }
            }
          self.setState({extractions: tmp.concat(), nbextractions: total ,expansions: [], nbexpansions: 0, documents: [], nbdocuments: 0, dataout: {}});
          console.log('extractions',self.state.extractions);
        }
        });
    },

  getExpansions(){

    // format à envoyer
    // var datain = {
    //   "documents" : [ "Recettes de cuisine" ],
    //   "prettyprintOut" : true
    //   }

    var tmp=[]; 
    var extractions = this.state.extractions;
    for (var i = 0; i < extractions.length ; i ++)
      if (extractions[i].isChecked)
        tmp.push(extractions[i].keyphrase);
       
    var datain = {"documents":tmp,"prettyprintOut":true};

    // var datain = {
    //   "documents" : [ "Recettes de cuisine" ],
    //   "prettyprintOut" : true
    //   }

    console.log('datain',JSON.stringify(datain));

    var url = this.context.api ;
    var urlapi = window.location.origin.concat(url);
    var self = this;
    $.ajax({
      url: urlapi+'/expansion-query-api-arma/expansion',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(datain),
        success(data){
          var dataout = data;
          console.log('data',data);
          var total=0;
      
          var tmp=[];
          var expansions=[];
            
          for (var i = 0; i < dataout.results.length ; i ++) {
            expansions = dataout.results[i].expansion;
            for (var j = 0; j < expansions.length ; j ++) {
              total++;
              tmp.push({"id": (i+1)*1000+j, "term": (j==0 ? dataout.results[i].terms.concat() : ''), "rowspan": expansions.length, "expansion": expansions[j], "isChecked": false});
              }
            }
          self.setState({expansions: tmp.concat(), nbexpansions: total ,documents: [], nbdocuments: 0, dataout: {}});
          console.log('expansions',self.state.expansions);
        }
        });
    },

  getDocuments(){
    // format à envoyer
    // var datain = {
    //   "documents" : [ "recettes détox", "recettes de cocktails", "recettes de pains", "recettes culinaires", "recettes de desserts", "recettes légères", "recettes gourmandes", "recettes vegan", "recettes sucrées" ],
    //   "prettyprintOut" : true
    //   }

    var tmp=[]; 
    var expansions = this.state.expansions;
    for (var i = 0; i < expansions.length ; i ++)
      if (expansions[i].isChecked)
        tmp.push(expansions[i].expansion);
       
    var datain = {
      "fieldName" : "product.description",
      "textToFind" : tmp,
      "prettyprintOut" : true
      };

// var datain = {
    //   "documents" : [ "recettes détox", "recettes de cocktails", "recettes de pains", "recettes culinaires", "recettes de desserts", "recettes légères", "recettes gourmandes", "recettes vegan", "recettes sucrées" ],
    //   "prettyprintOut" : true
    //   }

    console.log('datain',JSON.stringify(datain));

    var url = this.context.api ;
    var urlapi = window.location.origin.concat(url);
    var self = this;
    $.ajax({
      url: urlapi+'/expansion-query-api-arma/docs',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(datain),
        success(data){
          var dataout = data;
          console.log('data',JSON.stringify(data));
      
          //{"results":[{"product":{"id":2877895,"name":"Recettes gourmandes détox - 50 recettes pour se faire du bien","categories":[{"category":{"name":"Cuisine","path_label":"catalog/voidcompany/Livre/Bien-être & Vie Pratique/Cuisine et Vins/Cuisine"}},{"category":{"name":"Cuisine et Vins","path_label":"catalog/voidcompany/Livre/Bien-être & Vie Pratique/Cuisine et Vins"}},{"category":

          var tmp1=[];
          var documents=[];
          var document={};
          var desc='';
          var total=0;
          var stats=[];

          for (var i = 0; i < dataout.results.length ; i ++) {
            total++;
            document = dataout.results[i].product;
            desc=document.description;
            for (var j = 0; j < tmp.length ; j ++) {
              desc=desc.replace(new RegExp(tmp[j],'gi'), '<font color="#F00"><b>'+tmp[j]+'</b></font>');
              //if (desc.search(new RegExp(tmp[j],'gi'))>0)
              //  stats[tmp[j]]+=1;
              }
            tmp1.push({"id": i,
                "productid": document.id,
                "name": document.name,
                "description": desc,
                "terms": tmp,
                isChecked: false});
            }
          self.setState({documents: tmp1.concat(), nbdocuments: total ,dataout: {}});
          console.log('documents',self.state.documents);
          console.log('stats',stats);
        }
        });
    },
  
  checkPhrases(id,event){
    var phrases=this.state.phrases;
    for (var i = 0; i < phrases.length ; i ++)
        if (phrases[i].id == id) {
          phrases[i].isChecked = !phrases[i].isChecked;
        }
    this.setState({ phrases: phrases});
    },

  checkExtractions(id,event){
    var extractions=this.state.extractions;
    for (var i = 0; i < extractions.length ; i ++)
        if (extractions[i].id == id) {
          extractions[i].isChecked = !extractions[i].isChecked;
        }
    this.setState({ extractions: extractions});
    },

  checkExpansions(id,event){
    var expansions=this.state.expansions;
    for (var i = 0; i < expansions.length ; i ++)
        if (expansions[i].id == id) {
          expansions[i].isChecked = !expansions[i].isChecked;
        }
    this.setState({ expansions: expansions});
    },
      
  checkDocuments(id,event){
    var documents=this.state.documents;
    for (var i = 0; i < documents.length ; i ++)
        if (documents[i].id == id) {
          documents[i].isChecked = !documents[i].isChecked;
        }
    this.setState({ documents: documents});
    },

  render(){
    var urlapi=this.props.api;

    var text = this.state.text;
    console.log('text',text);

    var phrases = this.state.phrases;
    var nbphrases = this.state.nbphrases;
    console.log('phrases',phrases);

    var extractions = this.state.extractions;
    var nbextractions = this.state.nbextractions;
    console.log('extractions',this.state.extractions);

    var expansions = this.state.expansions;
    var nbexpansions = this.state.nbexpansions;
    console.log('expansions',this.state.expansions);

    var documents = this.state.documents;
    var nbdocuments = this.state.nbdocuments;
    console.log('documents',this.state.documents);


    var self=this;

    return (
      <div style={{overflow: 'auto'}}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Texte</span>
        <Table style={{ border: '0px solid #000' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Input style={{height: 200, border: 'solid 1px'}} type="textarea" name="text" onChange={self.updateText} value={text}/>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'center', border: '0px solid #000'}}>
                  <Button bsStyle="primary" onClick={self.getPhrases}>Extraction des phrases</Button>
              </td> 
            </tr>
          </tbody>
        </Table>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Phrases extraites: {nbphrases}</span>
        <Table style={{ border: '0px solid #000'}}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Table bordered condensed hover>
                  <tbody>
                  <tr>
                    <th colSpan='2' style={{ backgroundColor: '#ccc' }}>Phrase</th>
                  </tr>
                  {phrases.map((i) => {
                      return <ListPhrases data={i} onChecked={self.checkPhrases}/>; 
                    }
                  )}
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'center', border: '0px solid #000'}}>
                  <Button bsStyle="primary" onClick={self.getExtractions}>Extraction des termes</Button>
              </td> 
            </tr>
          </tbody>
        </Table>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Termes extraits: {nbextractions}</span>
        <Table style={{ border: '0px solid #000' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Table bordered condensed hover>
                  <tbody>
                  <tr>
                    <th style={{ backgroundColor: '#ccc' }}>Phrase</th>
                    <th colSpan='2' style={{ backgroundColor: '#ccc' }}>Terme extrait</th>
                  </tr>
                  {extractions.map((i) => { 
                    return <ListExtractions data={i} onChecked={self.checkExtractions}/>;
                    }
                  )}
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'center', border: '0px solid #000'}}>
                  <Button bsStyle="primary" onClick={self.getExpansions}>Expansion des termes</Button>
              </td> 
            </tr>
          </tbody>
        </Table>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Termes expansés: {nbexpansions}</span>
        <Table style={{ border: '0px solid #000' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Table bordered condensed hover>
                  <tbody>
                  <tr>
                    <th style={{ backgroundColor: '#ccc' }}>Terme extrait</th>
                    <th colSpan='2' style={{ backgroundColor: '#ccc' }}>Terme expansé</th>
                  </tr>
                  {expansions.map((i) => {
                      return <ListExpansions data={i} onChecked={self.checkExpansions}/>; 
                    }
                  )}
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'center', border: '0px solid #000'}}>
                  <Button bsStyle="primary" onClick={self.getDocuments}>Recherche des documents</Button>
              </td> 
            </tr>
          </tbody>
        </Table>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00F'}}>Documents: {nbdocuments}</span>
        <Table style={{ border: '0px solid #000' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                <Table bordered condensed hover>
                  <tbody>
                  <tr>
                    <th colSpan='2' style={{ backgroundColor: '#ccc' }}>Produit</th>
                  </tr>
                  {documents.map((i) => {
                      return <ListDocuments data={i} onChecked={self.checkDocuments}/>; 
                    }
                  )}
                  </tbody>
                </Table>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      );
    }
  });
  
  var ListPhrases= React.createClass({

    render() {
      var self=this;
      //<CheckBox name={'p'+self.props.data.id} checkedIcon='checked-square-o' uncheckedIcon='square-o' onPress={(e)=>self.props.onChecked(self.props.data.id,e)} checked={self.props.data.checked}/>
      return(
        <tr>
          <td style={{ width: 10, textAlign: 'center' }}>
            <input type='checkbox' key={'p'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
          </td>
          <td style={{ textAlign: 'left' }}>{self.props.data.phrase}</td>
        </tr>
        );
      }
    });

  var ListExtractions= React.createClass({

    render() {
      var self=this;
      if (self.props.data.phrase!='') {
        return(
          <tr>
            <td rowSpan={self.props.data.rowspan} style={{ textAlign: 'left'}}>{self.props.data.phrase}</td>
            <td style={{ width: 10, textAlign: 'center' }}>
              <input type='checkbox' key={'t'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
            </td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'left' }}>{self.props.data.keyphrase}</td>
          </tr>
          );
        }
      else {
        return(
          <tr>
            <td style={{ width: 10, textAlign: 'center' }}>
              <input type='checkbox' key={'t'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
            </td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'left' }}>{self.props.data.keyphrase}</td>
          </tr>
          );
        }
      }
    });

  var ListExpansions= React.createClass({

    render() {
      var self=this;
      if (self.props.data.term!='') {
        return(
          <tr>
            <td rowSpan={self.props.data.rowspan} style={{ textAlign: 'left'}}>{self.props.data.term}</td>
            <td style={{ width: 10, textAlign: 'center' }}>
              <input type='checkbox' key={'s'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
            </td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'left' }}>{self.props.data.expansion}</td>
          </tr>
          );
        }
      else {
        return(
          <tr>
            <td style={{ width: 10, textAlign: 'center' }}>
              <input type='checkbox' key={'s'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
            </td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'left' }}>{self.props.data.expansion}</td>
          </tr>
          );
        }
      }
    });
  
  var ListDocuments= React.createClass({

    render() {
      var self=this; 
      return(
        <tr>
          <td style={{ width: 10, textAlign: 'center' }}>
            <input type='checkbox' key={'d'+self.props.data.id} onChange={(e)=>self.props.onChecked(self.props.data.id,e)} value={self.props.data.id}/>
          </td>
          <td style={{ whiteSpace: 'normal', textAlign: 'left' }}>
            <b>Id:</b> <a href={'PCUDisplayProduct?id='+self.props.data.productid} target="detailProduct">{self.props.data.productid}</a><br></br>            
            <b>Name:</b> {self.props.data.name}<br></br>
            <b>Description:</b> <div style={{display: 'inline'}} dangerouslySetInnerHTML={{ __html: self.props.data.description }}></div><br></br>
          </td>
        </tr>
        );
      }
    });
  
/***************************************************************************************************/
/*                                                                                                 */
/*  PCUEditQuery                                                                                   */
/*                                                                                                 */
/***************************************************************************************************/

var PCUEditQueryWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  getInitialState(){
    return {
      // requête assistée
      indexes:[],
      tblindexes: [],
      index:'',
      attributes: [],
      tblattributes:[],
      attribute: '',
      type: '',
      paramListSelect: [],
      paramIdSelect: 0,
      paramListWhere: [],
      paramIdWhere: 0,
      paramListGroup: [],
      paramIdGroup: 0,
      paramListOrder: [],
      paramIdOrder: 0,
      // requête manuelle
      query: '',
      queryP: '',
      // résultats
      result:'',
      // save query
      name:'',
      description:'',
      queryindex: '',
      parameters:[],
      max_docs: '-1',
      max_rows: '20',
      max_aggs: '20',
      max_timeout: '180',
      config_select: '',
      config_where: '',
      config_groupby: '',
      config_orderby: '',
      // current query
      query_run: ''
      };
    },

  getIndexes(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url: urlapi+'/dataset-query-api-arma/management/indices/name/*',
      type: "POST",
      contentType: 'application/json',
      success(data){
        var temp = [];
        for (var i = 0; i < data.length ; i ++)
            temp.push({"label": data[i], "value": data[i]});
        self.setState({indexes: data, tblindexes: temp});
        console.log('indexes',data,'tblindexes',temp);
      }
      });
    },

  getAttributes(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url: urlapi+'/dataset-query-api-arma/management/indices/mapping/'+self.state.index,
      type: "POST",
      contentType: 'application/json',
      success(data){
        var temp = [];
        var ind = '';
        ind = self.state.index;

        temp.push({"label": ind.substr(0,ind.length-1)+'.*', "value": ind.substr(0,ind.length-1)+'.*;String'});
        for (var i = 0; i < data.length ; i ++)
            temp.push({"label": data[i].name, "value": data[i].name+';'+data[i].type});
        self.setState({attributes: data, tblattributes: temp});
        console.log('attributes',data,'tblattributes',temp);
      }
      });
    },

  IndexSelected(event){
    this.setState({index: event, attributes: [], queryindex: event});
    console.log('IndexSelected',event);
    },

  AttributeSelected(event){
    var aname = event.slice(0,event.indexOf(';'));
    var atype = event.slice(event.indexOf(';')+1);
    this.setState({attribute: aname, type: atype});
    console.log('AttributeSelected',event,'aname',aname,'atype',atype);
    },

  addConfigSelect(event){
    event.preventDefault();
    if (this.state.attribute != "") {
       var tmp = this.state.paramListSelect;
       tmp.push( { "area": "SELECT", "id": this.state.paramIdSelect, "attribute": this.state.attribute, "type": this.state.type, "function": "", "caption": "" } );
       this.setState( { paramListSelect: tmp, paramIdSelect: this.state.paramIdSelect+1 } );
       }
    console.log('this.state.paramListSelect',this.state.paramListSelect);
    },

  addConfigWhere(event){
    event.preventDefault();
    if (this.state.attribute != "") {
       var tmp = this.state.paramListWhere;
       tmp.push( { "area": "WHERE", "id": this.state.paramIdWhere, "attribute": this.state.attribute, "type": this.state.type, "operator": "", "value": "", "parenthesis": "", "logicalop": "", "dynamic": false } );
       this.setState( { paramListWhere: tmp, paramIdWhere: this.state.paramIdWhere+1 } );
       }
    console.log('this.state.paramListWhere',this.state.paramListWhere);
    },

  addConfigGroup(event){
    event.preventDefault();
    if (this.state.attribute != "") {
        var tmp = this.state.paramListGroup;
        tmp.push( { "area": "GROUP", "id": this.state.paramIdGroup, "attribute": this.state.attribute, "type": this.state.type, "direction": "" } );
        this.setState( { paramListGroup: tmp, paramIdGroup: this.state.paramIdGroup+1 } );
        }
    console.log('this.state.paramListGroup',this.state.paramListGroup);
    },

  addConfigOrder(event){
    event.preventDefault();
    if (this.state.attribute != "") {
        var tmp = this.state.paramListOrder;
        tmp.push( { "area": "ORDER", "id": this.state.paramIdOrder, "attribute": this.state.attribute, "type": this.state.type, "direction": "" } );
        this.setState( { paramListOrder: tmp, paramIdOrder: this.state.paramIdOrder+1 } );
        }
    console.log('this.state.paramListOrder',this.state.paramListOrder);
    },

  delConfigSelect(id){
    var paramListSelect=this.state.paramListSelect;
    var temparr = [];
    var ii = 0;
    for (var i = 0; i < paramListSelect.length ; i ++)
        if (paramListSelect[i].id != id) {
          temparr.push(paramListSelect[i]);
          temparr[ii].id=ii;
          ii++;
          }
    this.setState({ paramListSelect: temparr, paramIdSelect: ii });
    },

  delConfigWhere(id){
    var paramListWhere=this.state.paramListWhere;
    var temparr = [];
    var ii = 0;
    for (var i = 0; i < paramListWhere.length ; i ++)
        if (paramListWhere[i].id != id) {
          temparr.push(paramListWhere[i]);
          temparr[ii].id=ii;
          ii++;
          }
    this.setState({ paramListWhere: temparr, paramIdWhere: ii });
    },

  delConfigGroup(id){
    var paramListGroup=this.state.paramListGroup;
    var temparr = [];
    var ii = 0;
    for (var i = 0; i < paramListGroup.length ; i ++)
        if (paramListGroup[i].id != id) {
          temparr.push(paramListGroup[i]);
          temparr[ii].id=ii;
          ii++;
          }
    this.setState({ paramListGroup: temparr, paramIdGroup: ii });
    },

  delConfigOrder(id){
    var paramListOrder=this.state.paramListOrder;
    var temparr = [];
    var ii = 0;
    for (var i = 0; i < paramListOrder.length ; i ++)
        if (paramListOrder[i].id != id) {
          temparr.push(paramListOrder[i]);
          temparr[ii].id=ii;
          ii++;
          }
    this.setState({ paramListOrder: temparr, paramIdOrder: ii });
    },

  updConfigSelect(id,func,val){
    var paramListSelect=this.state.paramListSelect;
    for (var i = 0; i < paramListSelect.length ; i ++)
        if (paramListSelect[i].id == id) {
          if (func=='caption')
            paramListSelect[i].caption=val;
          else if (func=='function')
            paramListSelect[i].function=val;
          }
    this.setState({ paramListSelect: paramListSelect});
    },

  updConfigWhere(id,func,val){
    var paramListWhere=this.state.paramListWhere;
    for (var i = 0; i < paramListWhere.length ; i ++)
        if (paramListWhere[i].id == id) {
          if (func=='parenthesis')
            paramListWhere[i].parenthesis=val;
          else if (func=='operator')
            paramListWhere[i].operator=val;
          else if (func=='logicalop')
            paramListWhere[i].logicalop=val;
          else if (func=='value')
            paramListWhere[i].value=val;
          else if (func=='dynamic')
            paramListWhere[i].dynamic=!paramListWhere[i].dynamic;
          }
    this.setState({ paramListWhere: paramListWhere});
    },

  updConfigGroup(id,func,val){
    var paramListGroup=this.state.paramListGroup;
    for (var i = 0; i < paramListGroup.length ; i ++)
        if (paramListGroup[i].id == id) {
          if (func=='direction')
            paramListGroup[i].direction=val;
          }
    this.setState({ paramListGroup: paramListGroup});
    },

  updConfigOrder(id,func,val){
    var paramListOrder=this.state.paramListOrder;
    for (var i = 0; i < paramListOrder.length ; i ++)
        if (paramListOrder[i].id == id) {
          if (func=='direction')
            paramListOrder[i].direction=val;
          }
    this.setState({ paramListOrder: paramListOrder});
    },

  setName(event){
    this.setState({name:event.target.value});
    },

  setDescription(event){
    this.setState({description:event.target.value});
    },

  setIndex(event){
      this.setState({queryindex:event.target.value});
    },

  setQuery(event){
    this.setState({query:event.target.value});
    console.log('query',event.target.value);
    },

  setMaxdocs(event){
    this.setState({max_docs:event.target.value});
    },

  setMaxrows(event){
      this.setState({max_rows:event.target.value});
      },

  setMaxAggs(event){
      this.setState({max_aggs:event.target.value});
      },

  setMaxtimeout(event){
    this.setState({max_timeout:event.target.value});
    },

  setConfigselect(event){
    this.setState({config_select:event.target.value});
    },

  setConfigwhere(event){
    this.setState({config_where:event.target.value});
    },

  setConfiggroupby(event){
    this.setState({config_groupby:event.target.value});
    },

  setConfigorderby(event){
    this.setState({config_orderby:event.target.value});
    },

  setResult(event){
    this.setState({result:event.target.value});
    },

  buildQuery(){
    var tmp = [];
    var col = '';
    var tblquery = [];
    
    var paramListSelect=this.state.paramListSelect;
    var countS=paramListSelect.length;
    var paramListWhere=this.state.paramListWhere;
    var countW=paramListWhere.length;
    var paramListGroup=this.state.paramListGroup;
    var countG=paramListGroup.length;
    var paramListOrder=this.state.paramListOrder;
    var countO=paramListOrder.length;
    var max_docs=this.state.max_docs;
    var max_rows=this.state.max_rows;
    var max_aggs=this.state.max_aggs;
    var max_timeout=this.state.max_timeout;

    tblquery.push('{');
    //select
    tblquery.push('"select": [');
    for (var i = 0; i < paramListSelect.length ; i ++) {
      if (paramListSelect[i].id+1 < countS)
        if (paramListSelect[i].function != '') 
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+') AS '+paramListSelect[i].caption+'",'); //.keyword
          else
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+')",'); //.keyword
        else
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].attribute+') AS '+paramListSelect[i].caption+'",');
          else
            tblquery.push('"'+paramListSelect[i].attribute+'",');
      else
        if (paramListSelect[i].function != '') 
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+') AS '+paramListSelect[i].caption+'"'); //.keyword
          else
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+')"'); //.keyword
        else
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].attribute+' AS '+paramListSelect[i].caption+'"');
          else
            tblquery.push('"'+paramListSelect[i].attribute+'"');
      }
    tblquery.push('],');
    //filters
    if (countW>0) {
      tmp=[];
      tmp.push('"filters": [ {');
      for (var i = 0; i < paramListWhere.length ; i ++) {
        tmp.push(' "filter": {');
        tmp.push(' "condition": {');
        tmp.push(' "index": "'+this.state.index+'",');
        tmp.push(' "field": "'+paramListWhere[i].attribute+'",');
        tmp.push(' "operator": "'+paramListWhere[i].operator+'",');
        tmp.push(' "value": "'+paramListWhere[i].value+'"');
        if (paramListWhere[i].logicalop!='') {
          tmp.push('},');
          tmp.push(' "logicalOp": "'+paramListWhere[i].logicalop+'"');
          }
        else
          tmp.push('}');
        tmp.push('}');
        if (paramListWhere[i].id+1 < countW)
          tmp.push('}, {');
        else 
          tmp.push('}');
        }
      tmp.push('],');
      tblquery.push(tmp.join('\r\n'));
      }
    //group
    if (countG>0) {
      tmp=[];
      tmp.push('"groupBy": [');
      for (var i = 0; i < paramListGroup.length ; i ++) {
        if (paramListGroup[i].id > 0)
          tmp.push(',{"name": "'+paramListGroup[i].attribute+'", "order": "'+paramListGroup[i].direction+'", "missing": false}'); //.keyword
        else
          tmp.push('{"name": "'+paramListGroup[i].attribute+'", "order": "'+paramListGroup[i].direction+'", "missing": false}'); //.keyword
      }
      tmp.push('],');
      tblquery.push(tmp.join(''));
      }
    //order
    if (countO>0) {
      tmp=[];
      tmp.push('"orderBy": [');
      for (var i = 0; i < paramListOrder.length ; i ++) {
        if (paramListOrder[i].direction != '') 
          col = '"'+paramListOrder[i].direction+'('+paramListOrder[i].attribute+')"';
        else
          col = '"'+paramListOrder[i].attribute+'"';
        if (paramListOrder[i].id > 0)
          tmp.push(','+col);
        else
          tmp.push(col);
        }
      tmp.push('],');
      tblquery.push(tmp.join(''));
      }
    //paramètres
    tmp=[];
    tmp.push('"prettyPrint" : true,');
    if (countG>0) 
      tmp.push('"searchParams" : { "nbDocumentsToRetrieve" : '+max_docs+', "nbResultsToRetrieve" : '+max_rows+', "nbAggregationsToRetrieve" : '+max_aggs+', "scrollSearchTimeout" : '+max_timeout+' } } ');
    else
      tmp.push('"searchParams" : { "nbDocumentsToRetrieve" : '+max_docs+', "nbResultsToRetrieve" : '+max_rows+', "scrollSearchTimeout" : '+max_timeout+' } } ');
    tblquery.push(tmp.join(''));
    // finalisation
    var query = tblquery.join('\r\n');
    this.setState({ query: query});
    console.log("query=",query);
  },

  buildPQuery(){
    var tmp = [];
    var col = '';
    var tblquery = [];
    
    var paramListSelect=this.state.paramListSelect;
    var countS=paramListSelect.length;
    var paramListWhere=this.state.paramListWhere;
    var countW=paramListWhere.length;
    var paramListGroup=this.state.paramListGroup;
    var countG=paramListGroup.length;
    var paramListOrder=this.state.paramListOrder;
    var countO=paramListOrder.length;
    var max_docs=this.state.max_docs;
    var max_rows=this.state.max_rows;
    var max_aggs=this.state.max_aggs;
    var max_timeout=this.state.max_timeout;

    tblquery.push('{');
    //select
    tblquery.push('"select": [');
    for (var i = 0; i < paramListSelect.length ; i ++) {
      if (paramListSelect[i].id+1 < countS)
        if (paramListSelect[i].function != '') 
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+') AS '+paramListSelect[i].caption+'",'); //.keyword
          else
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+')",'); //.keyword
        else
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].attribute+') AS '+paramListSelect[i].caption+'",');
          else
            tblquery.push('"'+paramListSelect[i].attribute+'",');
      else
        if (paramListSelect[i].function != '') 
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+') AS '+paramListSelect[i].caption+'"'); //.keyword
          else
            tblquery.push('"'+paramListSelect[i].function+'('+paramListSelect[i].attribute+')"'); //.keyword
        else
          if (paramListSelect[i].caption != '') 
            tblquery.push('"'+paramListSelect[i].attribute+' AS '+paramListSelect[i].caption+'"');
          else
            tblquery.push('"'+paramListSelect[i].attribute+'"');
      }
    tblquery.push('],');
    //filters
    if (countW>0) {
      tmp=[];
      var tmp2=[]
      tmp.push('"filters": [ {');
      for (var i = 0; i < paramListWhere.length ; i ++) {
        tmp.push(' "filter": {');
        tmp.push(' "condition": {');
        tmp.push(' "index": "'+this.state.index+'",');
        tmp.push(' "field": "'+paramListWhere[i].attribute+'",');
        tmp.push(' "operator": "'+paramListWhere[i].operator+'",');
        if (paramListWhere[i].dynamic) {
          tmp.push(' "value": "$'+paramListWhere[i].attribute+'"');
          tmp2.push('$'+paramListWhere[i].attribute)
          }
        else
          tmp.push(' "value": "'+paramListWhere[i].value+'"');
        if (paramListWhere[i].logicalop!='') {
          tmp.push('},');
          tmp.push(' "logicalOp": "'+paramListWhere[i].logicalop+'"');
          }
        else
          tmp.push('}');
        tmp.push('}');
        if (paramListWhere[i].id+1 < countW)
          tmp.push('}, {');
        else 
          tmp.push('}');
        }
      tmp.push('],');
      tblquery.push(tmp.join('\r\n'));
      }
    //group
    if (countG>0) {
      tmp=[];
      tmp.push('"groupBy": [');
      for (var i = 0; i < paramListGroup.length ; i ++) {
        if (paramListGroup[i].id > 0)
          tmp.push(',{"name": "'+paramListGroup[i].attribute+'", "order": "'+paramListGroup[i].direction+'", "missing": false}'); //.keyword
        else
          tmp.push('{"name": "'+paramListGroup[i].attribute+'", "order": "'+paramListGroup[i].direction+'", "missing": false}'); //.keyword
      }
      tmp.push('],');
      tblquery.push(tmp.join(''));
      }
    //order
    if (countO>0) {
      tmp=[];
      tmp.push('"orderBy": [');
      for (var i = 0; i < paramListOrder.length ; i ++) {
        if (paramListOrder[i].direction != '') 
          col = '"'+paramListOrder[i].direction+'('+paramListOrder[i].attribute+')"';
        else
          col = '"'+paramListOrder[i].attribute+'"';
        if (paramListOrder[i].id > 0)
          tmp.push(','+col);
        else
          tmp.push(col);
        }
      tmp.push('],');
      tblquery.push(tmp.join(''));
      }
    //paramètres
    tmp=[];
    tmp.push('"prettyPrint" : true,');
    if (countG>0) 
      tmp.push('"searchParams" : { "nbDocumentsToRetrieve" : '+max_docs+', "nbResultsToRetrieve" : '+max_rows+', "nbAggregationsToRetrieve" : '+max_aggs+', "scrollSearchTimeout" : '+max_timeout+' } } ');
    else
      tmp.push('"searchParams" : { "nbDocumentsToRetrieve" : '+max_docs+', "nbResultsToRetrieve" : '+max_rows+', "scrollSearchTimeout" : '+max_timeout+' } } ');
    tblquery.push(tmp.join(''));
    // finalisation
    var query = tblquery.join('\r\n');
    this.setState({ queryP: query, parameters: tmp2});
    console.log("queryP=",query);
    },

  execQuery(){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
        url: urlapi+'/dataset-query-api/query',
        type: "POST",
        contentType: 'application/json',
        data: self.state.query,
        success(data){
          self.setState({result: JSON.stringify(data)});
          console.log('result',data);
        }
        });
    },

  saveQuery(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    var tmp1={};
    tmp1={"name": self.state.name, "description": self.state.description, "index": self.state.queryindex,
            "parameters": self.state.parameters,
            "query": JSON.stringify(self.state.query), "max_docs": self.state.max_docs,
            "max_rows": self.state.max_rows, "max_aggs": self.state.max_aggs,
            "max_timeout": self.state.max_timeout, 
            "config_select": JSON.stringify(self.state.paramListSelect),
            "config_where": JSON.stringify(self.state.paramListWhere), 
            "config_groupby": JSON.stringify(self.state.paramListGroup), 
            "config_orderby": JSON.stringify(self.state.paramListOrder)}; //"result": JSON.stringify(self.state.result)
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

  savePQuery(){
      //this.buildPQuery();
      var url = this.context.api ;
      var urlapi=window.location.origin.concat(url);
      var self=this;
      var tmp1={};
      tmp1={"name": self.state.name, "description": self.state.description, "index": self.state.queryindex,
              "parameters": self.state.parameters,
              "query": JSON.stringify(self.state.queryP), "max_docs": self.state.max_docs,
              "max_rows": self.state.max_rows, "max_aggs": self.state.max_aggs,
              "max_timeout": self.state.max_timeout, 
              "config_select": JSON.stringify(self.state.paramListSelect),
              "config_where": JSON.stringify(self.state.paramListWhere), 
              "config_groupby": JSON.stringify(self.state.paramListGroup), 
              "config_orderby": JSON.stringify(self.state.paramListOrder)}; //"result": JSON.stringify(self.state.result)
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
  render(){
    var urlapi=this.props.api;

    if ( Object.keys(this.state.indexes).length==0 )
        this.getIndexes();
    
    var indexes = this.state.indexes;
    console.log('indexes',indexes);

    var tblindexes = this.state.tblindexes;
    console.log('tblindexes',tblindexes);

    if ((this.state.index!="")&&( Object.keys(this.state.attributes).length==0 ))
        this.getAttributes();

    var attributes = this.state.attributes;
    console.log('attributes',attributes);

    var tblattributes = this.state.tblattributes;
    console.log('tblattributes',tblattributes);

    var paramListSelect = this.state.paramListSelect;
    console.log('paramListSelect',this.state.paramListSelect);

    var paramListWhere = this.state.paramListWhere;
    console.log('paramListWhere',this.state.paramListWhere);

    var paramListGroup = this.state.paramListGroup;
    console.log('paramListGroup',this.state.paramListGroup);

    var paramListOrder = this.state.paramListOrder;
    console.log('paramListOrder',this.state.paramListOrder);

    var self=this;

    return (
      <div style={{ overflow: 'auto' }}>
        <Tabs defaultActiveKey="queries" transition={true} id="noanim-tab-example">
          <Tab eventKey="queries" title="1. Requête assistée">
            <div style={{ overflow: 'auto' }}>
              <Table condensed>
                <tbody>
                  <tr>
                    <th style={{ width: 30, verticalAlign: "middle" }}>Index</th>
                    <td style={{ width: 150, verticalAlign: "middle"}}>
                      <Select placeholder="?" multi={false} name="sindex" options={tblindexes} onChange={self.IndexSelected} value={self.state.index}/>
                    </td>
                    <th style={{ width: 30, verticalAlign: "middle" }}>Attribut</th>
                    <td style={{ width: 400, verticalAlign: "middle"}}>
                      <Select placeholder="?" multi={false} name="sattributes" options={tblattributes} onChange={self.AttributeSelected} value={self.state.attribute}/>
                    </td>
                    <td style={{ width: 100, verticalAlign: "middle"}}>
                      <a href="#" onClick={self.addConfigSelect}>+ COLONNE</a>
                    </td>
                    <td style={{ width: 80, verticalAlign: "middle"}}>
                      <a href="#" onClick={self.addConfigWhere}>+ FILTRE</a>
                    </td>
                    <td style={{ width: 120, verticalAlign: "middle"}}>
                      <a href="#" onClick={self.addConfigGroup}>+ GROUPEMENT</a>
                    </td>
                    <td style={{ width: 80, verticalAlign: "middle"}}>
                      <a href="#" onClick={self.addConfigOrder}>+ TRI</a>
                    </td>
                    <td style={{ width: 120, verticalAlign: "middle"}}>
                      <Button bsStyle="primary" onClick={self.buildQuery}>Générer</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>COLONNE(S)</span>
              <Table bordered condensed hover>
                <tbody>
                <tr>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 10, backgroundColor: '#ccc' }}>&nbsp;</th>
                  <th style={{ textAlign: 'left', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Rubrique</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 120, backgroundColor: '#ccc' }}>Fonction</th>
                  <th style={{ textAlign: 'left', verticalAlign: 'middle', width: 200, backgroundColor: '#ccc' }}>Alias</th>
                </tr>
                {paramListSelect.map((i) => {
                    return <QueryTableSelect querydata={i} onSelectDelete={self.delConfigSelect} onSelectUpdate={self.updConfigSelect}/>; 
                  }
                )}
                </tbody>
              </Table>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>FILTRE(S)</span>
              <Table bordered condensed hover>
                <tbody>
                <tr>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 10, backgroundColor: '#ccc' }}>&nbsp;</th>
                  <th style={{ textAlign: 'left', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Rubrique</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 50, backgroundColor: '#ccc' }}>Condition</th>
                  <th style={{ textAlign: 'left', verticalAlign: 'middle', width: 200, backgroundColor: '#ccc' }}>Valeur</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 50, backgroundColor: '#ccc' }}>Bloc</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 50, backgroundColor: '#ccc' }}>Opérateur</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 50, backgroundColor: '#ccc' }}>Dynamique</th>
                </tr>
                {paramListWhere.map((i) => {
                    return <QueryTableWhere querydata={i} onWhereDelete={self.delConfigWhere} onWhereUpdate={self.updConfigWhere}/>; 
                  }
                )}
                </tbody>
              </Table>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>GROUPEMENT(S)</span>
              <Table bordered condensed hover>
                <tbody>
                <tr>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 10, backgroundColor: '#ccc' }}>&nbsp;</th>
                  <th style={{ textAlign: 'left', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Rubrique</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 50, backgroundColor: '#ccc' }}>Tri</th>
                </tr>
                {paramListGroup.map((i) => {
                    return <QueryTableGroup querydata={i} onGroupDelete={self.delConfigGroup} onGroupUpdate={self.updConfigGroup}/>; 
                  }
                )}
                </tbody>
              </Table>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>TRI(S)</span>
              <Table bordered condensed hover>
                <tbody>
                <tr>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 10, backgroundColor: '#ccc' }}>&nbsp;</th>
                  <th style={{ textAlign: 'left', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Rubrique</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', width: 50, backgroundColor: '#ccc' }}>Tri</th>
                </tr>
                {paramListOrder.map((i) => {
                    return <QueryTableOrder querydata={i} onOrderDelete={self.delConfigOrder} onOrderUpdate={self.updConfigOrder}/>; 
                  }
                )}
                </tbody>
              </Table>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>PARAMETRE(S)</span>
              <Table bordered condensed hover>
                <tbody>
                <tr>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Nombre de documents</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Nombre de résultats</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Nombres d'aggrégations</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#ccc' }}>Timeout</th>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Input type="text" name="maxdocs" onChange={self.setMaxdocs} value={this.state.max_docs}/>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Input type="text" name="maxrows" onChange={self.setMaxrows} value={this.state.max_rows}/>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Input type="text" name="maxaggs" onChange={self.setMaxAggs} value={this.state.max_aggs}/>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Input type="text" name="maxtimeout" onChange={self.setMaxtimeout} value={this.state.max_timeout}/>
                  </td>
                </tr>
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="create" title="2.Requête JSON">
            <div style={{overflow: 'auto'}}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>REQUÊTE (JSON)</span>
              <Table style={{ border: '0px solid #000' }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center', border: '0px solid #000' }}>
                      <Input style={{height: 500, border: 'solid 1px'}} type="textarea" name="query" onChange={self.setQuery} value={self.state.query}/>
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center', border: '0px solid #000'}}>
                        <Button bsStyle="primary" onClick={self.execQuery}>Rechercher</Button>
                    </td> 
                  </tr>
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="results" title="3. Résultats JSON">
            <div style={{overflow: 'auto' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>RESULTATS (JSON)</span>
              <Table style={{ border: '0px solid #000' }}>
                <tbody>
                  <tr>
                  <td style={{textAlign: 'center', border: '0px solid #000'}}>
                      <Input style={{ height: 500, border: 'solid 1px'}} type="textarea" name="result" value={self.state.result}/> 
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="view" title="4. Sauvegarder la requête">
            <div style={{overflow: 'auto' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>CARACTERISTIQUES</span>
              <Table striped bordered hover style={{ border: '1px solid #000' }}>
                <thead>
                  <tr>
                    <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000'}}>Paramètre</th>
                    <th style={{ backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Valeur</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nom requête</td><td><Input style={{width: 480}} type="text" name="name" onChange={self.setName} value={self.state.name}/></td>
                  </tr>
                  <tr>
                    <td>Description</td><td><Input style={{width: 480}} type="text" name="description" onChange={self.setDescription} value={self.state.description}/></td>
                  </tr>
                  <tr>
                    <td>Index</td><td><Input style={{width: 480}} type="text" name="queryindex" onChange={self.setIndex} value={self.state.queryindex}/></td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{textAlign: 'center'}}>
                      <Button bsStyle="primary" onClick={self.saveQuery}>Enregistrer la requête statique</Button>&nbsp;
                      <Button bsStyle="primary" onClick={self.buildPQuery}>Générer la requête paramétrée</Button>&nbsp;
                      <Button bsStyle="primary" onClick={self.savePQuery}>Enregistrer la requête paramétrée</Button>&nbsp;
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      </div>
      );
    }
  });
  
//<tr>
//  <td>Max lignes</td><td><Input style={{width: 480}} type="text" name="max_rows" onChange={self.setMaxrows}/></td>
//</tr>
//<tr>
//  <td>Max timeout</td><td><Input style={{width: 480}} type="text" name="max_timeout" onChange={self.setMaxtimeout}/></td>
//</tr>

  var QueryTableSelect= React.createClass({

    render() {
      var tblfunctions = [{"label": "COUNT", "value": "COUNT"},{"label": "MIN", "value": "MIN"},{"label": "MAX", "value": "MAX"},{"label": "SUM", "value": "SUM"},{"label": "AVG", "value": "AVG"},];
      var self=this;
      return(
        <tr>
          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <a href="#" onClick={(e)=>self.props.onSelectDelete(self.props.querydata.id,e)}>X</a>
          </td>
          <td style={{textAlign: 'left', verticalAlign: 'middle'}}>
            {self.props.querydata.attribute}
          </td>
          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <Select placeholder="?" multi={false} name={'f'+self.props.querydata.id} options={tblfunctions} onChange={(e)=>self.props.onSelectUpdate(self.props.querydata.id,'function',e)} value={self.props.querydata.function}/>
          </td>
          <td style={{textAlign: 'left', verticalAlign: 'middle'}}>
            <Input style={{width: 480}} type="text" name="caption" value={self.props.querydata.caption} onChange={(e)=>self.props.onSelectUpdate(self.props.querydata.id,'caption',e.target.value)}/>
          </td>
        </tr>
        );
      }
    });
    
  var QueryTableWhere= React.createClass({

    render() {
      var tbloperators = [{"label": "=", "value": "="},{"label": "!=", "value": "!="},{"label": ">", "value": ">"},{"label": ">=", "value": ">="},{"label": "<", "value": "<"},{"label": "<=", "value": "<="}];
      var tblparenthesis = [{"label": "{", "value": "{"},{"label": "}", "value": "}"}];
      var tbllogicalop = [{"label": "AND", "value": "AND"},{"label": "OR", "value": "OR"},{"label": "NOT", "value": "NOT"}];
      var self=this;
      return(
        <tr>
          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <a href="#" onClick={(e)=>self.props.onWhereDelete(self.props.querydata.id,e)}>X</a>
          </td>
          <td style={{textAlign: 'left', verticalAlign: 'middle'}}>
            {self.props.querydata.attribute}
          </td>
          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
           <Select placeholder="?" multi={false} name={'o'+self.props.querydata.id} options={tbloperators} onChange={(e)=>self.props.onWhereUpdate(self.props.querydata.id,'operator',e)} value={self.props.querydata.operator}/>
          </td>
          <td style={{textAlign: 'left', verticalAlign: 'middle'}}>
            <Input style={{width: 480}} type="text" name={'v'+self.props.querydata.id} value={self.props.querydata.value} onChange={(e)=>self.props.onWhereUpdate(self.props.querydata.id,'value',e.target.value)}/>
          </td>
          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
           <Select placeholder="?" multi={false} name={'p'+self.props.querydata.id} options={tblparenthesis} onChange={(e)=>self.props.onWhereUpdate(self.props.querydata.id,'parenthesis',e)} value={self.props.querydata.parenthesis}/>
          </td>
          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
           <Select placeholder="?" multi={false} name={'l'+self.props.querydata.id} options={tbllogicalop} onChange={(e)=>self.props.onWhereUpdate(self.props.querydata.id,'logicalop',e)} value={self.props.querydata.logicalop}/>
          </td>
          <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
           <input type="checkbox" name={'d'+self.props.querydata.id} onChange={(e)=>self.props.onWhereUpdate(self.props.querydata.id,'dynamic',e)} value={self.props.querydata.id}/>
          </td>
        </tr>
        );
      }
    });
  
    var QueryTableGroup= React.createClass({

      render() {
        var tbldirections = [{"label": "ASC", "value": "ASC"},{"label": "DESC", "value": "DESC"}];
        var self=this;
        return(
          <tr>
            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
              <a href="#" onClick={(e)=>self.props.onGroupDelete(self.props.querydata.id,e)}>X</a>
            </td>
            <td style={{textAlign: 'left', verticalAlign: 'middle'}}>
              {self.props.querydata.attribute}
            </td>
            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
              <Select placeholder="?" multi={false} name={'d'+self.props.querydata.id} options={tbldirections} onChange={(e)=>self.props.onGroupUpdate(self.props.querydata.id,'direction',e)} value={self.props.querydata.direction}/>
            </td>
          </tr>
          );
        }
      });

    var QueryTableOrder= React.createClass({

      render() {
        var tbldirections = [{"label": "ASC", "value": "ASC"},{"label": "DESC", "value": "DESC"}];
        var self=this;
        return(
          <tr>
            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
              <a href="#" onClick={(e)=>self.props.onOrderDelete(self.props.querydata.id,e)}>X</a>
            </td>
            <td style={{textAlign: 'left', verticalAlign: 'middle'}}>
              {self.props.querydata.attribute}
            </td>
            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
              <Select placeholder="?" multi={false} name={'o'+self.props.querydata.id} options={tbldirections} onChange={(e)=>self.props.onOrderUpdate(self.props.querydata.id,'direction',e)} value={self.props.querydata.direction}/>
            </td>
          </tr>
          );
        }
      });
  
/***************************************************************************************************/
/*                                                                                                 */
/*  PCUMakeQuery                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/

var PCUMakeQueryWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
 
  getInitialState(){
    return {
      name:'',
      description:'',
      engine: 'es_smile',
      esindex: '',
      estype: '',
      query: '',
      max_docs: '-1',
      max_rows: '20',
      max_timeout: '180',
      config_select: '',
      config_where: '',
      config_groupby: '',
      config_having: '',
      config_orderby: '',
      result:''
    };
  },


  setName(event){
    this.setState({name:event.target.value});
    },

  setDescription(event){
    this.setState({description:event.target.value});
    },

  setEngine(event){
    this.setState({engine:event.target.value});
    },

  setEsindex(event){
      this.setState({esindex:event.target.value});
    },

  setEstype(event){
    this.setState({estype:event.target.value});
    },

  setQuery(event){
    this.setState({query:event.target.value});
    },

  setMaxrows(event){
      this.setState({max_rows:event.target.value});
    },

  setMaxtimeout(event){
      this.setState({max_timeout:event.target.value});
    },

    setConfigselect(event){
      this.setState({config_select:event.target.value});
    },

    setConfigwhere(event){
      this.setState({config_where:event.target.value});
    },

    setConfiggroupby(event){
      this.setState({config_groupby:event.target.value});
    },

    setConfighaving(event){
      this.setState({config_having:event.target.value});
    },

    setConfigorderby(event){
      this.setState({config_orderby:event.target.value});
    },

    setResult(event){
      this.setState({result:event.target.value});
    },

  execQuery(){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    $.ajax({
        url: urlapi+'/dataset-query-api/query',
        type: "POST",
        contentType: 'application/json',
        data: self.state.query,
        success(data){
          self.setState({result: JSON.stringify(data)});
          }
        });
    },

  saveQuery(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);
    var self=this;
    var tmp1={};
    tmp1={"name": self.state.name, "description": self.state.description, "engine": self.state.engine, "esindex": self.state.esindex,
           "estype": self.state.estype, "query": JSON.stringify(self.state.query), "max_rows": self.state.max_rows, "max_timeout": self.state.max_timeout, 
           "config_select": JSON.stringify(self.state.config_select), "config_where": JSON.stringify(self.state.config_where), 
           "config_groupby": JSON.stringify(self.state.config_groupby), "config_having": JSON.stringify(self.state.config_having),
           "config_orderby": JSON.stringify(self.state.config_orderby)}; //"result": JSON.stringify(self.state.result)
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
        

  render() {
    var self=this;
    return (
      <div>
        <Table striped bordered hover style={{ border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#e1e0f2', border: '1px solid #000'}}>Requête</th>
              <th style={{ backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Résultats</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                <table><tr><td>
                  <Input style={{width: 580, height: 200, border: 'solid 1px #000'}} type="textarea" name="query" onChange={self.setQuery}/>
                </td></tr><tr><td style={{textAlign: 'center'}}>
                  <Button bsStyle="primary" onClick={self.execQuery}>Rechercher</Button>
                </td></tr></table>
              </td>
              <td align="center">
                <Input style={{width: 580, height: 200, border: '1px'}} type="textarea" name="result" value={self.state.result}/> 
              </td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover style={{ border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000'}}>Paramètre</th>
              <th style={{ backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Valeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nom requête</td><td><Input style={{width: 480}} type="text" name="name" onChange={self.setName}/></td>
            </tr>
            <tr>
              <td>Description</td><td><Input style={{width: 480}} type="text" name="description" onChange={self.setDescription}/></td>
            </tr>
            <tr>
              <td>Index</td><td><Input style={{width: 480}} type="text" name="esindex" onChange={self.setEsindex}/></td>
            </tr>
            <tr>
              <td colSpan="2" style={{textAlign: 'center'}}><Button bsStyle="primary" onClick={self.saveQuery}>Enregistrer</Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

});

//<tr>
//<td>Moteur</td><td><Input style={{width: 480}} type="text" name="engine" onChange={self.setEngine}/></td>
//</tr>
//<tr>
//<td>Type</td><td><Input style={{width: 480}} type="text" name="estype" onChange={self.setEstype}/></td>
//</tr>
//<tr>
//<td>Max lignes</td><td><Input style={{width: 480}} type="text" name="max_rows" onChange={self.setMaxrows}/></td>
//</tr>
//<tr>
//<td>Max timeout</td><td><Input style={{width: 480}} type="text" name="max_timeout" onChange={self.setMaxtimeout}/></td>
//</tr>

/***************************************************************************************************/
/*                                                                                                 */
/*  PCUManageQueries                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/


var PCUManageQueriesWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    return {
      listQueries:[],
      flaglistQueries: false,
      queryname: '',
      queryindex: '',
      viewQuery:[],

      attributeselected:'',
      requestselected:'',
      paramList:[],
      paramid:0,
      savedQuery: {},

      resultsTitle:'',
      viewTitle:'',
      aggsTitle:'',

      results:[],
      aggs:[],

      paramsResults: [],
      typeDetail: '',
      indexResults: [], 
      rowsResults: [],
      rowsAggs: [],
      globalAggs: [],
      groupbyAggs: [],
      tblheaders: [],
      tblrows: [],

      tblglobalheaders:[],
      tblglobalrows:[],
      flaGlobalAggs:true,
      tblglobalcols:[],

      tblgroupbyheaders: [],
      tblgroupbyrows: [],
      tblgroupcols:[],

      graphtype: '',
      graphname: '',
      graphtitle: '',
      pagename: '',
      pagetitle: '',
      vrub1: '',
      vrub2: '',
      vrub3: '',
      vrub4: '',
      hrub1: '',
      hrub2: '',
    };
  },

  getListQueries(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    var self=this;
    $.ajax({
      url:  urlapi+ '/listQueries',
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({listQueries: data, flaglistQueries: true});
        }
      });
    },

  delQuery(id){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    console.log('delQuery id',id);
    var temparr=[];
    for (var i = 0; i< this.state.listQueries.length ; i ++)
      if (this.state.listQueries[i]._id!=id)
         temparr.push(this.state.listQueries[i]);
    console.log('temparr',temparr);
    if (temparr.length>0)
      this.setState({listQueries: temparr});
    else
      this.setState({listQueries: temparr, flaglistQueries: true});

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

  voirQuery(i){
    this.setState({queryname: i.name, queryindex: i.index, viewTitle:'', viewQuery: [], resultsTitle:'', aggsTitle:''});
    this.setState({results:[], paramsResults: [], typeDetail: '', indexResults: [], 
      rowsResults: [], rowsAggs: [], globalAggs: [], groupbyAggs: [], tblheaders: [], tblrows: [],
      tblglobalheaders: [], tblglobalrows: [], tblglobalcols: [],
      tblgroupbyheaders: [], tblgroupbyrows: [], tblgroupcols: []
     });
    this.viewQuery(i);
    this.execQuery(i);
  },

  viewQuery(i){
    console.log('viewQuery i',i);
    var tmp=[];
    tmp.push(i);
    this.setState({viewQuery: tmp});
    this.setState({viewTitle:'Requête'});
    //this.setState({resultsTitle:''});
    //this.setState({results:[]});
    //this.setState({aggsTitle:''});
    //this.setState({results:[]});
    },

  execQuery(i){
      var url = this.context.api;
      var urlapi=window.location.origin.concat(url);
      //this.setState({resultsTitle:'Résultats'});
      //this.setState({viewTitle:''});
      //this.setState({viewQuery: []});
      //this.setState({aggsTitle:'Aggrégations'});
      var self=this;
      $.ajax({
          url: urlapi+'/dataset-query-api/query',
          type: "POST",
          contentType: 'application/json',
          data: JSON.parse(i.query),
          success(data){
            self.setState({results:data});
            console.log('results',data);
            self.buildResults();
          }
          });
      },

  buildResults(){

    // Résultats retournés par la reque "SQL" 

    var results=this.state.results;
    console.log('results',results);
    var nb_results = Object.keys(results).length;
    console.log('nb_results',nb_results);
    if (nb_results==0)
      return;

    var paramsResults = [];
    var indexResults = '';
    var rowsResults = [];
    var typeDetail = '';
    var rowsAggs = [];
    var globalAggs = [];
    var groupbyAggs = [];

    var keys_results = Object.keys(results);
    keys_results.forEach(function(key) {
      if (key=='searchQueryParams') {
        paramsResults=results.searchQueryParams;
        }
      if (key=='customers') {
        indexResults = 'customers';
        rowsResults = results.customers;
        typeDetail = 'Client';
        }
      if (key=='products') {
        indexResults = 'products';
        rowsResults = results.products;
        typeDetail = 'Product';
        }
      if (key=='visits') {
        indexResults = 'visits';
        rowsResults = results.visits;
        typeDetail = 'Visit';
        }
      if (key=='categories') {
        indexResults = 'categories';
        rowsResults = results.categories;
        typeDetail = 'Category';
        }
      if (key=='aggregations') {
        rowsAggs = results.aggregations;
        globalAggs = results.aggregations.Global;
        groupbyAggs = results.aggregations.GroupBy;
        }
      });

    console.log("paramsResults",paramsResults);
    console.log("typeDetail",typeDetail);
    console.log("indexResults",indexResults);
    console.log("rowsResults",rowsResults);
    console.log("rowsAggs",rowsAggs);
    console.log("globalAggs",globalAggs);
    console.log("groupbyAggs",groupbyAggs);

    // Traitements des résultats - Liste des noms distincts des colonnes retournées 
    
    // Résultats - Liste des documents 

      // Liste des headers

      var tblheaders=[];
      var p;

      if ( Object.keys(rowsResults).length!=0 ) {
        Object.entries(rowsResults).forEach(([pkey,pvalue]) => { 
          if (indexResults == 'customers')
            p = pvalue.customer;
          else if (indexResults == 'products')
            p = pvalue.product;
          else if (indexResults == 'visits')
            p = pvalue.visit;
          else if (indexResults == 'categories')
            p = pvalue.category;
          Object.entries(p).forEach(([ppkey,ppvalue]) => {
            if (tblheaders.indexOf(ppkey)==-1)
              tblheaders.push(ppkey);
            })
          }) 
        console.log("tblheaders",tblheaders);
        } 

      // Liste des valeurs

      var tblrows=[];
      
      var tbl=[];
      var tbl1=[];
      var tbl2=[];
      var tbl3=[];
      var tbl4=[];
      var tbl5=[];
      var ckey='';
      var cval='';

      if ( Object.keys(rowsResults).length!=0 ) {
        Object.entries(rowsResults).forEach(([pkey,pvalue]) => { 
          tbl=[];
          if (indexResults == 'customers')
            p = pvalue.customer;
          else if (indexResults == 'products')
            p = pvalue.product;
          else if (indexResults == 'visits')
            p = pvalue.visit;
          else if (indexResults == 'categories')
            p = pvalue.category;

          for (var i=0;i<tblheaders.length;i++) {
            ckey = tblheaders[i];
            cval = '?';
          Object.entries(p).forEach(([p1key,p1value]) => {
            if (ckey==p1key) {
              if (Array.isArray(p1value)) {
                tbl1=[];
                Object.entries(p1value).forEach(([p2key,p2value]) => {
                  if (p2value.toString()!='[object Object]') 
                    tbl1.push(p2value);
                  else {
                    tbl2=[];
                    Object.entries(p2value).forEach(([p3key,p3value]) => {                
                      if (p3value.toString()!='[object Object]') 
                          tbl2.push('<b>'+p3key+'</b>: '+p3value);
                      else
                          tbl2.push('<b>'+p3key+'</b>: '+JSON.stringify(p3value));
                      })
                    tbl1.push(tbl2.join('  '));
                    }
                  });
                  cval=tbl1.join('<br>');
                }
              else if (p1value.toString()!='[object Object]') 
                cval=p1value;
              /*tbl1=[];
              Object.entries(p1value).forEach(([p2key,p2value]) => {
                if (Array.isArray(p2value)) {
                  //tbl.push('§');
                  tbl.push(JSON.stringify(p2value));
                  /*  tbl4=[];
                    Object.entries(p2value).forEach(([p4key,p4value]) => {
                      if (Array.isArray(p4value)) {
                        //tbl.push('§');
                        tbl4.push(JSON.stringify(p4value));
                        }
                      else {
                        tbl5=[];
                        Object.entries(p4value).forEach(([p5key,p5value]) => {                
                          tbl5.push('<b>'+p5key+'</b>: '+p5value);
                          })
                          tbl4.push(tbl5.join('  '));
                        }
                      })
                    tbl.push(tbl4.join('<br>'));
                  }
                })
              tbl.push(tbl1.join('<br>'));
              }*/
                else {
                  tbl1=[];
                  Object.entries(p1value).forEach(([p2key,p2value]) => {                
                    tbl1.push('<b>'+p2key+'</b>: '+JSON.stringify(p2value));
                    })
                  cval=tbl1.join('  ');
                  }
            }
            })
            tbl.push(cval);
          }
          /*if (tbl.length<tblheaders.length) {
            do {
              tbl.push('?');
            } while (tbl.length<tblheaders.length);
          }*/
          tblrows.push({"id": p.id, "value": tbl});
          }) 
        console.log("tblrows",tblrows);
        } 

    // Aggrégations - Liste des aggrégations

      // global

      var tblglobalheaders=[];
      var tblglobalrows = [];
      var tblglobalcols=[];

      Object.entries(globalAggs).forEach(([ppkey,ppvalue]) => {
        tblglobalheaders.push(ppvalue.name);
        tblglobalrows.push(ppvalue.value);
        tblglobalcols.push(ppvalue.name);
        })

      console.log("tblglobalheaders",tblglobalheaders);
      console.log("tblglobalrows",tblglobalrows);
      console.log("tblglobalcols",tblglobalcols);

      // group by

      var tblgroupbyheaders = [];
      var tblgroupbyrows = [];
      var tblgroupcols=[];
      var p1;
    
      if ( Object.keys(groupbyAggs).length!=0 ) {
         Object.entries(groupbyAggs).forEach(([pkey,pvalue]) => { 
           p = pvalue.agg;
           Object.entries(p).forEach(([ppkey,ppvalue]) => {
             if (Array.isArray(ppvalue)) {
               p1 = ppvalue;
               Object.entries(p1).forEach(([pppkey,pppvalue]) => {
                 if (tblgroupbyheaders.indexOf(pppvalue.name)==-1) {
                    tblgroupbyheaders.push(pppvalue.name);
                    tblgroupcols.push({"label": pppvalue.name, "value": pppvalue.name});
                    }
                 })
               }
             else if (tblgroupbyheaders.indexOf(ppkey)==-1) {
               tblgroupbyheaders.push(ppkey);
               tblgroupcols.push({"label": ppkey, "value": ppkey});
               }
             })
           })
         }

      if ( Object.keys(groupbyAggs).length!=0 ) {
         Object.entries(groupbyAggs).forEach(([pkey,pvalue]) => { 
           p = pvalue.agg;
           tbl=[]
           Object.entries(p).forEach(([ppkey,ppvalue]) => {
             if (Array.isArray(ppvalue)) {
                p1 = ppvalue;
                Object.entries(p1).forEach(([pppkey,pppvalue]) => {
                  tbl.push(pppvalue.value);
                  })
                }
             else 
                tbl.push(ppvalue);
             })
           tblgroupbyrows.push({"value": tbl});
           })
         }
      console.log("tblgroupbyheaders",tblgroupbyheaders);
      console.log("tblgroupbyrows",tblgroupbyrows);
      console.log("tblgroupcols",tblgroupcols);

    // Mémorisation

    console.log("paramsResults",paramsResults);
    console.log("typeDetail",typeDetail);
    console.log("indexResults",indexResults);
    console.log("rowsResults",rowsResults);
    console.log("rowsAggs",rowsAggs);
    console.log("globalAggs",globalAggs);
    console.log("groupbyAggs",groupbyAggs);

    this.setState({ paramsResults: paramsResults, typeDetail: typeDetail, indexResults: indexResults, 
                    rowsResults: rowsResults, rowsAggs: rowsAggs, globalAggs: globalAggs, groupbyAggs: groupbyAggs,
                    tblheaders: tblheaders, tblrows: tblrows,
                    tblglobalheaders: tblglobalheaders, tblglobalrows: tblglobalrows, tblglobalcols: tblglobalcols,
                    tblgroupbyheaders: tblgroupbyheaders, tblgroupbyrows: tblgroupbyrows, tblgroupcols: tblgroupcols
                   });
  },

  updateGraphname(event){
    this.setState({graphname:event.target.value});
    },

  updateGraphtype(event){
      this.setState({graphtype:event.target.value});
      },

  updateGraphtitle(event){
    this.setState({graphtitle:event.target.value});
    },

  updatePagename(event){
    this.setState({pagename:event.target.value});
    },

  updatePagetitle(event){
    this.setState({pagetitle:event.target.value});
    },

  onVrub(pos,event) {
    if (pos==1)
       this.setState({vrub1: event});
    else if (pos==2)
       this.setState({vrub2: event});
    else if (pos==3)
       this.setState({vrub3: event});
    else if (pos==4)
       this.setState({vrub4: event});
    },

  onHrub(pos,event) {
    if (pos==1)
       this.setState({hrub1: event});
    else if (pos==2)
       this.setState({hrub2: event});
    },
  
  /*checkGroupGlobalCols(val,event){
    var tblglobalcols=this.state.tblglobalcols;
    for (var i = 0; i < tblglobalcols.length ; i ++)
      if (tblglobalcols[i].value == val) 
        tblglobalcols[i].checked = !tblglobalcols[i].checked;
    this.setState({ tblglobalcols: tblglobalcols});
    },

  checkGroupCols(val,event){
    var tblgroupcols=this.state.tblgroupcols;
    for (var i = 0; i < tblgroupcols.length ; i ++)
      if (tblgroupcols[i].value == val) 
      tblgroupcols[i].checked = !tblgroupcols[i].checked;
    this.setState({ tblgroupcols: tblgroupcols});
    },*/

  newGraph() {

    // Résultats - aggrégations

    var tblglobalheaders = this.state.tblglobalheaders;
    var tblglobalrows = this.state.tblglobalrows;
    var tblgroupbyheaders = this.state.tblgroupbyheaders;
    var tblgroupbyrows = this.state.tblgroupbyrows;

    // Graphique

    var graphtype=this.state.graphtype;
    var graphname=this.state.graphname;
    var graphtitle=this.state.graphtitle;
    var pagename=this.state.pagename;
    var pagetitle=this.state.pagetitle;
    var tblglobalcols = this.state.tblglobalcols;
    var tblgroupcols = this.state.tblgroupcols;

    var vrub1 = this.state.vrub1;
    var vrub2 = this.state.vrub2;
    var vrub3 = this.state.vrub3;
    var vrub4 = this.state.vrub4;
    var vrub5 = this.state.vrub5;
    var hrub1 = this.state.hrub1;
    var hrub2 = this.state.hrub2;

    if (graphtype=='P11') {
      var tbl=[];
      var val=[];
      var x=0;
      var y=0;

      for (var j=0;j<tblgroupcols.length;j++) {
        if (tblgroupcols[j].value==hrub1)
          x=j;
        if (tblgroupcols[j].value==vrub1)
          y=j;
        }
            
      for (var i=0;i<tblgroupbyrows.length;i++) {
          val = tblgroupbyrows[i].value;
          tbl.push({"key": val[x], "cnt": val[y]})
          }

          var graphic = {
            "type": "PieChart",
            "dimension": "key",
            "header": graphtitle,
            "data": tbl.concat()
            }

          var graphic_json={ "name": graphname, "description": graphtitle, "colx": hrub1,
              "coly": vrub1, "parameters": JSON.stringify(graphic), "index": this.state.queryindex,
              "query": this.state.queryname};

          var page_json = {
            "id": "pcu."+pagename,
            "type": "Page",
            "pageId": pagename,
            "site": "pcu",
            "showTOC": false,
            "title": pagetitle,
            "children": [{
              "type": "Row",
              "width": "100%",
              "children": [graphic]
              }]
            }
      }

    console.log("graphic",JSON.stringify(graphic));
    var url = this.context.api ;
    var urlapi= window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url: urlapi+'/graphic',
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(graphic_json),
      success(data){
        console.log('graphic saved !', data);
      }
      });

    console.log("page",JSON.stringify(page));
    var url = this.context.api ;
    var urlapi= window.location.origin.concat(url);
    var self=this;
    $.ajax({
      url: urlapi+'/cms/page/'+pagename,
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(page_json),
      success(data){
        console.log('page saved !', data);
      }
      });
    },
        
/*chartQuery(id){
    console.log('chartQuery id',id);
    //http://localhost:3000/pcu/page/piechart?query=a
    },
*/
  render(){

    var hrub1=this.state.hrub1;
    var hrub2=this.state.hrub2;
    var vrub1=this.state.vrub1;
    var vrub2=this.state.vrub2;
    var vrub3=this.state.vrub3;
    var vrub4=this.state.vrub4;

    // Liste des requêtes

    var listQueries = this.state.listQueries;
    var flaglistQueries= this.state.flaglistQueries;
    if ( !flaglistQueries ) { //&& Object.keys(listQueries).length==0 ) {
      this.getListQueries();
      }
    console.log('this.state.listQueries',this.state.listQueries);

    // Requête

    var viewQuery=this.state.viewQuery; 
    //var viewTitle=this.state.viewTitle;
    //var resultsTitle=this.state.resultsTitle;
    //var aggsTitle=this.state.aggsTitle;

    // Résultats - documents

    var tblheaders = this.state.tblheaders;
    var tblrows = this.state.tblrows;
    var typeDetail = this.state.typeDetail;

    // Résultats - aggrégations

    var tblglobalheaders = this.state.tblglobalheaders;
    var tblglobalrows = this.state.tblglobalrows;
    var tblgroupbyheaders = this.state.tblgroupbyheaders;
    var tblgroupbyrows = this.state.tblgroupbyrows;

    // Graphique

    var graphtype=this.state.graphtype;
    var graphname=this.state.graphname;
    var graphtitle=this.state.graphtitle;
    var pagename=this.state.pagename;
    var pagetitle=this.state.pagetitle;
    var tblglobalcols = this.state.tblglobalcols;
    var tblgroupcols = this.state.tblgroupcols;

    var self=this; // <div style1={{ height: '250px', overflowX: 'auto' }}>
    
    return (
      <div>
      <Tabs defaultActiveKey="queries" transition={true} id="noanim-tab-example">
        <Tab eventKey="queries" title="Recherches">
          <div style={{ height: '580px', overflow: 'auto' }}>
            <Table striped bordered hover style={{ border: '1px solid #000' }}>
              <thead>
                <tr>
                  <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000'}}>Nom</th>
                  <th style={{ backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Description</th>
                  <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Index</th>
                  <th style={{ width: 115, backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
              {listQueries.map((i,index) => {
                return <tr key={index}>
                  <td style={{ width: 200, border: '1px solid #000' }}>{i.name}</td>
                  <td style={{ border: '1px solid #000' }}>{i.description}</td>
                  <td style={{ width: 200, border: '1px solid #000' }}>{i.index}</td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "right", width: 100, border: '1px solid #000'}}>
                    <a href="#" onClick= {()=>self.voirQuery(i)}>Voir</a>
                    &nbsp;
                    <a href="#" onClick= {()=>self.delQuery(i._id)}>Supprimer</a>
                  </td>
                </tr>;
                } 
            //    <a href="#" onClick= {()=>self.viewQuery(i)}>Requête</a>
            //    &nbsp;
            //    <a href="#" onClick= {()=>self.execQuery(i)}>Résultat</a>
            //    &nbsp;
            // <Button bsStyle="primary" href={'piechart?query='+i._id}>Chart</Button>
              )}
              </tbody>
            </Table>
          </div>
          <Table>
            <tr>
              <td style={{ textAlign: 'center'}}>
                  <Button bsStyle="primary" href={'PCUMakeQuery'} target='make'>Créer une recherche</Button>
              </td>
            </tr>
          </Table>
        </Tab>
        <Tab eventKey="view" title="Requête">
          {/*<h5>{viewTitle}</h5>*/}
          <div style={{ height: '630px', overflow: 'auto' }}>
            <Table striped bordered condensed hover>
              <tbody>
                {
              /*<thead>
              <tr>
                <th style={{ width: 200 }}>Requête</th><th>Syntaxe</th>
              </tr>
            </thead>*/
                viewQuery.map((i) => {
                    return <tr><td style={{ width: 200 }}>{i.name}</td><td>{JSON.parse(i.query)}</td></tr>
                    }
                  )
                }
              </tbody>
            </Table>          
          </div>
        </Tab>
        <Tab eventKey="results" title="Résultats">
          {/*<h5>{resultsTitle}</h5>*/}
          <div style={{ height: '630px', overflow: 'auto' }}>
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
                      <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}} key={j}>
                        <a href={'PCUDisplay'+typeDetail+'?id='+row.id} target="detail{typeDetail}">
                        <div style={{display: 'inline'}} dangerouslySetInnerHTML={{ __html: col }}></div>
                        </a>
                      </td>
                    )}
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="aggs" title="Aggregations">
          {/*<h5>{aggsTitle}</h5>*/}
          <div style={{ height: '630px', overflow: 'auto' }}>
            <Table striped bordered hover style={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  {tblglobalheaders.map((header,indx) => 
                    <th key={'gh'+indx} style={{whiteSpace: 'nowrap', border: '1px solid #000', backgroundColor: '#e1e0f2'}}>{header}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                {tblglobalrows.map((row, indx) =>
                    <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}} key={'gr'+indx}>{row}</td>
                )}
                </tr>
              </tbody>
            </Table>
            <Table striped bordered hover style={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  {tblgroupbyheaders.map((header,indx) => 
                    <th key={indx} style={{whiteSpace: 'nowrap', border: '1px solid #000', backgroundColor: '#e1e0f2'}}>{header}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {tblgroupbyrows.map((row, i) =>
                  <tr key={i}>
                    {row.value.map((col, j) =>
                      <td style={{whiteSpace: 'nowrap', border: '1px solid #000'}} key={j}>{col}</td>
                    )}
                  </tr>
                  )}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="graph" title="Graphique">
          <div style={{ height: '630px', overflow: 'auto' }}>
            <Table striped bordered hover style={{border: '0px solid #000'}}>
              <tbody>
              <tr>
                <td>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>Rubriques axe vertical</span>
                </td><td></td>
                <td>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>Rubriques axe horizontal</span>
                </td><td></td>
              </tr>
                <tr>
                  <td>Rubrique 1</td><td><Select placeholder="?" multi={false} name="vrub1" options={tblgroupcols} onChange={(e)=>self.onVrub(1,e)} value={vrub1}/></td>
                  <td>Rubrique 1</td><td><Select placeholder="?" multi={false} name="hrub1" options={tblgroupcols} onChange={(e)=>self.onHrub(1,e)} value={hrub1}/></td>
                </tr>
                <tr>
                  <td>Rubrique 2</td><td><Select placeholder="?" multi={false} name="vrub2" options={tblgroupcols} onChange={(e)=>self.onVrub(2,e)} value={vrub2}/></td>
                  <td>Rubrique 2</td><td><Select placeholder="?" multi={false} name="hrub2" options={tblgroupcols} onChange={(e)=>self.onHrub(2,e)} value={hrub2}/></td>
                </tr>
                <tr>
                  <td>Rubrique 3</td><td><Select placeholder="?" multi={false} name="vrub3" options={tblgroupcols} onChange={(e)=>self.onVrub(3,e)} value={vrub3}/></td>
                  <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr>
                  <td>Rubrique 4</td><td><Select placeholder="?" multi={false} name="vrub4" options={tblgroupcols} onChange={(e)=>self.onVrub(4,e)} value={vrub4}/></td>
                  <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
              </tbody>
            </Table>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2195F3'}}>Général</span>
            <Table>
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle'}}>
                  Nom Graphique <Input style={{width: 200, border: 'solid 1px'}} type="text" name="graphname" onChange={self.updateGraphname} value={graphname}/>
                </td>
                <td style={{ textAlign: 'left', verticalAlign: 'middle'}}>
                  Nom Page <Input style={{width: 200, border: 'solid 1px'}} type="text" name="pagename" onChange={self.updatePagename} value={pagename}/>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle'}}>
                  Titre Graphique <Input style={{width: 200, border: 'solid 1px'}} type="text" name="graphtitle" onChange={self.updateGraphtitle} value={graphtitle}/>
                </td>
                <td style={{ textAlign: 'left', verticalAlign: 'middle'}}>
                  Titre Page <Input style={{width: 200, border: 'solid 1px'}} type="text" name="pagetitle" onChange={self.updatePagetitle} value={pagetitle}/>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle'}}>
                  Type Graphique <Input style={{width: 200, border: 'solid 1px'}} type="text" name="graphtype" onChange={self.updateGraphtype} value={graphtype}/>
                </td>
                <td></td>
              </tr>
              <tr>
                <td style={{ textAlign: 'right', verticalAlign: 'middle'}}>
                  <Button bsStyle="primary" onClick={()=>self.newGraph()}>Enregistrer le(s) Graphique(s)/la Vue</Button>
                </td>
                <td style={{ textAlign: 'left', verticalAlign: 'middle'}}>
                  <Button bsStyle="primary" href={graphname} target="graph">Voir la Vue</Button>
                </td>
              </tr>
            </Table>
          </div>
        </Tab>
      </Tabs>
      </div>
      );
    }
  });


var ListGlobalColsGraph = React.createClass({

  render() {
    var self=this;
    return(
      <tr>
        <td style={{ width: 10, textAlign: 'center' }}>
          <input type='checkbox' key={'g'+self.props.data.value} onChange={(e)=>self.props.onChecked(self.props.data.value,e)} value={self.props.data.value}/>
        </td>
        <td style={{ textAlign: 'left' }}>{self.props.data.value}</td>
      </tr>
      );
    }
  });

  var ListGroupColsGraph = React.createClass({

    render() {
      var self=this;
      return(
        <tr>
          <td style={{ width: 10, textAlign: 'center' }}>
            <input type='checkbox' key={'c'+self.props.data.value} onChange={(e)=>self.props.onChecked(self.props.data.value,e)} value={self.props.data.value}/>
          </td>
          <td style={{ textAlign: 'left' }}>{self.props.data.value}</td>
        </tr>
        );
      }
    });
  
/***************************************************************************************************/
/*                                                                                                 */
/*  PCUDisplayClient                                                                              */
/*                                                                                                 */
/***************************************************************************************************/

var PCUDisplayClientWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
 
  getInitialState(){
    var urlid=this.getParameterByName('id','');
    console.log('urlid',urlid);
    return {
      id:urlid,
      query:{},
      result:{},
      queryP:{},
      resultP:{},
      queryC:{},
      resultC:{},

      reco0_user_user_flag: true,
      reco0_user_user: [],
      reco0_user_prod_flag: true,
      reco0_user_prod: [],

      reco1_user_user_flag: true,
      reco1_user_user: [],
      reco1_user_prod_flag: true,
      reco1_user_prod: [],

      reco2_user_user_flag: true,
      reco2_user_user: [],
      reco2_user_prod_flag: true,
      reco2_user_prod: [],

      reco3_user_user_flag: true,
      reco3_user_user: [],
      reco3_user_prod_flag: true,
      reco3_user_prod: []
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

  getQuery(name){
      var url = this.context.api ;
      var urlapi=window.location.origin.concat(url);
  
      if ( Object.keys(this.state.query).length!=0 ) {
         return ;
         }
  
      var self=this;
      $.ajax({
        url:  urlapi+ '/querybyname/'+name,
        type: "GET",
        contentType: 'application/json',
        success(data){
          self.setState({query: data});
          console.log('query',self.state.query);
          //self.setState({queryjson: data.query});
          }
        });
     },
  
  getQueryP(name){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    if ( Object.keys(this.state.queryP).length!=0 ) {
        return ;
        }

    var self=this;
    $.ajax({
      url:  urlapi+ '/querybyname/'+name,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({queryP: data});
        console.log('queryP',self.state.queryP);
        }
      });
    },

  getQueryC(name){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    if ( Object.keys(this.state.queryC).length!=0 ) {
        return ;
        }

    var self=this;
    $.ajax({
      url:  urlapi+ '/querybyname/'+name,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({queryC: data});
        console.log('queryC',self.state.queryC);
      }
      });
    },
  
  execQuery(id){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);

    if ( Object.keys(this.state.query).length==0 ) {
      return ;
      }

    if ( Object.keys(this.state.result).length!=0 ) {
      return ;
      }

    var query_json=this.state.query; 
    query_json=query_json.query;
    query_json=query_json.replace("$id",this.state.id);
    console.log('query_json',query_json);
    var self=this;
    $.ajax({
        url: urlapi+'/dataset-query-api/query',
        type: "POST",
        contentType: 'application/json',
        data: JSON.parse(query_json),
        success(data){
          if (data=="{}")
            data={};
          self.setState({result:data}); 
          console.log('result',self.state.result);
        }
        });
    },      

  execQueryP(id){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);

    if ( Object.keys(this.state.queryP).length==0 ) {
      return ;
      }

    if ( Object.keys(this.state.resultP).length!=0 ) {
      return ;
      }

    var query_json=this.state.query; 
    query_json=query_json.query;
    query_json=query_json.replace("$id",this.state.id);
    console.log('query_jsonP',query_json);
    var self=this;
    $.ajax({
        url: urlapi+'/dataset-query-api/query',
        type: "POST",
        contentType: 'application/json',
        data: JSON.parse(query_json),
        success(data){
          if (data=="{}")
            data={};
          self.setState({resultP:data}); 
          console.log('resultP',self.state.resultP);
        }
        });
    },      

  execQueryC(id){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);

    if ( Object.keys(this.state.queryC).length==0 ) {
      return ;
      }

    if ( Object.keys(this.state.resultC).length!=0 ) {
      return ;
      }

    var query_json=this.state.query; 
    query_json=query_json.query;
    query_json=query_json.replace("$id",this.state.id);
    console.log('query_jsonC',query_json);
    var self=this;
    $.ajax({
        url: urlapi+'/dataset-query-api/query',
        type: "POST",
        contentType: 'application/json',
        data: JSON.parse(query_json),
        success(data){
          if (data=="{}")
            data={};
          self.setState({resultC:data}); 
          console.log('resultP',self.state.resultC);
        }
        });
    },

  execRecouserprod(methodid){
      var url = this.context.api;
      var urlapi=window.location.origin.concat(url);
      var id=this.state.id;
  
      if (id=='')
        return ;
  
      if (((methodid==0)&&(!this.state.reco0_user_prod_flag))||
          ((methodid==1)&&(!this.state.reco1_user_prod_flag))||
          ((methodid==2)&&(!this.state.reco2_user_prod_flag))||
          ((methodid==3)&&(!this.state.reco3_user_prod_flag)))
        return ;

      var self=this;
      $.ajax({
        url: urlapi+'/reco-query-api-arma/userreco/'+methodid+'/'+id,
        type: "GET",
        contentType: 'application/json',
        success(data){
          var resultx = JSON.stringify(data);
          if (resultx.search(/: \[/gi)<0) { // if ((resultx.search('ProductId not in database')>0)||(resultx.search('Not finished training')>0)||(resultx.search('UserId not in databse')>0))
            if (methodid==0)
              self.setState({reco0_user_prod: [], reco0_user_prod_flag: false});
            else if (methodid==1)
              self.setState({reco1_user_prod: [], reco1_user_prod_flag: false});
            else if (methodid==2)
              self.setState({reco2_user_prod: [], reco2_user_prod_flag: false});
            else if (methodid==3)
              self.setState({reco3_user_prod: [], reco3_user_prod_flag: false});
            }
          else {
            if (methodid==0)
              self.setState({reco0_user_prod: JSON.parse(data).recommandations, reco0_user_prod_flag: false}); 
            else if (methodid==1)
              self.setState({reco1_user_prod: JSON.parse(data).recommandations, reco1_user_prod_flag: false}); 
            else if (methodid==2)
              self.setState({reco2_user_prod: JSON.parse(data).recommandations, reco2_user_prod_flag: false}); 
            else if (methodid==3)
              self.setState({reco3_user_prod: JSON.parse(data).recommandations, reco3_user_prod_flag: false}); 
            }
          console.log('reco0_user_prod',self.state.reco0_user_prod);
          console.log('reco1_user_prod',self.state.reco1_user_prod);
          console.log('reco2_user_prod',self.state.reco2_user_prod);
          console.log('reco3_user_prod',self.state.reco3_user_prod);
          }
        });
      },
  
  execRecouseruser(methodid){
      var url = this.context.api;
      var urlapi=window.location.origin.concat(url);
  
      if (this.state.id=='')
        return ;
  
      if (((methodid==0)&&(!this.state.reco0_user_user_flag))||
          ((methodid==1)&&(!this.state.reco1_user_user_flag))||
          ((methodid==2)&&(!this.state.reco2_user_user_flag))||
          ((methodid==3)&&(!this.state.reco3_user_user_flag)))
        return ;
  
      var self=this;
      $.ajax({
        url: urlapi+'/reco-query-api-arma/usersim/'+methodid+'/'+this.state.id,
        type: "GET",
        contentType: 'application/json',
        success(data){
          var resultx = JSON.stringify(data);
          if (resultx.search(/: \[/gi)<0) { // if ((resultx.search('ProductId not in database')>0)||(resultx.search('Not finished training')>0)||(resultx.search('UserId not in databse')>0))
          if (methodid==0)
            self.setState({reco0_user_user: [], reco0_user_user_flag: false});
          else if (methodid==1)
            self.setState({reco1_user_user: [], reco1_user_user_flag: false});
          else if (methodid==2)
            self.setState({reco2_user_user: [], reco2_user_user_flag: false});
          else if (methodid==3)
            self.setState({reco3_user_user: [], reco3_user_user_flag: false});
          }
          else {
            if (methodid==0)
              self.setState({reco0_user_user: JSON.parse(data).recommandations, reco0_user_user_flag: false}); 
            else if (methodid==1)
              self.setState({reco1_user_user: JSON.parse(data).recommandations, reco1_user_user_flag: false}); 
            else if (methodid==2)
              self.setState({reco2_user_user: JSON.parse(data).recommandations, reco2_user_user_flag: false}); 
            else if (methodid==3)
              self.setState({reco3_user_user: JSON.parse(data).recommandations, reco3_user_user_flag: false}); 
            } 
          console.log('reco0_user_user',self.state.reco0_user_user);
          console.log('reco1_user_user',self.state.reco1_user_user);
          console.log('reco2_user_user',self.state.reco2_user_user);
          console.log('reco3_user_user',self.state.reco3_user_user);
          }
        });
      },
      
    render() {

    this.getQuery('clientid');
    //this.getQuery('recoclientid');
    //this.getQuery('recoproductid');
    this.execQuery();
    this.execRecouserprod(0);
    this.execRecouserprod(1);
    this.execRecouserprod(2);
    this.execRecouserprod(3);
    this.execRecouseruser(0);
    this.execRecouseruser(1);
    this.execRecouseruser(2);
    this.execRecouseruser(3);
    //this.execQueryAllC();
    //this.execQueryAllP();
    console.log('result1',this.state.result);
    
    // Résultats de la requête 

    var results=this.state.result;
  
    console.log('results',results);

    var paramsResults = [];
    var indexResults = '';
    var headersResults = [];
    var rowsResults = [];
    var rowsAggs = [];

    var nb_results = Object.keys(results).length;
    var keys_results = Object.keys(results);
    keys_results.forEach(function(key) {
      if (key=='searchQueryParams') {
        paramsResults=results.searchQueryParams;
        }
      if (key=='aggregations') {
        rowsAggs = results.aggregations;
        }
      if (key=='customers') {
        indexResults = 'customers';
        rowsResults = results.customers;
        }
      if (key=='products') {
        indexResults = 'products';
        rowsResults = results.products;
        }
      if (key=='visits') {
        indexResults = 'visits';
        rowsResults = results.visits;
        }
      if (key=='categories') {
        indexResults = 'categories';
        rowsResults = results.categories;
        }
        });
    console.log("indexResults",indexResults);
    console.log("rowsResults",rowsResults);
    console.log("rowsAggs",rowsAggs);

    // Résultats - Liste des lignes

    var tblrows=[];

    if ( Object.keys(rowsResults).length!=0 ) {
      Object.entries(rowsResults).forEach(([pkey,pvalue]) => { 
        Object.entries(pvalue.customer).forEach(([ppkey,ppvalue]) => {
          if (Array.isArray(ppvalue))
            tblrows.push({"name": ppkey,"value": "§"});
          else
            tblrows.push({"name": ppkey,"value": ppvalue});
          })
        }) 
      console.log("tblrows",tblrows);
      } 

     var reco0_user_prod = this.state.reco0_user_prod;
     var reco1_user_prod = this.state.reco1_user_prod;
     var reco2_user_prod = this.state.reco2_user_prod;
     var reco3_user_prod = this.state.reco3_user_prod;
     var reco0_user_user = this.state.reco0_user_user;
     var reco1_user_user = this.state.reco1_user_user;
     var reco2_user_user = this.state.reco2_user_user;
     var reco3_user_user = this.state.reco3_user_user;
     var presentations = [{"name": "vuecli01", "caption": "Vue graphique client 01", "screen": "Dashboard"},
                          {"name": "vuecli02", "caption": "Vue graphique client 02", "screen": "Dashboard"},
                          {"name": "vuecli03", "caption": "Vue graphique client 03", "screen": "Dashboard"},
                          {"name": "vuecli04", "caption": "Vue graphique client 04", "screen": "Dashboard"}];
     console.log("reco0_user_prod",reco1_user_prod);
     console.log("reco0_user_user",reco1_user_user);
     console.log("reco1_user_prod",reco2_user_prod);
     console.log("reco1_user_user",reco2_user_user);
     console.log("reco2_user_prod",reco2_user_prod);
     console.log("reco2_user_user",reco2_user_user);
     console.log("reco3_user_prod",reco3_user_prod);
     console.log("reco3_user_user",reco3_user_user);

    var self=this;
    return (
        <Tabs defaultActiveKey="fi" transition={true} id="noanim-tab-example">
          <Tab eventKey="fi" title="Fiche">
            <div>
              <h5>Fiche descriptive</h5>
              <Table striped bordered hover style={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '200', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Rubrique
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Valeur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tblrows.map((row, i) =>
                    <tr key={i}>
                      <td style={{width: '200', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                        {row.name}
                      </td>
                      <td style={{whiteSpace: 'wrap', border: '1px solid #000'}}>
                        <div style={{display: 'inline'}} dangerouslySetInnerHTML={{ __html: row.value }}></div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="re0" title="Recommandations 0">
            <div>
              <h5>Produits recommandés</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Produit 
                    </th>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Poids
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                {reco0_user_prod.map((row, i) =>
                  <tr key={'p'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    <a href={'PCUDisplayProduct?id='+row[0]} target="detailprodprod">{row[0]}</a>
                    </td>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      {row[1]}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div>
              <h5>Utilisateurs similaires</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Client
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reco0_user_user.map((row, i) =>
                    <tr>
                        <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          <a href={'PCUDisplayClient?id='+row} target="detailprodcli">{row}</a>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          &nbsp;
                        </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="re1" title="Recommandations 1">
            <div>
              <h5>Produits recommandés</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Produit 
                    </th>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Poids
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                {reco1_user_prod.map((row, i) =>
                  <tr key={'p'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    <a href={'PCUDisplayProduct?id='+row[0]} target="detailprodprod">{row[0]}</a>
                    </td>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      {row[1]}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div>
              <h5>Utilisateurs similaires</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Client
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reco1_user_user.map((row, i) =>
                    <tr>
                        <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          <a href={'PCUDisplayClient?id='+row} target="detailprodcli">{row}</a>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          &nbsp;
                        </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="re2" title="Recommandations 2">
            <div>
              <h5>Produits recommandés</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Produit 
                    </th>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Poids
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                {reco2_user_prod.map((row, i) =>
                  <tr key={'p'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    <a href={'PCUDisplayProduct?id='+row[0]} target="detailprodprod">{row[0]}</a>
                    </td>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      {row[1]}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div>
              <h5>Utilisateurs similaires</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Client
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reco2_user_user.map((row, i) =>
                    <tr>
                        <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          <a href={'PCUDisplayClient?id='+row} target="detailprodcli">{row}</a>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          &nbsp;
                        </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="re3" title="Recommandations 3">
            <div>
              <h5>Produits recommandés</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Produit 
                    </th>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Poids
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                {reco3_user_prod.map((row, i) =>
                  <tr key={'p'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    <a href={'PCUDisplayProduct?id='+row[0]} target="detailprodprod">{row[0]}</a>
                    </td>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      {row[1]}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div>
              <h5>Utilisateurs similaires</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Client
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reco3_user_user.map((row, i) =>
                    <tr>
                        <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          <a href={'PCUDisplayClient?id='+row} target="detailprodcli">{row}</a>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                          &nbsp;
                        </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="gr" title="Graphiques">
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Nom présentation
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Libellé présentation
                  </th>
                </tr>
              </thead>
              <tbody>
                {presentations.map((row, i) =>
                  <tr key={i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                        <a href={row.screen} target="detailprodpres">{row.name}</a>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    {row.caption}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

        
        );
  }

});

/***************************************************************************************************/
/*                                                                                                 */
/*  PCUDisplayProduct                                                                              */
/*                                                                                                 */
/***************************************************************************************************/

var PCUDisplayProductWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
 
  getInitialState(){
    var urlid=this.getParameterByName('id','');
    console.log('urlid',urlid);
    return {
      id:urlid,
      query:{},
      result:{},
      reco0_prod_user_flag: true,
      reco0_prod_user: [],
      reco0_prod_prod_flag: true,
      reco0_prod_prod: [],
      reco1_prod_user_flag: true,
      reco1_prod_user: [],
      reco1_prod_prod_flag: true,
      reco1_prod_prod: [],
      reco2_prod_user_flag: true,
      reco2_prod_user: [],
      reco2_prod_prod_flag: true,
      reco2_prod_prod: [],
      reco3_prod_user_flag: true,
      reco3_prod_user: [],
      reco3_prod_prod_flag: true,
      reco3_prod_prod: []
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

  getQuery(name){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    if ( Object.keys(this.state.query).length!=0 ) {
       return ;
       }

    var self=this;
    $.ajax({
      url:  urlapi+ '/querybyname/'+name,
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({query: data});
        console.log('query',self.state.query);
        //self.setState({queryjson: data.query});
      }
      });
    },

  execQuery(){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);

    console.log('query.length',Object.keys(this.state.query).length);
    console.log('result.length',Object.keys(this.state.result).length);

    if ( Object.keys(this.state.query).length==0 ) {
      return ;
      }

    if ( Object.keys(this.state.result).length!=0 ) {
      return ;
      }

    var query_json=this.state.query; 
    query_json=query_json.query;
    query_json=query_json.replace("$id",this.state.id);
    console.log('query_json',query_json);
    var self=this;
    $.ajax({
        url: urlapi+'/dataset-query-api/query',
        type: "POST",
        contentType: 'application/json',
        data: JSON.parse(query_json),
        success(data){
          if (data=="{}")
             data={};
          self.setState({result:data}); 
          console.log('result',self.state.result);
        }
        });
    },

  execRecoprodprod(methodid){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);

    if (this.state.id=='')
      return ;

    if (((methodid==0)&&(!this.state.reco0_prod_prod_flag))
        ||((methodid==1)&&(!this.state.reco1_prod_prod_flag))
        ||((methodid==2)&&(!this.state.reco2_prod_prod_flag))
        ||((methodid==3)&&(!this.state.reco3_prod_prod_flag)))
      return ;

    var self=this;
    $.ajax({
      url: urlapi+'/reco-query-api-arma/productsim/'+methodid+'/'+this.state.id,
      type: "GET",
      contentType: 'application/json',
      success(data){
        var resultx = JSON.stringify(data);
        if (resultx.search(/: \[/gi)<0) { // if ((resultx.search('ProductId not in database')>0)||(resultx.search('Not finished training')>0)||(resultx.search('UserId not in databse')>0))
            if (methodid==0)
              self.setState({reco0_prod_prod: [], reco0_prod_prod_flag: false});
            else if (methodid==1)
              self.setState({reco1_prod_prod: [], reco1_prod_prod_flag: false});
            else if (methodid==2)
              self.setState({reco2_prod_prod: [], reco2_prod_prod_flag: false});
            else if (methodid==3)
              self.setState({reco3_prod_prod: [], reco3_prod_prod_flag: false});
            }
        else {
          if (methodid==0)
            self.setState({reco0_prod_prod: JSON.parse(data).recommandations, reco0_prod_prod_flag: false}); 
          else if (methodid==1)
            self.setState({reco1_prod_prod: JSON.parse(data).recommandations, reco1_prod_prod_flag: false}); 
          else if (methodid==2)
            self.setState({reco2_prod_prod: JSON.parse(data).recommandations, reco2_prod_prod_flag: false}); 
          else if (methodid==3)
            self.setState({reco3_prod_prod: JSON.parse(data).recommandations, reco3_prod_prod_flag: false}); 
          }
        console.log('reco0_prod_prod',self.state.reco0_prod_prod);
        console.log('reco1_prod_prod',self.state.reco1_prod_prod);
        console.log('reco2_prod_prod',self.state.reco2_prod_prod);
        console.log('reco3_prod_prod',self.state.reco3_prod_prod);
        }
      });
    },

  execRecoproduser(methodid){
    var url = this.context.api;
    var urlapi=window.location.origin.concat(url);

    if (this.state.id=='')
      return ;

      if (((methodid==0)&&(!this.state.reco0_prod_user_flag))
          ||((methodid==1)&&(!this.state.reco1_prod_user_flag))
          ||((methodid==2)&&(!this.state.reco2_prod_user_flag))
          ||((methodid==3)&&(!this.state.reco3_prod_user_flag)))
        return ;


    var self=this;
    $.ajax({
      url: urlapi+'/reco-query-api-arma/productreco/'+methodid+'/'+this.state.id,
      type: "GET",
      contentType: 'application/json',
      success(data){
        var resultx = JSON.stringify(data);
        if (resultx.search(/: \[/gi)<0) { // if ((resultx.search('ProductId not in database')>0)||(resultx.search('Not finished training')>0)||(resultx.search('UserId not in databse')>0))
          if (methodid==0)
            self.setState({reco0_prod_user: [], reco0_prod_user_flag: false});
          else if (methodid==1)
            self.setState({reco1_prod_user: [], reco1_prod_user_flag: false});
          else if (methodid==2)
            self.setState({reco2_prod_user: [], reco2_prod_user_flag: false});
          else if (methodid==3)
            self.setState({reco3_prod_user: [], reco3_prod_user_flag: false});
          }
        else {
          if (methodid==0)
            self.setState({reco0_prod_user: JSON.parse(data).recommandations, reco0_prod_user_flag:false}); 
          if (methodid==1)
            self.setState({reco1_prod_user: JSON.parse(data).recommandations, reco1_prod_user_flag:false}); 
          if (methodid==2)
            self.setState({reco2_prod_user: JSON.parse(data).recommandations, reco2_prod_user_flag:false}); 
          if (methodid==3)
            self.setState({reco3_prod_user: JSON.parse(data).recommandations, reco3_prod_user_flag:false}); 
          } 
        console.log('reco0_prod_user',self.state.reco0_prod_user);
        console.log('reco1_prod_user',self.state.reco1_prod_user);
        console.log('reco2_prod_user',self.state.reco2_prod_user);
        console.log('reco3_prod_user',self.state.reco3_prod_user);
        }
      });
    },

  render() {
    this.getQuery('productid');
    this.execQuery();
    this.execRecoprodprod(0);
    this.execRecoprodprod(1);
    this.execRecoprodprod(2);
    this.execRecoprodprod(3);
    this.execRecoproduser(0);
    this.execRecoproduser(1);
    this.execRecoproduser(2);
    this.execRecoproduser(3);
    console.log('result1',this.state.result);
    
    // Résultats de la requête 

    var results=this.state.result;
    
    /*var results= {
      "searchQueryParams": {
        "totalResults": 191766,
        "scrollID": "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAtoWb1k0ajhyNGpTNnE4c21fSVZQYVJRQQ=="
      },
      "products": [{
        "product": {
          "id": 8,
          "name": "L.A. GUNS",
          "categories": [{
            "category": {
              "id": 33403,
              "name": "Hard - Métal",
              "parentID": 50564,
              "level": 4,
              "position": 8,
              "children_count": 4,
              "path": "1/685/27675/50564/33403",
              "path_label": "catalog/voidcompany/Musique/Genres musicaux/Hard - Métal",
              "url_path_fr": "musique/hard-metal.html",
              "unknown_categories": []
            }
          }],
          "category_name": ["Hard - Métal"],
          "show_in_categories": [{
            "category": {
              "id": 1,
              "name": "catalog"
            }
          }, {
            "category": {
              "id": 685,
              "name": "voidcompany"
            }
          }, {
            "category": {
              "id": 27675,
              "name": "Musique",
              "parentID": 685,
              "level": 2,
              "position": 16,
              "children_count": 311,
              "path": "1/685/27675",
              "path_label": "catalog/voidcompany/Musique",
              "url_path_fr": "musique.html",
              "unknown_categories": []
            }
          }, {
            "category": {
              "id": 50564,
              "name": "Genres musicaux",
              "parentID": 27675,
              "level": 3,
              "position": 3,
              "children_count": 112,
              "path": "1/685/27675/50564",
              "path_label": "catalog/voidcompany/Musique/Genres musicaux",
              "url_path_fr": "musique/genres-musicaux.html",
              "unknown_categories": []
            }
          }, {
            "category": {
              "id": 33403,
              "name": "Hard - Métal",
              "parentID": 50564,
              "level": 4,
              "position": 8,
              "children_count": 4,
              "path": "1/685/27675/50564/33403",
              "path_label": "catalog/voidcompany/Musique/Genres musicaux/Hard - Métal",
              "url_path_fr": "musique/hard-metal.html",
              "unknown_categories": []
            }
          }],
          "description": "LA VERSION REMASTERISÉE ENRICHIE DE 6 TITRES LIVE BONUS !!<br/>LIVRET COMPLET COULEURS PHILIP LEWIS-LEAD VOCAL TRACII GUNS-LEAD GUITAR MICK CRIPPS-RHYTM GUITAR, KEYBOARDS, BACKING VOCALS KELLY NICKELS-BASS GUITAR, HARMONICA, WHISTLE, BACKING VOCALS STEVE RILEY-DRUMS Anciens combattants de la scène du Sunset Strip, L.A Guns est également connu pour être l'un des deux groupes (avec Hollywood Rose) qui a fusionné dans le milieu des années 80 pour former Guns N 'Roses.<br/>Formé en 1983, la première mouture du groupe inclus Tracii Guns et le chanteur Axl Rose, futur fondateur de Gun's N'Roses avec son ami d'enfance Izzy Stradlin.<br/>Rose et Guns décident au début d'unir leur deux groupes en 1985, créant ainsi la première incarnation de Guns N 'Roses. Tracii Guns sera, après quelques mois, démis de ses fonctions et sera remplacé par Slash. Se trouvant seul, il rebondit en rejoignant ses frères d'armes d'L.A Guns Paul Black et Tracii Guns écrivent la plupart des chansons, le groupe obtient un contrat avec Polygram Records et pose les plans pour enregistrer un premier album. Black est alors remplacé par l'ancien chanteur de GIRL, Phil Lewis. Le batteur Nickey Alexander, le bassiste Kelly Nickels, et le guitariste Mick Cripps complètent le line-up En 1988, L.A Guns sort son premier album éponyme.<br/>Torridement influencé par Aerosmith, les compositions font mouche. L'ancien batteur de WASP, Steve Riley rejoint le combo US au cours de la tournée.",
          "price": 14.99,
          "price_0_1": 14.99,
          "has_discount_0_1": false,
          "price_1_1": 14.99,
          "has_discount_1_1": false,
          "tax_class": [{
            "id": "5",
            "label": "Taux normal"
          }],
          "sku": "3341348051017",
          "availability": ["long_backorder"],
          "availability_updated_at": "2016-02-05 06:51:58",
          "created_at": "2013-06-05 07:50:07",
          "has_options": false,
          "in_stock": true,
          "medium_disc": [{
            "id": "1032",
            "label": "CD"
          }],
          "music_people": [{
            "id": "9",
            "label": "Compilation"
          }],
          "music_people_singer": [{
            "id": "9",
            "label": "Compilation"
          }],
          "release_date": "2010-11-22",
          "required_options": false,
          "search_terms_position": [],
          "status": [{
            "id": "1",
            "label": "Enabled"
          }],
          "stock": 0,
          "updated_at": "2017-12-05 02:03:04",
          "visibility": [{
            "id": "4",
            "label": "Catalog, Search"
          }]
        }
      }]
    }; */
    console.log('results',results);

    var paramsResults = [];
    var indexResults = '';
    var headersResults = [];
    var rowsResults = [];
    var rowsAggs = [];

    var nb_results = Object.keys(results).length;
    var keys_results = Object.keys(results);
    keys_results.forEach(function(key) {
      if (key=='searchQueryParams') {
        paramsResults=results.searchQueryParams;
        }
      if (key=='aggregations') {
        rowsAggs = results.aggregations;
        }
      if (key=='customers') {
        indexResults = 'customers';
        rowsResults = results.customers;
        }
      if (key=='products') {
        indexResults = 'products';
        rowsResults = results.products;
        }
      if (key=='visits') {
        indexResults = 'visits';
        rowsResults = results.visits;
        }
      if (key=='categories') {
        indexResults = 'categories';
        rowsResults = results.categories;
        }
        });
    console.log("indexResults",indexResults);
    console.log("rowsResults",rowsResults);
    console.log("rowsAggs",rowsAggs);

    // Résultats - Liste des lignes

    var tblrows=[];

    if ( Object.keys(rowsResults).length!=0 ) {
      Object.entries(rowsResults).forEach(([pkey,pvalue]) => { 
        Object.entries(pvalue.product).forEach(([ppkey,ppvalue]) => {
          if (Array.isArray(ppvalue))
            tblrows.push({"name": ppkey,"value": "§"});
          else
            tblrows.push({"name": ppkey,"value": ppvalue});
          })
        }) 
      console.log("tblrows",tblrows);
      } 

     var reco0_prod_user = this.state.reco0_prod_user;
     var reco1_prod_user = this.state.reco1_prod_user;
     var reco2_prod_user = this.state.reco2_prod_user;
     var reco3_prod_user = this.state.reco3_prod_user;
     var reco0_prod_prod = this.state.reco0_prod_prod;
     var reco1_prod_prod = this.state.reco1_prod_prod;
     var reco2_prod_prod = this.state.reco2_prod_prod;
     var reco3_prod_prod = this.state.reco3_prod_prod;
     var presentations = [{"name": "vueprod01", "caption": "Vue graphique produit 01", "screen": "Dashboard"},
                          {"name": "vueprod02", "caption": "Vue graphique produit 02", "screen": "Dashboard"},
                          {"name": "vueprod03", "caption": "Vue graphique produit 03", "screen": "Dashboard"},
                          {"name": "vueprod04", "caption": "Vue graphique produit 04", "screen": "Dashboard"},
                          {"name": "vueprod05", "caption": "Vue graphique produit 05", "screen": "Dashboard"},
                          {"name": "vueprod06", "caption": "Vue graphique produit 06", "screen": "Dashboard"}];
     console.log("reco0_prod_user",reco0_prod_user);
     console.log("reco1_prod_prod",reco1_prod_prod);
     console.log("reco2_prod_user",reco2_prod_user);
     console.log("reco3_prod_prod",reco3_prod_prod);
     console.log("reco0_prod_user",reco0_prod_user);
     console.log("reco1_prod_prod",reco1_prod_prod);
     console.log("reco2_prod_user",reco2_prod_user);
     console.log("reco3_prod_prod",reco3_prod_prod);

    var self=this;
    return (
        <Tabs defaultActiveKey="fi" transition={true} id="noanim-tab-example">
          <Tab eventKey="fi" title="Fiche">
            <div>
              <h5>Fiche descriptive</h5>
              <Table striped bordered hover style={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '200', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Rubrique
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Valeur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tblrows.map((row, i) =>
                    <tr key={i}>
                      <td style={{width: '200', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                        {row.name}
                      </td>
                      <td style={{whiteSpace: 'wrap', border: '1px solid #000'}}>
                        <div style={{display: 'inline'}} dangerouslySetInnerHTML={{ __html: row.value }}></div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="re0" title="Recommandations 0">
            <div>
              <h5>Clients potentiellement intéressés</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Client 
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                {reco0_prod_user.map((row,i) =>
                  <tr key={'c'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      <a href={'PCUDisplayClient?id='+row} target="detailclicli">{row}</a>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                  )}
                </tbody>
              </Table>
              </div>
              <div>
              <h5>Produits similaires</h5>
              <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
                <thead>
                  <tr>
                    <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      ID Produit
                    </th>
                    <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      Autres rubriques
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reco0_prod_prod.map((row,i) =>
                    <tr key={'p'+i}>
                      <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                        <a href={'PCUDisplayProduct?id='+row} target="detailcliprod">{row}</a>
                      </td>
                      <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                        &nbsp;
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="re1" title="Recommandations 1">
          <div>
            <h5>Clients potentiellement intéressés</h5>
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    ID Client 
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Autres rubriques
                  </th>
                </tr>
              </thead>
              <tbody>
              {reco1_prod_user.map((row,i) =>
                <tr key={'c'+i}>
                  <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    <a href={'PCUDisplayClient?id='+row} target="detailclicli">{row}</a>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    &nbsp;
                  </td>
                </tr>
                )}
              </tbody>
            </Table>
            </div>
            <div>
            <h5>Produits similaires</h5>
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    ID Produit
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Autres rubriques
                  </th>
                </tr>
              </thead>
              <tbody>
                {reco1_prod_prod.map((row,i) =>
                  <tr key={'p'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      <a href={'PCUDisplayProduct?id='+row} target="detailcliprod">{row}</a>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
          <Tab eventKey="re2" title="Recommandations 2">
          <div>
            <h5>Clients potentiellement intéressés</h5>
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    ID Client 
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Autres rubriques
                  </th>
                </tr>
              </thead>
              <tbody>
              {reco2_prod_user.map((row,i) =>
                <tr key={'c'+i}>
                  <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    <a href={'PCUDisplayClient?id='+row} target="detailclicli">{row}</a>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    &nbsp;
                  </td>
                </tr>
                )}
              </tbody>
            </Table>
            </div>
            <div>
            <h5>Produits similaires</h5>
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    ID Produit
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Autres rubriques
                  </th>
                </tr>
              </thead>
              <tbody>
                {reco2_prod_prod.map((row,i) =>
                  <tr key={'p'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      <a href={'PCUDisplayProduct?id='+row} target="detailcliprod">{row}</a>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="re3" title="Recommandations 3">
          <div>
            <h5>Clients potentiellement intéressés</h5>
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    ID Client 
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Autres rubriques
                  </th>
                </tr>
              </thead>
              <tbody>
              {reco3_prod_user.map((row,i) =>
                <tr key={'c'+i}>
                  <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    <a href={'PCUDisplayClient?id='+row} target="detailclicli">{row}</a>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    &nbsp;
                  </td>
                </tr>
                )}
              </tbody>
            </Table>
            </div>
            <div>
            <h5>Produits similaires</h5>
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    ID Produit
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Autres rubriques
                  </th>
                </tr>
              </thead>
              <tbody>
                {reco3_prod_prod.map((row,i) =>
                  <tr key={'p'+i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      <a href={'PCUDisplayProduct?id='+row} target="detailcliprod">{row}</a>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                      &nbsp;
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="gr" title="Graphiques">
            <Table responsive striped bordered hover style1={{border: '1px solid #000'}}>
              <thead>
                <tr>
                  <th style={{width: '100', backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Nom présentation
                  </th>
                  <th style={{backgroundColor: '#e1e0f2', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    Libellé présentation
                  </th>
                </tr>
              </thead>
              <tbody>
                {presentations.map((row, i) =>
                  <tr key={i}>
                    <td style={{width: '100', whiteSpace: 'nowrap', border: '1px solid #000'}}>
                        <a href={row.screen} target="detailclipres">{row.name}</a>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', border: '1px solid #000'}}>
                    {row.caption}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
        );
  }

});

/***************************************************************************************************/
/*                                                                                                 */
/*  PCUManageGraphics                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/


var PCUManageGraphicsWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    return {
      listGraphics:[],
      flaglistGraphics: false
    };
  },

  getListGraphics(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    var self=this;
    $.ajax({
      url:  urlapi+ '/listGraphics',
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({listGraphics: data, flaglistGraphics: true});
        }
      });
    },

  delGraphic(id){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    console.log('delGraphic id',id);
    var temparr=[];
    for (var i = 0; i< this.state.listGraphics.length ; i ++)
      if (this.state.listGraphics[i]._id!=id)
         temparr.push(this.state.listGraphics[i]);
    console.log('temparr',temparr);
    if (temparr.length>0)
      this.setState({listGraphics: temparr});
    else
      this.setState({listGraphics: temparr, flaglistGraphics: true});
    
    var self=this;
    $.ajax({
      url:   urlapi+'/graphic/'+id,
      type: "DELETE",
      contentType: 'application/json',
      success(data) {
        alert(data);
        }
      });
    },

  render(){

    // Liste des graphiques

    var listGraphics = this.state.listGraphics;
    var flaglistGraphics= this.state.flaglistGraphics;
    if ( !flaglistGraphics ) { //&& Object.keys(listGraphics).length==0 ) {
      this.getListGraphics();
      }
    console.log('this.state.listGraphics',this.state.listGraphics);

    var self=this; 
    
    return (
      <div style={{ height: '580px', overflow: 'auto' }}>
        <Table striped bordered hover style={{ border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000'}}>Nom</th>
              <th style={{ backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Description</th>
              <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Index</th>
              <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Requête</th>
              <th style={{ width: 100, backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {listGraphics.map((i,index) => {
            return <tr key={index}>
              <td style={{ width: 200, border: '1px solid #000' }}>{i.name}</td>
              <td style={{ border: '1px solid #000' }}>{i.description}</td>
              <td style={{ width: 200, border: '1px solid #000' }}>{i.index}</td>
              <td style={{ width: 200, border: '1px solid #000' }}>{i.query}</td>
              <td style={{ whiteSpace: "nowrap", textAlign: "right", width: 100, border: '1px solid #000'}}>
              <a href={i.name} target="graphics">Voir</a>
                &nbsp;
                <a href="#" onClick= {()=>self.delGraphic(i._id)}>Supprimer</a>
              </td>
            </tr>;
            } 
          )}
          </tbody>
        </Table>
      </div>
      );
    }
  });

/***************************************************************************************************/
/*                                                                                                 */
/*  PCUManageViews                                                                                      */
/*                                                                                                 */
/***************************************************************************************************/


var PCUManageViewsWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],

  
  getInitialState(){
    return {
      listViews:[],
      flaglistViews:false,
    };
  },

  getListViews(){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    var self=this;
    $.ajax({
      url:  urlapi+ '/listViews',
      type: "GET",
      contentType: 'application/json',
      success(data){
        self.setState({listViews: data, flaglistViews: true});
        }
      });
    },

  delView(id){
    var url = this.context.api ;
    var urlapi=window.location.origin.concat(url);

    console.log('delView id',id);
    var temparr=[];
    for (var i = 0; i< this.state.listViews.length ; i ++)
      if (this.state.listViews[i]._id!=id)
         temparr.push(this.state.listViews[i]);
    console.log('temparr',temparr);
    if (temparr.length>0)
      this.setState({listViews: temparr});
    else
      this.setState({listViews: temparr, flaglistViews: true});

    var self=this;
    $.ajax({
      url:   urlapi+'/view/'+id,
      type: "DELETE",
      contentType: 'application/json',
      success(data) {
        alert(data);
        }
      });
    },

  render(){

    // Liste des vues

    var listViews = this.state.listViews;
    var flaglistViews= this.state.flaglistViews;
    if ( !flaglistViews ) { //&& Object.keys(listViews).length==0 ) {
      this.getListViews();
      }
    console.log('this.state.listViews',this.state.listViews);

    var self=this; 
    
    return (
      <div style={{ height: '580px', overflow: 'auto' }}>
        <Table striped bordered hover style={{ border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000'}}>Nom</th>
              <th style={{ backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Description</th>
              <th style={{ width: 200, backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Type</th>
              <th style={{ width: 115, backgroundColor: '#e1e0f2', border: '1px solid #000' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {listViews.map((i,index) => {
            return <tr key={index}>
              <td style={{ width: 200, border: '1px solid #000' }}>{i.name}</td>
              <td style={{ border: '1px solid #000' }}>{i.description}</td>
              <td style={{ width: 200, border: '1px solid #000' }}>{i.display}</td>
              <td style={{ whiteSpace: "nowrap", textAlign: "right", width: 100, border: '1px solid #000'}}>
              <a href={i.name}>Voir</a>
                &nbsp;
                <a href="#" onClick= {()=>self.delView(i._id)}>Supprimer</a>
              </td>
            </tr>;
            } 
          )}
          </tbody>
        </Table>
      </div>
      );
    }
  });



/***************************************************************************************************/
/*                                                                                                 */
/*  ADMIN Interface                                                                                */
/*                                                                                                 */
/***************************************************************************************************/

var PCUSearch2Widget = React.createClass({
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
                <th style={{ width: 150 }}>Rubrique</th>
                <th>Type</th>
                <th>Opérateur</th>
                <th>Valeur</th>
                {tblattributes.map((i) => {
                  return <tr>
                    {
                     //<td style={sttd}>
                     // <input type="checkbox" onChange={self.AttributeChecked} value={i.name}/>
                     //</td>
                    }
                    <td style={{ width: 150 }}>{i.name}</td>
                    <td>{i.type}</td>
                    <td>{i.type}</td>
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


/********** OK *******************/

WidgetManager.registerWidget("PCULdapLogin", {
  component: PCULdapLoginWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUMenu", {
  component: PCUMenuWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUMakeQuery", {
  component: PCUMakeQueryWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUEditQuery", {
  component: PCUEditQueryWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUExpandQuery", {
  component: PCUExpandQueryWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUFeelQuery", {
  component: PCUFeelQueryWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUSearch", {
  component: PCUSearch2Widget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUManageQueries", {
  component: PCUManageQueriesWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUManageGraphics", {
  component: PCUManageGraphicsWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUManageViews", {
  component: PCUManageViewsWidget ,
config: [
  ]
}
);



WidgetManager.registerWidget("PCUDisplayProduct", {
  component: PCUDisplayProductWidget ,
config: [
  ]
}
);

WidgetManager.registerWidget("PCUDisplayClient", {
  component: PCUDisplayClientWidget ,
config: [
  ]
}
);

