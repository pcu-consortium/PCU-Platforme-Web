
// import classNames from 'classnames';
import './data-tree.css';
import _ from 'lodash/object';
const nl2br = require('react-nl2br');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Just for campus-arr
function campusarrString(string) {
switch (string) {
  case "Intitulé":
    return "Titre";
    /*
  case "Subtitle":
  case "SubTitle":  
    return "Sous-titre";
  case "Label":
    return "Intitulé";
  case "Tags":
    return "Classification";
  case "About":
    return "Sujets";*/
  default:
    return string;
  }
}

var DataLine = React.createClass({
  mixins: [ React.addons.PureRenderMixin ],

  render(){
    const { label, value, onClick, valueClass, displaymode } = this.props;
    var span,spankey;
    if (((typeof value) === "string") && (value.indexOf('&#') != -1)){
      span = <span className={valueClass} dangerouslySetInnerHTML={{__html: value}} />
    } else {
      span = <span className={valueClass}>{value}</span>;
    }
    if (displaymode=='textonly')
    {
      return (
        <div className={"dtree-line"} onClick={onClick}> {span}</div>
      );
    }
    else if (displaymode=='changelinetext')
    {
      return (
        <div className={"dtree-line"} onClick={onClick}><span style={{backgroundColor:'black',color:'white',fontWeight:'bold'}}>{nl2br('\n')}  {campusarrString(capitalizeFirstLetter(label))} {nl2br('\n')} </span>Type: {capitalizeFirstLetter(label)} {nl2br('\n')} {span}</div>
      );
    }
    else
    {
      //interactive url fields
      if ((label.toUpperCase().indexOf('LOCALISATION DU SUJET DANS') > -1) || (label.toUpperCase().indexOf('DESCRIPTION DE LA TOPIQUE') > -1) || (label.toUpperCase().indexOf('DISCOURS') > -1) || (label.toUpperCase()=='AUTEUR') || (label.toUpperCase()=='TYPE') || (label.toUpperCase()=='PUBLIC') || (label.toUpperCase()=='TITRE') || (label == 'Titre') || (label.toUpperCase()=='INTITULE')|| (label.toUpperCase()=='ROLE') || (label.toUpperCase()=='NOM DE FAMILLE')|| (label.toUpperCase()=='SUJET') )
      {
        if (value.indexOf(';')==-1)
        {
          span = (<a href={'../search?q='+value} target="_blank">{value}</a>);
        }
        else//the value contains ';', means that more than one clickable url
        {
          span=value.split(';').map(
            function(item,idx)
            {
              return (<a href={'../search?q='+item} target="_blank">{item+';'}</a>)
            }
          )
        }
      }

      if (label.toUpperCase()=='URL')
      {
        span=<a href={value} target="_blank">{value}</a>;
      }
      if (label.toUpperCase()=='VALUE')
      {
        return (
          <div className={"dtree-line"}>{nl2br('\n')}{span}</div>
        );
      }
      return (
        <div className={"dtree-line"} onClick={onClick}><span style={{fontWeight:'bold'}}>{campusarrString(capitalizeFirstLetter(label))}:</span> {span}</div>
      );
    }
  }
})

var DataNode = React.createClass({
  // mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    label: React.PropTypes.string.isRequired,
    data: React.PropTypes.any.isRequired,
    showLabel: React.PropTypes.bool
  },


  getInitialState(){
    const { showLabel, open, autoOpenDepth } = this.props;
    return {
      open: !showLabel || open || (autoOpenDepth > 0)
    };
  },

  getDefaultProps(){
    return {
      showLabel: true,
      autoOpenDepth: 0
    };
  },

  toggleOpen(e){
    this.setState({open: !this.state.open});
    e.preventDefault();
    e.stopPropagation();
  },

  render(){
    if (!this.props.showLabel){
      return (
        <div>
          {this.renderChildren()}
        </div>
      );
    }
    return (
      <div className="dtree-entry">
        {this.renderKV()}
        {this.renderSub()}
      </div>
    );
  },

  renderKV(){
    const { label, data, displaymode } = this.props;
    switch(typeof data){
      case "string": return <DataLine valueClass="dtree-string" label={label} value={data} displaymode={displaymode}/>;
      case "number": return <DataLine valueClass="dtree-number" label={label} value={data} />;
      case "boolean": return <DataLine valueClass="dtree-bool" label={label} value={data ? "true" : "false"} />;
      case "object": {
        var value = Array.isArray(data) ? (data.length + ' items') : (_.values(data).length + ' fields');
        value="";

        return <DataLine valueClass="dtree-object" label={label} value={value} onClick={this.toggleOpen}/>;
      }
    };
  },

  renderSub(){
    const { open } = this.state;
    const { data } = this.props;
    if (((typeof data) != "object") || !open){
      return undefined;
    }
    return (
      <div className="dtree-children">
        {this.renderChildren()}
      </div>
    );
  },

  renderChildren(){
    const { data, autoOpenDepth } = this.props;
    var mapper = Array.isArray(data) 
      ? (f => data.map((v, k) => f(v, k+1))) 
      : (f => _.keys(data).map(k => f(data[k], k)));
    return mapper((value, key) => <DataNode displaymode={this.props.displaymode} key={key} label={""+key} data={value} autoOpenDepth={autoOpenDepth-1} />);
  }
});

var DataTree = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getDefaultProps(){
    return {
      label: 'root'
    };
  },

  render(){
    if (!this.props.data){
      return false; // Nothing here (yet)
    }
    return (
      <div style={{width: '100%', overflowX: 'hidden'}}>
        <DataNode {...this.props}  showLabel={false} autoOpenDepth={2} />
      </div>
    )
  }
});


module.exports = DataTree;
