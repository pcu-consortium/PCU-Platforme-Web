
import WidgetMixin from 'widgets/widget-mixin';
import remoteComponent from 'utils/remote-component';

import { LoadingSpinner, LoadingColor } from 'components/spinner/loading-spinner';
import { Grid, Row } from 'react-bootstrap';
import MediaElementList from 'apps/search/media-element/media-element-list';


var AnalysisPreview = React.createClass({

  getVideoUrl(){
    const { analysis, baseUrl } = this.props;
    // Strip ID if needed...
    //console.log('object analysis:',analysis);
    var id;
    if (analysis && analysis.id)
      id = analysis.id.replace(/^<(.*)>$/, '$1');
    else
      id = 'videoNotFound';
    return baseUrl + 'video/' + encodeURIComponent(id);
  },

  render(){
    const { analysis } = this.props;
    if (analysis)
      return <MediaElementList data={analysis} href={this.getVideoUrl()}  />;
    else return undefined;
  }
});


export var AnalysisDetail = React.createClass({
  mixins: [ React.addons.PureRenderMixin, WidgetMixin ],

  render(){
    const { title, data, isRefreshing } = this.props;
    var results = [];
    for (var i=0; i< data.results.length; i++)
    {
      if (data.results[i] != null)
      results.push(data.results[i]);
    }
    if (isRefreshing){
      return (
        <LoadingSpinner color={LoadingColor} style={{margin: "0px auto"}} />
      )
    }
    if (results.length == 0) {
      return (
        <div>
          <p>aucun résultat pour {title}</p>
        </div>
      );
    }
    return (
      <div>
        <p>{this.renderLength()} pour {title}</p>
        {this.renderResults(results)}
      </div>
    );
  },

  renderLength(){
    const { data } = this.props;
    const length = data.results ? data.results.length : 0;
    switch(length){
      case 0: return "aucun résultat";
      case 1: return "1 résultat";
      default: return length + " résultats";
    }
  },

  renderResults(results){
    console.log('results', results);
    return (
      <Grid fluid style={{padding: 0}}>
        <Row>
          {results.map((a, idx) => <AnalysisPreview key={idx} analysis={a} baseUrl={this.context.baseUrl} />)}
        </Row>
      </Grid>
    )
  }
});

export var RemoteAnalysisDetail = remoteComponent(AnalysisDetail);

