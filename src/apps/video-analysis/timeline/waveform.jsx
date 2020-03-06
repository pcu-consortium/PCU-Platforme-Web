import './waveform.css';
import TimelineContainer from './timeline-container';

var Waveform = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render(){
        const { waveform } = this.props;
        return (
            <div style={{height: 50, width: '100%'}}>
                <TimelineContainer {...this.props} >
                    <div className="vt-waveform-img" style={{backgroundImage: 'url(' + waveform + ')'}} />
                </TimelineContainer>
            </div>
        );
    }
});

module.exports = Waveform;