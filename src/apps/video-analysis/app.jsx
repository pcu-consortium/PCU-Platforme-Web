import ReactDOM from 'react-dom';
import Router, { Route, IndexRoute } from 'react-router';
// import Navbar from 'components/navbar/navbar';
import VideoAnalysis from './video-analysis';
import { AppContext } from 'components/site/site-components';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import layers from 'stores/sequencing-store';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import CmsNavbar from 'apps/cms/cms-navbar';

window.Link = Router.Link; // Make global for now, for components...

const redux = createRedux({layers});

var App = React.createClass({
	mixins: [Router.State, Router.Navigation],
	childContextTypes: {
		...AppContext,
		//segmentStore: React.PropTypes.object
	},

	getChildContext() {
		return {
			site: this.props.site,
			baseUrl: this.props.baseUrl,
			api: this.props.api,
			//segmentStore: SegmentStore
		};
	},

	//getInitialState: function(){
	//    return {
	//        blocks: this.props.blocks,
	//        expandedSidebar: true
	//    }
	//},
	//
	//componentDidMount(){
	//    SegmentStore.register(this.handleUpdate);
	//},
	//
	//handleToggle(){
	//    this.setState({
	//        expandedSidebar: !this.state.expandedSidebar
	//    })
	//},

	handleUpdate(){
		this.forceUpdate();
	},

	render() {
		const { params, routes } = this.props;
		console.log('params', params);
		console.log('routes', routes);
		return (
			<div>
				{/*<header><Navbar params={params} routes={routes} title="Video" /></header>*/}
        <CmsNavbar {...__data__} />
				<div className="fill-parent">
					<Provider redux={redux}>
						{() => this.props.children}
					</Provider>
				</div>
			</div>
		);
	}
});

// use AdminGlobals ?

var routes = (
	<Route path="/:site/video" component={App}>
		<IndexRoute name="video-analysis" component={VideoAnalysis} />
		<Route path=":videoId" component={VideoAnalysis} />
	</Route>
);

const history = createBrowserHistory();
const el = document.getElementById('container');
var rootInstance = ReactDOM.render(<Router history={history}>{routes}</Router>, el);

if (module.hot) {
	require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
		getRootInstances: function () {
			// Help React Hot Loader figure out the root component instances on the page:
			return [rootInstance];
		}
	});
}
