
import Router, { Route, IndexRoute } from 'react-router';
import { ContentPanel } from 'admin/common/components.jsx';
import { EntityList, DataTableColumn } from 'admin/entities/entity-list';
import Lang from 'utils/lang';
import FormModal from 'components/modals/form-modal';


var FormsList = React.createClass({
    mixins: [Router.State, Router.Navigation],

    statics: {
        breadcrumb: [
            {to: 'forms-list', label: 'Formulaires', icon: 'file-text'}
        ]
    },

    getInitialState(){
        return {
            showModal: false,
            modal: "new",
            form: {},
            data: []
        }
    },

    handleNew(){
        this.setState({showModal: true, modal: 'new'});
    },

    handleDuplicate(form){
        console.log('onDuplicate', form);
        this.setState({showModal: true, modal: 'duplicate', form});
    },

    closeModal(){
        this.setState({showModal: false});
    },

    editForm(form){
        // console.log('create form', form);
        this.setState({showModal: false});
        this.transitionTo("forms-edit", {...this.getParams(), formId: form.id}, {});
    },

    duplicateForm({id}){
        const { form } = this.state;
        var newForm = {
            ...form,
            id,
            label:id,
        };
        // TODO: push...
        $.ajax({
            //url: this.context.api + '/cms/page/' + this.props.pageId,
            url: '/test/api/tmp/forms/' + encodeURIComponent(id),
            type: "PUT",
            contentType: 'application/json',
            //dataType: 'json',
            data: JSON.stringify(newForm),
            success: function(data){
                console.log('saved !', data);
            },
            complete: () => {
                this.setState({showModal: false});
                this.transitionTo("forms-edit", {...this.getParams(), formId: id}, {});
            }
        });
    },

    componentDidMount(){
        $.get('/test/api/tmp/forms', data => {
            if (this.isMounted()){
                this.setState({data:data.filter(form => form.id)});
            }
        }).fail(e => { console.warn('error', e);});
    },

    render(){
        var forms = this.state.data;
        //  toNew="forms-new"
        return (
            <ContentPanel title="Formulaires">
                <EntityList entities={forms} 
                            onNew={this.handleNew} 
                            onDuplicate={this.handleDuplicate}
                            toEdit="forms-edit" 
                            editParam="formId" 
                            hasNew={true}>
                    <DataTableColumn dataField="id" isKey sortable shrink>{Lang.txt("list.id")}</DataTableColumn>
                    <DataTableColumn dataField="label" sortable>{Lang.txt("list.label")}</DataTableColumn>
                </EntityList>
                {this.renderModal()}
            </ContentPanel>
        );
    },

    renderModal(){
        const { showModal, modal } = this.state;
        switch(modal){
            case "new": return <FormModal 
                                    show={showModal} 
                                    title="Créer un formulaire"
                                    validateLabel="Créer"
                                    cancelLabel="Annuler"
                                    fields={[{id: "id", label: "Id"}]}
                                    onClose={this.closeModal} 
                                    onValidate={this.editForm} />;
            case "duplicate": return (
                <FormModal 
                    show={showModal} 
                    title={"Dupliquer le formulaire " + this.state.form.label}
                    validateLabel="Dupliquer"
                    cancelLabel="Annuler"
                    fields={[{id: "id", label: "Nouvel Id"}]}
                    onClose={this.closeModal} 
                    onValidate={this.duplicateForm}>
                </FormModal>
            );
            default: return undefined;
        }
    }
});

        // <Route path=":formId" component={require('./form-builder')} />
var Routes = (
    <Route path="forms">
        <IndexRoute component={FormsList} />
    </Route>
);

module.exports = {
    Routes
};