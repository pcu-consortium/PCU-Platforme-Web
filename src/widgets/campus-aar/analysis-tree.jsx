
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import remoteComponent from 'utils/remote-component';

import { LoadingSpinner, LoadingColor } from 'components/spinner/loading-spinner';
import { Well } from 'react-bootstrap';
import request from 'superagent';
import './campus-widgets.css';

import { Grid, Row } from 'react-bootstrap';
import { RemoteAnalysisDetail } from './analysis';

var Subject = React.createClass({
  getInitialState() {
    return {
      open: this.props.initialOpen
    }
  },

  onClick(e) {
    const { id, label, children, onClick } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (children) {
      this.setState({
        open: !this.state.open
      });
    } else {
      onClick(this.props);
    }
  }, 

  render() {
    const { id, label, selected, children, analysis, topicCache } = this.props;
    var labelSpan = label;
    var hasChildren = children && children.length > 0;
    if (!hasChildren){
      const isSelected = (selected && (selected.label === label));
      const color = isSelected ? '#0c84e4' : undefined;
      if (analysis) {
        labelSpan = <span style={{color}}>{labelSpan} ({analysis.length})</span>;
      } else {
        // No "analysis" children, will require a query
        labelSpan = <span style={{color}}>{labelSpan}</span>;
      }
    }
    return (
      <div>
        <div className="folder-info" onClick={this.onClick} style={{cursor: "pointer"}}>
          {this.renderFolderIcon(hasChildren)}
          {labelSpan}
        </div>
        {this.renderChildren(children)}
        {(this.state.open && !hasChildren) ? this.renderTopics(topicCache.get(id).data) : undefined}
      </div>
    );
  },

  renderFolderIcon(hasChildren) {
    var icon;
    if (!hasChildren) icon = '';
    else icon = this.state.open ? 'chevron-down' : 'chevron-right';
    return <div className="folder-icon"><FAIcon icon={icon} /></div>;
  },

  renderChildren(children) {
    if (!this.state.open || !children || children.length === 0) {
      return undefined;
    }

    const { selected, topicCache } = this.props;
    return (
      <div style={{paddingLeft: 24}}>
        {children.map((subject, idx) => <Subject key={idx} {...subject} onClick={this.props.onClick} selected={selected} />)}
      </div>
    );
  }
});

var AnalysisTree = React.createClass({
  mixins: [ WidgetMixin ],

  getInitialState(){
    return {
      selected: undefined
    }
  },

  handleClick(selected){
    console.log('open', selected);
    this.setState({selected});
  },

  render() {
    const { label } = this.props;
    return (
      <Grid fluid>
        <Row>
          <Col className="subject-panel" md={5}>
            <Well bsSize="small">
              <div className="subject-panel-contents">
                <h5>{label}</h5>
                {this.renderObjects()}
              </div>
            </Well>
          </Col>
          <Col className="subject-panel" md={7}>
            <Well bsSize="small">
              <div className="subject-panel-contents">
                <h5>Analyses</h5>
                {this.renderDetails()}
              </div>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  },

  renderObjects(){
    const { data, isRefreshing } = this.props;

    const { selected } = this.state;
    const entries = (Array.isArray(data) ? data : (data.children || []));
    return entries.map((object, idx) => (
      <Subject key={idx} {...object} onClick={this.handleClick} selected={selected} />
    ));
  },

  renderDetails(){
    const { selected } = this.state;
    if (!selected) return false;

    // Overridable details renderer
    const { detailsRenderer } = this.props;
    if (detailsRenderer){
      return detailsRenderer(selected);
    }
    // return (
    //   <ul>
    //     {selected.analysis.map((a, idx) => <li key={idx}>{a.title}</li>)}
    //   </ul>
    // );

    // var toSearch = selected.id.slice(selected.id.indexOf('#')+1);
    var url = this.context.api + '/analysis/_mget';
    console.log('selected');
    var postData = {
      ids: selected.analysis
    }
    return (
      <RemoteAnalysisDetail url={url} postData={postData} title={selected.label || selected.title} />
    )
  }
});

var RemoteAnalysisTree = remoteComponent(AnalysisTree);

var AudioVisualWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/themes/audiovisual';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="Objets Audioviduels"
                          url={this.makeUrl()} 
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});


var AnalysisTypesWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/themes/analysisTypes';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="Types d'analyses" 
                          url={this.makeUrl()} 
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});

var RoleTypesWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/roles';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="Contributeurs par roles" 
                          url={this.makeUrl()} 
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});


var AnalysisTypesWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/themes/analysisTypes';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="Types d'analyses" 
                          url={this.makeUrl()} 
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});


var TraductionWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/traduction';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="Traduction" 
                          url={this.makeUrl()} 
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});



var DiscoursWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/discours';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="discours" 
                          url={this.makeUrl()} 
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});


var UsageWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/usage';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="usage" 
                          url={this.makeUrl()} 
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});



var ClassificationWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/classification';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteAnalysisTree {...this.props} 
                          label="Classification" 
                          url={this.makeUrl()} 
                          detailsRenderer={this.renderDetails}
                          initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  },

  renderDetails(selected){
    var url = this.context.api + '/classification/analysis?uri=' + encodeURIComponent(selected.id);
    return (
      <RemoteAnalysisDetail url={url} title={selected.label} />
    )
  }
});


WidgetManager.registerWidget("AudioVisual", {
  component: AudioVisualWidget,
  icon: 'film',
  config: [
  ]
});

WidgetManager.registerWidget("Roles", {
  component: RoleTypesWidget,
  icon: 'film',
  config: [
  ]
});


WidgetManager.registerWidget("AnalysisTypes", {
  component: AnalysisTypesWidget,
  icon: 'film',
  config: [
  ]
});

WidgetManager.registerWidget("Classification", {
  component: ClassificationWidget,
  icon: 'film',
  config: [
  ]
});

WidgetManager.registerWidget("Traduction", {
  component: TraductionWidget,
  icon: 'film',
  config: [
  ]
});


WidgetManager.registerWidget("Discours", {
  component: DiscoursWidget ,
  icon: 'film',
  config: [
  ]
});
WidgetManager.registerWidget("Usage", {
  component: UsageWidget ,
  icon: 'leaf',
  config: [
  ]
});
