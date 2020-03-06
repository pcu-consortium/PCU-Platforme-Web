import ReactDOM from 'react-dom';
import Router, { Route, IndexRoute, Link } from 'react-router';
//import History from 'react-router/lib/History';
import { CmsEditPage } from './cms/cms-edit';
import { DashboardApp } from './dashboard/dashboard';
import { Sidebar } from './sidebar/sidebar';

import Schema from './schema/schema';
import Groups from './groups/groups';
import Users from './users/users';
import Forms from './forms/forms';
import Rameau from './rameau/rameau';

import { AppContext } from './common/components';
import * as components from './common/components';
import AdminNavbar from './navbar/admin-navbar';
import './admin.css';
import createHashHistory from 'history/lib/createHashHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { CmsAdmin, CmsEditMenu, CmsMenu, CmsFooter } from 'apps/cms/cms-layout';

//import { Route, Link, State, Navigation } from 'react-router';

window.Link = Link; // Make global for now, for components...

var CmsAdminPage = React.createClass({
    render: function() {
        const { site, baseUrl } = this.props;
        var content = this.props.content;
        switch(content.page){
            case "cms/menu":      return <CmsEditMenu {...content.data} baseUrl={baseUrl} site={site} />;
            case "cms/page":      return <CmsEditPage {...content.data} baseUrl={baseUrl} site={site} />;
            case "config/schema": return <ConfigSchema {...content.data} baseUrl={baseUrl} site={site} />;
            default:      console.log('/!\\ unknown page', content.page); return false;
        }
    }
});

var CmsAdminApp = React.createClass({
    //mixins: [Router.State, Router.Navigation],

    getInitialState(){
        return {
            blocks: this.props.blocks
        }
    },

    componentDidMount: function(){
        CmsAdmin.setPage(this.props.page);
        CmsAdmin.registerMenuListener(blocks => {
            console.log('update blocks', blocks);
            this.setState({
                blocks: blocks
            });
        });
    },

    render: function () {
        //style={{maxWidth: 'inherit'}}
        return (
            <div className="cms-body" >
                <CmsMenu menu={this.state.blocks.menu} site={this.props.site}  baseUrl={this.props.baseUrl} searchUrl={this.props.searchUrl} />
                <CmsAdminPage content={this.props.content} site={this.props.site}  baseUrl={this.props.baseUrl} />
                <CmsFooter footer={this.state.blocks.footer} baseUrl={this.props.baseUrl} />
            </div>
        )
    }
});


var AdminApp = React.createClass({
    mixins: [Router.State, Router.Navigation],
    childContextTypes: AppContext,

    getChildContext() {
        return {
            site: this.props.site,
            baseUrl: this.props.baseUrl,
            api: this.props.api
        };
    },

    getInitialState: function(){
        return {
            blocks: this.props.blocks,
            expandedSidebar: true
        }
    },

    handleToggle(){
        this.setState({
            expandedSidebar: !this.state.expandedSidebar
        })
    },

    render: function () {
        const { params, routes } = this.props;
        //const { blocks, site, baseUrl, searchUrl, state } = this.props;
        //console.log('params', this.props.params);
        //        <CmsMenu menu={blocks.menu} site={site}  baseUrl={baseUrl} searchUrl={searchUrl} />
        //        <CmsFooter footer={blocks.footer} baseUrl={baseUrl} />
        var className = classNames("admin-page page-with-sidebar", {
            "page-sidebar-expanded": this.state.expandedSidebar,
            "page-sidebar-collapsed": !this.state.expandedSidebar
        });
        return (
            <div>
                <header><AdminNavbar title="Fonds" params={params} routes={routes} /></header>
                <div className={className}>
                    <Sidebar expanded={this.state.expandedSidebar} onToggle={this.handleToggle} />
                    <div className="page-content-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
});

var CmsAdminAppWithGlobals = props => <CmsAdminApp {...AdminGlobals} {...props} />;
var AdminAppWithGlobals = props => <AdminApp {...AdminGlobals} {...props} />;

var routes = (
    <Route path="/:site/admin" component={AdminAppWithGlobals}>
        {Schema.Routes}
        {Users.Routes}
        {Groups.Routes}
        {Forms.Routes}
        {Rameau.Routes}
        <IndexRoute component={DashboardApp} />
    </Route>
);

var rootInstance = null;
var el = document.getElementById('container');

if (window.AdminGlobals.content.page == "*"){
    rootInstance = ReactDOM.render(<Router history={createBrowserHistory()}>{routes}</Router>, el)
} else { // Support old routes
    console.warn('TODO', 'move cms edit to a different "app"');
    let history = createBrowserHistory();
    rootInstance = ReactDOM.render(
        <Router history={history}><Route path="*" component={CmsAdminAppWithGlobals}/></Router>, el)
}

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: () => [rootInstance]
    });
}
