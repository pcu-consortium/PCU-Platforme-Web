
import request from 'superagent';

var defaultUrlFunction = function(props){
  return props.url;
};

export default function remoteComponent(Component, makeUrl=defaultUrlFunction){
  var comp = React.createClass({

    getDefaultProps(){
      return {
        initialComponent: false
      };
    },

    getInitialState(){
      return {
        data: undefined
      }
    },

    componentDidUpdate(prevProps){
      var prevUrl = makeUrl(prevProps);
      var newUrl = makeUrl(this.props);
      var prevPost = prevProps.postData;
      var newPost = this.props.postData;
      if ((newUrl != prevUrl) 
        || ((prevPost != newPost) && (JSON.stringify(prevPost) != JSON.stringify(newPost)))){
        this.fetchUrl(newUrl, newPost);
      }
    },

    componentDidMount(){
      this.fetchUrl(makeUrl(this.props), this.props.postData);
    },

    fetchUrl(url, postData){
      var state = this.state || {};
      // if (url === state.url) {
      //   // Already fetched
      //   if (url !== state.targetUrl){
      //     this.setState({targetUrl: url});
      //   }
      //   return;
      // }

      // if (url === this.targetUrl){
      //   // Current fetching...
      //   return;
      // }

      if (!url){
        return;
      }

      this.createRequest(url, postData).end((err, res) => {
        if (err) {
          console.warn('FetchURL failed', err);
          this.setState({
            isFetching: false
          });
          return;
        }
        if (!this.isMounted()){
          return;
        }
        if ((url !== this.state.url) || (postData !== this.state.postData)){
          // Url/data has changed, abort
          return;
        }
        const data = res.body;
        console.log('data', data);
        this.setState({
          url,
          rawData: data,
          data,
          isFetching: false
        });
      });

      this.setState({
        url,       // Url we want
        postData,
        targetUrl: url,  // Url we are fetching
        isFetching: true
      });
    },

    createRequest(url, postData){
      if (!postData){
        console.log('get', url);
        return request.get(url)
          .set('Accept', 'application/json');
      } else {
        console.log('post', url, postData);
        return request.post(url)
          .set('Accept', 'application/json')
          .send(postData);
      }
    },

    render(){
      const { isFetching } = this.state;
      if (!this.state.data) return this.props.initialComponent;
      return <Component {...this.props} data={this.state.data} isRefreshing={isFetching} />;
    }
  });
return comp;
};
