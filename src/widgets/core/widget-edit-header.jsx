
import { WidgetConfig } from './widget-config';

var WidgetEditHeader = React.createClass({

    getInitialState(){
        return {
            open: false
        }
    },

    onDelete(){
        if (this.props.onDelete){
            this.props.onDelete(this.props.widget);
        }
    },

    onCopy(){
        if (this.props.onCopy){
            this.props.onCopy(this.props.widget);
        }
    },

    onCut(){
        if (this.props.onCut){
            this.props.onCut(this.props.widget);
        }
    },

    toggleSettings() {
        this.setState({open: !this.state.open});
    },

    getOpenClass(){
        return this.state.open ? "open" : "";
    },

    handleHeaderChange(e){
      const { widget, onChange } = this.props;
      widget.header = e.target.value;
      onChange();
    },

    render() {
      const { widget } = this.props;
      const { open } = this.state;
      const inputStyle = {
        marginTop: 2,
        marginBottom: 2,
        maxWidth: '50%'
      };
      const titleStyle = {
        fontSize: 16, 
        fontWeight: 200, 
        textAlign: 'right',
        lineHeight: '16px'
      };
      const config = WidgetManager.getWidgetConfig(this.props.widget.type) || [];
      return (
        <div className={"hidden-config clearfix dropup " + this.getOpenClass()}>
          <div style={{float: 'right'}}>
            <div className="text-primary title" style={titleStyle}>{widget.type}</div>
            <ButtonGroup bsSize="xs" className="pull-right">
              <Button bsStyle="link" fa="copy" onClick={this.onCopy}/>
              <Button bsStyle="link" fa="cut"  onClick={this.onCut}/>
              <Button bsStyle="link" fa="trash" onClick={this.onDelete}/>
              <Button bsStyle="link" fa="cog" disabled={config.length == 0} onClick={this.toggleSettings} active={open} />
            </ButtonGroup>
          </div>
          <h4 style={{marginTop: 2, marginBottom: 2, fontSize: 18}}>
            <input placeholder="Header" value={widget.header} onChange={this.handleHeaderChange} style={inputStyle} />
          </h4>
          {this.renderConfig()}
        </div>
      );
    },

    renderConfig() {
      if (!this.state.open){
        return undefined;
      }
      return (
        <div className="widget-settings" >
          <WidgetConfig {...this.props} onChange={this.props.onChange}/>
        </div>
      );
    }
});

module.exports = {
  WidgetEditHeader
}