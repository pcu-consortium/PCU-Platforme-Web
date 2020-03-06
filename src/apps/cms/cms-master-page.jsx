
import WidgetManager from 'widgets/widget-manager';
import { renderWidget } from 'widgets/core/cms';

var CmsMasterPage = React.createClass({

    childContextTypes: {
        site: React.PropTypes.string,
        baseUrl: React.PropTypes.string,
        api: React.PropTypes.string,
        editing: React.PropTypes.bool,
        master: React.PropTypes.object,
    },

    getChildContext() {
        return {
            site: this.props.site,
            baseUrl: this.props.baseUrl,
            api: this.props.api,
            editing: this.props.editing,
            master: this
        };
    },

    getInitialState(){
        return {
            version: 1,
            copiedWidget: undefined,
            pasteCount: 0
        }
    },

    getDefaultProps(){
        return {
            useUUID: true
        }
    },

    getPage(){
        return this.props.page;
    },

    addWidget(widget, widgets, idx) {
        var clone = jQuery.extend(true, {}, widget);
        console.log('add widget', clone.type, 'at', idx);
        console.log('add widget', clone, 'at', idx);
        widgets.splice(idx, 0, clone);
        this.forceUpdate();
    },

    pasteWidget(widgets, idx){
        if (!this.state.copiedWidget){
            return;
        }
        this.addWidget(this.state.copiedWidget, widgets, idx);
        this.setState({
            copiedWidget: this.state.copiedWidget,
            pasteCount: this.state.pasteCount - 1
        });
    },

    copyWidget(widget) {
        var copy = jQuery.extend(true, {}, widget);
        delete copy._id;
        this.setState({
            copiedWidget: copy,
            pasteCount: -1 // No limit
        });
    },

    cutWidget(widget){
        var copy = jQuery.extend(true, {}, widget);
        this.setState({
            copiedWidget: copy,
            pasteCount: 1 // Cut only allows to paste once
        });
        this.removeWidget(widget);
    },

    removeWidget(widget){
        // No position, deep search in the whole tree...
        WidgetManager.findAndRemoveIn(widget, this.props.page.children);
        this.forceUpdate();
    },

    onChange() {
        this.forceUpdate();
    },

    refresh(){
        this.forceUpdate();
    },

    componentDidMount() {
        WidgetManager.setPage(this);
    },

    componentWillMount(){
        // Called after first props and before first render
        WidgetManager.setPageWidget(this.props.page);
    },

    componentWillReceiveProps(props){
        // Called before new renders
        WidgetManager.setPageWidget(props.page);
    },

    render() {
        const { page, editing } = this.props;
        // Padding bottom to have room for bottom menus...
        const style = editing ? { paddingBottom: 128 } : undefined;
        return <div style={style}>{renderWidget({widget: page})}</div>;
    }

});

module.exports = {
    CmsMasterPage
}