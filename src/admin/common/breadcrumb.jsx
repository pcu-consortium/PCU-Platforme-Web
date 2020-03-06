import React from 'react';
import { SiteLink } from './site-components';

var SiteBreadcrumb = React.createClass({

    render(){
        const { routes=[] } = this.props;
        var extraLinks = (routes.length > 0 && routes[routes.length-1].handler.breadcrumb) || [];
        var links = [{to: "home", label: "Admin", icon: "dashboard"}, ...extraLinks];
        return (
            <ol className="breadcrumb">
                {links.map((link, idx) => this.renderLink(link, idx, links))}
            </ol>
        );
    },

    renderLink(link, idx, links){
        var {label, icon} = link;
        var active = (idx == (links.length-1));
        var iconEl;
        if (icon){
            label = " " + label;
            iconEl = <FAIcon icon={icon}/>;
        }
        if (active){
            return <li key={idx} active>{iconEl}{label}</li>;
        } else {
            return <li key={idx}><SiteLink {...link}>{iconEl}{label}</SiteLink></li>
        }
    }
});

module.exports = {
    SiteBreadcrumb
};
