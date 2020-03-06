
import React from 'react';
import classNames from 'classnames';

var AppContext = {
    site: React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    api: React.PropTypes.string
};

var LinkButton = React.createClass({
    contextTypes: AppContext,

    render(){
        const { params } = this.props;
        return <Button {...this.props} params={{...params, site: this.context.site}}>{this.props.children}</Button>;
    }
});

var SiteLink = React.createClass({
    contextTypes: AppContext,

    render(){
        const { className, active, to } = this.props;
        const classes = classNames(className, {active});
        const site = this.context.site;
        return <Link {...this.props} to={`/${site}/${to}`} className={classes} >{this.props.children}</Link>;
    }
});

module.exports = {
    AppContext,
    LinkButton,
    SiteLink
};