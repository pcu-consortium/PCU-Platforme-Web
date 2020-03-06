import React from 'react';
import WidgetManager from '../widget-manager';
import JsPlumbMixin from '../../mixins/js-plumb-mixin';

import { PanelListItem } from 'components/ui';

var WorkflowWidget = React.createClass({
    mixins: [ JsPlumbMixin ],

    getInitialState(){
        return {
            scale: "1.0"
        }
    },

    updateConnections(){
        var defaultColor = "#23527c";

        // Generate refs
        var refs = {};
        var draggables = [];
        var nodes = this.props.states;
        nodes.forEach((it, idx) => {
            var ref = idx + '-' + it.label;
            refs[it.label] = {
                ref: ref,
                color: it.color
            };

            draggables.push(this.refs[ref]);
        });


        // List connections
        var connections = [];
        nodes.forEach((it, idx) => {
            var transitions = it.transitions || [];
            transitions.forEach((transition, tIdx) => {
                // Internal link !! Start jsplumb :)
                var target = refs[transition.target];
                if (target){
                    connections.push({
                        color: target.color || defaultColor,
                        source: this.makeRef(it, idx, transition, tIdx),
                        target: target.ref,
                        label: transition.label
                    });
                }
            });
        });

        this.ensureDraggable(draggables);
        this.setJsPlumbConnections(connections);
    },

    componentDidUpdate(){
        this.updateConnections();
    },

    componentDidMount(){
        this.initJsPlumb(this.refs.container, {
            targetAnchor: "Continuous",
            //targetAnchor: ["TopLeft", "Top", "TopRight", "BottomLeft", "Bottom", "BottomRight"],
            connector: ["Bezier", {margin: 1, curviness: 40}]
            //connector: ["StateMachine", {margin: 1}]
        });
        this.updateConnections();
    },

    onScaleChange(type, value){
        this.setState({
            scale: value
        });
    },

    makeRef(table, tblIdx, field, fIdx){
        return tblIdx + '-' + table.label + '.' + fIdx + '-' + field.label;
    },

    render(){
        var scale = this.state.scale;
        var containerStyle = {
            position: 'relative', height: '800px',
            WebkitTransform: "scale(" + scale + ")",
            MozTransform: "scale(" + scale + ")",
            msTransform: "scale(" + scale + ")",
            OTransform: "scale(" + scale + ")",
            transform: "scale(" + scale + ")"
        };
        return (
            <div style={{position: 'relative'}}>
                <div ref="container" className="database-schema" style={containerStyle}>
                    {this.props.states.map(this.renderState)}
                </div>
                <div style={{position: 'absolute', top: 0, right: 0}}>
                    Scale :
                    <Selector type="scale" onChange={this.onScaleChange}
                              value={this.state.scale} values={["1.0", "0.75", "0.5", "0.25"]}/>
                </div>
            </div>
        )
    },

    renderState(state, idx){
        var refMaker = (field, fIdx) => this.makeRef(state, idx, field, fIdx);
        var ref = idx + "-" + state.label;
        var style = {
            position: 'absolute', width: '200px',
            top: state.position.y, left: state.position.x,
            zIndex: 100
        };
        var transitions = state.transitions || [];
        return (
            <div ref={ref} key={ref} style={style}>
                <PanelList title={state.label} bsStyle={state.bsStyle} compact>
                    {transitions.map((f, fIdx) => {
                        var key = refMaker(f, fIdx);
                        return <PanelListItem ref={key} key={key} title={f.label} subtitle={f.target} />;
                    })}
                </PanelList>
            </div>
        )
    }
});

WidgetManager.registerWidget("Workflow", {
    component: WorkflowWidget,
    icon: "code-fork",
    config: [
    ]
});

module.exports = WorkflowWidget;
