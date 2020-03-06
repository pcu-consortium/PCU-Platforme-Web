
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';

const inputStyle = {
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  width: '90%'
};

/*
 * In edit mode, edit the widget's state. Copy the state back to the widget when "save" is pressed...
 * TODO : cleaner update "à la Flux" ?
 */
var BlockQuote = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps(){
    return {
      quote: "",
      source: ""
    };
  },

  render(){
    return (
      <blockquote>
        {this.renderText('p', 'quote')}
        {this.props.children}
        {this.renderText('footer', 'source')}
      </blockquote>
      )
  },

  renderText(Type, key){
    const { widget } = this.props;
    const value = widget[key];
    const style = {textAlign: this.props[key + 'Align']};
    if (this.context.editing){
      let onChange = evt => {
        widget[key] = evt.target.value;
        this.forceUpdate();
      }
      return (
        <Type>
          <input onChange={onChange} placeholder={key} value={value} style={{...inputStyle, ...style}}/>
        </Type>
      );
    }
    if (value.length == 0) return undefined;
    return <Type style={style}>{value}</Type>
  }
});


WidgetManager.registerWidget("Blockquote", {
  component: BlockQuote,
  icon: "quote-left",
  config: [
    {key: "quoteAlign", type: "selector", values: ["left", "center", "right", "justify"]},
    {key: "sourceAlign", type: "selector", values: ["left", "center", "right", "justify"]}
  ],
  defaultValue: {
    type: 'Blockquote',
    quote: 'The best way to predict the future is to create it.',
    source: 'Peter Drucker'
  }
});

export default BlockQuote;