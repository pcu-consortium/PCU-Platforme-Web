
var SearchManager = function(query, filters){

    var makeSearchUrl = function(query="", filters){
        var q = encodeURIComponent(query.trim());
        var url = '?q=' + q;
        if (filters && filters.length > 0){
            url += "&filters=" + encodeURIComponent(JSON.stringify(filters));
        }
        return url;
    };

    var facetIsSelected = function(field, value){
        for(var i=0; i<filters.length; i++){
            if (filters[i][field] === value){
                return true;
            }
        }
        return false;
    };

    var cloneFilters = function(){
        return filters.slice();
    };

    var toggleFilter = function(key, value){
        var filters = cloneFilters();
        if (facetIsSelected(key, value)){
            // Remove...
            for(var i=0; i<filters.length; i++){
                if (filters[i][key] === value){
                    filters.splice(i, 1);
                    break;
                }
            }
        } else {
            // Add...
            filters.push({[key]:value});
        }
        return filters;
    };

    var toggleFacetUrl = function(key, value){
        return this.makeSearchUrl(query, toggleFilter(key, value));
    };

    return {
        query: query,
        filters: filters,
        makeSearchUrl: makeSearchUrl,
        facetIsSelected: facetIsSelected,
        toggleFilter: toggleFilter,
        toggleFacetUrl: toggleFacetUrl
    };
};

module.exports = SearchManager;
