
import remoteComponent from 'utils/remote-component';
import WidgetManager from '../widget-manager';
import WidgetMixin from '../widget-mixin';
import SearchResults from './search-results-widget';
import PanelListItem from 'components/ui/panel-list-item';


var FacetItem = React.createClass({
  mixins: [ React.addons.PureRenderMixin ],

  handleClick(){
    const { onClick, facet } = this.props;
    if (onClick){
      onClick(facet.key);
    }
  },

  render(){
    const { selected, facet } = this.props;
    var active = selected === facet.key;
                          // titleRight={<span className="badge">{facet.doc_count}</span>}
    return (
      <PanelListItem key={facet.key} 
                          active={active}
                          titleRight={facet.doc_count}
                          onClick={this.handleClick}>
        {facet.key}
      </PanelListItem>
    );
  }
});

var compare = function(map, order="asc") {
  var one = order == "asc" ? 1 : -1;
  return function (a,b) {
    var la = map(a);
    var lb = map(b);
    if (la < lb)
      return -one;
    if (la > lb)
      return one;
    return 0;
  };
};

var Facet = React.createClass({

  getCache(){
    if (!this.cache){
      this.cache = {};
    }
    return this.cache;
  },

  getItems(){
    const { data, facet, sort } = this.props;
    if (!data || !data.facets || !data.facets[facet] || !data.facets[facet].buckets) {
      return undefined;
    }
    var facets = data.facets[facet].buckets;
    var cache = this.getCache();
    if ((facet == cache.facet) && (sort == cache.sort) && cache.facets){
      return cache.facets;
    }
    // Regen cache
    this.cache ={
      facet, 
      sort,
      facets: facets.sort(this.compareFunction(sort))
    };
    return this.cache.facets;
  },

  compareFunction(sort){
    var mapper = sort === "count" ? (a => a.doc_count) : (a => a.key.toLowerCase());
    var order = sort === "count" ? "desc" : "asc";
    return compare(mapper, order);
  },

  render(){
    const { data, facet, title, onClick, selected, bsStyle } = this.props;
    var facets = this.getItems();
    if (!facets) return false;
    return (
      <PanelList title={title} maxHeight={500} bsStyle={bsStyle}>
        {facets.map(facet => <FacetItem key={facet.key} facet={facet} selected={selected} onClick={onClick} />)}
      </PanelList>
    );
  }
});

var RemoteFacet = remoteComponent(Facet);

var FacetQuery = React.createClass({
  mixins: [ WidgetMixin ],

  render(){
    const { facet } = this.props;
    var url = this.context.api + '/search/facets/' + encodeURIComponent(facet);
    return <RemoteFacet {...this.props} url={url}/>
  }
});

var SearchFacet = React.createClass({

  getDefaultProps(){
    return {
      title: "Auteurs",
      facet: "Auteur de l'analyse.label",
      sort: "count"
    };
  },

  getInitialState(){
    return {
      selected: undefined
    };
  },

  handleSelect(selected){
    console.log('selected', selected);
    this.setState({selected});
  },

  render(){
    const { facet, sort, title, bsStyle } = this.props;
    const { selected } = this.state;
    return (
      <div className="fluid-container">
        <Row>
          <Col md={5}>
            <FacetQuery bsStyle={bsStyle} facet={facet} sort={sort} title={title} selected={selected} onClick={this.handleSelect} />
          </Col>
          <Col md={7} style={{maxHeight: 520, overflowY: 'scroll'}}>
            <SearchResults filters={[{[facet]: selected}]} requiresFilters={true} showUI={true} searchLabel={selected} />
          </Col>
        </Row>
      </div>
    )
  }
});

WidgetManager.registerWidget("SearchFacet", {
    component: SearchFacet,
    icon: "search",
    config: [
      {key: "title",  type: "input"},
      {key: "facet",  type: "selector", values: [
        {value: "Auteur de l'analyse.label", label: "Auteur"},
        {value: "metadata.language",  label: "Langue"},
        {value: "metadata.place", label: "Adresse"},
        {value: "metadata.Conférencier.label", label: "Confériencier"},
        {value: "metadata.about.label", label: "Sujet"},
        {value: "metadata.context.description", label: "Contexte"},
      ]},
      {key: "sort",  type: "selector", values: ["count", "name"]},
      {key: "bsStyle",  type: "selector", values: ["default", "primary", "info", "success", "warning", "danger"]},
    ]
});


export default SearchFacet;
