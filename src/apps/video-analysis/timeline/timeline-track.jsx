
import Movable from './movable';
import TimelineContainer from './timeline-container';


var TimelineEvent = React.createClass({
	mixins: [React.addons.PureRenderMixin],

	contextTypes: {
		actions: React.PropTypes.shape({
			updateTime: React.PropTypes.func
		})
	},

  getDefaultProps(){
    return {
      icon: 'file'
    };
  },

	handleClick(e){
		console.log('handle segment click', this.props.onSelectSegment);
		if (this.props.onSelectSegment){
			this.props.onSelectSegment(this.props.segment);
		}
	},

	onMove(pos){
		const { _duration } = this.props;
		this.context.actions.updateTime(this.props.id, pos.left*_duration, pos.right*_duration);
	},

	render(){
		const { icon, label, begin, end, _duration, selected } = this.props;
		var left = begin/_duration;
		var right = end/_duration;
		var borderTopColor = selected ? "#F00" : undefined;
		return (
			<Movable className="vt-track-event vt-type vt-type-default" style={{borderTopColor}} onMove={this.onMove} left={left} right={right} onClick={this.handleClick}>
				<div className="vt-track-event-info " >
					<div className="vt-track-event-icon">
						<FAIcon icon={icon} />
					</div>
					<div className="title">{label}</div>
				</div>
			</Movable>
		)
	}
});

var TimelineTrack = React.createClass({

  getLayerIcon(){
    const { type } = this.props;
    if (!type) return undefined;
    switch(type){
      case '<http://escom.msh-paris.fr#ThematicLayer>': return "file-text-o";
      case '<http://escom.msh-paris.fr#VideoLayer>': return "file-movie-o";
      case '<http://escom.msh-paris.fr#AudioLayer>': return "file-audio-o";
    }
  },

	render(){
		const {
			segments,
			selected,
			onSelectSegment,
			timeInfo: {_currentTime, _duration},
			viewportInfo: {viewportLeft, viewportRight}
		} = this.props;

		var timelineInfo = {
			currentTime: _currentTime,
			duration: _duration,
			viewportLeft,
			viewportRight
		};
		var isVisible = function(segment){
			return _duration && (segment.begin <= (viewportRight+0.01) * _duration) && (segment.end >= (viewportLeft-0.01) * _duration);
		};
		return (
			<TimelineContainer {...timelineInfo}>
				<div className="vt-track">
					{segments.map(segment => {
						// Only render visible segments
						if (isVisible(segment)){
							var isSelected = selected === segment.id;
							return (
								<TimelineEvent 
                  icon={this.getLayerIcon()}
                  {...segment} 
                  key={segment.id} 
                  segment={segment} 
                  selected={isSelected}
                  _duration={_duration} 
                  onSelectSegment={onSelectSegment} />
							);
						} else {
							return undefined; // Remove :)
						}
					})}
				</div>
			</TimelineContainer>
		)
	}
});

module.exports = TimelineTrack;
