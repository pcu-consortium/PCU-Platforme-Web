
var WidgetMixin = {
  contextTypes: {
    site: React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    api: React.PropTypes.string,
    editing: React.PropTypes.bool,
    master: React.PropTypes.object
  }
};

module.exports = WidgetMixin;
