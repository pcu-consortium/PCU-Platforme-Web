import React, { Component, PropTypes } from 'react';
import { ContentPanel } from 'admin/common/components.jsx';
import Lang from 'utils/lang';

var SchemaCreate = React.createClass({
    statics: {
        breadcrumb: [
            {to: 'schema-list', label: 'Fonds'},
            {label: 'Nouveau'}
        ]
    },

    render(){
        return (
            <ContentPanel title={Lang.txt("schema.title_create")}>

            </ContentPanel>
        )
    }
});

module.exports = SchemaCreate;