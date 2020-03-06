import React from 'react';
import WidgetManager from '../widget-manager';
import JsPlumbMixin from '../../mixins/js-plumb-mixin';
import TablePanel from './table-panel';
import Atlas from 'utils/atlas';
import { PanelListItem } from 'components/ui';

import _ from 'lodash';
import removeDiacritics from 'utils/diacritics';

// TODO: relies on WML being preloaded...


var FileHandler = function(){

    var processSQL = function(file, tableCallback, continuation){
        var chunkSize  = 1024 * 1024; // bytes
        var fileSize = file.size;
        var offset     = 0;
        var block      = null;
        var push = INCREMENTALPARSESQL(file.name, sql => {
            console.log('sql', sql);
            if (((typeof sql) === "object") && sql.create_table){
                tableCallback(sql.create_table);
            }
        });
        block = function(_offset, length, _file) {
            var r = new FileReader();
            var blob = _file.slice(_offset, length + _offset);
            r.onload = evt => {
                if (evt.target.error == null) {
                    offset += evt.target.result.length;
                    //if (offset < 100000) console.log(evt.target.result);
                    console.log('push');
                    push(evt.target.result);
                } else {
                    console.log("Read error: " + evt.target.error);
                    return;
                }
                if (offset >= fileSize) {
                    console.log("Done reading file");
                    push("");
                    continuation();
                    return;
                }
                block(offset, chunkSize, _file);
            };
            r.readAsBinaryString(blob);
        };

        block(offset, chunkSize, file);
    };

    var processWorksheet = function(filename, sheetName, ws, callback){
        //console.log(ws);

        var colidx = function(x, y){
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[x] + (y+1);
        };

        // Find first header list...
        var range = ws['!range'];
        var headerY = -1; var headerCnt = 0;
        for(var y=range.s.r; y<=2; y++){
            var cnt = 0;
            for(var x=range.s.c; x<range.e.c; x++){
                //console.log(colidx(x, y), ws[colidx(x, y)]);
                if (ws.hasOwnProperty(colidx(x, y))){
                    cnt++;
                }
            }
            if (cnt > headerCnt){
                headerCnt = cnt;
                headerY = y;
            }
        }
        // Extract header
        var fields = [];
        var fieldNames = [];
        var cnt = 1;
        for(var x=range.s.c; x<range.e.c; x++){
            var idx = colidx(x, headerY);
            if (ws.hasOwnProperty(idx)){
                var label = ws[idx].v.split("\n")[0].trim();
                const id = removeDiacritics(label.toLowerCase()).replace(/[^a-z0-9]/gi, '_');
                fields.push({ id, label, type: "text", tab: "info" });
                fieldNames[x] = id;
            }
        }
        // Extract entries
        var entries = [];
        for(var y=headerY+1; y<range.e.r; y++){
            var cnt = 0;
            var entry = {};
            for(var x=range.s.c; x<range.e.c; x++){
                var idx = colidx(x, y);
                if ((x in fieldNames) && ws.hasOwnProperty(idx)){
                    cnt++;
                    entry[fieldNames[x]] = ws[idx].w;
                }
            }
            entry['sys.source_file'] = filename;
            if (cnt > 0){
                entries.push(entry);
            }
        }
        //console.log(name, fields, entries);
        callback({
            id: sheetName,
            label: sheetName,
            fields,
            entries
        });
    };

    var processXLS = function(file, callback, continuation){
        console.log('processXLS', file);
        var filename = file.name;
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;

            var bundle = require('bundle?lazy&name=xlsx!libs/xlsx');
            bundle(XLSX => {
            // TODO : Asynchronously load xlsx... (node version has require('fs') !!)
            //require.ensure(["xlsx"], function(require) {
            //    var XLSX = require('xlsx');

                var workbook = XLSX.read(data, {type: 'binary'});

                /* DO SOMETHING WITH workbook HERE */
                window.workbook = workbook; // Play in the browser :p

                var names = workbook.SheetNames.slice();
                var processNext = function(names){
                    if (names.length <= 0){
                        continuation();
                        return;
                    }
                    var name = names[0];
                    names.splice(0, 1);
                    processWorksheet(filename, name, workbook.Sheets[name], callback);
                    // setTimeout(() => processNext(names));
                    processNext(names);
                };
                processNext(names);
            });
        };
        reader.readAsBinaryString(file);
    };

    var processCSV = function(file, callback, continuation){
        console.log('processCSV', file);
        var filename = file.name;
        var bundle = require('bundle?lazy!papaparse');
        bundle(Papa => {
            Papa.parse(file, {
                skipEmptyLines: true,
                complete: function(results, file) {
                    // console.log(results);
                    var lines = results.data;
                    if (lines.length > 0){
                        var header = lines.shift();
                        console.log('header', header);
                        var jsonResults = lines.map(res => {
                            var obj = {};
                            for(var i=0; i<res.length && i<header.length; i++){
                                var val = res[i];
                                obj[header[i]] = Atlas.valueOf(val);
                            }
                            return obj;
                        });
                        // console.log(jsonResults);
                        var tables = _.values(Atlas.computeTables(jsonResults));
                        tables.forEach(callback);
                        continuation();
                    }
                }
            });
        });
    };

    var processFiles = function(files, callback, idx){
        idx = idx || 0;
        if (idx >= files.length){
            return;
        }
        var file = files[idx];
        var filename = file.name;

        var continuation = () => processFiles(files, callback, idx+1);

        if (filename.indexOf('.sql') != -1){
            processSQL(file, callback, continuation);
        } else if (filename.indexOf(".csv") != -1) {
            processCSV(file, callback, continuation);
        } else {//if (filename.indexOf('.xlsx') != -1){
            processXLS(file, callback, continuation);
        }
    };

    return {
        processFiles
    };
}();


var DatabaseSchema = React.createClass({
    mixins: [ JsPlumbMixin ],

    getInitialState(){
        return {
            scale: "1.0",
            hover: false,
            selectedTables: undefined
        }
    },

    getTables(){
        if (this.state.tables){
            return this.state.tables;
        }
        if (this.props.tables){
            return this.props.tables;
        }
        return [
            {label: 'Voyage', bsStyle: 'success', position: {x: '5%', y: '20%'}, fields: [
                {label: 'Id', type: 'number'},
                {label: 'Reference', type: 'text'},
                {label: 'Title', type: 'text'},
                {label: 'Author', type: 'text'}
            ]},
            {label: 'Album', bsStyle: 'warning', position: {x: '70%', y: '5%'}, fields: [
                {label: 'Id', type: 'number'},
                {label: 'Reference', type: 'text'},
                {label: 'Title', type: 'text'},
                {label: 'Voyage', type: 'internal_link', target: 'Voyage'}
            ]},
            {label: 'Photo', bsStyle: 'danger', position: {x: '35%', y: '40%'}, fields: [
                {label: 'Id', type: 'number'},
                {label: 'Reference', type: 'text'},
                {label: 'Title', type: 'text'},
                {label: 'Album', type: 'internal_link', target: 'Album'},
                {label: 'Voyage', type: 'internal_link', target: 'Voyage'}
            ]}
        ]
    },

    getVisibleTables(){
        var selectedTables = this.state.selectedTables;
        if (!selectedTables){
            return this.getTables(); // No selection, return everything
        }
        return _.filter(this.getTables(), table => selectedTables.indexOf(table.id) != -1);
    },

    updateConnections(){
        var defaultColor = "#23527c";

        // Generate table refs
        var tableRefs = {};
        var draggables = [];
        var visibleTables = this.getVisibleTables();
        visibleTables.forEach((table, tblIdx) => {
            var ref = tblIdx + '-' + table.label;
            tableRefs[table.label] = {
                ref: ref,
                color: table.color
            };

            draggables.push(this.refs[ref]);
        });


        // List connections
        var connections = [];
        visibleTables.forEach((table, tblIdx) => {
            // Field connections
            table.fields.forEach((field, fIdx) => {
                if (field.type === "internal_link") {
                    // Internal link !! Start jsplumb :)
                    var targetTable = tableRefs[field.target];
                    connections.push({
                        color: targetTable.color || defaultColor,
                        source: this.makeRef(table, tblIdx, field, fIdx),
                        target: targetTable.ref
                    });
                }
            });
            // Join connections
            var tabs = table.tabs || [];
            tabs.forEach(tab => {
                if (tab.type === "join"){
                    var targetTable = tableRefs[tab.join.table];
                    connections.push({
                        color: targetTable.color || defaultColor,
                        source: tblIdx + '-' + table.label,
                        target: targetTable.ref,
                        anchors: ["Top", "Top"],
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
        this.initJsPlumb(this.refs.container);
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

    onEvent(e){
        e.stopPropagation();
        e.preventDefault();
        switch(e.type){
            case "dragover": this.setState({hover: true}); break;
            case "dragleave": this.setState({hover: false}); break;
            case "drop": console.log('drop!!', e); this.setState({hover: false}); break;
            default: console.log('onEvent', e.type, e);
        }
    },

    onDrop(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({hover: false});
        var files = (e.dataTransfer || e.target).files;
        console.log(files);
        var tables = this.state.tables || [];
        var selectedTables = this.state.selectedTables || [];
        FileHandler.processFiles(files, table => {
            //console.log(table);
            var gridWidth = (this.props.hideFields ? 3 : 5);
            var gridHeight = (this.props.hideFields ? 7 : 5);
            var gridSpacing = (this.props.hideFields ? 0 : 0.5);
            var idx = tables.length;
            var yIdx = Math.floor(idx/gridWidth);
            var x = ((idx%gridWidth+(yIdx%2)*gridSpacing)/(gridWidth*1.2)*100)+'%';
            var y = (10+yIdx/gridHeight*100)+'%';
            var prevTable = _.find(tables, t => t.label == table.label);
            console.log('table', table);
            if (prevTable){
                prevTable.entries = [].concat(prevTable.entries, table.entries||[]);
            } else {
                var fields = (table.fields || table.columns || []).map((col, idx) => {
                    const label = col.label || col.name;
                    return { 
                        id: col.id||(idx+1), label, type: col.type || col.data_type, pos: col.pos
                    }
                });
                console.log('fields', fields);
                var table = {
                    id: table.id || table.label || table.name,
                    label: table.label || table.name,
                    position: {x, y},
                    fields,
                    tabs: [
                        {id: 'info', label: 'Informations', fields: fields.map(f => f.id)}
                    ],
                    entries: (table.entries || [])
                };
                tables.push(table);
                selectedTables = selectedTables.slice();
                selectedTables.push(table.id);
            }
            var scale = this.state.scale;
            //if (tables.length > 10){
            //    scale = 0.75;
            //}
            // Wait a little to batch updates...
            if (!this.updateWidget){ // Already waiting for udpates ?
                setTimeout(() => {
                    if (this.updateWidget){
                        this.setState({tables, selectedTables, scale});
                        if (WidgetManager){
                            WidgetManager.updateFieldValue(this.props.type, this.props.id, "tables", tables);
                        }
                    }
                    this.updateWidget = false;
                }, 0);
            }
            this.updateWidget = true;
        });
    },

    onSelectTables(tables){
        this.setState({
            selectedTables: tables.slice()
        });
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
        var eventListeners = {
            onDragOver: this.onEvent,
            onDrop: this.onDrop,
            onDragLeave: this.onEvent
        };
        var className = "database-schema" + (this.state.hover ? ' hover' : '');
        var tableList = [];
        //var tableList = this.state.tables || [];
        //tableList = tableList.map(table => table.label);
        return (
            <div style={{position: 'relative'}}>
                {this.renderEmptyMessage()}
                <div {...eventListeners} ref="container" className={className} style={containerStyle}>
                    {this.getVisibleTables().map(this.renderTable)}
                </div>
                <div style={{position: 'absolute', top: 0, right: 0}}>
                    {tableList.length == 0 ? undefined :
                        <MultiSelector defaultValues={tableList} values={this.state.selectedTables}
                                       buttonWidth="320px"
                                       onChange={this.onSelectTables}
                                       allSelectedText="Toutes les tables"
                                       nSelectedText=" tables"
                                       noneSelectedText="Aucune table"/>}

                    Scale :
                    <Selector type="scale" onChange={this.onScaleChange}
                              value={this.state.scale} values={["1.0", "0.75", "0.5", "0.25"]}/>
                </div>
            </div>
        )
    },

    renderEmptyMessage(){
        var tables = this.getTables();
        if (tables && tables.length > 0){
            return undefined;
        }
        var style = {
            textAlign: 'center', verticalAlign: 'middle',
            marginTop: '200px', position: 'absolute',
            width: '100%'
        };
        return (
            <div style={style}><h3>Drag files here<br /><small>xls, xlsx, csv, sql, etc.</small></h3></div>
        );
    },

    renderTable(table, tblIdx){
        var ref = (field, fIdx) => this.makeRef(table, tblIdx, field, fIdx);
        var tblRef = tblIdx + "-" + table.label;
        var style = {
            position: 'absolute', width: '180px',
            top: table.position.y, left: table.position.x,
            zIndex: 100
        };
        var onClick = () => {
            if (WidgetManager){
                WidgetManager.updateFieldValue(this.props.type, this.props.id, "selected", table);
            }
        };
        if (this.props.hideFields){
            // Compact version
            return (
                <div ref={tblRef} key={tblRef} style={style}>
                    <TablePanel {...table} onClick={onClick} />
                </div>
            );
        } else {
            // Complete version with fields

            // Ensure correct label
            var getLabel = label => ((typeof label) === 'string') ? label : label.fra;
            return (
                <div ref={tblRef} key={tblRef} style={style}>
                    <PanelList title={getLabel(table.label)} bsStyle={table.bsStyle} compact onClick={onClick}>
                        {table.fields.map((f, fIdx) => {
                            var key = ref(f, fIdx);
                            var type = f.type;
                            if (type === "internal_link"){
                                type = " \u2192 " + f.target;
                            }
                            return <PanelListItem ref={key} key={key} title={getLabel(f.label)} titleRight={type} />;
                        })}
                    </PanelList>
                </div>
            );
        }
    }
});


WidgetManager.registerWidget("DatabaseSchema", {
    component: DatabaseSchema,
    icon: "code-fork",
    config: [
    ]
});

module.exports = DatabaseSchema;
