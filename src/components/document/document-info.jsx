import React from 'react';
import _ from 'lodash/collection';
import Helmet from "react-helmet";

// TODO : build real ModelManager...
var ModelManager = function(){

    //    'editable': false,
    //    'required': true
    var model = {
        name: "schema",
        fields: [
            {id: "id", label: "Id", type: "number", subtype: "integer", tab: "info"},
            {id: "title", label: "Titre", type: "text", tab: "info"},
            {id: "filename", label: "Nom du fichier", type: "text", tab: "info"},
            {id: "link", label: "Lien externe", type: "external_link", subtype: "url", tab: "info"},
            {id: "author", label: "Auteur", type: "text", tab: "info"},
            {id: "description", label: "Description", type: "text", tab: "info"},
            {id: "comment", label: "Commentaire", type: "text", tab: "info"}
        ],
        tabs: [
            {id: 'info', label: 'Informations'},
            {id: 'metadata', label: 'Méta-données'}
        ]
    };

    var oai = {
        name: "schema",
        fields: [
            { id: "dc:identifier", type: "text", tab: "info" },
            { id: "dc:title", type: "text", tab: "info" },
            { id: "dc:creator", type: "text", tab: "info" },
            { id: "dc:date", type: "text", tab: "info" },
            { id: "dc:language", type: "text", tab: "info" },
            { id: "dc:description", type: "text", tab: "info" },
            { id: "dc:rights", type: "text", tab: "info" },
            { id: "dcterms:accessRights", type: "text", tab: "info" }
        ],
        tabs: [
            { id: "info", label: "Informations", fields: [
                "dc:identifier", "dc:title", "dc:creator", "dc:date", 
                "dc:language", "dc:description", "dc:rights", "dcterms:accessRights"
            ] }
        ]
    };


    var modelFor = function(documentType){
        switch(documentType){
            case 'oai': return oai;
            case 'document':
            default:
                return model;
        }
    };

    var tabbedModelFor = function(documentType){
        var model = modelFor(documentType);
        var tabMap = {};
        var tabs = model.tabs.map(t => {
            var tab = {
                id: t.id,
                label: t.label,
                fields: []
            };
            tabMap[tab.id] = tab;
            return tab;
        });
        model.fields.forEach(f => tabMap[f.tab].fields.push(f));
        return {
            type: documentType,
            fields: model.fields,
            tabs: tabs,
            tabMap: tabMap
        };
    };

    return {
        modelFor: modelFor,
        tabbedModelFor: tabbedModelFor
    }
}();

var multilang = function(label){
    if ((typeof label) === "string"){
        return label;
    }
    if (label.fra) return label.fra;
    else if (label.eng) return label.end;
    else return label;
}

var DocumentInfo = React.createClass({

    getDefaultProps(){
        return {
            tabStyle: "light",
            hasVersions: true, // SHOW/HIDE versions tab
            ignoreEmpty: false,
            onClickLink: e => {}
        }
    },

    hasVersions(){
        return this.props.hasVersions && this.props.versions && this.props.versions.length > 0
    },

    getTabbedModel(){
        var model = this.getModel();
        // Group fields by tab and generate a tabMap
        var fields = {};
        model.fields.forEach(f => {
            fields[f.id] = f
        });
        var tabMap = {};
        var tabs = model.tabs.map(t => {
            var tabFields = t.fields || [];
            if (!Array.isArray(tabFields)){
                console.warn("tabFields isn't an array:", tabFields);
                tabFields = [];
            }
            var tab = {
                id: t.id,
                label: t.label,
                type: t.type,
                join: t.join,
                fields: tabFields.map(id => fields[id]).filter(f => f != undefined)
            };
            tabMap[tab.id] = tab;
            return tab;
        });
        return {
            fields: model.fields,
            tabs, tabMap
        };
        //return ModelManager.tabbedModelFor(this.props.document);
    },

    getModel(){
        var model = this.props.model;
        if ((typeof model) === "string"){
            model = ModelManager.modelFor(model);
        }
        return model;
    },

    getTabs(){
        //var { tabs } = ModelManager.modelFor(this.props.document);
        var model = this.getModel();
        if (!model){
            console.warn("Error, missing model...");
            return [];
        }
        var { tabs } = model;
        // Standard tabs
        var panelTabs = tabs.map(t => {
            return {
                id: t.id,
                label: t.label,
                render: this.renderTabContent
            }
        });
        // Special tabs
        if (this.hasVersions()){
            panelTabs.push({
                id: 'versions',
                label: 'Versions',
                render: this.renderVersions
            });
        }
        return panelTabs;
    },

    render(){
        var { document, title, tabStyle } = this.props;
        //console.log('props', this.props);
        if (!document){
            return false;
        }
        return (
            <div className="document-info" style={{padding: '8px'}}>
                <Helmet
                    title={(document.label || document.title || document.reference || document.docid)}
                    titleTemplate="Armadillo - %s"
                    meta={[
                        {"name": "description", "content": document.arboclass},
                        {"property": "og:type", "content": document.base}
                    ]}
                    link={[
                        {"rel": "canonical", "href": "http://localhost:3000/document/" + document.docid}
                    ]}/>
                {this.props.showLinks ? (
                    <div style={{paddingRight: '8px', float: 'right'}}>
                        {this.renderLink(document.id, "lien", "link")}
                        {this.renderLink(document.id, "télécharger", "download")}
                    </div>
                ): undefined}
                <h3 style={{textTransform: 'uppercase'}}>
                    {title || document.title}
                </h3>
                <Tabs tabStyle={tabStyle} tabs={this.getTabs()} />
            </div>
        );
    },

    renderLink(id, txt, icon){
        return <Button href={id} target="_blank" bsStyle="link" bsSize="sm" icon={icon}>{txt}</Button>
    },

    renderTabContent(tabId){
        var model = this.getTabbedModel();
        if (!model.tabMap[tabId]){
            console.log("empty");
            return false;
        }
        var tab = model.tabMap[tabId];
        if (tab.type == "join"){
            return this.renderJoin(tab);
        }
        return this.renderMetadataCard(tab.fields, this.props.document);
    },


    renderJoin(tab){
        var join = tab.join;
        var table = _.find(this.props.tables, table => table.id == join.table);
        var currentDoc = this.props.document;
        if (!table || !currentDoc) {
            console.warn('Failed to find table', tableId, 'or doc');
            return undefined;
        }
        // Filter documents
        var targetValue = currentDoc[join.destinationField];
        var documents = _.filter(table.entries || [], doc => doc[join.sourceField] == targetValue);
        return (
            <div>
                <h5>{documents.length} entrées</h5>
                {documents.map((doc, idx) => this.renderMetadataCard(table.fields, doc, idx))}
            </div>
        );
    },

    renderMetadataCard(fields, document, id){
        return (
            <div key={id} className="metadata-card">
                <Table condensed striped className="table-info">
                    <tbody>
                    {fields.map(field => this.renderLine(field, document[field.id], this.props))}
                    </tbody>
                </Table>
            </div>
        )
    },

    renderLine(entry, value, options){
        var options = options || {};
        if (options.ignoreEmpty && !value){
            return undefined;
        }
        var label = entry.label || entry.id;
        var valueFor = function(type, value){
            switch(type){
                case 'url':   return <a href={value} target="_blank">{value}</a>;
                case 'text':  return value;
                case 'internal_link': {
                    if ("object" === typeof value){
                        var onClick = e => {
                            this.props.onClickLink(e, value);
                        };
                        return <a href={value.id} target="_blank" onClick={onClick}>{value.label || value.id}</a>;
                    } else {
                        return value.id;
                    }
                }
                default:      return value;
            }
        }.bind(this);
        var displayValue;

        if (entry.multivalued && Array.isArray(value)){
            if (entry.type == "internal_link"){
                displayValue = value.map((v, idx) => <div key={idx}>{valueFor(entry.type, v)}</div>);
            } else {
                displayValue = value.map(v => valueFor(entry.type, v)).join(', ');
            }
        } else {
            displayValue = valueFor(entry.type, value);
        }

        return (
            <tr key={entry.id}>
                <td className="field-name">{multilang(label)}</td>
                <td className="field-value">{displayValue}</td>
            </tr>
        )
    },

    renderVersions(){
        var columns = [
            {id: "version", label: "Version"},
            {id: "author", label: "Auteur"},
            {id: "date", label: "Date"},
            {id: "comment", label: "Commentaire"}
        ];

        return (
            <div className="metadata-card">
                <SortableDataTable columns={columns} items={this.props.versions} sortColumn="version" sortOrder="desc" />
            </div>
        );
    }
});

if (window){
    window.DocumentInfo = DocumentInfo;
}

module.exports = DocumentInfo;
