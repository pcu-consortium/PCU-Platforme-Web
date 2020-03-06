require('babel/register');

var analysisManager = require('../analysis-manager');

describe("Analysis manager test", function() {

  var failTest = function(error) {
    expect(error).toBeUndefined();
  };

  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // geocoder can take forever... mock json api ?
  });

  it("should fetch analysis with geoloc", function(done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL
    var params = {
      site: "agora"
    };
    analysisManager.fetchGeolocalisedAnalysis(params)
    .then(function(data){
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThan(10);
    })
    .catch(failTest)
    .finally(done);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});