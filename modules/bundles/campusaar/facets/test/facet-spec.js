
var searchManager = require('../../../../search/search-manager');



describe("Facet test", function() {

  var failTest = function(error) {
    expect(error).toBeUndefined();
  };

  it("should fetch facets", function(done) {
    var params = {
      site: "agora"
    };
    searchManager.promiseSearchFacets(["authors"], params)
    .then(function(data){
      expect(data).toBeDefined();
      expect(data.facets.authors).toBeDefined();
      expect(data.facets.authors.buckets.length).toBeGreaterThan(10);
    })
    .catch(failTest)
    .finally(done);
  });
});