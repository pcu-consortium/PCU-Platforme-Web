import React from 'react';
import { Input } from 'admin/forms/form-components';
import { ContentPanel } from 'admin/common/components.jsx';
import ReactGridLayout, { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout';
require('react-grid-layout/css/styles.css');
require('./form-builder.css');
import classNames from 'classnames';
import {Navbar, CollapsibleNav, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash/lang';
import { Grid } from 'components/layout';
import { SaveButton } from 'components/ui';

function capitalizeFirstLetter(string) {
    if (!string || string.length == 0){
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var FormUtils = function(){

    var iter = function(obj, f) {
        f(obj);
        var others = obj.form || obj.fields || [];
        others.forEach(it => iter(it, f));
    };

    return {
        iter
    };
}();

var userModel = {
    id: "user", label: "Utilisateur", theme: "default", bsSize: "md", form: [
        {
            label: "Champs système",
            fields: [
                {id: "id", label: "Id", w: 2},
                {id: "reference", label: "Référence"}
            ]
        },
        {
            label: "Profile",
            fields: [
                {id: "firstname", label: "Prénom", w: 3},
                {id: "lastname", label: "Nom"}
            ]
        },
        {
            label: "Adresse",
            fields: [
                {id: "street_number", label: "Numéro", w: 1},
                {id: "street", label: "Rue"},
                {id: "city", label: "Ville", w: 4},
                {id: "zipcode", label: "Code postal"},
                {id: "country", label: "Pays"}
            ]
        }
    ]
};

var defaultModel = {
    id: "default", label: "Formulaire", theme: "modern", bsSize: "sm", form: [
        {
            id: 'sys_fields',
            label: "Champs système",
            fields: [
                {id: "id", label: "Id", w: 2},
                {id: "reference", label: "Référence", help: "Référence incrémentale automatique", w: 4},
                {id: "create_by", label: "Créé par", w: 3},
                {id: "create_on", label: "Créé le", type: "date", w: 3},
                {id: "modified_by", label: "Modifié par", w: 3},
                {id: "modified_on", label: "Modifié le", type: "date", w: 3},
                {id: "status", label: "Statut", type: "list", w: 2},
                {id: "status_on", label: "Statut depuis", type: "date", w: 2},
                {id: "status_by", label: "Statut par", type: "list", w: 2}
            ]
        },
        {
            id: 'metadata',
            label: "Métadonnées",
            fields: [
                {id: "label", label: "Label", w: 6}
            ]
        }
    ]
};

var articleModel = {
    id: "article", label: "Article", theme: "modern", bsSize: "sm", form: [
        {
            id: 'sys_fields',
            label: "Champs système",
            fields: [
                {id: "id", label: "Id", w: 1},
                {id: "type", label: "Type de notice", w: 2, defaultValue: "Article"},
                {id: "reference", label: "Référence", help: "Référence incrémentale automatique", w: 3},
                {id: "create_by", label: "Créé par", w: 3},
                {id: "create_on", label: "Créé le", type: "date", w: 3},
                {id: "modified_by", label: "Modifié par", w: 3},
                {id: "modified_on", label: "Modifié le", type: "date", w: 3}
            ]
        },
        {
            id: 'informations',
            label: "Informations",
            fields: [
                {
                    id: "comment",
                    label: "Commentaire",
                    w: 6,
                    h: 3,
                    subtype: 'textarea',
                    placeholder: 'Zone de commentaire'
                },
                {id: "authors", label: "Auteurs", type: "list", icon: "users", w: 6},//+ Code ISNI, + Fonction (extrait de data.bnf)
                {id: "title", label: "Titre", w: 6},
                {id: "title_colloque", label: "Titre du colloque", w: 6},
                {id: "title_periodic", label: "Titre du périodique", w: 6},
                {id: "series", label: "Série", w: 2},
                {id: "complete_date", label: "Date complète", type: "date", w: 2},
                {id: "volume", label: "Volume", w: 1},
                {id: "page", label: "Pagination", w: 1},
                {id: "subjects", label: "Sujets", type: "list", w: 6},// connexion à RAMEAU Data.bnf
                {id: "cited_people", label: "Personnes citées", type: "list", icon: "users", w: 6},
                {id: "language", label: "Langue", type: "list", icon: "language", w: 2, placeholder: 'ISO 639'},
                {id: "location", label: "Lieu géographique", type: "list", icon: "map-marker", w: 4},
            ]
        },
        {
            id: 'metadata',
            label: "Métadonnées",
            fields: [
                {id: "metadata1", label: "Metadata 1", w: 6},
                {id: "metadata2", label: "Metadata 2", w: 6},
                {id: "metadata3", label: "Metadata 3", w: 6}
            ]
        }
    ]
};

//Langue (ISO 639) liste partagée
//Identifiant ressource
//Plan de classement à 5 niveaux propre à BAHF
//Mots matières (accès classe d’objet thésaurus) propre à BAHF
//+ Code ISNI
//Lieux géographique(s) (liste partagée géoNames)
//Chronologie

var FormGridInput = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],

    getValues(){
        const { defaultValue, type, values } = this.props;
        if (values){
            return values;
        } else if (defaultValue && (type == "list")){
            return [ defaultValue ];
        }
        return undefined;
    },

    render(){
        const { id, defaultValue, type, icon, bsSize, disabled } = this.props;
        var leftIcon, rightIcon;
        if (type === "list"){
            leftIcon = icon;
        } else if (icon){
            rightIcon = icon;
        } else if (type === "date"){
            rightIcon = "calendar";// = <Button icon="calendar" disabled/>;
        }
        return (
            <Input {...this.props} inline={false} disabled={disabled}
                                   name={id}
                                   value={defaultValue}
                                   values={this.getValues()}
                                   leftIcon={leftIcon}
                                   rightIcon={rightIcon}
                                   bsSize={bsSize}    />
        );
    }
});

var FormBuilder = React.createClass({

    onSelect(e, it){
        if (this.props.onSelect){
            this.props.onSelect(it.item);
        }
    },

    handleLayoutChange(currentLayout, allLayouts){
        if (this.props.onLayoutChange){
            this.props.onLayoutChange(allLayouts.md);
        }
    },

    computeGridItems(){
        var gridItems = [];
        var x = 0, y = 0;

        var nextH = 0;
        var form = this.props.form;
        if (form.hasPositions){
            var items = [];
            form.form.forEach(section => {
                //gridItems.push(this.makeHeader(section, section.x, section.y));
                //section.fields.forEach(field => {
                //    gridItems.push(this.renderInputItem(field, field.x, field.y));
                //});
                // Sort items before pushing to grid
                items.push(section);
                section.fields.forEach(field => {
                    items.push(field);
                });
                items = items.sort((a, b) => (a.y*10 + a.x) - (b.y*10 + b.x));
                gridItems = items.map(it => {
                    if (it.fields){
                        return this.makeHeader(it, it.x, it.y);
                    } else {
                        return this.renderInputItem(it, it.x, it.y);
                    }
                });
            });
        } else {
            form.form.forEach(section => {
                if (x != 0){
                    y += nextH;
                }
                gridItems.push(this.makeHeader(section, 0, y));
                x = 0; y++;
                nextH = 2;
                section.fields.forEach(field => {
                    var { w=(6-x), h=2 } = field;
                    if (x + w > 6){
                        x = 0;
                        y += nextH;
                        nextH = 2;
                    }
                    gridItems.push(this.renderInputItem({...field, w}, x, y));
                    x += w;
                    nextH = Math.max(nextH, h);
                    if (x >= 6){
                        x = 0;
                        y += nextH;
                        nextH = 2;
                    }
                });
            });
        };
        return gridItems;
    },

    gridSizes(){
        switch(this.props.bsSize||"md") {
            case "sm":
                return {rowHeight: 35, margin: [10, 4]};
            case "lg":
                return {rowHeight: 45};
            case "md":
            default:
                return {rowHeight: 40};
        }
    },

    render(){
        const { theme="default", editable } = this.props;
        const gridItems = this.computeGridItems();
        return (
            <ResponsiveReactGridLayout className={"layout form-builder form-" + theme}
                                       {...this.gridSizes()}
                                       breakpoints={{md: 480, sm: 320}}
                                       cols={{md: 6, sm: 1}}
                                       isDraggable={editable}
                                       isResizable={editable}
                                       useCSSTransforms={true}
                                       onDragStart={this.onSelect}
                                       onResizeStart={this.onSelect}
                                       onLayoutChange={this.handleLayoutChange}
                >
                {gridItems}
            </ResponsiveReactGridLayout>
        );
    },

    makeWall(key, x, y){
        return <div key={key} className="wall" _grid={{x, y, w: 1, h: 200, 'static': true}}></div>;
    },

    makeSeparator(key, x, y){
        return <div className="clean" key={key}  _grid={{x, y, w: 6, h: 1}}><hr /></div>;
    },

    makeHeader(item, x, y){
        const { selected, editable } = this.props;
        const { id, label } = item;
        var classes = classNames("clean", {
            selected: (editable && (id === selected))
        });
        return (
            <div className={classes} key={id} _grid={{
                item, x, y, w: item.w || 6, h: item.h||1, maxH: 1, 'static': !editable
                }}>
                <h4>{label}</h4>
            </div>
        );
    },

    renderInputItem(item, x, y){
        const { selected, editable } = this.props;
        const { id, w, h=2, subtype } = item;
        var fillHeight = subtype === "textarea";
        var classes = classNames("clean", "react-grid-input", {
            "fill-height": fillHeight,
            selected: (editable && (id === selected))
        });
        return (
            <div className={classes} key={id} _grid={{
                item, x, y, w, h, minH: 2, maxH: (fillHeight ? undefined : 2), 'static': !editable
                }}>
                <FormGridInput {...item} disabled={editable}
                    bsSize={this.props.bsSize} />
            </div>
        );
    }
});

var types = [
    {id: "text", label: "Texte"},
    {id: "number", label: "Nombre"},
    {id: "list", label: "Liste"},
    {id: "date", label: "Date"}
];

var icons = [
    "", "barcode", "calendar", "camera", "check", "clock-o", "comment", "comments", "database",
    "envelope-o", "exclamation-triangle", "file-text-o", "info", "language", "list", "map-marker",
    "tag", "tags", "user", "users"
];

var FormFieldParams = React.createClass({

    handleChange(key, value, defaultValue){
        const { field, onChange } = this.props;
        if ((value === null) || (value.length == 0)){
            value = defaultValue;
        }
        field[key] = value;
        if (onChange) onChange();
    },

    handleDelete(){
        this.props.onDelete(this.props.field.id);
    },

    render(){
        const { field } = this.props;
        if (!field){
            return false;
        }
        return (
            <div>
                <h4>{field.id}</h4>
                {this.renderInput("label", "Label")}
                {this.renderInput("type", "Type", {defaultValue:"text", values: types})}
                {this.renderInput("placeholder", "Placeholder", {helpBlock: "Affiché quand le champ est vide"})}
                {this.renderInput("defaultValue", "Valeur par défaut", {helpBlock: "Affichée initialement"})}
                {this.renderInput("icon", "Icone", {values: icons})}
                {this.renderInput("help", "Aide")}
                {this.renderInput("comment", "Commentaire", {subtype: "textarea"})}
                {field.fields ? undefined : <h4>Actions</h4>}
                {field.fields // Hide delete button when editing a tab
                    ? undefined 
                    : <Button bsSize="sm" bsStyle="danger" icon="trash" onClick={this.handleDelete}>Supprimer</Button>}
            </div>
        )
    },

    renderInput(key, label, options={}){
        const {helpBlock, defaultValue, values} = options;
        const { field } = this.props;
        // Hide everything when doing headers
        if (field.fields && (key != "label")){
            return undefined;
        }
        if (options.subtype == "textarea"){
            console.log("textarea", field[key]);
        }
        return (
            <Input inline={false}
                   bsSize="sm"
                   type={values ? "list" : "text"}
                   {...options}
                   label={label}
                   value={field[key] || defaultValue || ""}
                   onChange={e => this.handleChange(key, e.target.value, defaultValue)}  />
        );
    }
});


//var FormInput = React.createClass({
//    render(){
//        const { type="text" } = this.props;
//        switch(type){
//            case "list": return this.renderSelect();
//            default: return this.renderInput();
//        }
//    },
//
//    renderSelect(){
//
//    },
//
//    renderInput(){
//        return (
//            <Input
//                inline={false}
//                bsSize="sm"
//                {...this.props}
//                />
//        );
//    }
//});

var AddButton = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState(){
        return {
            value: ""
        }
    },

    handleClick(){
        if (this.props.onAdd){
            this.props.onAdd(this.state.value);
            this.setState({value: ""});
        }
    },

    handleKeyUp(e){
        if (e.keyCode == 13) { // enter
            this.handleClick();
            e.preventDefault();
            e.stopPropagation();
        }
    },

    render(){
        const { label } = this.props;
        const value = this.state.value;
        var rightButton = (
            <Button icon="plus" bsSize="sm" bsStyle="success"
                    disabled={!value || (value.length == 0)}
                    onClick={this.handleClick} />
        );
        // TODO : check for error on change (duplicate name, mostly)
        return (
            <Input inline={false}
                   bsSize="sm"
                   label={label}
                   rightButton={rightButton}
                   value={value}
                   onKeyUp={this.handleKeyUp}
                   onChange={e => this.setState({value: e.target.value})}      />
        );
    }
});


var FormParams = React.createClass({

    handleChange(key, value, defaultValue){
        const { form, onChange } = this.props;
        if ((value === null) || (value.length == 0)){
            value = defaultValue;
        }
        form[key] = value;
        if (onChange) onChange();
    },

    render(){
        const { form } = this.props;
        if (!form){
            return false;
        }
        return (
            <div>
                <h4>Informations</h4>
                {this.renderInput("label", "Label")}
                {this.renderInput("theme", "Thème", {values: ["default", "modern", "material"]})}
                {this.renderInput("bsSize", "Taille", {
                        values: [
                            {id: "sm", label: "petit"},
                            {id: "md", label: "normal"},
                            {id: "lg", label: "grand"}
                        ]
                    }
                )}
                {this.renderInput("comment", "Commentaire", {subtype: "textarea"})}
                <h4>Actions</h4>
                <AddButton label="Nouveau champ" onAdd={this.props.onAddField} />
                <AddButton label="Nouvel onglet" onAdd={this.props.onAddTab} />
            </div>
        );
    },

    renderInput(key, label, options={}){
        const {defaultValue, values} = options;
        const { form } = this.props;
        return (
            <Input inline={false}
                   bsSize="sm"
                   type={values ? "list" : "text"}
                   {...options}
                   label={label}
                   value={form[key] || defaultValue}
                   onChange={e => this.handleChange(key, e.target.value, defaultValue)}  />
        );
    }
});

var FormBuilderSidePanel = React.createClass({

    getInitialState(){
        return {
            tab: "form"
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
                    <NavItem eventKey="form">Formulaire</NavItem>
                    <NavItem eventKey="field" disabled={!field}>Elément</NavItem>
                </Nav>
                {this.renderFormInfo()}
                {this.renderFieldInfo()}
            </div>
        );
    },

    renderFormInfo(){
        if (!this.isTab("form")){
            return undefined;
        }
        return <FormParams form={this.props.form}
                           onChange={this.props.onChange}
                           onAddTab={this.props.onAddTab}
                           onAddField={this.props.onAddField} />;
    },

    renderFieldInfo(){
        if (!this.isTab("field")){
            return undefined;
        }
        return <FormFieldParams field={this.props.field} 
                                onChange={this.props.onChange}
                                onDelete={this.props.onDeleteField}  />;
    }
});

var FormEdit = React.createClass({

    getInitialState(){
        return {
            saving: false,
            selected: undefined,
            mode: "edit",
        }
    },

    save: function(){
        this.setState({saving: true});
        $.ajax({
            //url: this.context.api + '/cms/page/' + this.props.pageId,
            url: '/test/api/tmp/forms/' + encodeURIComponent(this.props.formId),
            type: "PUT",
            contentType: 'application/json',
            //dataType: 'json',
            data: JSON.stringify(this.getForm()),
            success: function(data){
                console.log('saved !', data);
            },
            complete: () => this.setState({saving: false})
        });
    },

    getForm(){
        return this.props.form;
    },

    unselect(){
        // onClick is propagated from ReactGridLayout, find a way to block it :/
        //this.setState({selected: null});
    },

    handleModeChange(mode){
        this.setState({mode});
    },

    findElement(elementId){
        var selected = null;
        if (elementId){
            // Iterates over everything, non-critical code anyways...
            var findItem = function(root, id){
                if (root.id === id){
                    selected = root;
                    return;
                }
                var others = root.form || root.fields || [];
                others.forEach(it => findItem(it, id));
            };
            findItem(this.getForm(), elementId);
        }
        return selected;
    },

    handleSelect(item={}){
        this.setState({ selected: this.findElement(item.id) });
    },

    onTabChange(tab){
        console.log('changed tab', tab);
        if (tab != "field"){
            this.setState({selected: null});
        }
    },

    onChange(){
        this.forceUpdate();
    },

    handleDeleteField(fieldId){
        var form = this.getForm();
        form.form = form.form.map(tab => {
            return {
                ...tab,
                fields: tab.fields.filter(f => f.id != fieldId)
            };
        });
        this.setState({ selected: undefined });
    },

    formMaxY(){
        const { form } = this.props;
        var maxY = 0;
        FormUtils.iter(form, it => {
            if (it.y && it.y > maxY) maxY = it.y;
        });
        return maxY;
    },

    handleTabAdd(label){
        var { form } = this.props;
        const id = label.toLowerCase();
        var item = this.findElement(id);
        if (!item){ // New element
            item = {
                id , label, fields: [], w: 6, x: 0, y: this.formMaxY()+10
            };
            form.form.push(item);
        }
        this.handleSelect(item);
    },

    handleFieldAdd(label){
        var { form } = this.props;
        const id = label.toLowerCase();
        var item = this.findElement(id);
        if (!item){ // New element
            item = {
                id, label, type: 'text', w: 6, x: 0, y: this.formMaxY()+10
            };
            form.form[form.form.length-1].fields.push(item);
        }
        this.handleSelect(item);
    },

    render(){
        var form = this.getForm();
        const { mode } = this.state;
        return (
            <ContentPanel showPanel
                          sidePanel={this.renderSidePanel()}
                          onClick={this.unselect}>
                <h2>
                    <ButtonGroup alignRight bsSize="sm">
                        <SaveButton bsSize="sm" saving={this.state.saving} onClick={this.save}>Save</SaveButton>
                    </ButtonGroup>
                    {form.label}
                </h2>
                <Nav bsStyle='tabs' bsSize='small' activeKey={mode} onSelect={this.handleModeChange}>
                    <NavItem eventKey="edit">Edition</NavItem>
                    <NavItem eventKey="preview">Aperçu</NavItem>
                </Nav>
                <FormBuilder key={form.id/* + "." + mode*/}
                             form={form}
                             theme={form.theme}
                             bsSize={form.bsSize}
                             onSelect={this.handleSelect}
                             onLayoutChange={this.props.onLayoutChange}
                             editable={mode == "edit"}
                             selected={this.state.selected && this.state.selected.id}
                    />
                <hr />
                {this.renderActions()}
            </ContentPanel>
        );
    },

    renderActions(){
        return (
            <Grid md={6}>
                <AddButton label="Nouveau champ" onAdd={this.handleFieldAdd} />
                <AddButton label="Nouvel onglet" onAdd={this.handleTabAdd} />
            </Grid>
        )
    },

    renderSidePanel(){
        var form = this.getForm();
        return <FormBuilderSidePanel
                    onTabChange={this.onTabChange} 
                    onChange={this.onChange}
                    onDeleteField={this.handleDeleteField}
                    form={form} 
                    onAddField={this.handleFieldAdd}
                    onAddTab={this.handleTabAdd}
                    field={this.state.selected} />;
    }
});

var AsyncFormEdit = React.createClass({

    statics: {
        breadcrumb: [
            {to: 'forms-list', label: 'Formulaires', icon: 'file-text'},
            {label: 'Edition', icon: 'pencil'}
        ]
    },

    getInitialState(){
        return {
            form: undefined
        }
    },

    handleLayoutChange(layout){
        var byId = {};
        layout.forEach(e => {
            byId[e.i] = e;
        });

        var update = function(obj){
            if (obj.id && (obj.id in byId)){
                var pos = byId[obj.id];
                obj.x = pos.x;
                obj.y = pos.y;
                obj.w = pos.w;
                obj.h = pos.h;
            }
            var others = obj.form || obj.fields || [];
            others.forEach(update);
        };
        var form = this.getForm();
        update(form);
        form.hasPositions = true;
        //this.forceUpdate(); // Silently update...
    },

    getFormId(){
        if (!this.props.params){
            return "article";
        }
        return this.props.params.formId;
    },

    getForm(){
        if (this.state.form){
            return this.state.form;
        }
        // Default...
        return {
            id: this.getFormId(), label: capitalizeFirstLetter(this.getFormId()), theme: "modern", bsSize: "sm", form: []
        };
    },

    componentDidMount(){
        this.load();
    },

    load: function(){
        $.ajax({
            //url: this.context.api + '/cms/page/' + this.props.pageId,
            url: '/test/api/tmp/forms/' + encodeURIComponent(this.getFormId()),
            type: "GET",
            contentType: 'application/json',
            success: data => {
                this.setState({form: data});
            },
            error: () => {
                var id = this.getFormId();
                var label = capitalizeFirstLetter(id);
                var model = _.cloneDeep(defaultModel);
                this.setState({form: {...model, id, label}}); // Default value to load...
            }
        });
    },

    render(){
        return <FormEdit {...this.props} formId={this.getFormId()} form={this.getForm()} onLayoutChange={this.handleLayoutChange} />;
    }
});

module.exports = AsyncFormEdit;