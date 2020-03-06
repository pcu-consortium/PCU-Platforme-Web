import React from 'react';
import { Input } from 'admin/forms/form-components';
import { ContentPanel } from 'admin/common/components.jsx';
import classNames from 'classnames';
import {Navbar, CollapsibleNav, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';

var fakeFields = [
    {
        id: 'info',
        label: "Paramètres supplémentaires",
        icon: 'info',
        options: [
            "Exemple de valeurs",
            "Code couleur",
            "Utilité du champ",
            "Comment remplir",
            "Confidentialité"
        ]
    },
    {
        id: 'calendar',
        label: "Modifications",
        icon: 'calendar',
        options: [
            "Date de création",
            "Créé par",
            "Date de modification",
            "Modifié par"
        ]
    },
    {
        id: 'mdm',
        label: "MDM",
        icon: 'database',
        options: [
            "Intégrité et cohérence",
            "Réalignement",
            "Cycle de vie",
            "Indicateur de qualité",
            "Référent des données"
        ]
    },
    {
        id: 'search',
        label: "Recherche",
        icon: 'search',
        options: [
            "Poids du champ"
        ]
    }
];

var FieldParams = React.createClass({

    getInitialState(){
        return {
            tab: "info"
        }
    },

    handleTabChange(tab){
        this.setState({tab});
    },

    handleChange(key, value){
        const { field, onChange } = this.props;
        field[key] = value;
        field.version = (field.version||1)+1;
        if (onChange) onChange();
    },

    render(){
        console.log('this.props', this.props);
        const { field } = this.props;
        if (!field){
            return false;
        }
        return (
            <div>
                <h4>{field.label}</h4>
                {this.renderInput("id", "Id")}
                {this.renderInput("label", "Nom")}
                {this.renderInput("defaultValue", "Valeur par défaut")}
                <h5>Informations complémentaires</h5>
                <Nav bsStyle='tabs' bsSize='small' justified activeKey={this.state.tab} onSelect={this.handleTabChange}>
                    {fakeFields.map(tab => <NavItem eventKey={tab.id} title={tab.label}><FAIcon icon={tab.icon}/></NavItem>)}
                </Nav>
                <br />
                {fakeFields.map(tab => {
                    if (tab.id != this.state.tab) return [];
                    return [
                        tab.options.map(o => this.renderInput(o, o))
                    ];
                })}
            </div>
        )
    },

    renderInput(key, label, {helpBlock, defaultValue, values}={}){
        const { field } = this.props;
        return (
            <Input inline={false}
                   bsSize="sm"
                   type={values ? "list" : "text"}
                   label={label}
                   helpBlock={helpBlock}
                   value={field[key] || defaultValue}
                   values={values}
                   onChange={e => this.handleChange(key, (e.target.value && e.target.value.length > 0 && e.target.value) || defaultValue)}
                />
        );
    }
});

var SchemaParams = React.createClass({

    handleChange(key, value){
        const { schema, onChange } = this.props;
        schema[key] = value;
        if (onChange) onChange();
    },

    countFields(){
        const { schema } = this.props;
        console.log(schema);
        var cnt = 0;
        for(var tabKey in schema.tabs){
            if (schema.tabs.hasOwnProperty(tabKey)){
                cnt += schema.tabs[tabKey].fields.length;
            }
        }
        return cnt;
    },

    render(){
        const { schema } = this.props;
        if (!schema){
            return false;
        }
        return (
            <div>
                <h4>{schema.id}</h4>
                {this.renderInput("label", "Nom")}
                <p>{this.countFields()} champs</p>
            </div>
        )
    },

    renderInput(key, label, {helpBlock, defaultValue, values}={}){
        const { schema } = this.props;
        return (
            <Input inline={false}
                   bsSize="sm"
                   type={values ? "list" : "text"}
                   label={label}
                   helpBlock={helpBlock}
                   value={schema[key] || defaultValue}
                   values={values}
                   onChange={e => this.handleChange(key, (e.target.value && e.target.value.length > 0 && e.target.value) || defaultValue)}
                />
        );
    }
});

var SchemaSidePanel = React.createClass({

    getInitialState(){
        return {
            tab: "schema"
        }
    },

    handleTabChange(tab){
        this.setState({tab});
        if (this.props.onTabChange){
            this.props.onTabChange(tab);
        }
    },

    componentWillReceiveProps(nextProps){
        var nextField = nextProps.field;
        var hasField = nextField && nextField.id;
        if (!hasField && this.state.tab == "field"){
            this.setState({tab: "form"});
        } else if (hasField && (!this.props.field || (this.props.field.id != nextField.id))){
            // Auto-select field tab
            this.setState({tab: "field"});
        }
    },

    isTab(tab){
        return this.state.tab === tab;
    },

    render(){
        const { field } = this.props;
        return (
            <div className="panel-side-content">
                <h3>Paramètres</h3>
                <Nav bsStyle='pills' bsSize='small' justified activeKey={this.state.tab} onSelect={this.handleTabChange}>
                    <NavItem eventKey="schema">Fond</NavItem>
                    <NavItem eventKey="field" disabled={!field}>Champ</NavItem>
                </Nav>
                {this.renderSchemaInfo()}
                {this.renderFieldInfo()}
            </div>
        );
    },

    renderSchemaInfo(){
        if (!this.isTab("schema")){
            return undefined;
        }
        return <SchemaParams schema={this.props.schema} onChange={this.props.onChange}/>;
    },

    renderFieldInfo(){
        if (!this.isTab("field")){
            return undefined;
        }
        return <FieldParams field={this.props.field} onChange={this.props.onChange}/>;
    }
});

module.exports = SchemaSidePanel;

