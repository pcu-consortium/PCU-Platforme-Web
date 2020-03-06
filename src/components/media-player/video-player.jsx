import './media-player.css';
var videoSource = React.PropTypes.shape({
  url: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  bitrate: React.PropTypes.number
});
var urlOf = function(props, state){
  const { sources } = props;
  const { quality } = state;
  if (!sources){
    return undefined;
  }

  if (!Array.isArray(sources)){
    return sources.url;
  }
  return sources[quality].url;
}



var VideoPlayer = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    src: React.PropTypes.string,
    sources: React.PropTypes.oneOfType([
      videoSource,
      React.PropTypes.arrayOf(videoSource)
    ])
  },

  getInitialState(){
    return {
      quality: 0 // Input source to use
    }
  },

  getDefaultProps(){
    return {
      sources: []
    }
  },



  getElement(){
    return this.refs.video;
  },



  // componentDidMount(){

  //   const { sources=[] } = this.props;

  //   setInterval(() => {

  //     this.setState({

  //       quality: (this.state.quality+1)%sources.length

  //     });

  //   }, 5000);

  // },



  componentWillUpdate(nextProps, nextState){
    if (urlOf(this.props, this.state) != urlOf(nextProps, nextState)){
      // video.pause();
      this.currentTime = this.refs.video.currentTime; // Save to restore after update
    }
  },



  componentDidUpdate(prevProps, prevState){
    if (urlOf(this.props, this.state) != urlOf(prevProps, prevState)){
      var video = this.refs.video;
      video.currentTime = this.currentTime;
      video.play();
    }
  },

  handleQualityChange(event)
  {
        //console.log(event.target.id);
        this.setState({quality: event.target.id},this.reloadVideo);
  },
  reloadVideo(){
      this.refs.video.load();
      this.refs.video.play();
  },
  render(){
    const { src, title } = this.props;
    return (
      <div className="media-player">
        <video ref="video" controls autoPlay>
          {this.renderSources()}
        </video>
        {title ? <div className="title">{title}</div> : undefined}
        {this.renderQualitySelector()}
        {this.props.children}
      </div>
    )
  },



  renderQualitySelector(){
    const { sources } = this.props;
    var self=this;
    return (
        sources.map(function(source,idx){
            var pos=sources[idx].url.search('0p')-2;
            return (
            <label>
            <span style={{verticalAlign: 'middle'}}>{source.url.substring(pos,pos+4)} </span>
            <input style={{verticalAlign: 'middle'}} onChange={self.handleQualityChange} value={source.url.substring(pos,pos+4)} type="radio" name="radioButtonSet" id={idx}/>
            </label>
            );
          }
        )
    );
  },

  renderSources(){
    const { sources } = this.props;
    if (!sources){
      return undefined;
    }
    var src = Array.isArray(sources) ? sources[this.state.quality] : sources;
//    console.log("current quality  ",src.url);
    return <source src={src.url} type={src.type || "video/mp4"} />;
  }
});


module.exports = {
  VideoPlayer
};