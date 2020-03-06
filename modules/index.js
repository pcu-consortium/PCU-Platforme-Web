'use strict';

module.exports = {
  //specify module
  abtest:require('./abtest'),
  admin: require('./admin'),
  // beacon: require('./beacon'),
  cms: require('./cms'),
  rameau: require('./rameau'),
  rss: require('./rss'),
  search: require('./search'),
  video: require('./video'),
  user:require('./user'),
  viewbi:require('./viewbi'),
  // specific modules, please use config to dynamically load required one
  //subjects: require('./bundles/campusaar/subjects'),
  //analysis: require('./bundles/campusaar/analysis'),
  blockbi: require('./blockbi')
};

