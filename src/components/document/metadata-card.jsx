var fieldType = React.PropTypes.shape({
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
});


var MetadataCard = React.createClass({
  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    data: React.PropTypes.object.isRequired,
    fields: React.PropTypes.arrayOf(fieldType).isRequired
  },

  render(){
    const { data, fields } = this.props;
    const options = {};
      return (
        <div className="metadata-card">
            <table className="table table-condensed table-striped table-info" style={{clear: 'both', marginBottom: '0px'}}>
                <tbody>
                  {fields.map(f => this.renderLine(f, data[f.id], options))}
                </tbody>
            </table>
        </div>
      )
  },

  renderLine(entry, value, options={}){
      if (options.ignoreEmpty && !value){
          return undefined;
      }
      const { label, type, id } = entry;
      var valueFor = function(type, value){
          switch(type){
              case 'url':   return <a href={value} target="_blank">{value}</a>;
              case 'text':  return value;
              default:      return value;
          }
      };
      return (
          <tr key={id}>
              <td className="field-name">{label || id}</td>
              <td className="field-value">{valueFor(type, value)}</td>
          </tr>
      )
  }
});

module.exports = MetadataCard;