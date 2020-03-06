import React from 'react';
import Router, { Route, IndexRoute } from 'react-router';

import { LinkButton, ContentPanel } from 'admin/common/components.jsx';
import { FilteredEntityList, DataTableColumn } from 'admin/entities/entity-list';
import Lang from 'utils/lang';
import _ from 'lodash/collection';


var UserCreate = React.createClass({
    statics: {
        breadcrumb: [
            {to: 'users-list', label: 'Utilisateurs', icon: "user"},
            {label: 'Nouveau', icon: "plus"}
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

var UsersList = React.createClass({
    statics: {
        breadcrumb: [
            {to: 'users-list', label: 'Utilisateurs', icon: "user"}
        ]
    },

    filter(key, user){
        if (key == "all"){
            return true;
        } else {
            return user.groups.indexOf(key) != -1.
        }
    },

    formatGroup(key, user){
        return user.groups.map(groupId => _.find(fakeGroups, fg => fg.id == groupId).label).join(', ');
    },

    render(){
        var users = [
            {id: "user1", name: "User 1", groups: ["admin"], email: "user1@armadillo.fr"},
            {id: "user2", name: "User 2", groups: ["admin", "contributor"], email: "user2@armadillo.fr"},
            {id: "user3", name: "User 3", groups: ["contributor"], email: "user3@armadillo.fr"}
        ];

        return (
            <ContentPanel title="Utilisateurs">
                <FilteredEntityList entities={users}
                                    filters={fakeGroups}
                                    defaultFilter="all"
                                    filter={this.filter}
                                    toNew="users-new"
                                    toEdit="users-edit"
                                    editParam="schemaId"
                                    hasNew={true}>
                    <DataTableColumn dataField="id" isKey sortable shrink>{Lang.txt("list.id")}</DataTableColumn>
                    <DataTableColumn dataField="name" sortable>{Lang.txt("list.label")}</DataTableColumn>
                    <DataTableColumn dataField="email" sortable>{Lang.txt("list.email")}</DataTableColumn>
                    <DataTableColumn dataField="group" dataFormat={this.formatGroup}>{Lang.txt("list.group")}</DataTableColumn>
                </FilteredEntityList>
            </ContentPanel>
        );
    }
});


var Routes = (
    <Route path="users">
        <IndexRoute component={UsersList} />
        <Route path="_new" component={UserCreate} />
        <Route path=":schemaId" component={require('admin/schema/schema-edit')} />
    </Route>
);

module.exports = {
    Routes
};