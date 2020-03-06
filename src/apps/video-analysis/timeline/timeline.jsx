import "./timeline.css";
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { MiniTimelineTracks } from './mini-timeline';
import Waveform from './waveform';
import Timebar from './timebar';
import TimelineTrack from './timeline-track';
import Movable from './movable';

var TimelineRow = React.createClass({
    render(){
        const { leftStyle, rightStyle, hasShadows } = this.props;
        const [ left, right ] = this.props.children;
        var rightClasses = classNames("vt-right-column", {
            "vt-side-shadows": hasShadows
        });
        return (
            <div className="vt-row" style={{display: 'table-row'}}>
                <div className="vt-left-column" style={leftStyle}>
                    <div className="vt-timeline-header">
                        {left}
                    </div>
                </div>
                <div className={rightClasses} style={rightStyle}>{right}</div>
            </div>
        )
    }
});


var TimelineLayer = React.createClass({
    changelayername(oldname){
        switch (oldname){
            case 'IngestionData':
                return 'Ingestion';
            case 'Layer':
                return 'Plan';
            case 'SpacialLayer':
                return 'Plan Spatial';
            case 'TemporalLayer':
                return 'Plan Temporel';
            case 'AudioLayer':
                return 'Plan Sonore';
            case 'RhetoricLayer':
                return 'Plan Rhétorique';
            case 'ThematicLayer':
                return 'Plan Thématique';
            case 'VideoLayer':
                return 'Plan Visuel';
        }
        return oldname;
    },
    render(){
        const { index, layer, timeInfo, viewportInfo, onSelectSegment, selected } = this.props;
        var layername=layer.title || layer.type.substring(layer.type.indexOf("#")+1, layer.type.length-1)     || `Layer ${index+1}`;
        layername=this.changelayername(layername);
        //console.log('layername:',layername);
        return (
            <TimelineRow hasShadows>
                {layername}
                <TimelineTrack {...layer} 
                               timeInfo={timeInfo} 
                               viewportInfo={viewportInfo} 
                               selected={selected}
                               onSelectSegment={onSelectSegment} />
            </TimelineRow>
        )
    }
});

var Viewport = React.createClass({

    render(){
        const { onUpdateViewport, viewportLeft: left, viewportRight: right } = this.props;
        var percent = function(f){
            return (f*100) + '%';
        };
        var className = classNames("vt-viewport-border", {
            "vt-handle-parent-small": (right-left < 0.1)
        });


        return (
            <div className="vt-viewport">
                <div className="vt-viewport-inner">
                    <div className="vt-viewport-outer" style={{left: '0%', width: percent(left)}} />
                    <div className="vt-viewport-outer" style={{left: percent(right), width: percent(1-right)}} />
                    <Movable className={className} left={left} right={right} onMove={onUpdateViewport} />
                </div>
            </div>
        )
    }
});

var Timeline = React.createClass({

    getInitialState(){
        return {
            viewportLeft: 0,
            viewportRight: 1
        }
    },

    getDefaultProps(){
        return {
            config: ["viewport", "waveform", "layers"]
        }
    },

    onUpdateViewport({left: viewportLeft, right: viewportRight}){
        this.setState({viewportLeft, viewportRight});
    },

    render(){
        return (
            <div className="vt-table">
                {this.props.config.map(this.renderItem)}
            </div>
        )
    },

    renderItem(item, idx){
        switch(item){
            case "viewport": return this.renderViewport(idx);
            case "waveform": return this.renderWaveform(idx);
            case "layers": return this.renderLayers(idx);
            case "timebar": return this.renderTimebar(idx);
            default: console.warn('unknown timeline entry', item); return undefined;
        }
    },

    renderTimebar(idx){
        const { currentTime, duration, onTimebarClick, videoId } = this.props;
        return (
            <TimelineRow key={"timebar" + idx}>
                <span></span>
                <Timebar {...this.state} 
                            videoId={videoId}
                            currentTime={currentTime} 
                            duration={duration} 
                            onClick={onTimebarClick}
                            showTimes />
            </TimelineRow>
        );
    },

    renderViewport(idx){
        const { layers: tracks, selected } = this.props;
        return (
            <TimelineRow key={"viewport" + idx} rightStyle={{verticalAlign: 'top'}}>
                <span>Vue</span>
                <div>
                    <MiniTimelineTracks {...this.props} 
                                        className="vt-timeline-minitracks" 
                                        tracks={tracks}
                                        selected={selected}
                                        style={{minHeight: 31}}/>
                    <Viewport {...this.state} onUpdateViewport={this.onUpdateViewport} />
                </div>
            </TimelineRow>
        );
    },

    renderWaveform(idx){
        const { waveform, currentTime, duration } = this.props;
        return undefined;
        return (
            <TimelineRow key={"waveform" + idx} hasShadows>
                <span>Waveform</span>
                <Waveform waveform={waveform} duration={duration} currentTime={currentTime} {...this.state} />
            </TimelineRow>
        );
    },

    renderLayers(idx){
        const { layers, currentTime, duration, onSelectSegment, selected } = this.props;
        //const { viewportLeft, viewportRight } = this.state;
        var timeInfo = {_currentTime: currentTime, _duration: duration};
        var tracks = layers;
        return (
            tracks.map((track, idx) => <TimelineLayer key={"layer" + track.id + "." + idx}
                                               layer={track}
                                               index={idx}
                                               timeInfo={timeInfo}
                                               selected={selected}
                                               onSelectSegment={onSelectSegment}
                                               viewportInfo={this.state} />)
        );
    }
});

module.exports = {
    Timeline
};