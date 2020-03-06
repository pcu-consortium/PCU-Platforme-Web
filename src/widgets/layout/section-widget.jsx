import React from 'react';
import WidgetManager from '../widget-manager';
import { LayoutMixin } from 'widgets/core/cms';

var SectionWidget = React.createClass({
    mixins: [LayoutMixin],

    render(){
        var widget = this.props.widget;
        return (
            <div>
                <h4>{widget.title}</h4>
                {this.renderWidgets(widget.children)}
            </div>
        );
    }
});

WidgetManager.registerWidget("Section", {
    component: SectionWidget,
    icon: "folder",
    config: [
        {key: "title", type: "input"}
    ],
    defaultValue: {type: 'Section', children: [ ]}
});

module.exports = SectionWidget;