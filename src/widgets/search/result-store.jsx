

var ResultStore = function(){

  var limit = 24;

  var rows = [];
  var count = 0;
  var refreshing = true;

  var pendingPages = {

  };

  var reactComponent;
  var currentQuery;

  var setQuery = function(query){
    if (((typeof query) === "boolean") || ((typeof query) === "object")) query = "";
    if (query != currentQuery){
      pendingPages = {};
      currentQuery = query;
      rows = []; // Flush
      count = 0;
      refreshing = true;
      fetchPage(0);
      reactComponent.forceUpdate();
    }
  };

  var init = function(component, query){
    reactComponent = component;
    setQuery(query);
  };

  var makeUrl = function(query="", limit=24, offset=0){
    query = encodeURIComponent(query.trim());
    var url = 'http://localhost:3000/psa/api/medias?q=' + query + '&no-facets&limit=' + limit + '&offset=' + offset;
    url += "&select=docid,title,titre,reference,exemplaire,legende,refevenement,arboclass,date_exacte,base"; // Limit fields :p
    // if (filters && filters.length > 0){
    //     filters = encodeURIComponent(JSON.stringify(filters));
    //     url += "&filters=" + filters;
    // }
    // if (sort && sort != 'relevance'){
    //     url += "&sort=" + sort;
    // }
    return url;
  };

  var addRows = function(data, offset=0){
    // console.log('addRows', data);
    const { results } = data;
    count = results.total;
    results.hits.forEach((doc, idx) => {
      rows[offset+idx] = doc._source;
      doc._source._index = (offset+idx+1);
    });
  };

  var fetchPage = function(page){
    if (page in pendingPages){
      return;
    }
    var query = currentQuery;
    // console.log('fetch page', page);
    var start = new Date().getTime();
    var url = makeUrl(currentQuery, limit, page*limit);
    pendingPages[page] = true;
    $.ajax({
      dataType: "json",
      url: url,
      success: data => {
        if (query === currentQuery){
          var end = new Date().getTime();
          console.log('query time', end - start, 'ms');
          addRows(data, page*limit);
          delete pendingPages[page];
          refreshing = false;
          reactComponent.forceUpdate();
        }
      },
      error: msg => {
        console.warn('FetchURL failed', msg);
      }
    });
  };

  var get = function(idx){
    var page = Math.floor(idx/limit);
    if (!rows[idx]){
      fetchPage(page);
      return {
        _index: (idx+1)
      };
    }
    // Check for next and previous rows (preloading power)
    if ((idx+limit < count) && !rows[idx+limit]){
      fetchPage(page+1);
    } else if ((idx-limit >= 0) && !rows[idx-limit]){
      fetchPage(page-1);
    }
    return rows[idx];
  };

  var setChecked = function(idx, _checked){
    if (rows[idx]){
      rows[idx] = {
        ...rows[idx],
        _checked
      };
    }
  };

  var toggleChecked = function(idx){
    if (rows[idx]){
      rows[idx] = {
        ...rows[idx],
        _checked: !rows[idx]._checked
      };
    }
  };

  var getCount = function(){
    return count;
  };

  var isRefreshing = function(){
    return refreshing;
  };

  return {
    init, setQuery, get, getCount, isRefreshing, setChecked, toggleChecked//, makeUrl, addRows
  };
}();


module.exports = ResultStore;
