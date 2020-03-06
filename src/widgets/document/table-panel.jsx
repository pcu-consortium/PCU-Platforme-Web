
import { PanelListItem } from 'components/ui';

var getLabel = label => ((typeof label) === 'string') ? label : label.fra;

var TablePanel = React.createClass({
  render(){
    const { label, fields, bsStyle, onClick } = this.props;
    const visibleFields = fields.filter(field => !field.pos || field.pos >= 100);
    return (
      <PanelList title={getLabel(label)} bsStyle={bsStyle} compact onClick={onClick}>
          <PanelListItem title={visibleFields.length + " champs"} />
      </PanelList>
    )
  }
});

module.exports = TablePanel;
