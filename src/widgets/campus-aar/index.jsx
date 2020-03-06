
import WidgetManager from 'widgets/widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import SquareImage from 'components/image/square-image';
import CmsSubjects from './subjects';
import './analysis-tree';
import './glossary';

var AnalyseWidget = React.createClass({
  mixins: [WidgetMixin, URLFetcher],

  getDefaultProps: function() {
    return {
      limit: 5
    }
  },

  getInitialState: function(){
    return {
      pages: [],
      data: {children:[]}
    }
  },

  makeUrl: function(props){
    var url = this.context.api + '/analysis';
    if (props.limit){
      url += '?limit=' + props.limit;
    }
    return url;
  },

  componentWillReceiveProps: function(nextProps){
    this.fetchUrl(this.makeUrl(nextProps));
  },

  componentDidMount: function(){
    this.fetchUrl(this.makeUrl(this.props));
  },

  render: function(){
    //var analyses = [
    //    {'rdfs:label': 'Analyse 1', docid: 2, 'core:ontology': 'Subject'},
    //    {'rdfs:label': 'Analyse 2', docid: 2, 'core:ontology': 'Other subject'},
    //    {'rdfs:label': 'Analyse 3', docid: 2, 'core:ontology': 'Last subject'}
    //];
    var analyses = [];
    if (this.state.data && this.state.data.result){
      analyses = this.state.data.result;
    }
    return (
      <div className="fluid-container">
        <Row>
          {analyses.map(this.renderAnalysis)}
        </Row>
      </div>
    )
  },

  getGridSize: function(){
    if (!this.props.gridSize){
      return 1;
    }
    var size = Number(this.props.gridSize);
    if (isNaN(size)){
      return 1;
    }
    return size;
  },

  renderAnalysis: function (analysis, idx) {
    var cleanString = function (str) {
      return str.replace(/@fr/g, "").replace(/^"(.+(?="$))"$/, '$1').replace(/\\\"/g, "\"");
    };

    var title = cleanString(analysis['rdfs:label']);
    var url = analysis.url;
    var ontologie = analysis['core:ontology'];
    var author = "FMSH";
    var imgSize = "88px";
    var bsSize = 12 / this.getGridSize();
    return (
      <Col key={idx} md={bsSize}>
        <div className="list-item thumbnail" style={{position: 'relative'}} onClick={this.handleClick}>
          <div className="media-left" style={{
      width: imgSize,     minWidth: imgSize,
      height: imgSize,    boxSizing: "content-box"
      }}>
            {this.renderImage()}
          </div>
          <div className="media-body" style={{display: 'table-cell', width: '100%'}}>
            <div style={{display: 'table', width: '100%'}}>
              <div style={{display: 'table-cell', width: 'auto'}}>
                <strong>
                  <a className="height-2" style={{height: '40px'}} href={url}>{title}</a>
                </strong>

                <div>Sujet: {ontologie}</div>
                <div>Auteur: {author}</div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    )
  },

  renderImage: function(){
    if (!this.props.thumbnail){
      return undefined;
    }
    return <SquareImage width={imgSize} src={this.props.thumbnail}/>;
  }
});




WidgetManager.registerWidget("Analyses", {
  component: AnalyseWidget,
  config: [
    {key: "gridSize", type: "selector", values: [1, 2, 3]},
    {key: "limit",    type: "selector", values: [3, 5, 10, 50, 100]}
  ]
});

module.exports = {
  CmsSubjects, AnalyseWidget
}