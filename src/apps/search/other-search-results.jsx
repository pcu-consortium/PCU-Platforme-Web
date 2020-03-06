
import { LoadingSpinner, LoadingColor } from 'components/spinner/loading-spinner';
import PanelListItem from 'components/ui/panel-list-item';



var OtherSearchResult = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render(){
    const { items, isRefreshing } = this.props;

    var itemList;
    if (isRefreshing){
      itemList = [ 
        <PanelListItem key="-1">
          <LoadingSpinner color={LoadingColor} style={{margin: "20px auto"}} />
        </PanelListItem> 
      ];
    } else {
      itemList = items.map((it, idx) => <PanelListItem key={idx} href={it.id} target="_blank">{it.title}</PanelListItem>);
    }

    return (
        <PanelList {...this.props}>
            {itemList}
        </PanelList>
    );
  }
});

var OtherSearchResults = React.createClass({
  mixins: [React.addons.PureRenderMixin, URLFetcher],

  getInitialState(){
      return {
          data: undefined
      };
  },

  getDefaultProps(){
    return {
      query: ""
    };
  },

  refresh(query){
    var url = '/test/api/rameau?q=' + encodeURIComponent(query) + '&limit=5';
    this.fetchUrl(url);
  },

  componentDidMount(){
    this.refresh(this.props.query);
  },

  componentDidUpdate(prevProps){
    if (prevProps.query != this.props.query){
      this.refresh(this.props.query);
    }
  },

  getItems(key, label){
    const { data } = this.state;
    if (!data || !data[key] || !data[key].hits) return [];
    return this.state.data[key].hits.hits.map(it => ({title: it._source[label], id: it._source.id}));
  },

  getCount(key){
    const { data } = this.state;
    if (!data || !data[key] || !data[key].hits) return 0;
    return this.state.data[key].hits.total;
  },

  render(){
    return (
      <div>
        {this.renderResults("Rameau - concepts", "concepts", "prefLabel", "info")}
        {this.renderResults("Rameau - periodics", "periodics", "rdfs:label", "success")}
      </div>
    );
  },

  renderResults(title, resultKey, titleKey, bsStyle){
    var isRefreshing = this.isRefreshing();
    var cnt = this.getCount(resultKey);
    // isRefreshing = true;
    var titleEl;
    if (!isRefreshing) titleEl = <span>{title}<span className="pull-right">{cnt} résultats</span></span>;
    else titleEl = title;
    return <OtherSearchResult title={titleEl} total={cnt} bsStyle={bsStyle}
                              items={this.getItems(resultKey, titleKey)} 
                              isRefreshing={isRefreshing} />
  }
});

module.exports = OtherSearchResults;