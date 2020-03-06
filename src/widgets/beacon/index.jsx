
import WidgetManager from '../widget-manager';
import MetadataCard from 'components/document/metadata-card';

var ValidatedTextField = React.createClass({
    //mixins: [URLFetcher],

    getInitialState(){
        return {
            value: this.props.defaultValue
        }
    },

    getDefaultProps(){
        return {
            width: '100%',
            icon: 'search',
            buttonLabel: 'Validate',
            autoRefreshValue: false // Should the data-binded value auto-refresh ?
        };
    },

    handleChange: function(evt){
        var value = evt.target.value;
        if (this.props.autoRefreshValue){
            this.refreshWidgetValue(value);
        }
        console.log('value', value);
        this.setState({value: value});
        if (this.props.onChange){
            this.props.onChange(value);
        }
    },

    handleClick(){
      this.refreshWidgetValue(this.state.value);
    },

    componentWillReceiveProps(nextProps){
        if (this.props.defaultValue !== nextProps.defaultValue){
            // Controlled value changed
            this.setState({value: nextProps.defaultValue});
            this.refreshWidgetValue(nextProps.defaultValue);
        }
    },

    refreshWidgetValue: function(value){
        WidgetManager.updateValue("ValidatedTextField", this.props.id, value);
    },

    render: function(){
      const { value } = this.state;
      const { buttonLabel, icon } = this.props;
      return (
        <div>
          <textarea className="form-control" rows="6" onChange={this.handleChange} value={value} />
          <Button icon={icon} bsStyle="success" onClick={this.handleClick}>{buttonLabel}</Button>
        </div>
      )
    }
});


var BeaconResults = React.createClass({
  mixins: [ React.addons.PureRenderMixin ],

  resultText(length){
    switch(length){
      case 0: return 'aucun résultat';
      case 1: return '1 résultat';
      default: return length + ' resultats';
    }
  },

  render(){
    const { data={} } = this.props;
    console.log('data', data);
    const fields = [
      {id: 'term', label: 'Terme'},
      {id: 'uri', label: 'URI', type: 'url'},
      {id: 'types', label: 'Types'},
      // {id: 'offset', label: 'Position'},
    ];
    const terms = data.terms || [];
    return (
      <div>
        <h4><small>{this.resultText(terms.length)}</small></h4>
        {terms.map((term, idx) => <MetadataCard key={idx} data={term} fields={fields} />)}
      </div>
    )
  }
});


WidgetManager.registerWidget("ValidatedTextField", {
    component: ValidatedTextField,
    icon: "lightbulb-o",config: [
        {key: "buttonLabel",    type: "input"},
        {key: "icon",           type: "icon"},
    ],
    defaultValue: {
        type: 'ValidatedTextField'
    }
});

WidgetManager.registerWidget("BeaconResults", {
    component: BeaconResults,
    icon: "lightbulb-o",
    config: [
    ],
    defaultValue: {
        type: 'BeaconResults'
    }
});

module.exports = {
  ValidatedTextField, BeaconResults
};