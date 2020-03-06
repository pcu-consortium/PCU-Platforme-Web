import React from 'react'; // Because of addons ??
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import formatTime from 'utils/format-time';
import './video-sequences.css';

var computeProgress = function(value, begin, end){
    if (value < begin) return 0;
    else if (value > end) return 1;
    else if (end <= begin) return 0; // Buggy case
    else return (value - begin) / (end - begin);
}

var VideoSequenceItem = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        label: React.PropTypes.string,
        begin: React.PropTypes.number.isRequired,
        end: React.PropTypes.number.isRequired,
        progress: React.PropTypes.number,
        active: React.PropTypes.bool,
    },

    getDefaultProps(){
        return {
            active: false
        }
    },

    handleClick(e){
        if (this.props.onClick){
            this.props.onClick(this.props.segment);
            e.preventDefault();
            e.stopPropagation();
        }
    },

    render(){
        const { label, active, progress, begin, end, selected, onClick } = this.props;
        var classes = classNames("list-group-item sequence-item", { 
            'has-progress': active,
            selected
        });
        // if (this.props.active){
        //     return this.renderActive();
        // }
        return (
            <a href="#" className={classes} onClick={this.handleClick}>
                {this.renderProgress()}
                {this.renderSelect()}
                <span className="text pull-right" style={{marginLeft: 4}}>{formatTime(begin) + ' - ' + formatTime(end)}</span>
                <span className="title">{label}</span>
            </a>
        );
    },

    renderProgress(){
        const { active, progress } = this.props;
        if (!active){
            return undefined;
        }
        return <span className="progress-background" style={{width: `${progress*100}%`}}/>
    },

    renderSelect(){
        if (!this.props.selected){
            return undefined;
        }
        return <span className="vt-left-border" />
    }

    // renderActive(){
    //     const { title, active, begin, end, progress } = this.props;
    //     // TODO : repeat/cycle on item
    //     var classes = classNames("list-group-item sequence-item", { active });
    //                 //<span className="badge pull-left" style={{marginRight: 4}}>{formatTime(begin)}</span>
    //                 //<span className="badge pull-right" style={{marginLeft: 4}}>{formatTime(end)}</span>
    //     return (
    //         <a href={`#start=${begin}`} className={classes}>
    //             <span className="pull-right" style={{marginLeft: 4}}>{formatTime(begin) + ' - ' + formatTime(end)}</span>
    //             <h5 className="list-group-item-heading">{title}</h5>

    //             <div className="clearfix">

    //                 <div className="mini-commands">
    //                     <div className="progress" style={{verticalAlign: 'middle', marginTop: 4, marginBottom: 4, height: 8}}>
    //                         <div className="progress-bar progress-bar-info" role="progressbar" data-seq-id="2"
    //                              style={{width: (progress*100) + "%"}}>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </a>
    //     );
    // }
});

var VideoSequenceItems = React.createClass({

    render(){
        const { segments } = this.props;
        return (
            <div>
                {segments.map(this.renderSegment)}
            </div>
        );
    },

    renderSegment(segment){
        const { currentTime, onSelectSegment, selected } = this.props;
        // Compute everything before sending to VideoSequenceItem, it's a PureRenderer
        var active = currentTime >= segment.begin && currentTime < segment.end;
        var progress = computeProgress(currentTime, segment.begin, segment.end);
        var isSelected = selected == segment.id;
        return <VideoSequenceItem key={segment.id} {...segment} selected={isSelected} segment={segment} progress={progress} active={active} onClick={onSelectSegment}/>;
    }
});


module.exports = {
    VideoSequenceItem,
    VideoSequenceItems
};
