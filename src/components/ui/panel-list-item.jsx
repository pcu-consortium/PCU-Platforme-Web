
var PanelListItem = React.createClass({
    // mixins: [ React.addons.PureRenderMixin ],

    getDefaultProps(){
        return {
            active: false
        }
    },

    shouldComponentUpdate(nextProps){
        var props = this.props;
        return (props.title != nextProps.title)
            || (props.subtitle != nextProps.subtitle)
            || (props.titleRight != nextProps.titleRight)
            || (props.children != nextProps.children)
            || (props.active != nextProps.active);
    },

    render(){
        const { active, href, componentClass, onClick } = this.props;
        var Component = componentClass || "div";
        if (href) Component = "a";
        const className = classNames("list-group-item", {active});
        return (
            <Component {...this.props} className={className} style={{cursor: (onClick ? "pointer" : undefined)}}>
                {this.renderRight()}
                {this.renderTitle()}
                {this.renderSubtitle()}
                {this.props.children}
            </Component>
        );
    },

    renderRight(){
        if (!this.props.titleRight){
            return undefined;
        }
        return <p className="list-group-item-text" style={{lineHeight: '1.5em', float: 'right'}}>{this.props.titleRight}</p>
    },

    renderTitle() {
        if (!this.props.title) {
            return undefined;
        }
        return <h6 className="list-group-item-heading">{this.props.title}</h6>;
    },

    renderSubtitle(){
        if (!this.props.subtitle){
            return undefined;
        }
        return <p className="list-group-item-text">{this.props.subtitle}</p>
    }
});

module.exports = PanelListItem;
