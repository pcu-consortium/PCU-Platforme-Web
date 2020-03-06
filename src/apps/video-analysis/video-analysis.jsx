import React from 'react'; // Because of addons ??
import './video-analysis.css';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import formatTime from 'utils/format-time';
import { VideoSequenceItems } from './video-sequences';
import { Timeline, Timebar, MiniTimeline } from './timeline';
import { AudioPlayer, VideoPlayer } from 'components/media-player';

import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';
import * as SequencingActions from 'actions/sequencing-actions';
import { VideoDocument } from './document/video-document';
import Select from 'react-select';
import './MultiSelectblue.css';

const DEBUG_PERFORMANCE = false;


// var videoSources = [
// {
//  width: 480,
//  height: 360,
//  bitrate: 512000,
//  url: "http://semioza.msh-paris.fr:1935/mp4/aar/1108_3358/hong-kong-road_movie_lan_360p.mp4"
// },
// {
//  width: 960,
//  height: 720,
//  bitrate: 1024000,
//  url: "http://semioza.msh-paris.fr:1935/mp4/aar/1108_3358/hong-kong-road_movie_lan_720p.mp4"
// },
// {
//  width: 240,
//  height: 180,
//  bitrate: 64000,
//  url: "http://semioza.msh-paris.fr:1935/mp4/aar/1108_3358/hong-kong-road_movie_lan_180p.mp4"
// }
// ];

var Video = React.createClass({
  getDefaultProps(){
    return {
      ratio: "16/9"
    }
  },

  getUrl(){
    var matches = this.props.url.match("youtube.com/embed");
    if (matches){
      return this.props.url; // Embed url
    }
    matches = this.props.url.match("youtube.com/.*v=([^&]*)");
    if (matches){
      return "https://www.youtube.com/embed/" + matches[1];
    }
    return this.props.url;
  },

  render(){
    var url = this.getUrl();
    var className = this.props.ratio == "16/9" ? "videoWrapper16_9" : "videoWrapper4_3";
    return (
      <div style={{width: this.props.width, textAlign: "center", margin: "auto"}}>
        <div className={className}>
         <iframe width="640" height="480" src={url} frameBorder="0" allowFullscreen></iframe>
        </div>
      </div>
      );
  }
});

var VideoPanel = React.createClass({
  render(){
    var panelName = null;
    if (this.props.name){
      panelName = "vt-panel-" + this.props.name;
    }
    var className = classNames("vt-panel", panelName, this.props.className);
    return (
      <div className={className}>
      <h3>{this.props.title}</h3>
      <div className="vt-panel-body">
      {this.props.children}
      </div>
      </div>
      )
  }
});

var ProgressBar = React.createClass({
  render(){
    var width = (this.props.progress*100)+'%';
    return (
      <div style={{width: '100%', position: 'relative', backgroundColor: '#BDBDBD', borderRadius: 3, overflow: 'hidden'}}>
      <div style={{height: 6, width, backgroundColor: '#303F9F'}} />
      </div>
      );
  }
});

var MetadataPlayer = React.createClass({
  mixins: [ React.PureRenderMixin ],

  getElement(){
    return this.refs.player.getElement();
  },
  handleShare(val)
  {
    var url=window.location.href;
    switch(val) {
      case 'Facebook':
          var win = window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url), '_blank');
        win.focus();
          break;
      case 'Twitter':
          var win = window.open('https://twitter.com/home?status='+encodeURIComponent(url), '_blank');
        win.focus();
          break;
      case 'Email':
          var win = window.open('mailto:?&subject=Video&body='+encodeURIComponent(url));
        //win.focus();
          break;
      case 'code':
          var code='<iframe height=498 width=510 src="'+url+'" frameborder=0 allowfullscreen></iframe>';
      window.prompt("Copy to clipboard: Ctrl+C, Enter", code);
          break;
      case 'link':
          var link=this.props.video.instances[0].http_url;
      window.prompt("Copy to clipboard: Ctrl+C, Enter", link);          
          break;
      default:
          console.log('error option');
    }
  },


  render(){
    const { video, src, currentTime, duration } = this.props;
    const videoSources = video.instances.map(instance => ({
      width: instance.width,
      height: instance.height,
      bitrate: instance.bitrate,
      url: instance.http_url
    }));
    //console.log('video', video);
    // src={src} 
    var options = [{ value: 'Facebook', label: 'Fackbook' },{ value: 'Twitter', label: 'Twitter' },{ value: 'Email', label: 'Email'},{ value: 'code', label: 'Copy Embed code'},{ value: 'link', label: 'Copy Video link'}];
    return ( <div>
      <VideoPlayer ref="player" sources={videoSources}>
        {video ? 
        <div className="title">
          <div className="title" dangerouslySetInnerHTML={{__html:video.title}}> 
          </div> 
          <div style={{fontSize: '13px', lineHeight:'5px', height:'5px'}}>
            <Select className="col-xs-3" value="Share Video" multi={false} clearableValue={false} clearable={false} options={options} onChange={this.handleShare}/>
          </div>
        </div>
        : 
        undefined}
      </VideoPlayer>
        {/*<div style={{display: 'table', width: '100%'}}>
          <div style={{display: 'table-cell', width: '1px', whiteSpace: 'nowrap'}}>
            {formatTime(currentTime) + " / " + formatTime(duration) + "  "}
          </div>
          <div style={{display: 'table-cell'}}>
            <ProgressBar progress={currentTime / (duration||3600)}/>
          </div>
        </div>*/}
        </div>
        )
  }
});

var VideoAnalysis = React.createClass({

  childContextTypes: {
    actions: React.PropTypes.shape({
      updateTime: React.PropTypes.func
    })
  },

  getChildContext(){
    return {
      actions: {
        updateTime: this.props.updateTime
      }
    };
  },

  getInitialState(){
    return {
      currentTime: 0,
      duration: null,
      segmentId: null
    }
  },

  handleSegmentSelect(segment){
    this.setState({ segmentId: segment.id });
    var player = this.refs.player.getElement();
    if (player){
      player.currentTime = segment.begin; // JUMP
    }
  },

  handleTimebarClick(time){
    var player = this.refs.player.getElement();
    if (player){
      player.currentTime = time; // JUMP
    }
  },

  componentDidMount(){
    var autoUpdateTime = () => {
      if (!this.isMounted()){
        return;
      }

      var player = this.refs.player.getElement();
      const { currentTime, duration} = this.state;
      if ((player.currentTime == currentTime) && (player.duration == duration)) {
        setTimeout(autoUpdateTime, 100);
        return; // Nothing to do
      }

      if (DEBUG_PERFORMANCE){
        React.addons.Perf.start();
        this.setState({
          currentTime: player.currentTime,
          duration: player.duration
        }, () => {
          React.addons.Perf.stop();
          React.addons.Perf.printWasted();
        });
      } else {
        this.setState({
          currentTime: player.currentTime,
          duration: player.duration
        });
      }

      // VideoTimeline.timeline.timeRatio(video[0].currentTime/video[0].duration);
      setTimeout(autoUpdateTime, 50);
    };
    autoUpdateTime();
  },

  render(){
    const { layers, updateTime } = this.props;
    const { currentTime, duration } = this.state;
    var timeInfo = {currentTime, duration};
    //<Video url="https://www.youtube.com/watch?v=ZTidn2dBYbY" />
    var segments = [];
    layers.forEach(layer => segments = [...segments, ...layer.segments]);

    //<Panel header={title} bsStyle="primary">
    //    <ListGroup fill>
    var timelineConfig = [
    "viewport", "waveform", "layers", "timebar"
    ];
    var video = window.__data__.content.video;
    //files/TEDx-waveform.png" 

  //  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxvid');
  //  console.log('content data',window.__data__.content);
   //   console.log('contentMeta data',window.__data__.content.videoDocumentMetaData);
    //var vid=video.id.replace(/[:\/#]/g, '_');
    //var vid="123";
    var vid=video.id.replace(/[:\/#]/g, '_');
//    console.log(vid);
    return (
      <div className="video-analysis-container">
        <div className="video-analysis-column col-md-5">
          <VideoPanel name="video" title="Video">
            {/*<AudioPlayer ref="player" src="/files/hardmode.mp3" />*/}
            <MetadataPlayer ref="player"
              {...timeInfo}
              video={video}
              src="http://demo.armadillolab.fr/files/TEDxParis 2013 - Muriel Mayette.mp4"/>
            <div>
                <Timebar currentTime={currentTime} duration={duration} videoId={vid} onClick={this.handleTimebarClick} />
              <MiniTimeline {...this.state} tracks={layers} onSelectSegment={this.handleSegmentSelect} selected={this.state.segmentId}/>
            </div>
          </VideoPanel>
          <VideoPanel name="segments" title="Segments">
            <VideoSequenceItems {...timeInfo} 
                                segments={segments} 
                                selected={this.state.segmentId} 
                                onSelectSegment={this.handleSegmentSelect}/>
          </VideoPanel>
        </div>
        <div className="video-analysis-column col-md-7">
        <VideoPanel name="timeline" title="Timeline">
          <Timeline config={timelineConfig} {...timeInfo} 
                    layers={layers}
                    videoId={vid}
                    selected={this.state.segmentId}
                    onSelectSegment={this.handleSegmentSelect}
                    waveform={"/test/api/videos/"+vid+"/waveform"}
                    onTimebarClick={this.handleTimebarClick}
                    updateTime={updateTime} />
        </VideoPanel>
        <VideoPanel name="document" title="Notice">
          <VideoDocument analysis={__data__.content.videoAnalysis} presentation={__data__.content.videoPresentationMetaData} usage={__data__.content.videoUsageMetaData} ressource={__data__.content.videoRessourceMetaData} role={__data__.content.videoRoleMetaData} visuel={__data__.content.videoVisuelMetaData} droit={__data__.content.videoDroitMetaData} audio={__data__.content.videoAudioMetaData} discours={__data__.content.videoDiscoursMetaData} subject={__data__.content.videoSubjectMetaData} media={__data__.content.videoDocumentMetaData} document={video} layers={layers} segmentId={this.state.segmentId} currentTime={currentTime} segments={segments} />
        </VideoPanel>
      </div>
    </div>
    );
  }
});

var VideoAnalysisApp = React.createClass({
  render(){
    return (
      <Connector>
      {({ layers, dispatch }) =>
      <VideoAnalysis layers={layers} {...bindActionCreators(SequencingActions, dispatch)} />
    }
    </Connector>

    );
  }
});

module.exports = VideoAnalysisApp;

