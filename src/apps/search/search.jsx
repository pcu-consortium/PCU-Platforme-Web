import Router from 'react-router';

import SearchBox from 'components/search/search-box';
import { Facets } from './facets';
import SearchManager from './manager';
import { FullscreenLoadingSpinner } from 'components/spinner/loading-spinner';
import SearchResults from './search-results';
import OtherSearchResults from './other-search-results';
import DocumentPreview from './document-preview';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Helmet from 'react-helmet';
import AutoAffix from 'react-overlays/lib/AutoAffix';

const DEFAULT_LIMIT = 24;


var SortButton = React.createClass({
  getDefaultProps(){
    return {
      selected: 'relevance'
    }
  },
  render(){
    const { onSelect, selected } = this.props;
    var label = selected == 'relevance' ? 'pertinence' : 'date';
    return (
      <DropdownButton title={'Tri par ' + label} id='search-sort-dropdown' onSelect={onSelect}>
        <MenuItem eventKey='relevance'>Pertinence</MenuItem>
        <MenuItem eventKey='date'>Date</MenuItem>
      </DropdownButton>
    );
  }
});

/*
 * Search application
 */
var SearchWindow = React.createClass({
  mixins: [URLFetcher, Router.Navigation],

  propTypes: {
    source: React.PropTypes.string,
    limit: React.PropTypes.number
  },

  contextTypes: {
      location: React.PropTypes.object,
      history: React.PropTypes.object,
      site: React.PropTypes.string
  },

  getInitialState () {
    return {
      limit: this.props.limit,
      repositories: this.props.repositories ? this.props.repositories.slice() : [],
      fetchingMore: false,
      data: {...this.props}, // Clone data, it's immutable by default
      selectedDocument: undefined,
      showDocument: false,
      sort: this.props.sort
    };
  },

  getDefaultProps(){
    return {
      limit: DEFAULT_LIMIT,
      query: "",
      sort: 'relevance',
      results: []
    }
  },

  onSearch(search){
    this.refreshSearch(search, this.getFilters(), this.state.sort);
  },

  getQuery(){
    return this.context.location.query;
  },

  makeUrl(query="", filters, sort){
    const { source, limit, api } = this.props;
    query = encodeURIComponent(query.trim());
    var url = api + '/search';
    if (source) url += `/${source}`;
    url += '?q=' + query + '&limit=' + limit;
    if (filters && filters.length > 0){
      filters = encodeURIComponent(JSON.stringify(filters));
      url += "&filters=" + filters;
    }
    if (sort && sort != 'relevance'){
      url += "&sort=" + sort;
    }
    return url;
  },

  updateSearchUrl(queryParams){
    const { site, history } = this.context;
    const { source } = this.props;
    var path = `/${site}/search`;
    if (source) path += `/${source}`;
    console.log(source, path);
    history.pushState(null, path, queryParams);
  },

  refreshSearch(query, filters, sort){
    console.log('refresh search', query, filters, sort);
    const { limit } = this.state;
    const queryParams = this.getQuery();
    this.updateSearchUrl({
      ...queryParams,
      q: query || undefined,
      limit: (limit == this.props.limit) ? undefined : limit,
      filters: (filters.length == 0) ? undefined : JSON.stringify(filters),
      sort: (sort == 'relevance' ? undefined : sort)
    });
    this.fetchUrl(this.makeUrl(query, filters, sort));
  },

  getSearchQuery(){
    const { query } = this.state.data;
    if (query) return query.trim();
    return undefined;
  },

  getFilters(){
    return this.state.data.filters || [];
  },

  onToggleFacet(key, value){
    var searchManager = SearchManager(this.getSearchQuery(), this.getFilters());
    var filters = searchManager.toggleFilter(key, value);
    this.refreshSearch(this.getSearchQuery(), filters, this.state.sort);
  },

  onResetFacets(){
    this.refreshSearch(this.getSearchQuery(), [], this.state.sort);
  },

  handleViewChange(viewMode){
    var query = this.getQuery();
    this.updateSearchUrl({
      ...query,
      view: viewMode
    });
  },

  handleSelectDocument(selectedDocument){
    const { source } = this.props;
    if (source) {
      console.warn('How should I open ' + source + '?');
      return;
    }
    console.log('open', selectedDocument);
    // Strip ID if needed...
    const id = selectedDocument.id.replace(/^<(.*)>$/, '$1');
    window.location = this.props.baseUrl + 'video/' + encodeURIComponent(id);
    // var query = this.getQuery();
    // var newQuery = {...query}; // Copy
    // if (selectedDocument){
    //   this.setState({selectedDocument, showDocument:true});
    //   newQuery.docid = selectedDocument.docid;
    // } else {
    //   this.setState({showDocument: false}); // Keep previous document for animations
    //   newQuery.docid = undefined;
    // }
    // this.updateSearchUrl(newQuery);
  },

  handleDocumentClose(){
    this.handleSelectDocument(null);
  },

  handleSort(evt, sort){
    this.setState({sort});
    this.refreshSearch(this.getSearchQuery(), this.getFilters(), sort);
  },

  handleFacetMore(facet){
    var query = this.getSearchQuery();
    var filters = this.getFilters();
    const { api, source } = this.props;
    var facetParam = encodeURIComponent(facet);
    var url = api + '/search/facets/' + facetParam + '/?q=' + query + '&limit=' + 100;
    if (source){
      url += '&source=' + source;
    }
    if (filters && filters.length > 0){
      filters = encodeURIComponent(JSON.stringify(filters));
      url += "&filters=" + filters;
    }
    $.ajax({
        dataType: "json",
        url: url,
        success: data => {
            // Check if component is still alive
            if (!this.isMounted()){
                return;
            }
            if ((this.getSearchQuery() != query) || (this.getFilters() != filters)){
                // Query has changed
                return;
            }
            this.state.data.facets[facet] = data.facets[facet];
            this.setState({data: this.state.data});
        },
        error: msg => {
            console.warn('FetchURL failed', msg);
        }
    });
  },

  //componentWillReceiveProps: function(nextProps){
  //    this.fetchUrl(this.makeUrl(nextProps));
  //},
  //
  componentDidMount: function(){
    const { docid } = this.getQuery();
    console.log('docid', docid);
    if (!docid) return;

    // Find current document ?
    this.state.data.results.hits.forEach(hit => {
      console.log(hit._source.docid, docid);
      if (hit._source.docid == docid){
        // Select this one !
        this.setState({selectedDocument:hit._source, showDocument:true});
      }
    });
  },

  updateState(key, value){
    console.log("Update", key, "to", value);
    var state = {};
    state[key] = value;
    this.setState(state);
  },

  stateUpdater(key){
    return function(value){
      this.updateState(key, value)
    }.bind(this)
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
      console.log('data', data);
      var results = this.state.data;
      results.results.hits = results.results.hits.concat(data.results.hits);
      results.next = data.next;
      this.setState({
        fetchingMore: false
      });
    });
  },

  render(){
    const { data:results, displayStyle, selectedDocument, showDocument, sort } = this.state;
    var searchManager = SearchManager(this.getSearchQuery(), this.getFilters());
    searchManager.onToggleFacet = this.onToggleFacet;
    searchManager.onResetFacets = this.onResetFacets;
    console.log('source', this.props.source);
    return (
      <div>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
          <AutoAffix viewportOffsetTop={0} container={this}>
            <div style={{backgroundColor: '#EEE', zIndex: 100}}>
              <ButtonToolbar theme="shadow" >
                <div style={{paddingLeft: 248}}>
                  <SearchBox onSearch={this.onSearch} defaultValue={this.getSearchQuery()} />
                  <ButtonGroup alignRight>
                    <SortButton onSelect={this.handleSort} selected={sort} />
                  </ButtonGroup>
                </div>
              </ButtonToolbar>
            </div>
          </AutoAffix>
        </div>
        {/* padding to account for toolbar */}
        <div style={{height: 45}} />
        <div style={{position: 'relative'}}>
          <SplitPane fillParent={false}>
            <AutoAffix viewportOffsetTop={45} container={this}>
              <div>
                <Facets {...results} searchManager={searchManager} onClickMore={this.handleFacetMore}  />
              </div>
            </AutoAffix>
            <div className="fluid-container">
              <Row>
                <Col sm={8}>
                  <SearchResults {...results} 
                        hasMore={results.next} 
                        viewMode={this.getQuery().view}
                        onSelectDocument={this.handleSelectDocument}
                        onViewChange={this.handleViewChange}
                        onShowMore={this.onShowMore} />
                </Col>
                <Col sm={4} style={{padding: 8, paddingRight: 24}}>
                  <h4>Autres résultats</h4>
                  <OtherSearchResults query={results.query} />
                </Col>
              </Row>
            </div>
          </SplitPane>
          {this.renderLoading()}
        </div>
        <DocumentPreview show={showDocument} document={selectedDocument} onClose={this.handleDocumentClose} />
      </div>
    );
  },

  renderLoading(){
    if (this.isRefreshing() || this.state.fetchingMore) {
      return <FullscreenLoadingSpinner delay={0} />;
    }
    return undefined;
  }

});

module.exports = {
  SearchWindow
};


