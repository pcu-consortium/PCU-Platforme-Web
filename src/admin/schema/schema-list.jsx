
import Router, { Route, DefaultRoute } from 'react-router';
import { LinkButton, ContentPanel } from 'admin/common/components.jsx';

import Lang from 'utils/lang';
import classNames from 'classnames';
import _ from 'lodash/collection';
import { FilteredEntityList, DataTableColumn } from 'admin/entities/entity-list';

import SchemaModel from './model';
import FormModal from 'components/modals/form-modal';

var RightLabel = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render(){
        return (
            <small className="pull-right">{this.props.children}</small>
        );
    }
});

var ListSchema = React.createClass({
    mixins: [Router.State, Router.Navigation],

    statics: {
        breadcrumb: [
            {label: 'Fonds', icon: 'database'}
        ]
    },

    getInitialState(){
        return {
            showModal: false,
            modal: "new",
            tables: SchemaModel.getAllModels()
        };
    },

    handleNew(){
        this.setState({showModal: true, modal: 'new'});
    },

    closeModal(){
        this.setState({showModal: false});
    },

    editSchema(schema){
        // console.log('create form', form);
        this.setState({showModal: false});
        this.transitionTo("schema-edit", {...this.getParams(), schemaId: schema.id}, {});
    },

    filter(key, table){
        var isSys = table.id.indexOf("sys.") == 0;
        return ((key == "all") || ((key == "db") && !isSys) || ((key == "sys") && isSys));
    },

    componentDidMount(){
        $.get('/test/api/tmp/schema', data => {
            if (this.isMounted()){
                SchemaModel.setModels(data);
                this.setState({tables: data});
            }
        }).fail(e => { console.warn('error', e);});
    },

    render(){
        var tables = [
            {id: "sys.schema", label: "Schema"},
            {id: "sys.thesaurus", label: "Thesaurus"},
            ...this.state.tables
            // {id: "document", label: "Document"}
        ];
        var keys = [
            {id: "db", label: "Fonds"},
            {id: "sys", label: "Système"},
            {id: "all", label: "Tous"},
        ];
        return (
            <ContentPanel title="Fonds">
                <FilteredEntityList entities={tables}
                                    filters={keys}
                                    defaultFilter="db"
                                    filter={this.filter}
                                    onNew={this.handleNew} 
                                    toEdit="schema-edit"
                                    editParam="schemaId"
                                    hasNew={true}>
                    <DataTableColumn dataField="id" isKey sortable
                                     shrink>{Lang.txt("list.id")}</DataTableColumn>
                    <DataTableColumn dataField="label" sortable>{Lang.txt("list.label")}</DataTableColumn>
                </FilteredEntityList>
                {this.renderModal()}
            </ContentPanel>
        );
    },

    renderModal(){
        const { showModal, modal } = this.state;
        switch(modal){
            case "new": return <FormModal 
                                    show={showModal} 
                                    title="Créer un fond"
                                    validateLabel="Créer"
                                    cancelLabel="Annuler"
                                    fields={[{id: "id", label: "Id"}]}
                                    onClose={this.closeModal} 
                                    onValidate={this.editSchema} />;
            default: return undefined;
        }
    }
});

module.exports = ListSchema;
