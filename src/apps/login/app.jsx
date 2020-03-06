import ReactDOM from 'react-dom';
import Router, { Route, IndexRoute } from 'react-router';
import LoginWindow from './login';
import { AppContext } from 'components/site/site-components';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import CmsNavbar from 'apps/cms/cms-navbar';

var LoginApp = React.createClass({

    render: function(){
        console.log('contents', this.props.content);
        return (
            <LoginWindow {...this.props.content} 
                baseUrl={this.props.baseUrl}
                site={this.props.params.site}
                api={this.props.api} />
        );
    }
});


var App = React.createClass({
    mixins: [Router.State, Router.Navigation],
    childContextTypes: {
        ...AppContext
    },

    getChildContext() {
        return {
            site: this.props.site,
            baseUrl: this.props.baseUrl,
            api: this.props.api
        };
    },

    handleUpdate(){
        this.forceUpdate();
    },

    render: function () {
        const { state, routes } = this.props;
        //const { blocks, site, baseUrl, searchUrl, state } = this.props;
        //console.log('params', this.props.params);
        //        <CmsMenu menu={blocks.menu} site={site}  baseUrl={baseUrl} searchUrl={searchUrl} />
        //        <CmsFooter footer={blocks.footer} baseUrl={baseUrl} />
        //var className = classNames("admin-page page-with-sidebar", {
        //    "page-sidebar-expanded": this.state.expandedSidebar,
        //    "page-sidebar-collapsed": !this.state.expandedSidebar
        //});
        //<Sidebar expanded={this.state.expandedSidebar} onToggle={this.handleToggle} />
        //    <RouteHandler layers={SegmentStore.getLayers()}/>
        return (
            <div>
                <CmsNavbar {...__data__} showSearch={false} />
                <div className="fill-parent" style={{marginTop: 50}}>
                    <div style={{position: 'relative', display: 'block'}}>
                        {React.cloneElement(this.props.children, this.props)}
                    </div>
                </div>
            </div>
        )
    }
});

var routes = (
    <Route path="/:site/login" component={App}>
        <IndexRoute component={LoginApp} />
    </Route>
);

var el = document.getElementById('container');
var rootInstance = ReactDOM.render(<Router history={createBrowserHistory()}>{routes}</Router>, el);
if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            // Help React Hot Loader figure out the root component instances on the page:
            return [rootInstance];
        }
    });
}

module.exports = {
    LoginApp
};
