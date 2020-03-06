
import WidgetManager from '../widget-manager';
import MaterialColor from 'utils/material-color';

var MosaicMenu = React.createClass({
    getDefaultProps(){
        return {
            items: [],
            color: MaterialColor.cyan700
        }
    },

    render(){
        var { title, subtitle, items, icon, color } = this.props;
        var style = { backgroundColor: color };
        var cx = React.addons.classSet;
        var classes = {
            "mosaic-menu": true,
            "invert": this.props.invert,
            "clearfix": true
        };
        return (
            <div className={cx(classes)} style={{backgroundColor: this.props.backgroundColor}}>
                <div className="mosaic-menu-cell mosaic-menu-title">
                    <h2>{title}</h2>
                    <span className="mosaic-menu-entry-separator" style={style}></span>
                    <p>{subtitle}</p>
                </div>
                <div className="mosaic-menu-cell mosaic-menu-links" style={style}>
                    {icon ? <FAStack back="circle" backColor="rgba(255, 255, 255, 0.7)" front={icon} color={color} inverse size="32px" /> : undefined}
                    <ul>
                        {items.map(link => <li><a href={link.url} title={link.title}>{link.title}</a></li>)}
                    </ul>
                </div>
            </div>
        )
    }
});



WidgetManager.registerWidget("MosaicMenu", {
    component: MosaicMenu,
    icon: "image",
    defaultValue: { type: 'MosaicMenu', title: "title" },
    config: [
        {key: "title", type: "input"},
        {key: "subtitle", type: "input"},
    ]
});

module.exports = MosaicMenu;
