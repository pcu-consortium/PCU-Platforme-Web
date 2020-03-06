
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import remoteComponent from 'utils/remote-component';
import SearchResultsWidget from 'widgets/search/search-results-widget';

import { LoadingSpinner, LoadingColor } from 'components/spinner/loading-spinner';
import { Well } from 'react-bootstrap';
import request from 'superagent';

import { Grid, Row } from 'react-bootstrap';
import { RemoteAnalysisDetail } from './analysis';
import './campus-widgets.css';

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
      labelSpan = <span style={{color}}>{labelSpan}</span>;
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

var Glossary = React.createClass({
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
    return (
      <Grid fluid>
        <Row>
          <Col className="subject-panel" md={5}>
            <Well bsSize="small">
              <div className="subject-panel-contents">
                <h5>Lexique</h5>
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
    return (data.children || []).map((object, idx) => (
      <Subject key={idx} {...object} onClick={this.handleClick} selected={selected} />
    ));
  },

  renderDetails(){
    const { selected } = this.state;
    if (!selected) return false;
    var query = '"' + selected.id + '"'; // Quotes are important ! (to avoid parsing XYZ-ABC)
    return (
      <SearchResultsWidget key={selected.id} query={query} showUI={true} searchLabel={selected.label} />
    )
  }
});

var RemoteGlossary = remoteComponent(Glossary);

var GlossaryWidget = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  makeUrl(){
    var url = this.context.api + '/themes/glossary';
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteGlossary {...this.props} 
                      url={this.makeUrl()} 
                      initialComponent={<LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />} />
    ); 
  }
});


WidgetManager.registerWidget("Glossary", {
  component: GlossaryWidget,
  icon: 'book',
  config: [
  ]
});

module.exports = Glossary;
