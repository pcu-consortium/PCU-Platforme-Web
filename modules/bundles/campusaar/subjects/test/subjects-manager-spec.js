
var manager = require('../subjects-manager');
require('jasmine2-custom-message');

// Note : change describe to xdescribe to disable tests

describe("Subjects listing", function() {

  var failTest = function(error) {
    expect(error.stack).toBeNull();
  };

  it("should fetch subjects", function(done) {

    manager.fetchSubjectsList({site: "agora"})
    .then(function(data){
      expect(data).toBeDefined();
      expect(Object.keys(data).length).toBeGreaterThan(100);
    })
    .catch(failTest)
    .finally(done);
  });

  it("should make a tree", function(done) {

    manager.fetchSubjects({site: "agora"})
    .then(function(data){
      expect(data).toBeDefined();
      expect(data.length).toEqual(1);
      expect(data[0].children).toBeDefined();
      expect(data[0].children.length).toEqual(5);
    })
    .catch(failTest)
    .finally(done);
  });

  it("should work for french", function(done) {

    manager.fetchSubjects({site: "agora", lang: 'fr'})
    .then(function(data){
      expect(data).toBeDefined();
      expect(data[0].children).toBeDefined();
      expect(data[0].children.length).toEqual(5);
    })
    .catch(failTest)
    .finally(done);
  });

  it("should work for english", function(done) {

    manager.fetchSubjects({site: "agora", lang: 'en'})
    .then(function(data){
      expect(data).toBeDefined();
      expect(data[0].children).toBeDefined();
      expect(data[0].children.length).toEqual(5);
    })
    .catch(failTest)
    .finally(done);
  });

  it("should work for campus", function(done) {

    manager.fetchSubjects({site: "campus"})
    .then(function(data){
      expect(data).toBeDefined();
      expect(data.length).toEqual(3);
      expect(data[0].children.length).toEqual(5);
    })
    .catch(failTest)
    .finally(done);
  });
});

describe("Topics listing", function() {

  var failTest = function(error) {
    expect(error.stack).toBeNull();
  };

  var SUBJECT_URI = 'http://campus-aar.fr/asa#dfcd4643-6ab9-47be-8ae6-d99c2da9c21f';

  var cachedData = null;
  it("should fetch topics", function(done) {

    manager.fetchTopics(SUBJECT_URI)
    .then(function(data){
      cachedData = data;
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThan(1);
    })
    .catch(failTest)
    .finally(done);
  });

  it("should group by topic", function(done) {
    var cache = {};
    cachedData.forEach(function(topic){
      since('topic ' + topic.title + ' must only appear once')
      .expect(cache[topic.title]).not.toBeDefined();
      cache[topic.title] = true;
    });
    done();
  });

  it("should group by analysis for each topic", function(done) {
    cachedData.forEach(function(topic){
      var cache = {};
      topic.analysis.forEach(function(analysis){
        since('analysis ' + analysis.id + ' must only appear once in ' + topic.title)
        .expect(cache[analysis.id]).not.toBeDefined();
        cache[analysis.id] = true;
      });
    });
    done();
  });
});





