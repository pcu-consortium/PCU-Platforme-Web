import React, { Component, PropTypes } from 'react';
import DataTable from './data-table';
import * as breadcrumb from './breadcrumb';
import * as siteComponents from './site-components';
import { Grid } from 'components/layout';

var RightLabel = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render(){
        return (
            <small className="pull-right">{this.props.children}</small>
        );
    }
});

module.exports = {
    Grid,
    RightLabel,
    ContentPanel: require('./content-panel'),
    ...siteComponents,
    ...breadcrumb,
    ...DataTable
};