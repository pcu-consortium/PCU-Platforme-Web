require('babel/register');

var manager = require('../analysis-manager');


var assert = function(cond, msg){
  if (!cond){
    console.log(msg);
    process.exit(1);
  }
};

var wrap = function(key){
  return '<' + key + '>';
}

var type = "http://campus-aar.fr/asa#0f82d3c5-1d9b-4ade-8418-8edfa371fd31";
var key = "http://campus-aar.fr/asa#6976cfb9-fc74-4d96-a587-79d8d083bb3f-prop";

describe("Simple value mapping", function() {
  // Object test
  var obj = {
    "type": [
      "<http://campus-aar.fr/asa#0f82d3c5-1d9b-4ade-8418-8edfa371fd31>",
      "<http://www.ina.fr/core#Analysis>"
    ]
  };

  it("works for strings", function() {
    var value = wrap(type);
    var resolvedValue = manager.resolveMapping(value);
    expect(resolvedValue).not.toBe(value);
  });

  it("works for objects", function() {
    var resolvedObj = manager.resolveMapping(obj);
    expect(resolvedObj.type[0]).not.toBe(obj.type[0]);
  });

});


describe("Analysis pre-check", function() {
  // Real test
  var analysis = require('./analysis.json');

  it("should contain values to map", function() {
    expect(analysis.type[0]).toBe(wrap(type));
    expect(analysis[wrap(key)]).toBeDefined();
    analysis.layer[0].segment[0].subject.forEach(function(value){
      expect(value).toEqual(jasmine.stringMatching(/^<http:\/\/campus-aar\.fr\/asa#.*$/));
    });
  });
});

describe("Analysis mapping", function() {
  // Real test
  var analysis = require('./analysis.json');
  var fixedAnalysis = manager.resolveMapping(analysis);

  it("should map type", function() {
    expect(fixedAnalysis.type[0]).not.toBe(wrap(type));
  });
  it("should map keys", function() {
    expect(fixedAnalysis[wrap(key)]).not.toBeDefined();
  });
  it("should map nested subjects", function(){
    fixedAnalysis.layer[0].segment[0].subject.forEach(function(value){
      expect(value).not.toEqual(jasmine.stringMatching(/^<http:\/\/campus-aar.fr\/asa#.*$/));
    });
  });
});

