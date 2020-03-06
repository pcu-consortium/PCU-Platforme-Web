import React from 'react';
import WidgetManager from '../widget-manager';

import _ from 'lodash/collection';

var DocumentList = React.createClass({

    getInitialState(){
        return {
            idx: 0
        }
    },

    getDefaultProps(){
        return {
            showTableLabel: true
        };
    },

    componentWillReceiveProps(nextProps){
        var name = table => table ? table.label : undefined;
        var oldName = name(this.props.table), nextName = name(nextProps.table);
        if (oldName !== nextName){
            // Flush !!
            this.setState({idx: 0});
        }
    },

    render(){
        var { table, tables } = this.props;
        var idx = this.state.idx;
        if ((typeof table) !== "object"){
            return false;
        }
        var entries = table.entries || [];
        var onPrev = () => this.setState({idx: idx-1});
        var onNext = () => this.setState({idx: idx+1});
        if (entries.length == 0){
            return (
                <div>
                    {this.renderTitle()}
                    <div style={{textAlign: 'center'}}>
                        <Button style={{float: 'right'}} icon="chevron-right" bsSize="sm" bsStyle="link" onClick={onNext} disabled={idx+1>=entries.length}/>
                        <Button style={{float: 'left'}} icon="chevron-left" bsSize="sm" bsStyle="link" onClick={onPrev} disabled={idx == 0} />
                        <h4>Aucune entrée</h4>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {this.renderTitle()}
                <div style={{textAlign: 'center'}}>
                    <Button style={{float: 'right'}} icon="chevron-right" bsSize="sm" bsStyle="link" onClick={onNext} disabled={idx+1>=entries.length}/>
                    <Button style={{float: 'left'}} icon="chevron-left" bsSize="sm" bsStyle="link" onClick={onPrev} disabled={idx == 0} />
                    <h4>{this.state.idx+1} / {entries.length}</h4>
                </div>
                <DocumentInfo
                    tabStyle={this.props.tabStyle}
                    title={"Document " + (idx+1)}
                    versions={[
                      {
                        version: "1.0",
                        author: "Gregory Potdevin",
                        date: "2015/07/21",
                        comment: "Import initial"
                      }
                    ]}
                    tables={tables}
                    model={table}
                    document={entries.length > 0 ? entries[this.state.idx] : undefined}/>
                <h4>Lier une table</h4>
                <TableLinkMaker table={table} tables={tables} />
            </div>
        )
    },

    renderTitle(){
        const { table, showTableLabel } = this.props;
        if (!showTableLabel){
            return undefined;
        }
        return <h3>{table.label}</h3>;
    }
});

var TableLinkMaker = React.createClass({

    getInitialState(){
        return {
            value: "---",
            source: "---",
            destination: "---"
        }
    },

    componentWillReceiveProps(nextProps){
        var name = table => table ? table.label : undefined;
        var oldName = name(this.props.table), nextName = name(nextProps.table);
        if (oldName !== nextName){
            this.flushState();
        }
    },

    flushState(){
        this.setState({value: "---", source: "---", destination: "---"});
    },

    addTab(){
        var { table } = this.props;
        var state = this.state;
        table.tabs.push({
            id: state.value,
            label: state.value,
            type: 'join',
            join: {
                table: state.value,
                sourceField: state.source,
                destinationField: state.destination
            }
        });
        if (WidgetManager){
            WidgetManager.updateFieldValue("DocumentList", undefined, "tables", this.props.tables);
        }
        this.flushState();
    },

    handleChange(e){
        this.setState({
            value: e.target.value,
            source: "---"
        });
    },

    render(){
        var state = this.state;
        var {table, tables} = this.props;
        var isReady = (state.source != "---") && (state.destination != "---");
        console.log(_.find(tables, t => t.id == state.value));
        console.log(table);
        return (
            <form className="form-horizontal">
                {this.renderSelect("Table à lier ",
                    <select id="table" className="form-control" value={state.value} onChange={this.handleChange}>
                        <option>---</option>
                        {_.filter(tables, t => t.id != table.id).map(t => <option key={t.id}>{t.id}</option>)}
                    </select>
                )}
                {this.renderFieldSelector("source", _.find(tables, t => t.id == state.value))}
                {this.renderFieldSelector("destination", table)}
                <Button icon="plus" disabled={!isReady} bsSize="sm" onClick={this.addTab}>Ajouter</Button>
            </form>
        )
    },

    renderSelect(label, select){
        return (
            <div className="form-group">
                <label htmlFor="table" className="col-sm-5 control-label">{label}</label>
                <div className="col-sm-7">{select}</div>
            </div>
        )
    },

    renderFieldSelector(id, table){
        if (this.state.value === "---") {
            return undefined;
        }
        var onChange = e => {
            var state = {};
            var value = e.target.value;
            state[id] = value;
            if ((id === "source") && (value === "sys.source_file") && (this.state.destination === "---")){
                // Valid value for the other one ? :p
                state.destination = value; // Auto-link !
            }
            this.setState(state);
        };
        return this.renderSelect("Champs de " + table.label + " ",
            <select id={id} className="form-control" value={this.state[id]} onChange={onChange}>
                <option>---</option>
                <option>sys.source_file</option>
                {table.fields.map(f => <option key={f.id}>{f.id}</option>)}
            </select>
        );
    }
});



WidgetManager.registerWidget("DocumentList", {
    component: DocumentList,
    icon: "file-o",
    config: [
        {key: "tabStyle", type: "selector", values: ["tabs", "pills", "light", "categories"]}
    ]
});

module.exports = DocumentList;
