import React from 'react';
import Router, { Route, IndexRoute } from 'react-router';

import SchemaList from './schema-list';
import SchemaNew from './schema-new';
import ConfigSchema from './schema-edit';

import SchemaModel from './model';

var SchemaEdit = React.createClass({
    mixins: [Router.State, Router.Navigation],

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

    render(){
        const schemaId = this.getParams().schemaId;
        SchemaModel.switchTo(schemaId);
        return <ConfigSchema {...this.props} schemaId={schemaId} />
    }
});


var SchemaRoot = React.createClass({
    statics: {
        willTransitionTo: transition => {
            console.log("intercepting transition path", transition);
            console.log("verifying user logged in");
        }
    },

    render(){
        return <div>{this.props.children}</div>;
    }
});


var Routes = (
    <Route path="schema" component={SchemaRoot}>
        <IndexRoute component={SchemaList} />
        <Route path="_new" component={SchemaNew} />
        <Route path=":schemaId" component={SchemaEdit} />
    </Route>
);

module.exports = {
    Routes
};