import React from 'react';
import WidgetManager from '../widget-manager';
import { LayoutMixin } from 'widgets/core/cms';
import { WmlEditor } from 'components/editors/code-editors';

var PlaygroundWidget = React.createClass({
    mixins: [LayoutMixin],

    getInitialState(){
        return {
            show: false,
            uuid: generateUUID() // To ensure unique IDs...
        };
    },

    onChange(children){
        this.props.widget.children = children;
        this.forceUpdate();
    },

    toggleShow(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({show: !this.state.show});
    },

    render(){
        var { widget } = this.props;
        return (
            <div className="clearfix">
                <div className="bs-example">
                    {this.renderWidgets(widget.children)}
                </div>
                {this.renderEditor()}
                {this.renderButton()}
            </div>
        )
    },


    renderEditor(){
        if (!this.state.show){
            return undefined;
        }
        var content = this.props.widget.children || [];
        return (
            <div className="code-preview">
                <WmlEditor id={this.state.uuid} content={content} maxLines="Infinity" onChange={this.onChange} multiwidget />
            </div>
        );
    },

    renderButton(){
        if (this.state.show){
            return <a className="code-toggle open" href="#" onClick={this.toggleShow}>hide code</a>;
        } else {
            return <a className="code-toggle" href="#" onClick={this.toggleShow}>show code</a>;
        }
    }
});

WidgetManager.registerWidget("Playground", {
    component: PlaygroundWidget,
    icon: "code",
    config: [
    ],
    defaultValue: {type: 'Playground', children: [ {type: 'Text', text: 'Edit me'}]}
});

module.exports = PlaygroundWidget;