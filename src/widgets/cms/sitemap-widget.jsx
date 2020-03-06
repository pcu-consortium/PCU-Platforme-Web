
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import MaterialColor from 'utils/material-color';


var SitemapWidget = React.createClass({
  mixins: [WidgetMixin, React.addons.PureRenderMixin],

  getDefaultProps(){
    return {
      color: MaterialColor.grey700
    };
  },

  render(){
    const menu = __data__.blocks.menu; // TODO : do not use global variable ?
    return (
      <div className="cms-toc">
        <ul className="list-unstyled">
          {menu.children.map(this.renderEntry)}
        </ul>
      </div>
    )
  },

  renderEntry(entry, idx){
    if (!entry || !entry.label) return undefined;
    if (entry.children){
      return (
        <li key={idx}>
          {this.renderLine(entry, "h5")}
          <ul className="list-unstyled" style={{paddingLeft: 31}}>
            {entry.children.map((child, idx) => {
              if (!child) return undefined;
              else if (child.divider) return <li key={idx} style={{marginTop: '4px 0', height: 1, backgroundColor: '#e5e5e5'}}/>;
              return <li key={idx}>{this.renderLine(child, "h6")}</li>
            })}
          </ul>
        </li>
      )
    } else {
      return <li key={idx}>{this.renderLine(entry, "h5")}</li>;
    }
  },

  renderLine(entry, Component){
    const { color } = this.props;
    var { id, label, icon, url, href } = entry;
    const style = { color };
    if (icon) label = <span><FAIcon icon={icon}/> {label}</span>;
    if (!href && !entry.children && id) href = this.context.baseUrl + 'page/' + id;
    if (href) return <Component><a href={href} style={style}>{label}</a></Component>;
    else return <Component style={style}>{label}</Component>;
  }
});

WidgetManager.registerWidget("Sitemap", {
  component: SitemapWidget,
  config: [
    {key: "color",    type: "input"}
  ],
  icon: 'sitemap'
});

export default SitemapWidget;