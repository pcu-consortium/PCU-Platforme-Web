
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
        const { params, className, active } = this.props;
        var classes = classNames(className, {active});
        return <Link {...this.props} className={classes} params={{...params, site: this.context.site}}>{this.props.children}</Link>;
    }
});

module.exports = {
    AppContext,
    LinkButton,
    SiteLink
};