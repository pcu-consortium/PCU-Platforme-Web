
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import remoteComponent from 'utils/remote-component';

import PanelListItem from 'components/ui/panel-list-item';
import { LoadingSpinner, LoadingColor } from 'components/spinner/loading-spinner';
import { Well } from 'react-bootstrap';
import request from 'superagent';

import { Grid, Row } from 'react-bootstrap';
import { RemoteAnalysisDetail } from './analysis';
import './campus-widgets.css';

class ListCache {
  constructor(urlMaker, notifier){
    this.urlMaker = urlMaker;
    this.notifier = notifier;
    this.cache = {}
  }

  get(id){
    if (!this.cache[id]){
      // Fetch... empty for now
      this.cache[id] = {
        state: 'pending'
      };
      request.get(this.urlMaker(id))
        .set('Accept', 'application/json')
        .end((err, res) => {
          this.cache[id] = {
            state: 'ok',
            data: res.body
          };
          this.notifier();
        });
    }

    return this.cache[id];
  }
}

var Subject = React.createClass({
  getInitialState() {
    return {
      open: this.props.initialOpen
    }
  },

  onClick(e) {
    const { id, label, children } = this.props;
    e.preventDefault();
    e.stopPropagation();
    // if (children) {
      this.setState({
        open: !this.state.open
      });
    // } else {
    //   console.log('topics', topicCache.get(id));
    //   // this.props.onClick({id, label});
    // }
  },

  render() {
    const { id, label, selected, children, topicCache } = this.props;
    var labelSpan = label;
    var hasChildren = children && children.length > 0;
    if (selected && (selected.id === id)){
      labelSpan = <strong>{label}</strong>;
    }
    return (
      <div>
        <div className="folder-info" onClick={this.onClick} style={{cursor: "pointer"}}>
          {this.renderFolderIcon(children)}
          {labelSpan}
        </div>
        {this.renderChildren(children)}
        {(this.state.open && !hasChildren) ? this.renderTopics(topicCache.get(id).data) : undefined}
      </div>
    );
  },

  renderFolderIcon(children) {
    const { id, topicCache } = this.props;
    // if ((!children || children.length === 0) && ((topics.state == 'ok'))){
    //   return <div className="folder-icon" />;
    // }

    const hasChildren = children && children.length > 0;
    var spin = false;
    var icon;
    if (hasChildren) {
      // Other subjects
      icon = this.state.open ? 'chevron-down' : 'chevron-right';
    } else {
      const topics = !hasChildren && topicCache.get(id);
      if (topics.state === 'pending'){
        spin = true;
        icon = 'refresh';
      } else  {
        // No subjects, directly going to topics
        const hasTopics = topics.data && topics.data.length > 0;
        if (!hasTopics) icon = '';
        else icon = this.state.open ? 'chevron-down' : 'chevron-right';
      }
    }
    return <div className="folder-icon"><FAIcon icon={icon} spin={spin} /></div>;
  },

  renderChildren(children) {
    if (!this.state.open || !children || children.length === 0) {
      return undefined;
    }

    const { selected, topicCache } = this.props;
    return (
      <div style={{paddingLeft: 24}}>
        {children.map((subject, idx) => <Subject key={idx} {...subject} topicCache={topicCache} onClick={this.props.onClick} selected={selected} />)}
      </div>
    );
  },

  renderTopics(topics) {
    if (!topics) return undefined;

    // if (!this.state.open || !topics || topics.length === 0) {
    //   return undefined;
    // }

    const { selected, onClick } = this.props;
    return (
      <div style={{paddingLeft: 32, cursor: "pointer"}}>
        {topics.map((topic, idx) => {
          let color = topic === selected ? '#0c84e4' : undefined;
          return <div key={idx} style={{color}} onClick={() => onClick(topic)}>{topic.title} ({topic.analysis.length})</div>
        })}
      </div>
      )
  }
});

var Subjects = React.createClass({
  mixins: [ WidgetMixin ],

  getInitialState(){
    return {
      selected: undefined,
      topicCache: new ListCache(this.makeUrl, this.onUpdate)
    }
  },

  getDefaultProps(){
    return {
      ignoreRoot: false
    };
  },

  makeUrl(uri){
    return this.context.api + '/topics?uri=' + encodeURIComponent(uri);
  },

  onUpdate(){
    if (this.isMounted()){
      console.log('forceUpdate');
      this.forceUpdate();
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
          <Col className="subject-panel" md={6}>
            <Well bsSize="small">
              <div className="subject-panel-contents" style={{maxHeight: 400, overflowY: 'scroll'}}>
                <h5>Sujets</h5>
                {this.renderSubjects()}
              </div>
            </Well>
          </Col>
          <Col className="subject-panel" md={6}>
            <Well bsSize="small">
              <div className="subject-panel-contents" style={{maxHeight: 400, overflowY: 'scroll'}}>
                <h5>Analyses</h5>
                {this.renderDetails()}
              </div>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  },

  renderSubjects(){
    const { ignoreRoot, data } = this.props;
    const { selected, topicCache } = this.state;
    if (ignoreRoot){
      return (data.children || []).map(subject => (
        <Subject {...subject} onClick={this.handleClick} selected={selected} topicCache={topicCache} />
      ));
    }
    return data.map((subject, idx) => (
      <Subject {...subject} initialOpen={data.length <= 1} onClick={this.handleClick} key={idx} selected={selected} topicCache={topicCache} />
    ));
  },

  renderDetails(){
    const { selected } = this.state;
    if (!selected) return false;
    // return (
    //   <ul>
    //     {selected.analysis.map((a, idx) => <li key={idx}>{a.title}</li>)}
    //   </ul>
    // );

    // var toSearch = selected.id.slice(selected.id.indexOf('#')+1);
    var url = this.context.api + '/analysis/_mget';
    console.log('selected');
    var postData = {
      ids: selected.analysis.map(a => a.id)
    }
    return (
      <RemoteAnalysisDetail url={url} postData={postData} title={selected.label || selected.title} />
    )
  }
});

var RemoteSubjects = remoteComponent(Subjects);

var CmsSubjects = React.createClass({
  mixins: [ WidgetMixin, React.addons.PureRenderMixin ],

  getDefaultProps(){
    return {
      lang: 'fr',
      ignoreRoot: false
    }
  },

  makeUrl(){
    const { lang } = this.props;
    var url = this.context.api + '/subjects?lang=' + lang;
    // if (props.rootId){
    //     url += '?rootId=' + props.rootId;
    // }
    console.log('url', url);
    return url;
  },

  render(){
    return (
      <RemoteSubjects {...this.props} url={this.makeUrl()} />
    ); 
  }
});


WidgetManager.registerWidget("Subjects", {
  component: CmsSubjects,
  icon: 'sitemap',
  config: [
  ]
});

module.exports = CmsSubjects;
