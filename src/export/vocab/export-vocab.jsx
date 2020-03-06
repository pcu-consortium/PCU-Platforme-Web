
import 'utils/compat';
import ReactDOM from 'react-dom';
import { VocabGraph, VocabApp } from 'components/graph/vocab';

var URLFetcher = {

    isRefreshing: function(){
        if (!this.state){
            return false;
        }
        return this.state.isFetching;
        //return !this.state.url || !this.state.data || (this.state.url !== this.state.targetUrl);
    },

    // TODO : change model to only query if there is no pending request...
    // buffer url to query for when it finished
    fetchUrl: function(url){
        var state = this.state || {};
        if (url === state.url) {
            // Already fetched
            if (url !== state.targetUrl){
                this.setState({targetUrl: url});
            }
            return;
        }

        if (url === this.targetUrl){
            // Current fetching...
            return;
        }

        if (!url){
            return;
        }

        console.log('fetch', url);
        $.ajax({
            dataType: "json",
            url: url,
            success: data => {
                // Check if component is still alive
                if (!this.isMounted()){
                    return;
                }
                if (url !== this.state.url){
                    // Url has changed, abort
                    return;
                }
                this.setState({
                    url,
                    rawData: data,
                    data,
                    isFetching: false
                });
                if (this.onDataUpdated){
                    this.onDataUpdated(data);
                }
            },
            error: msg => {
                console.warn('FetchURL failed', msg);
            }
        });

        this.setState({
            url,       // Url we want
            targetUrl: url,  // Url we are fetching
            isFetching: true
        });
    }
};

var VocabAppWidget = React.createClass({
    mixins: [URLFetcher],

    getDefaultProps: function() {
        return {
            word: "mosquée",
            api: "http://storm.armadillo.fr/api/v1"
        };
    },

    makeUrl: function(props){
      return this.props.api + '/vocabs/' + encodeURIComponent(props.word);
    },

    componentWillReceiveProps: function(nextProps){
        console.log('will receive', nextProps);
        this.fetchUrl(this.makeUrl(nextProps));
    },

    componentDidMount: function(){
        this.fetchUrl(this.makeUrl(this.props));
    },

    getData: function(){
        var data = undefined;
        if (this.state && this.state.data){
            data = this.state.data;
        }
        return data;
    },

    render: function() {
        var data = this.getData();
        if (!data){
            return false;
        }
        console.log('api', this.context.api);
        return (
            <VocabApp key={data.uri} rootVocab={data} vocabModule={this.props.vocabModule} api={this.context.api} />
        );
    }
});

function init(id, element, options={}){
  ReactDOM.render(<VocabAppWidget word={id} {...options}/>, element);
}

window.Vocab = {
  init
};
