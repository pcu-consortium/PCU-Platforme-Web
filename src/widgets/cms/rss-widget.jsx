
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { PanelListItem } from 'components/ui';
import moment from 'moment';

var RSSWidget = React.createClass({
    mixins: [WidgetMixin, URLFetcher],

    getDefaultProps() {
        return {
            limit: 5
        };
    },

    makeUrl(props){
        console.log('api', this.context.api);
        return this.context.api + '/rss?limit=' + props.limit + '&url=' + encodeURIComponent(props.url);
    },

    componentWillReceiveProps(nextProps){
        this.fetchUrl(this.makeUrl(nextProps));
    },

    componentDidMount(){
        this.fetchUrl(this.makeUrl(this.props));
    },

    getData(){
        var data = [];
        if (this.state && this.state.data){
            data = this.state.data;
        }
        return data;
    },

    render() {
        const { bsStyle } = this.props;
        return (
            <PanelList title={this.props.title} bsStyle={bsStyle}>
                {this.renderRefreshing()}
                {this.getData().map(this.renderItem)}
            </PanelList>
        );
    },

    renderRefreshing(){
        if (!this.isRefreshing()){
            return undefined;
        }
        return (
            <PanelListItem>
                <p><Glyphicon glyph="refreshing" /></p>
            </PanelListItem>
        );
    },

    renderItem(item, idx){
        return (
            <PanelListItem key={idx} href={item.link} target="_blank"
                           title={item.title} subtitle={this.formatDate(item.date)}/>
        );
    },

    formatDate(date){
        return moment(date).fromNow();
    }
});



WidgetManager.registerWidget("Rss", {
    component: RSSWidget,
    icon: "rss",
    config: [
        {key: "limit",    type: "selector", values: [3, 5, 10, 50, 100]},
        {key: "title",    type: "input"},
        {key: "url",      type: "input"},
        {key: "bsStyle",  type: "selector", values: ["default", "primary", "info", "success", "warning", "danger"]},
    ]
});

module.exports = RSSWidget;
