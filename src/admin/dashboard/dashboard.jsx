import React from 'react';
import { Grid, LinkButton, SiteLink, ContentPanel } from 'admin/common/components';


var DashboardWell = React.createClass({
    render(){
        const { title, newTitle, to, newTo, count } = this.props;
        return (
            <div className="light-well">
                <h4>{title}</h4>
                <div className="data">
                    <SiteLink to={to}>
                        <h1>{count}</h1>
                    </SiteLink>
                    <hr />
                    <LinkButton bsStyle="success" to={newTo}>{newTitle}</LinkButton>
                </div>
            </div>
        )
    }
});

var DashboardApp = React.createClass({
    render(){
        return (
            <ContentPanel title="Dashboard" className="admin-dashboard">
                <Grid sm={4}>
                    <DashboardWell title="Notices"
                                   to="admin/schema"
                                   newTitle="Ajouter une notice"
                                   newTo="admin/schema/_new"
                                   count={300}/>
                    <DashboardWell title="Fonds"
                                   to="admin/schema"
                                   newTitle="Ajouter un fond"
                                   newTo="admin/schema/_new"
                                   count={1}/>
                    <DashboardWell title="Utilisateurs"
                                   to="admin/users"
                                   newTitle="Ajouter un utilisateur"
                                   newTo="admin/users/_new"
                                   count={3}/>
                </Grid>
            </ContentPanel>
        );
    }
});

module.exports = {
    DashboardApp
};