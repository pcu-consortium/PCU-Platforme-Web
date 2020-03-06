
function cleanCampusName(name){
  // Remove Subject"..."@fr things
  return name.replace(/"Sujet \\"(.*)\\""@fr/g, "$1");
}

/*
 * Facet - Simple facet list
 */
var Facet = React.createClass({
  // mixins: [ React.addons.PureRenderMixin ],

  getInitialState() {
    return {
      open: false,
      openedEntries: {}
    };
  },

  toggle(e){
    this.setState({open: !this.state.open});
  },

  handleMore(){
    const { onClickMore, field } = this.props;
    if (onClickMore){
      onClickMore(field);
    }
  },

  render(){
    var { filters, type, label } = this.props;
    var selected = [];
    var unselected = [];
    var entries = this.props.buckets;
    var isHierarchical = false;
    if (type === "date"){
      isHierarchical = true;
      var entryMap = {};
      var allEntries = entries;
      entries = [];
      allEntries.forEach(e => {
        var name = e.key_as_string;
        var match = name.match(/([0-9]+)-([0-9]+)/);
        if (match && match.length === 3){
          var year = match[1];
          var entry;
          if (!(year in entryMap)){
            entry = {
              key: year,
              doc_count: e.doc_count,
              children: []
            };
            entryMap[year] = entry;
            entries.push(entry);
          } else {
            entry = entryMap[year];
            entry.doc_count += e.doc_count;
          }
          entry.children.push({
            key: name,
            doc_count: e.doc_count
          });
        }
      });
    }
    for(var i=0; i<entries.length; i++){
      var entry = entries[i];
      var name = entry.key_as_string || entry.key;
      if (filters && (filters.indexOf(name) != -1)){
        selected.push(entry);
      } else {
        unselected.push(entry);
      }
    }
    var info = {
      selected: selected,
      unselected: unselected
    };
    var facetClasses = {
      "facet": true,
      "collapse": true,
      "in": this.state.open,
      "hierarchical": isHierarchical
    };
    var cx = React.addons.classSet;
    var chevron = this.state.open ? 'chevron-down' : 'chevron-right';
    return (
      <div className="collapsable-group">
        <h5 className="facet-header" onClick={this.toggle}>
          {this.renderIcon()} {label} <FAIcon className="pull-right" icon={chevron} />
        </h5>
        <ul ref="list" className={cx(facetClasses)}>
          {selected.map((e, idx) => this.renderEntry(e, idx, true, info, 0))}
          {unselected.map((e, idx) => this.renderEntry(e, idx, false, info, 0))}
          {this.renderOthers(this.props.sum_other_doc_count)}
        </ul>
      </div>
    );
  },

  renderIcon(){
    if (!this.props.icon){
      return undefined;
    }
    return <FAIcon icon={this.props.icon}/>;
  },

  renderEntry(entry, idx, isSelected, info, indent){
    const { field, searchManager } = this.props;

    indent = indent || 0;
    var name = entry.key_as_string || entry.key;
    var url = "";
    if (searchManager){
      url = searchManager.toggleFacetUrl(field, name);
    }
    var span;
    var className = "facet-entry-name";
    if (isSelected){
      className += " remove";
    }
    if (info.selected.length > 0) {
      var icon = isSelected ? "check-square-o" : "square-o";
      span = <FAIcon icon={icon} />;
    }
    var onClick = e => {
      e.stopPropagation();
      e.preventDefault();
      searchManager.onToggleFacet(field, name);
    };
    var toggleButton;
    var children = [];

    var indentStyle = indent > 0 ? {paddingLeft: ((indent*24) + 'px')} : undefined;
    if (entry.children){
      // TODO : update url...
      var isOpen = this.state.openedEntries[entry.key];
      var onOpenFacet = () => {
        this.state.openedEntries[entry.key] = !isOpen;
        this.setState({
          openedEntries: this.state.openedEntries
        });
      };
      var icon = isOpen ? "toggle-down" : "toggle-right";
      toggleButton = <Button noOutline noPadding icon={icon} bsStyle="link" bsSize="xs" onClick={onOpenFacet} />;
      if (isOpen){
        var parentIdx = idx;
        children = entry.children.map((e, idx) => this.renderEntry(e, parentIdx + '-' + idx, false, info, indent+1));
      }
    }
    return [
      <li key={idx} className="facet-entry">
        <span className="facet-entry-info" style={indentStyle}>
          {toggleButton}
          {span
            ? <a className={className} href={url} onClick={onClick}>{span} {cleanCampusName(name)}</a>
            : <a className={className} href={url} onClick={onClick}>{cleanCampusName(name)}</a>
          }
        </span>
        <span className="facet-entry-count">{entry.doc_count}</span>
      </li>,
      children
    ];
  },

  renderOthers(count){
    if (!count || (count <= 0)){
      return undefined;
    }
    var name = "Autres";
    return (
      <li key={-1} className="facet-others" style={{cursor: 'pointer'}} onClick={this.handleMore}>
        {name} ({count})
      </li>
    );
  }
});

var Facets = React.createClass({

  computeFilters(filters){
    var filtersByKey = {};
    for(var i=0; i<filters.length; i++){
      for(var key in filters[i]){
        var value = filters[i][key];
        if (!filtersByKey[key]){
          filtersByKey[key] = [];
        }
        filtersByKey[key].push(value);
      }
    }
    return filtersByKey;
  },

  shouldDisplay(){
    var { filters, results } = this.props;
    var hasResults =  results.hits && (results.hits.length > 0);
    var hasFilters = filters && (filters.length > 0);
    return hasResults || hasFilters;
  },

  render(){
    var { filters, searchManager, onClickMore } = this.props;
    if (!this.shouldDisplay()){
      // No results, empty div...
      return <div key="facets" className="facets" />;
    }
    var allFacets = this.props.facets;
    var facets = [];
    var filtersByKey = this.computeFilters(filters);
    for(var key in allFacets){
      if (allFacets.hasOwnProperty(key)){
        var facet = allFacets[key];
        var buckets = facet.buckets;
        if (buckets){
          if (buckets.length > 1) {
            facets.push(<Facet key={key} 
                               {...facet} 
                               field={key} 
                               title={key}
                               label={facet.label || key}
                               onClickMore={onClickMore}
                               filters={filtersByKey[key]} 
                               searchManager={searchManager} />);
          }
        }
      }
    }
    return (
      <div key="facets" className="facets">
        <h3>Filtrez votre recherche</h3>
        {this.props.filters.length > 0 ? this.renderResetFacets() : undefined}
        <ul className="facet-active">
          {this.props.filters.map(this.renderFilter)}
        </ul>
        <span className="subtitle">Choisissez des filtres ci-dessous</span>
        <div className="facet-list">
          {facets}
        </div>
      </div>
    );
  },

  renderFilter(filter){
    const { facets } = this.props;
    console.log('filter', filter);
    for(var key in filter){
      var name = filter[key];
      var displayName = name;
      if (displayName.length > 60){
        displayName = displayName.substring(0, 60-3) + "...";
      }
      var url = this.props.searchManager.toggleFacetUrl(key, name);

      var onClick = e => {
        e.stopPropagation();
        e.preventDefault();
        this.props.searchManager.onToggleFacet(key, name);
      };
      const displayKey = (key in facets ? facets[key].label : undefined) || key;
      return (
        <li key={key + "." + name}>
          <a className="facet-entry-name remove" href={url} onClick={onClick} >
            <FAIcon icon="remove" />{cleanCampusName(displayName)} (<span className="category-name">{displayKey}</span>)
          </a>
        </li>
      );
    }
  },

  renderResetFacets(){
    var q = this.props.query;
    var url = q ? ("?q=" + encodeURIComponent(q)) : "";
    var onClick = e => {
      e.stopPropagation();
      e.preventDefault();
      this.props.searchManager.onResetFacets();
    };
    return (
      <a className="subtitle" href={url} onClick={onClick}><FAIcon icon="refresh" />Réinitialiser les filtres</a>
    )
  }
});


module.exports = {
  Facets
};
