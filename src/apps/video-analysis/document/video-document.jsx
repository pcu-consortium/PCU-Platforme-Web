
import { DataTree } from 'components/document';
import { Nav, NavItem,Tabs,Tab,NavDropdown,MenuItem } from 'react-bootstrap';
import remoteComponent from 'utils/remote-component';
const nl2br = require('react-nl2br');


var segmentstitle=[];
var segmentsid=[];
var segmentsObject;

function capitalizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getSegmentName(k)
{
  for (var i=0;i<segmentsid.length;i++)
    if (k.indexOf(segmentsid[i])>-1)
      return segmentstitle[i];
  return k;
}

function concate(array,sep) {
    if (array.length==0)
      return undefined;
    var string=array[0];
    for (var i=1;i<array.length;i++)
    {
      string+=sep;
      string+=array[i];
    }
    return string;
}


var RemoteDataTree = remoteComponent(DataTree);

var VideoDocument = React.createClass({

  // mixins: [ React.addons.PureRenderMixin ],

  getInitialState(){
    return {
      mode: 'document',
      submode: '1',
    };
  },

  getDefaultProps(){
    return {
      document: {},
      segments: []
    }
  },

  computeVisibleSegments(segments, currentTime){
    return segments.filter(s => (currentTime >= s.begin && currentTime < s.end));
  },

  // Manually override shouldComponentUpdate to test for specific changes
  shouldComponentUpdate(nextProps, nextState){
    const props = this.props;
    const state = this.state;
    if ((props.document !== nextProps.document)
       || (props.segmentId !== nextProps.segmentId)
       || (props.layers !== nextProps.layers)
       || (state.mode !== nextState.mode)) {
      return true;
    }

    // Compare visible segments
    var currentVisible = this.computeVisibleSegments(props.segments, props.currentTime);
    var nextVisible = this.computeVisibleSegments(nextProps.segments, nextProps.currentTime);
    if (currentVisible.length !== nextVisible.length) return true;
    for(var i=0; i<currentVisible.length; i++){
      if (currentVisible[i] !== nextVisible[i]) return true;
    }
    return false;
  },

  handleModeChange(mode,mode1){
    this.setState({mode: mode1||mode});
  },

  handleSubModeChange(submode){
    this.setState({submode});
  },

  getSegment(){
    const { layers, segmentId } = this.props;
    if (!layers || (segmentId == null)){
      return undefined;
    }
    for(var layer of layers){
      for(var segment of layer.segments){
        if (segment.id == segmentId){
          return segment.data;
        }
      }
    }
    return undefined;
  },

  processSegment(segment){
    if (!segment.about){
      return segment;
    }
    var reformat = function(about){
      var roots = [];
      var byId = {};
      about.forEach(e => {
        byId[e.id] = { ...e };
        delete byId[e.id].id;
        delete byId[e.id].target;
      });
      about.forEach(e => {
        if (e.target){
          var parent = byId[e.target];
          if (!parent){
            roots.push(byId[e.id]);
          } else {
            parent.children = parent.children || [];
            parent.children.push(byId[e.id]);
          }
        } else {
          roots.push(byId[e.id]);
        }
      });
      return roots;
    };
    return {
      ...segment,
      about: reformat(segment.about)
    };
  },

  componentWillUpdate(nextProps){
    if (nextProps.segmentId != this.props.segmentId){
      //this.setState({mode: 'document'});
    }
  },

  render(){
    const { mode } = this.state;
    const segment = this.getSegment();
    const disabled = !segment;
    var layers = this.props;
    
    segmentstitle=[];
    segmentsid=[];

    const { segments, currentTime } = this.props;
    var segmentindex=0;
    for (var ii=0;ii<layers.layers.length; ii++)
    {
      for (var jj=0;jj<layers.layers[ii].segments.length; jj++)
      {
        if ((currentTime>=layers.layers[ii].segments[jj].begin)&& (currentTime<layers.layers[ii].segments[jj].end-1))
        {
          var rawid=layers.layers[ii].segments[jj].id;
          segmentsid.push(rawid.substring(rawid.indexOf("#")+1,rawid.indexOf(">")));
          segmentstitle.push(layers.layers[ii].segments[jj].label);
          break;
        }
      }
    }
    var segmentsids=segmentsid.join(";");
    var request = require('sync-request');
        console.log('Actuel Segment',segmentsids);
    var res = request('GET', '../getsegments/'+ segmentsids);
    console.log('get segment result',res.getBody());
    if ((segmentsids==null)||(segmentsids.length==0))
      segmentsObject=[];
    else  segmentsObject=JSON.parse(res.getBody());
    var segmentstabs=[];
    for (var k in segmentsObject)
    {
      for (var l in segmentsObject[k])
        if (segmentstabs.indexOf(l)==-1)
          segmentstabs.push(l);
    }

/*
    var request = require('sync-request');
    var res = request('GET', 'http://lab2.armadillo.fr/campus-aar-api/get_current_segments?segments=http://escom.msh-paris.fr%2377b26850-8613-4720-baf0-dcc9d9542617;http://escom.msh-paris.fr%230f2f91eb-5ee8-43af-b7d5-2e9d624d7da1_audio',
      {
      'headers': {
        'crossDomain': true,
        'dataType' : 'jsonp',
        'Access-Control-Allow-Origin':'*'
      }
      });
    var segmentObject=JSON.parse(res.getBody());

    console.log('segments:',segmentObject);
*/
/*
  var request = require('request');

  request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage. 
    }
  })
*/
    return (
      <div style={{padding: 16}}>
        <Nav bsStyle='pills' bsSize='small' activeKey={mode} onSelect={this.handleModeChange}>
            <NavItem eventKey="document">Document</NavItem>
            {
            (segmentsObject.length==0)?(undefined):
            (
            <NavDropdown eventKey={3} title="Segment actuel">                            
                {
                  segmentstabs.map(
                    function(item,idx){                      
                      return (
                        <MenuItem eventKey={"current"+segmentstabs[idx]}>{segmentstabs[idx]}</MenuItem>
                      )
                    }
                  )
                }
            </NavDropdown>
            )
            }
            
            <NavDropdown eventKey={4} title="Analyse">                            
              { 
                (this.props.presentation.Presentation==undefined)?(undefined):(<MenuItem eventKey="presentation">Présentation</MenuItem>)
              }              
              { 
                (this.props.subject.length==0)?(undefined):(<MenuItem eventKey="subject">Sujets</MenuItem>)
              }              
              { 
                (this.props.role.length==0)?(undefined):(<MenuItem eventKey="role">Contributeurs</MenuItem>)
              }
              { 
                (this.props.ressource.length==0)?(undefined):(<MenuItem eventKey="ressource">Ressources</MenuItem>)
              }
              { 
                (this.props.discours.length==0)?(undefined):(<MenuItem eventKey="discours">Discours</MenuItem>)
              }                            
              { 
                (this.props.usage.length==0)?(undefined):(<MenuItem eventKey="usage">Usages</MenuItem>)
              }              
              { 
                (this.props.visuel.length==0)?(undefined):(<MenuItem eventKey="visuel">Expressions visuelles</MenuItem>)
              }              
              { 
                (this.props.audio.length==0)?(undefined):(<MenuItem eventKey="audio">Expressions acoustiques</MenuItem>)
              }              
              { 
                (this.props.presentation.howToQuote==undefined)?(undefined):(<MenuItem eventKey="howtoquote">Comment citer</MenuItem>)
              }              
              { 
                (this.props.presentation.mentions==undefined)?(undefined):(<MenuItem eventKey="mentions">Mentions légales</MenuItem>)
              }              
              { 
                (this.props.droit.length==0)?(undefined):(<MenuItem eventKey="droit">A propos de l'analyse</MenuItem>)
              }              
              
            </NavDropdown>
           
            <NavItem eventKey="surcam">Sur Campus AAR</NavItem>
             <NavItem eventKey="surhal">Sur HAL</NavItem>
        </Nav>
        {this.renderDocument()}
      </div>
    )
  },


  renderdroit()
  {
      var { droit } = this.props;
      var droitpresentation = jQuery.extend(true, {}, droit);
      droit=droitpresentation.droit;
      delete droitpresentation.droit;
      return(
        <div>
        <div>
          <DataTree key="presentation" data={droitpresentation} displaymode="normal"/>
        </div>
        {
        droit.map(function(item, idx){
                if (item.type==undefined)
                  return undefined;
                var title=item.type;
                return (
                  <div>
                    {nl2br('\n')}
                    <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{title}</div>
                    <DataTree key="droits" data={item} displaymode="normal"/>
                  </div>
                );
              }
              )
        }
        </div>
      )
  },



  renderSubject(o)
  {
      var children=[];
      var title;
      for (var key in o)
      {
            if (typeof (o[key])=='object')
            {
              var newitem={};
              var item = jQuery.extend(true, {}, o[key]);
              for (var i in item) {
                var key=Object.keys(item[i])[0];
                newitem[key]=item[i][key];
              }
              children.push(
                    <div>
                      {nl2br('\n')}
                      <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{item[0][Object.keys(item[0])[0]]}</div>
                      <DataTree key="subject" data={newitem} displaymode="normal"/>
                    </div>
              );
            }
      }
      return(
        <div>
          {children}
        </div>
      )
  },


  renderDocument(){
    var title;
    if (this.state.mode == "document")  //"Média" Tab
    {
    const { media } = this.props;
    if ((!media)||(media.length==0))
    {
      return(
        <div>                  
        </div>
        )      
    }
    var content=[];
    title=concate(media.titre,' , '); //media.type;

    var newmedia = jQuery.extend(true, {}, media);
    console.log("NewMedia",newmedia);
    delete newmedia.type;
    delete newmedia.titre;

    for (var k in newmedia)
    {
      var bb=concate((newmedia[k]),' , ');
      content.push(
        <div>
          {nl2br('\n')}
          <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>
            { capitalizeFirstLetter(k)}
          </div>
        <div>
          {
            bb
          }
        </div>
        </div>
      );
    }
    return (
        <div>                  
          <h4 dangerouslySetInnerHTML={{__html:title}} />
          {content}
        </div>
    )
    }

    else if (this.state.mode == "analysis") //"Analyse" Tab
    {
      const { analysis } = this.props;
      //Remove the technique fields.
      if (analysis.metadata)
      {
        delete analysis.metadata.lineNumber;
        delete analysis.metadata.id;
        delete analysis.metadata.type;
        if (analysis.metadata.Réalisateur)
          delete analysis.metadata.Réalisateur.id;
        for (var k in analysis.metadata)
        {
          delete analysis.metadata[k]["id"];
          delete analysis.metadata[k]["type"];
        }
      }
      return (
        <div>        
          <h4 dangerouslySetInnerHTML={{__html:analysis.label}} />
          <DataTree key="analysis" data={analysis.metadata} />
        </div>
      )
    }

    else if (this.state.mode == "current")  //"Séquence(s)" Tab
    {
      const { segments, currentTime } = this.props;
      var visibleSegments = this.computeVisibleSegments(segments, currentTime);
      visibleSegments.forEach(function(entry) {
      //delete entry.id;
      //delete entry.data;
      });
      return (
        <div>
          <h4>{visibleSegments.length + " segments visibles"}</h4>
          {visibleSegments.map((s, idx) => [
          <h5 key={s.id + ".title"}>{s.label || s.id}</h5>,
          <DataTree key={s.id} data={this.processSegment(s)} />
          ])}
        </div>
      )
    }

    else if (this.state.mode == "presentation")  //"Presentation" Tab
    {
      const { presentation } = this.props;
      var presentationdata={};
      var key,value;
      for (var i=0; i<presentation.Presentation.length; i++)
      {        
        key=presentation.Presentation[i].label;
        value=presentation.Presentation[i].value;
        presentationdata[key]=value;
      }
      return (
        <div>                  
          <h4>Présentation</h4>
          <DataTree key="presentation" data={presentationdata} displaymode="normal"/>
        </div>
      )
    }

    else if (this.state.mode == "howtoquote")  //"Comment Citer" Tab
    {
      const { presentation } = this.props;
      var howtoquotedata={};
      var key,value;
      for (var i=0; i<presentation.howToQuote.length; i++)
      {        
        key=presentation.howToQuote[i].label;
        value=presentation.howToQuote[i].value;
        howtoquotedata[key]=value;
      }
      return (
        <div>                  
          <h4>Comment Citer</h4>
          <DataTree key="howtoquote" data={howtoquotedata} displaymode="textonly"/>
        </div>
      )
    }

    else if (this.state.mode == "mentions")  //"Mentions Légales" Tab
    {
      const { presentation } = this.props;
      var mentionsdata={};
      var key,value;

      for (var i=0; i<presentation.mentions.length; i++)
      {        
        key=presentation.mentions[i].label;
        value=presentation.mentions[i].value;
        mentionsdata[key]=value;
      }
      return (
        <div>                  
          <h4>Mentions Légales</h4>
          <DataTree key="mentions" data={mentionsdata} displaymode="changelinetext"/>
        </div>
      )
    }
    else if (this.state.mode == "usage")  //"Usage" Tab
    {
      const { usage } = this.props;
      var usagedatas=[];
      var key,value;
      for (var k in usage)
      {
        usagedatas.push(usage[k]);
      }
      return (
        <div>                  
          <h4>Usage</h4>
          {
            usagedatas.map(function(item, idx){
                return (
                  <div>
                    {nl2br('\n')}
                    <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{item.Type}</div>
                    <DataTree key="usage" data={item} displaymode="normal"/>
                  </div>
                );
              }
            )
          }          
        </div>
      )      
    }
    else if (this.state.mode == "ressource")  //"Ressource" Tab
    {
      const { ressource } = this.props;
      var ressourcedatas=[];
      var key,value;
      for (var k in ressource)
      {
        ressourcedatas.push(ressource[k]);
      }
      return (
        <div>
          <h4>Ressources</h4>                  
          {
            ressourcedatas.map(function(item, idx){
                var title=item.intitulé;
                var newitem = jQuery.extend(true, {}, item);
                delete newitem.intitulé;
                return (
                  <div>
                    {nl2br('\n')}
                    <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{title}</div>
                    <DataTree key="usage" data={newitem} displaymode="normal"/>
                  </div>
                );
              }
            )
          }          
        </div>
      )      
    }
    else if (this.state.mode == "role")  //"Contributeur" Tab
    {
      const { role } = this.props;
      var roledatas=[];
      var key,value;
      for (var k in role)
      {
        roledatas.push(role[k]);
      }
      return (
        <div>                  
          <h4>Contributeur</h4>
          {
            roledatas.map(function(item, idx){
                if (item.intitulé==undefined)
                  return undefined;
                var title=item.intitulé;
                var newitem = jQuery.extend(true, {}, item);
                delete newitem.intitulé;
                delete newitem.institution;
                return (
                  <div>
                    {nl2br('\n')}
                    <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{title}</div>
                    <DataTree key="usage" data={newitem} displaymode="normal"/>
                  </div>
                );
              }
            )
          }          
        </div>
      )      
    }
    else if (this.state.mode == "visuel")  //"Objets visuels" Tab
    {
      const { visuel } = this.props;
      var visueldatas=[];
      var key,value;
      for (var k in visuel)
      {
        visueldatas.push(visuel[k]);
      }
      return (
        <div>                  
          <h4>Objets visuels</h4>
          {
            visueldatas.map(function(item, idx){
                if (item.intitulé==undefined)
                  return undefined;
                var title=item.intitulé;
                var newitem = jQuery.extend(true, {}, item);
                delete newitem.intitulé;
                return (
                  <div>
                    {nl2br('\n')}
                    <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{title}</div>
                    <DataTree key="usage" data={item} displaymode="normal"/>
                  </div>
                );
              }
            )
          }          
        </div>
      )      
    }
    else if (this.state.mode == "audio")  //"Objets sonores" Tab
    {
      const { audio } = this.props;
      var audiodatas=[];
      var key,value;
      for (var k in audio)
      {
        audiodatas.push(audio[k]);
      }
      return (
        <div>           
          <h4>Objets sonores</h4>
          {
            audiodatas.map(function(item, idx){
                if (item.intitulé==undefined)
                  return undefined;
                var title=item.intitulé;
                var newitem = jQuery.extend(true, {}, item);
                delete newitem.intitulé;
                return (
                  <div>
                    {nl2br('\n')}
                    <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{title}</div>
                    <DataTree key="usage" data={item} displaymode="normal"/>
                  </div>
                );
              }
            )
          }          
        </div>
      )      
    }
    else if (this.state.mode == "droit")  //"A PROPOS DE L'ANALYSE" Tab
    {

      return (
        <div>   
              <h4>A propos de l'analyse</h4>
              { this.renderdroit() }
        </div>
      )      
    }
    else if (this.state.mode == "discours")  //"Discours" Tab
    {
      const { discours } = this.props;
      var discoursdatas=[];
      for (var k in discours)
      {
        discoursdatas.push(discours[k]);
      }
      return (
        <div>                  
          <h4>Discours</h4>
          {
            discoursdatas.map(function(item, idx){
                var title=item.Type;
                return (
                  <div>
                    {nl2br('\n')}
                    <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{title}</div>
                    <DataTree key="discours" data={item} displaymode="normal"/>
                  </div>
                );
              }
            )
          }          
        </div>
      )      
    }
    else if (this.state.mode == "subject")  //"Sujets" Tab
    {
      const { subject } = this.props;
      var subjects=[];
      for (var k in subject)
      {
        subjects.push(this.renderSubject(subject[k]));
      }
      return (
        <div>    
          <h4>Sujets</h4>
        {
          subjects
        }              
        </div>
      )      
    }


  else if (this.state.mode.indexOf("current")>-1){                          //"Segment actuel" Tab
    var tab=this.state.mode.substring(7,this.state.mode.length);
    var segmentvalues=[];
    for (var k in segmentsObject)
    {
      var tempvalue={};
      if (segmentsObject[k][tab]!=undefined)
      {
        for (var l=0; l<segmentsObject[k][tab].length ;l++)
          for (var m in segmentsObject[k][tab][l])
          {
            tempvalue[m]=segmentsObject[k][tab][l][m];
          }
      segmentvalues.push(
        <div>
         <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{
            getSegmentName(k)
          }</div>
          
          <DataTree key="segment" data={tempvalue} displaymode="normal"/>        
        </div>
      );
      }
    }
    return (
      <div>
        {segmentvalues}
      </div>
    );
  }


    else if (this.state.mode == "surcam")  //"Sur Campus AAR" Tab
    {
      const { role,subject } = this.props;
      var roledatas=[];
      for (var k in role)
      {
        roledatas.push(role[k]);
      }

      var subjects=[];
      for (var k in subject)
      {
        subjects.push(subject[k].label);
      }

      return (
        <div>    
          <h4>Sur Campus aar</h4>
          {
          (roledatas.length>0)?
          (<div>
            <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>Du même auteur</div>
            {
              roledatas.map(
                function(item,idx)
                {
                  var auteur=item['intitulé'].trim();
                  var url='../search?q='+auteur.split(' ').join('+');
                  return (
                    <div>
                      <a href={url} target='_blank'>{auteur}</a>
                    </div>
                  )
                }
              )
            }
          </div>
          )
          :(<div></div>)
          }
          {
          (subjects.length>0)?
          (<div>
            <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>Même thème</div>
            {
              subjects.map(
                function(item,idx)
                {
                  var subject=item.trim();
                  var url='../search?q='+subject.split(' ').join('+');
                  return (
                    <div>
                      <a href={url} target='_blank'>{subject}</a>
                    </div>
                  )
                }
              )
            }
          </div>
          )
          :(<div></div>)
          }


        </div>
      )      
    }
    ///////////////

    else if (this.state.mode == "surhal")  //"Sur HAL" Tab
    {
      const { role,subject } = this.props;
      var roledatas=[];
      for (var k in role)
      {
        roledatas.push(role[k]);
      }

      var subjects=[];
      for (var k in subject)
      {
        subjects.push(subject[k].label);
      }

      return (
        <div>    
          <h4>Sur HAL</h4>
          {
          (roledatas.length>0)?
          (<div>
            <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>Du même auteur</div>
            {
              roledatas.map(
                function(item,idx)
                {
                  var auteur=item['intitulé'].trim();
                  var url='https://aurehal.archives-ouvertes.fr/author/browse?critere='+auteur.split(' ').join('+');
                  return (
                    <div>
                      <a href={url} target='_blank'>{auteur}</a>
                    </div>
                  )
                }
              )
            }
          </div>
          )
          :(<div></div>)
          }
          {
          (subjects.length>0)?
          (<div>
            <div style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>Même thème</div>
            {
              subjects.map(
                function(item,idx)
                {
                  var subject=item.trim();
                  var url='https://hal.archives-ouvertes.fr/search/index/?q='+subject.split(' ').join('+');
                  return (
                    <div>
                      <a href={url} target='_blank'>{subject}</a>
                    </div>
                  )
                }
              )
            }
          </div>
          )
          :(<div></div>)
          }


        </div>
      )      
    }

    else
    {
      return undefined;
    }
  }  
});

module.exports = { VideoDocument };
