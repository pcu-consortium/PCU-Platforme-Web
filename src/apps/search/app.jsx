import ReactDOM from 'react-dom';
import Router, { Route, IndexRoute } from 'react-router';
import { SearchWindow } from './search';
import { AppContext } from 'components/site/site-components';
// import Navbar from 'components/navbar/navbar';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import CmsNavbar from 'apps/cms/cms-navbar';

window.Link = Router.Link; // Make global for now, for components...

var SearchApp = React.createClass({

    render: function(){
        return (
            <SearchWindow {...this.props.content} 
                searchUrl={this.props.searchUrl} 
                baseUrl={this.props.baseUrl}
                api={this.props.api}
                sort={this.props.sort}
                source={this.props.params.source} />
        )
    }
});


var App = React.createClass({
    mixins: [Router.Navigation],
    childContextTypes: {
        ...AppContext
    },

    contextTypes: {
        location: React.PropTypes.object
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
        const sort = this.context.location.query.sort;
        const extraProps = {
            ...this.props,
            sort
        };
        return (
            <div>
                <CmsNavbar {...__data__} showSearch={false} />
                <div className="fill-parent" style={{marginTop: 64}}>
                    {React.cloneElement(this.props.children, extraProps)}
                </div>
            </div>
        )
    }
});

var AppWithGlobals = props => <App {...__data__} {...props} />;

var routes = (
    <Route path="/:site/search(/:source)" component={AppWithGlobals}>
        <IndexRoute component={SearchApp} />
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
    SearchApp
};
