'use strict';

var debug = require('debug')('arma:campusaar:subjects:manager');

var async = require('../../../async');
var config = require('../../../config').all();

var _ = require('lodash');
var searchManager = require('../../../search/search-manager');
var Q = require('q');

var getSubjectsOptions = function () {
    return ;
};

var HOST = "lab2.armadillo.fr";
//var HOST="37.59.31.215";
var fetchSubjectsForURI = function(uri){
  return async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/subjectList",
    query: {
        uri: uri
    }
  });
}

var fetchSubjectsList = function(params){
  return fetchSubjectsForURI(config.campus[params.site].uri);
};

var lowerCaseKeyComparator = function(key){
  return function(a, b){
    var sa = (a[key]||"").toLowerCase();
    var sb = (b[key]||"").toLowerCase();
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  }
};

var sortTree = function(root, key){
  if (!root || !root.children) return;
  // if (key === "label") console.log('sort', root);

  root.children.forEach(function(it){
    sortTree(it, key);
  });
  root.children.sort(lowerCaseKeyComparator(key));
  // if (key === "label") console.log('=>', root);
};

var makeTree = function(data, params){
  // Make a tree !
  var byId = data;
  var root = undefined;
  var lang = params.lang;
  console.log('lang', lang);
  if (lang){
    // Filter to a single language
    byId = {};
    for(var key in data){
      if (data.hasOwnProperty(key)){
        var obj = data[key];
        byId[key] = {
          id: obj.id
        };
        byId[key].label = obj[lang] || obj.fr;
      }
    }
  }
  for(var key in byId){
    if (byId.hasOwnProperty(key)){
      var entry = byId[key];
      var parent = byId[data[key].parent];
      if (!parent){
        root = entry;
      } else {
        if (!parent.children) parent.children = [];
        parent.children.push(entry);
      }
    }
  }
  sortTree(root, lang ? 'label' : 'fr');
  return root;
};

var fetchSubjects = function(params){
  var params = params || {};
  if (params.site === "campus"){
    var makeParams = function(site){
      return _.assign({}, params, {site: site});
    }
    var sites = [ "agora", "arc", "ahm" ];
    var promises = sites.map(function(site){
      return fetchSubjectsList(makeParams(site)).then(function(data){
        return makeTree(data, params);
      });
    });
    return Q.all(promises);
  }
  return fetchSubjectsList(params).then(function(data){
    return [makeTree(data, params)];
  });
};

var cleanLabel = function(label){
  return label.replace(/@[a-z]+/g, "").replace(/^"(.+(?="$))"$/, '$1').replace(/\\\"/g, "\"");
}

var fetchSubjectAnalysis = function(params){
  return searchManager.promiseSearchMedias(params)
  .then(function(data){
    return data.results.hits.map(function(result){
      return {
        id: result._source.id,
        label: cleanLabel(result._source.label)
      };
    });
  })
}

var fetchTopics = function(uri){
  return async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/topics",
    query: {
        uri: uri
    }
  }).then(function(topics){
    var groupedList = [];
    var map = {};
    topics.forEach(function(topic){
      var title = topic.title;

      // Group by topic title
      if (!map[topic.title]){
        map[topic.title] = {
          title: topic.title,
          analysis: [],
          analysisMap: {}
        };
        groupedList.push(map[topic.title]);
      }

      // Group by analysis inside a topic
      var t = map[topic.title];
      var id = topic.analysis;
      if (!t.analysisMap[id]){
        t.analysisMap[id] = {
          id: id,
          documentId: topic.document,
          title: topic.title,
          segments: []
        }
        t.analysis.push(t.analysisMap[id]);
      }
      t.analysisMap[id].segments.push({
        id: topic.segment,
        title: topic.segmentTitle,
        duration: topic.duration,
        beginTime: topic.beginTime,
        layer: topic.layer
      });
    });
    groupedList.forEach(function(topic){
      delete topic.analysisMap; // Remove tmp data
    });
    groupedList.sort(lowerCaseKeyComparator('title'));
    return groupedList;
  });
}

async function fetchObject(site, type){
  return async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/objet",
    query: {
        ontology: config.campus[site].ontology,
        type
    }
  });
}




function compareLabels(a, b) {
  if (a.label < b.label) return -1;
  else if (a.label > b.label) return 1;
  else return 0;
};

function sortByLabel(entries) {
  if (!entries) return;
  entries.sort(compareLabels);
  entries.forEach(e => sortByLabel(e.children));
}

function makeObjectTree(data){
  const parents = [];
  const parentsById = {};
  const childrenById = {};
  data.forEach(entry => {
    // Ensure parent
    const parentId = entry.parent;
    if (!(parentId in parentsById)){
      let p = {
        id: parentId,
        label: (entry.label || entry.parentlabel).trim(),
        children: []
      };
      parents.push(p);
      parentsById[parentId] = p;
    }

    const parent = parentsById[parentId];

    // Ensure child
    const childId = entry.labelchild.trim();
    // Use lowercase label, crappy unaligned data...
    const uuid = parentId + '.' + childId.toLowerCase().trim();
    if (!(uuid in childrenById)){
      let c = {
        label: entry.labelchild.trim(),
        analysis: []
      };
      parent.children.push(c);
      childrenById[uuid] = c;
    }
    const child = childrenById[uuid];

    // Add to child (if needed)
    if (child.analysis.indexOf(entry.analyse) == -1){
      child.analysis.push(entry.analyse);
    }
  });

  sortByLabel(parents);
  return parents;
}

async function fetchAudioVisual(site){
  if (site == "campus") site = "agora";
  const asyncVisuel = fetchObject(site, "visuel");
  const asyncAudio = fetchObject(site, "audio");
  
  const visual = await asyncVisuel;
  const audio = await asyncAudio;

  return {
    id: 'audioVisualObjects',
    label: 'Objets audio-visuels',
    children: [
      {id: 'visual', label: 'Objets visuels', children: makeObjectTree(visual)},
      {id: 'audio',  label: 'Audio', children: makeObjectTree(audio)},
    ]
  };
};


function makeGlossaryTree(data){
  const parents = [];
  const parentsById = {};
  data.forEach(entry => {

    // Ensure parent
    const parentId = entry.lexic;
    if (!(parentId in parentsById)){
      let p = {
        label: entry.lexiclabel.trim(),
        children: []
      };
      parents.push(p);
      parentsById[parentId] = p;
    }

    const parent = parentsById[parentId];
    parent.children.push({
      id: entry.individual,
      label: entry.label.trim()
    });
  });

  parents.forEach(parent => {
    parent.children.sort(compareLabels);
  });
  parents.sort(compareLabels);
  return parents;
}

async function fetchGlossary(site){
  if (site == "campus") site = "agora";
  const glossary = await async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/glossary",
    query: {
        name: site,
    }
  });

  return {
    id: 'glossary',
    label: 'Lexique',
    children: makeGlossaryTree(glossary)
  };
};

async function fetchAnalysisTypes(site){
  if (site == "campus") site = "agora";
  const types = await async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/typeanalysis",
    query: {
        uri: config.campus[site].ontology
    }
  });

  return makeObjectTree(types);
};

async function fetchDiscours(site, type){
  if (site == "campus") site = "agora";
  const discours = await async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/discours",
    query: {
        uri: config.campus[site].ontology
    }
  });

  return makeObjectTree(discours);
}

async function fetchUsage(site, type){
  if (site == "campus") site = "agora";
  const usages = await async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/usage",
    query: {
        uri: config.campus[site].ontology
    }
  });

  return makeObjectTree(usages);
}



async function fetchTraduction(site){
  if (site == "campus") site = "agora";
  const types = await async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/traduction",
    query: {
        uri: config.campus[site].ontology
    }
  });

  return makeList(types);
};



function makeList(data){
  const parents = [];
  const parentsById = {};
  
  data.forEach(entry => {
    // Ensure parent
    const parentId = entry.label;
    if (!(parentId in parentsById)){
      let p = {
        id: parentId,
        label: (entry.label || entry.parentlabel).trim(),
        analysis: []
      };
      parents.push(p);
      parentsById[parentId] = p;
    }

    const parent = parentsById[parentId];

    

    // Add to child (if needed)
    if (parent.analysis.indexOf(entry.analyse) == -1){
     parent.analysis.push(entry.analyse);
    }
  });

  sortByLabel(parents);
  return parents;
}








var makeClassificationTree = function(data){
  // Make a tree from :
  // {
  // parent: "http://campus-aar.fr/asa#e3ab829b-5f17-428c-9e2b-429d9398843c",
  // label: "Classification CERIMES - Canal U",
  // child: "http://campus-aar.fr/asa#10bdb0db-298e-4df8-801c-fdcf1f190745",
  // labelchild: "Sciences humaines, sociales, de l’éducation et de l’information"
  // },
  var byId = {};
  var children = {}; // At the end, remove children from byId to get root parents
  for(var obj of data){
    const { parent, label, child, labelchild } = obj;
    if (!(parent in byId)){
      byId[parent] = {
        id: parent,
        label: label,
        children: []
      };
    }
    const p = byId[parent];
    let c = byId[child];
    if (!c){
      c = {
        id: child,
        label: labelchild
      };
      byId[c.id] = c;
    }
    children[child] = true;
    if (!p.children) p.children = [];
    p.children.push(c);
  }
  var roots = [];
  for(var key in byId){
    if (byId.hasOwnProperty(key)){
      if (!(key in children)){
        roots.push(byId[key]);
      }
    }
  }
  sortByLabel(roots);
  return roots;
};

async function fetchClassification(site){
  const classification = await async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/classificationList",
    query: {
      ontology: config.campus[site].ontology
    }
  });
  return makeClassificationTree(classification);
}

async function fetchIds(site, ids=[]){
  const escapedIds = ids.map(s => s.replace(/[:\/#]/g, '_'));
  return await searchManager.getDocuments(escapedIds, { site }); 
}

async function fetchClassificationAnalysis(site, uri){
  if (site == "campus") site = "agora";
  const analysisList = await async.promiseJson({
    host: HOST,
    path: '/campus-aar-api/classification',
    query: {
      uri,
      ontology: config.campus[site].ontology
    }
  });
  const analysisIds = analysisList.map(a => a.analysis);
  return await fetchIds(site, analysisIds);
}

async function fetchRolesTypes(site){
  if (site == "campus") site = "agora";
  const roles = await async.promiseJson({
    host: HOST,
    path: "/campus-aar-api/roles",
    query: {
        ontology: config.campus[site].ontology
    }
  });
  //debug('roles:',roles);
  return makeRoleTree(roles);
};


function makeRoleTree(data){

  var parents = [];
  var parentsById = {};
  var childrenById = {};
  var individualById={};
  data.forEach(entry => {
    // Ensure parent
    const parentId = entry.parent;
    if (!(parentId in parentsById)){
      let p = {
        id: parentId,
        label: (entry.label || entry.parentlabel).trim(),
        children: []
      };
      parents.push(p);
      parentsById[parentId] = p;
    }
    const parent = parentsById[parentId];
    // Ensure child
    const childId = entry.labelchild.trim();
    // Use lowercase label, crappy unaligned data...
    const uuid = parentId + '.' + childId.toLowerCase().trim();
    if (!(uuid in childrenById)){
      let c = {
        label: entry.labelchild.trim(),
        children: []
      };
      parent.children.push(c);
      childrenById[uuid] = c;
    }
    const child = childrenById[uuid];
    //Ensure individual
     const individualdId = entry.individuallabel.trim();
     // Use lowercase label, crappy unaligned data...
    const uuidl = childId + '.' + individualdId.toLowerCase().trim();
    if (!(uuidl in individualById)){
      let cl = {
        label: entry.individuallabel.trim(),
        analysis: []
      };
      child.children.push(cl);
      individualById[uuidl] = cl;

    }
    const individual = individualById[uuidl] ;
    // Add to individual(if needed)

    if (individual.analysis.indexOf(entry.analyse) == -1){

      individual.analysis.push(entry.analyse);
      //debug('Adding analyse');
      //debug('Analyse:',entry.analyse);
    }

  });


  debug('My json:',JSON.stringify(parents[0]));
  sortByLabel(parents);


  return parents;

}







module.exports = {
  fetchSubjectsList,
  fetchSubjects,
  fetchSubjectAnalysis,
  fetchTopics,
  fetchAudioVisual,
  fetchGlossary,
  fetchAnalysisTypes,
  fetchClassification,
  fetchRolesTypes,
  fetchTraduction,
  fetchClassificationAnalysis,
  fetchIds,
  fetchDiscours,
  fetchUsage
};
