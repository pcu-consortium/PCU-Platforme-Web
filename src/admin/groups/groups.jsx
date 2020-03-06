import React from 'react';
import Router, { Route, IndexRoute } from 'react-router';

import { LinkButton, ContentPanel } from 'admin/common/components.jsx';
import { EntityList, DataTableColumn } from 'admin/entities/entity-list';
import Lang from 'utils/lang';


var GroupCreate = React.createClass({
    statics: {
        breadcrumb: [
            {to: 'users-list', label: 'Utilisateurs', icon: 'plus'},
            {label: 'Nouveau', icon: 'new'}
        ]
    },

    render(){
        return (
            <ContentPanel title={Lang.txt("users.title_create")}>
                Create user...
            </ContentPanel>
        )
    }
});


var fakeGroups = [
    {id: "all", label: "Tous"},
    {id: "admin", label: "Admin"},
    {id: "contributor", label: "Contributeur"}
];

var GroupsList = React.createClass({
    statics: {
        breadcrumb: [
            {to: 'groups-list', label: 'Groupes', icon: 'users'}
        ]
    },

    render(){

        return (
            <ContentPanel title="Utilisateurs">
                <EntityList entities={fakeGroups}
                                    toNew="users-new"
                                    toEdit="users-edit"
                                    editParam="schemaId"
                                    hasNew={false}>
                    <DataTableColumn dataField="id" isKey sortable shrink>{Lang.txt("list.id")}</DataTableColumn>
                    <DataTableColumn dataField="label" sortable>{Lang.txt("list.label")}</DataTableColumn>
                </EntityList>
            </ContentPanel>
        );
    }
});

var Routes = (
    <Route path="groups">
        <IndexRoute component={GroupsList} />
        <Route path="_new" component={GroupCreate} />
        <Route path=":schemaId" component={require('admin/schema/schema-edit')} />
    </Route>
);

module.exports = {
    Routes
};