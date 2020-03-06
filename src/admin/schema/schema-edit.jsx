import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
//import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
//import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { LinkButton, ContentPanel } from 'admin/common/components.jsx';

import SchemaModel from './model';
import Lang from 'utils/lang';
import { ReferenceBuilder } from './reference';
import SchemaSidePanel from './edit/schema-edit-sidebar';
import { Input } from 'admin/forms/form-components';

import classNames from 'classnames';
import _ from 'lodash';

class BaseComponent extends React.Component {
    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }
}

//const card = cards.filter(c => c.id === id)[0];
//const afterCard = cards.filter(c => c.id === afterId)[0];
//const cardIndex = cards.indexOf(card);
//const afterIndex = cards.indexOf(afterCard);
//
//this.setState(update(this.state, {
//    cards: {
//        $splice: [
//            [cardIndex, 1],
//            [afterIndex, 0, card]
//        ]
//    }
//}));


var defaultModel = {
    id: "default", label: "Default",
    fields: [
        {id: "id", label: "Id", type: "number", subtype: "integer"},
        {id: "reference", label: "Référence", help: "Référence incrémentale automatique", type: "text"},
        {id: "label", label: "Label", type: "text"},
        {id: "create_by", label: "Créé par", type: "controlled"},
        {id: "create_on", label: "Créé le", type: "date"},
        {id: "modified_by", label: "Modifié par", type: "controlled"},
        {id: "modified_on", label: "Modifié le", type: "date"},
        {id: "status", label: "Statut", type: "controlled"},
        {id: "status_on", label: "Statut depuis", type: "date"},
        {id: "status_by", label: "Statut par", type: "controlled"}
    ],
    tabs: [
        {
            id: 'sys_fields',
            label: "Champs système",
            fields: ["id", "reference", "create_by", "create_on", "modified_by", "modified_on", "status", "status_on", "status_by"]
        },
    ]
};

var ConfigSchema = React.createClass({
    statics: {
        willTransitionTo: (transition, params, query) => {
            //console.log(this);
            //this.breadcrumb[1].label = 'Edition - ' + params.schemaId;
            //console.log("intercepting transition path", transition, params, query);
        },
        breadcrumb: [
            {to: 'schema-list', label: 'Fonds', icon: 'database'},
            {label: 'Edition', icon: 'pencil'}
        ]
    },

    getInitialState: function(){
        return {
            model: SchemaModel.getTabbedModel(),
            showPanel: true
        }
    },

    componentDidMount: function(){
        const { schemaId } = this.props;
        SchemaModel.reset();
        SchemaModel.register(this.refreshModel);
        $.get('/test/api/tmp/schema/' + encodeURIComponent(schemaId), SchemaModel.init)
         .fail(e => { 
            console.warn('error', e);
            var model = _.cloneDeep(defaultModel);
            SchemaModel.init({
                ...model,
                id: this.props.schemaId,
                label: this.props.schemaId
            });
        });
    },

    componentWillUnmount: function(){
        SchemaModel.unregister();
    },

    refreshModel: function(){
        var model = SchemaModel.getTabbedModel();
        this.setState({model});
        // React.addons.Perf.start();
        // this.setState({model}, () => {
        //     React.addons.Perf.stop();
        //     React.addons.Perf.printWasted();
        // });
    },

    onSelectorChange: function(key, value) {
        var state = {};
        state[key] = value;
        Lang.set(value);
        this.setState(state);
    },

    togglePanel: function(){
        this.setState({showPanel: !this.state.showPanel});
    },

    handleChange(){
        //this.forceUpdate();
        this.refreshModel();
    },

    render: function() {
        const { model={} } = this.state;
        //{Lang.txt("schema.fields")}
        return (
            <ContentPanel showPanel={this.state.showPanel} sidePanel={this.renderSidePanel()}
                          title={Lang.txt("schema.title_create")}>
                {/*this.renderOptionsSection()*/}
                    <Button bsSize="sm" alignRight icon="cogs"
                            active={this.state.showPanel}
                            onClick={this.togglePanel}>mode avancé</Button>
                <h3>{model.label}</h3>
                <SchemaView model={model}/>
            </ContentPanel>
        );
    },

    renderOptionsSection(){
        var langs = ['fr', 'en'];
        return (
            <div>
                <h3>{Lang.txt("options")}</h3>
                <div style={{padding: "8px"}}>
                    {Lang.txt("language")} : <Selector type="lang" value={Lang.get()} values={langs}
                                                       onChange={this.onSelectorChange} />
                </div>
            </div>
        );
    },

    renderSidePanel: function(){
        if (!this.state.showPanel){
            return undefined;
        }
                //<ReferenceBuilder reference="{base}-{dir}-{incr}"/>
        return <SchemaSidePanel schema={SchemaModel.getTabbedModel()} field={SchemaModel.getSelected()} onChange={this.handleChange}/>;
    }
});


//@DragDropContext(HTML5Backend)
class SchemaView extends BaseComponent {
    static propTypes: {
        model: React.PropTypes.object
        };

    constructor(props) {
        super(props);
        this._bind('handleChange', 'handleClick', 'moveField', 'computeTabs', 'renderAllTab', 'renderContent');

        this.state = {
            newTab: ''
        };
    }

    handleChange(e) {
        this.setState({
            newTab: e.target.value
        });
    }

    handleClick(e){
        SchemaModel.dispatch({
            action: 'add_tab',
            name: this.state.newTab
        });
        this.setState({
            newTab: ''
        });
    }

    moveField(id, afterId){
        console.log('moveField', id, afterId);
        //const { cards } = this.state;
        //
        //const card = cards.filter(c => c.id === id)[0];
        //const afterCard = cards.filter(c => c.id === afterId)[0];
        //const cardIndex = cards.indexOf(card);
        //const afterIndex = cards.indexOf(afterCard);
        //
        //this.setState(update(this.state, {
        //    cards: {
        //        $splice: [
        //            [cardIndex, 1],
        //            [afterIndex, 0, card]
        //        ]
        //    }
        //}));
    }

    computeTabs(){
        //var allTab = {
        //    id: "all",
        //    label: Lang.txt("tab.all")
        //};
        //var tabs = [allTab].concat(_.values(this.props.model.tabs));
        //return tabs;
        return _.values(this.props.model.tabs);
    }

    render(){
        return (
            <div>
                <Tabs tabs={this.computeTabs()} tabContentRenderer={this.renderContent} tabStyle="categories" />
                <div className="input-group" style={{width: 240}}>
                    <Input value={this.state.newTab} onChange={this.handleChange}
                           placeholder={Lang.txt("action.add_tab")}
                           rightButton={<Button icon="plus" bsStyle="link" bsSize="sm" onClick={this.handleClick} />}
                        />
                </div>
            </div>
        );
    }

    renderAllTab(){
        var { model } = this.props;
        return (
            <div>
                {_.values(model.tabs).map(tab => {
                    return (
                        <div>
                            <h4>{tab.label}</h4>
                            {this.renderContent(tab.id)}
                        </div>
                    );
                })}
            </div>
        )
    }

    renderContent(id){
        if (id === "all"){
            return this.renderAllTab();
        }
        var { model } = this.props;
        var tab = model.tabs[id];
        return <SchemaFieldsView key={id} parent={tab} moveField={this.moveField} />
    }
}


class SchemaFieldsView extends Component{

    flatten(arrayOfArrays){
        var merged = [];
        return merged.concat.apply(merged, arrayOfArrays);
    }

    render(){
        var renderedFields = [];
        this.renderFields(renderedFields, this.props.parent, 0);
        return (
            <Table condensed bordered hover className="config admin-form">
                <thead>
                <tr>
                    <th>{Lang.txt("schema.name")}</th>
                    <th className="shrink" style={{minWidth: 160}}>{Lang.txt("schema.type")}</th>
                    <th className="centered">{Lang.txt("schema.multivalued")}</th>
                    <th className="centered">{Lang.txt("schema.mandatory")}</th>
                    <th style={{width:160}}>{Lang.txt("schema.default")}</th>
                    <th style={{width:68}}>{Lang.txt("schema.actions")}</th>
                </tr>
                </thead>
                <tbody>
                {renderedFields}
                </tbody>
            </Table>
        );
    }

    renderFields(rendered, parent, depth){
        for(var i=0; i<parent.fields.length; i++){
            this.renderField(rendered, parent.fields[i], depth);
        }
        var defaultField = { parent, label: "", type: "text", multivalued: false };
        this.renderField(rendered, defaultField, depth);
    }

    renderField(rendered, field, depth){
        // field.id || (field.parent.id + "-new")
        rendered.push(<SchemaField key={rendered.length} selected={field.id == SchemaModel.getSelectedId()} moveField={this.props.moveField} field={field} depth={depth} lang={Lang.get()} version={field.version} />);
        if (field.type === "structure"){
            this.renderFields(rendered, field, depth+1);
        }
    }
}


var SchemaInput = React.createClass({

    handleChange(e) {
        SchemaModel.dispatch({
            action: 'update',
            field: this.props.field,
            key: this.props.fieldKey,
            value: e.target.value
        });
        if (this.props.onChange){
            this.props.onChange(e);
        }
    },

    render(){
        if (!this.isVisible()){
            return false;
        }
        var props = this.props;
        var field = props.field;
        var error = Lang.txt(props.error);
        return (
            <Input {...props} value={field[props.fieldKey]} error={error} onChange={this.handleChange}/>
        );
    },

    isVisible(){
        return true;
    }
});

var FieldInput = React.createClass({

    handleChange(e) {
        this.dispatchChange(e.target.value);
    },

    dispatchChange(value){
        SchemaModel.dispatch({
            action: 'update',
            field: this.props.field,
            key: this.props.fieldKey,
            value: value
        });
    },

    render(){
        if (!this.isVisible()){
            return false;
        }
        var props = this.props;
        var field = props.field;
        var error = Lang.txt(props.error);
        console.log(field.type);
        if (field.type === "boolean"){
            this.renderCheckbox();
        }
        return (
            <Input {...props} value={field[props.fieldKey]} error={error} onChange={this.handleChange}/>
        );
    },

    renderCheckbox(){
        var { field, fieldKey } = this.props;
        var values = config.labels || [ "on", "off" ];
        // 0 is TRUE, 1 is FALSE !!!!!
        var value = values[field[fieldKey] ? 0 : 1];
        var updateValue = (key, value) => {
            var isTrue = values.indexOf(value) == 0;
            this.dispatchChange(isTrue);
        };
        return (
            <ConfigEntry key={idx} config={config}>
                <Radios {...this.props} type={config.key} values={values}
                                        onChange={updateValue} value={value} />
            </ConfigEntry>
        );
    },

    isVisible(){
        return true;
    }
});



var TypeSelector = React.createClass({

    getTypes: function(){
        return SchemaModel.types.map(type => {
            var {subtypes, hideTypeLabel} = SchemaModel.type(type);
            return {
                type: type,
                hideTypeLabel,
                subtypes: subtypes || []
            };
        });
    },

    onChange: function(e){
        if (!this.props.onChange){
            return;
        }
        var value = e.target.value;
        if (value.indexOf(".") == -1){
            // No subtype
            this.props.onChange(value, undefined);
        } else {
            var values = value.split(".");
            this.props.onChange(values[0], values[1]);
        }
    },

    subtypeLabel(type, st){
        if (type.hideTypeLabel){
            return Lang.txt(st);
        } else {
            return Lang.txt(type.type) + ' - ' + Lang.txt(st)
        }
    },

    render(){
        var { type, subtype } = this.props;
        var types = this.getTypes();
        var computeKey = (type, subtype) => (subtype ? (type + "." + subtype) : type);
        return (
            <select value={computeKey(type, subtype)} onChange={this.onChange} tabIndex="-1">
                {types.map(type => {
                    if (type.subtypes.length == 0) {
                        return <option key={type.type} value={type.type}>{Lang.txt(type.type)}</option>
                    } else {
                        return (
                            <optgroup key={type.type} label={Lang.txt(type.type)}>
                                {type.subtypes.map(st => {
                                    var label = this.subtypeLabel(type, st);
                                    var value = computeKey(type.type, st);
                                    return <option key={value} value={value}>{label}</option>
                                })}
                            </optgroup>
                        );
                    }
                })}
            </select>
        );
    }
});




const FIELD = "field";

const fieldSource = {
    beginDrag(props) {
        return { id: props.field.id };
    }
};

const fieldTarget = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;

        if (draggedId !== props.field.id) {
            props.moveField(draggedId, props.field.id);
        }
    }
};

//@DropTarget(FIELD, fieldTarget, connect => ({
//    connectDropTarget: connect.dropTarget()
//}))
//@DragSource(FIELD, fieldSource, (connect, monitor) => ({
//    connectDragSource: connect.dragSource(),
//    isDragging: monitor.isDragging()
//}))
class SchemaField extends BaseComponent {
    static propTypes: {
        //connectDragSource: PropTypes.func.isRequired,
        //connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        //id: PropTypes.any.isRequired,
        //text: PropTypes.string.isRequired
        moveField: PropTypes.func.isRequired
        };

    constructor() {
        super();
        this._bind('onSelectorChange', 'onTypeChange', 'validate', 'extraPadding', 'defaultType',
            'renderNewField', 'renderNameField', 'dispatchCopy', 'dispatchDelete', 'dispatch',
            'renderButtons', 'handleSelect');
    }

    // Lazy update
    shouldComponentUpdate(nextProps, nextState){
        var props = this.props;
        var field = props.field;
        var nextField = nextProps.field;
        return (nextField.type != field.type) || (nextField.type == 'computed')
            || (props.lang !== nextProps.lang) || (props.depth !== nextProps.depth)
            || (props.selected !== nextProps.selected)
            || (field.id != nextField.id)
            || (field.label != nextField.label)
            || (props.version != nextProps.version);
    }

    onSelectorChange(key, value){
        SchemaModel.dispatch({
            action: 'update',
            field: this.props.field,
            key: key,
            value: value
        });
    }

    onTypeChange(type, subtype){
        SchemaModel.dispatch({
            action: 'update',
            field: this.props.field,
            values: {
                type: type,
                subtype: subtype
            }
        });
    }

    validate(key){
        var field = this.props.field;
        if ((key !== "label") || !field.id){
            return undefined;
        }
        // Check name
        var value = field[key];
        if (!value || value.length == 0){
            return "schema.error.empty";
        } else if (SchemaModel.isDuplicate(field)){
            return "schema.error.duplicate_name";
        }
        return undefined;
    }

    extraPadding(){
        if (this.props.depth == 0){
            return undefined;
        }
        return 5+(this.props.depth*24) + 'px';
    }

    defaultType(){
        switch(this.props.field.type){
            case "text": return "text";
            case "boolean": return "checkbox";
            case "number": return "number";
            default: return "text";
        }
    }

    handleSelect(){
        SchemaModel.dispatch({
            action: 'select',
            field: this.props.field
        });
    }

    render(){
        const { field, selected, isDragging, connectDragSource, connectDropTarget } = this.props;
        if (!field.id){
            return this.renderNewField();
        }
        const opacity = isDragging ? 0 : 1;
        var className = selected ? "active" : undefined;

        return /*connectDragSource(connectDropTarget(*/((
            <tr className={className} style={{opacity}} onClickCapture={this.handleSelect}>
                {this.renderNameField()}
                <td>
                    <TypeSelector onChange={this.onTypeChange} type={field.type} subtype={field.subtype} />
                </td>
                {this.renderFieldOptions()}
                <td>{this.renderButtons()}</td>
            </tr>
        ));
    }

    renderFieldOptions(){
        const { field } = this.props;
        if (field.type === "computed"){
            // Computed fields don't have the same options
            return (
                <td colSpan={3}>
                    <SchemaInput label="=" field={field} fieldKey="expression" type="text"
                                 placeholder={Lang.txt("schema.expression")} tabIndex="-1" />
                </td>
            );
        }
        return [
            <td key="0" style={{textAlign: "center"}}>
                <SchemaInput type="checkbox" field={field} fieldKey="multivalued"  tabIndex="-1"/>
            </td>,
            <td key="1" style={{textAlign: "center"}}>
                <SchemaInput type="checkbox" field={field} fieldKey="mandatory"  tabIndex="-1"/>
            </td>,
            <td key="2" style={{textAlign: "center"}}>
                <SchemaInput field={field} fieldKey="defaultValue" type={this.defaultType()}
                             placeholder={Lang.txt("schema.default")}  tabIndex="-1" />
            </td>,
        ];
    }

    renderNewField(){
        return (
            <tr className="new-field">
                {this.renderNameField()}
                <td colSpan={5} />
            </tr>
        )
    }

    renderNameField(){
        var field = this.props.field;
        var placeholder = Lang.txt("schema.name");
        var error = this.validate("label");
        if (!field.id){
            placeholder = Lang.txt("schema.name_placeholder") + '"' + (field.parent.label || field.parent.label) + '"';
            error = undefined;
        }
        return (
            <td style={{paddingLeft: this.extraPadding()}}>
                <div style={{display: 'table', width:'100%'}}>
                    <span style={{display: 'table-cell', width:'32px', verticalAlign: 'top'}}>
                        <Button icon="bars" alignLeft bsSize="xs" bsStyle="link" tabIndex="-1" disabled={!field.id}/>
                    </span>
                    <SchemaInput field={field} fieldKey="label" error={error}
                                 placeholder={placeholder} style={{display: 'table-cell'}}/>
                </div>
            </td>
        );
    }

    // Using custom dispatch methods to avoid closures (which change properties)
    dispatchCopy(){
        this.dispatch("copy");
    }

    dispatchDelete(){
        this.dispatch("delete");
    }

    dispatch(action){
        console.log("dispatch", action);
        SchemaModel.dispatch({
            action: action,
            field: this.props.field
        });
    }

    renderButtons(){
        return (
            <ButtonGroup bsSize="xs">
                <Button title={Lang.txt("action.duplicate")} icon="copy" bsStyle="link" onClick={this.dispatchCopy} tabIndex="-1" />
                <Button title={Lang.txt("action.delete")} icon="trash" bsStyle="link" onClick={this.dispatchDelete} tabIndex="-1" />
            </ButtonGroup>
        );
    }

    //renderSubTypes: function(){
    //    var field = this.props.field;
    //    var subtypes = SchemaModel.type(field.type).subtypes;
    //    if (!subtypes){
    //        return undefined;
    //    }
    //    return <Selector type="subtype" value={field.subtype} values={subtypes}
    //                     onChange={this.onSelectorChange}  disabled={field.isNew}
    //                     formatter={Lang.txt} />;
    //}
}


module.exports = ConfigSchema;