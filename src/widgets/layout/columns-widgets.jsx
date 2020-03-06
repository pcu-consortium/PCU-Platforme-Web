
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { LayoutMixin } from 'widgets/core/cms';
import { renderWidget } from 'widgets/core/cms';

var ColumnsWidget = React.createClass({
    mixins: [WidgetMixin, LayoutMixin],

    render(){
        var children = this.props.widget.children || [];
        return (
            <div className="cms-columns" >
                {children.map(this.renderColumn)}
            </div>
        );
    },

    renderColumn(child, idx){
        var props = React.__spread({},  this.props, {key: idx, widget: child, parent: this.props.widget});
        return renderWidget(props);
    }
});

var RowWidget = React.createClass({
    mixins: [WidgetMixin, LayoutMixin],

    computeDefaultSize(children){
        if (children.length == 0){
            return undefined;
        }
        for(var i=0; i<children.length; i++){
            if (children[i].columnWidth){
                return undefined; // Manually set, let the user and browser decide
            }
        }
        return (100/children.length) + '%';
    },

    render(){
        var children = this.props.widget.children || [];
        var defaultSize = this.computeDefaultSize(children);
        return (
            <div className="cms-columns clearfix" >
                {children.map((child, idx) => this.renderColumn(child, idx, defaultSize))}
            </div>
        );
    },

    renderColumn(widget, idx, defaultSize){
        if (widget.type !== 'Column'){
            // Auto-add intermediate levels
            //var res = renderWidget({key: idx, widget: widget, parent: this.props.widget});
            //{this.renderWidgets([widget])}
            // TODO : auto-insert column when adding widgets
            return (
                <div key={idx} className="cms-column " style={{
                    float: "left",
                    width: widget.columnWidth || defaultSize,
                    maxWidth: widget.columnWidth || defaultSize
                }}>
                    {this.renderWidgets([widget], true)}
                </div>
            )
        } else {
            return renderWidget({key: idx, widget, parent: this.props.widget});
        }
    }
});

var ColumnWidget = React.createClass({
    mixins: [WidgetMixin, LayoutMixin],

    render(){
        var widget = this.props.widget;
        const { backgroundColor } = this.props;
        const width = widget.width;
        var borderClass = '';
        if (this.context.editing){
            borderClass = 'editing';
        }

        return (
            <div className={"cms-column " + borderClass} style={{width, backgroundColor}}>
                {this.renderWidgets(widget.children)}
            </div>
        )
    }
});

WidgetManager.registerWidget("Columns", {
    component: ColumnsWidget,
    config: [
    ]
});

WidgetManager.registerWidget("Row", {
    component: RowWidget,
    config: [
    ]
});

WidgetManager.registerWidget("Column", {
    component: ColumnWidget,
    config: [
        {key: "width", type: "input"}
    ]
});