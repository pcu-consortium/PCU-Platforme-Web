
import remoteComponent from 'utils/remote-component';
import WidgetManager from '../widget-manager';
import WidgetMixin from '../widget-mixin';
import SearchResults from 'apps/search/search-results';

const DEFAULT_LIMIT = 24;

var SearchResultsWidget = React.createClass({
  mixins: [URLFetcher, WidgetMixin],

  getInitialState () {
      return {
          limit: this.props.limit,
          fetchingMore: false,
          data: undefined,
          searchLabel: this.props.searchLabel
          // viewMode: this.props.viewMode
      };
  },

  getDefaultProps(){
      return {
        viewMode: "list",
        query: "",
        filters: [],
        requiresFilters: false,
        limit: DEFAULT_LIMIT,
        showUI: false,
        results: [],
        searchLabel: undefined
      }
  },

  handleViewChange(viewMode){
    this.setState({viewMode});
  },

  // handleSelectDocument(docid){
  //   console.log('select', docid);
  // },

  onDataUpdated(data){
    // TODO: put the current search label...
    const { searchLabel } = this.props;
    this.setState({searchLabel})
  },

  makeUrl(query, filters, sort){
      const { source, limit } = this.props;
      if ((typeof query) !== 'string'){
        query = "";
      } else {
        query = encodeURIComponent(query.trim());
      }
      var url = this.context.api + '/search?q=' + query + '&no-facets&limit=' + limit;
      if (source){
          url += '&source=' + source;
      }
      if (filters && filters.length > 0){
          filters = encodeURIComponent(JSON.stringify(filters));
          url += "&filters=" + filters;
      }
      if (sort && sort != 'relevance'){
          url += "&sort=" + sort;
      }
      return url;
  },

  getDocumentUrl(doc){
    const id = doc.id.replace(/^<(.*)>$/, '$1');
    return this.context.baseUrl + 'video/' + encodeURIComponent(id);
  },

  refreshSearch(){
    const { query, filters, requiresFilters } = this.props;
    if (requiresFilters){
      if (filters.length == 0) return;
      var filter = filters[0];
      if (filter[Object.keys(filter)[0]] === undefined){
        return; // Missing filter
      }
    }

    this.fetchUrl(this.makeUrl(query, filters));
  },

  componentDidMount(){
    this.refreshSearch();
  },

  componentDidUpdate(){
    this.refreshSearch();
  },

  onShowMore(){
    var next = this.state.data.next;
    if (!next || this.state.fetchingMore){
        return;
    }
    this.setState({
        fetchingMore: true
    });
    $.getJSON(next, data => {
        var results = this.state.data;
        results.results.hits = results.results.hits.concat(data.results.hits);
        results.next = data.next;
        this.setState({
            fetchingMore: false
        });
    });
  },

  render(){
    if (!this.state.data){
      return false;
    }
    const { showUI } = this.props;
    const { searchLabel } = this.state;
    var { data:results, viewMode } = this.state;
    if (!viewMode) viewMode = this.props.viewMode;
                    // onSelectDocument={this.handleSelectDocument}
    return <SearchResults {...results} 
                    searchLabel={searchLabel}
                    urlMaker={this.getDocumentUrl}
                    hasMore={results.next} 
                    onViewChange={this.handleViewChange}
                    viewMode={viewMode}
                    headless={!showUI}
                    onShowMore={this.onShowMore} />
  }
});


WidgetManager.registerWidget("SearchResults", {
    component: SearchResultsWidget,
    icon: "search",
    config: [
      {key: "query",  type: "input"},
      {key: "limit",  type: "number"},
      {key: "viewMode",  type: "selector", values: ["list", "large", "small"]},
      {key: "showUI",  type: "boolean"},
      // {key: "showUI",  type: "selector", values: [false, true]},
    ],
    defualtValue: {
      type: "SearchResults",
      query: "",
      limit: 5
    }
});

export default SearchResultsWidget;
