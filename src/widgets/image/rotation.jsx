
import WidgetManager from '../widget-manager';

const styles = {position: 'relative'};

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

var Rotation = React.createClass({
  
  getInitialState(){
    return {current: 0}
  },

  getDefaultProps(){
    var data = [];
    for(var i=0; i<=35; i++){
      data.push('/images/0MM00N5S/1PTBSYVCCM09A0B0_0MM00N5S_XXXXXXXX_' + pad(i, 3) + '.png');
    }
    return { 
      data, 
      cycle: true 
    };
  },

  componentDidMount() {
    document.addEventListener('mouseup', this.handleTouchEnd, false);
  },

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleTouchEnd, false);
  },

  componentDidUpdate() {
    const handleChange = this.props.onChange;
    if (typeof handleChange === 'function') handleChange(this.state.current);
  },

  handleWheel(event) {
    event.preventDefault();
    const deltaY = event.deltaY;
    const delta = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY);
    this.setCurrentFrame(this.state.current + delta);
  },

  handleTouchStart(event) {
    event.preventDefault();
    this.pointerPosition = this.calculatePointerPosition(event);
    this.startFrame = this.state.current;
  },

  handleTouchMove(event) {
    event.preventDefault();
    if (typeof this.pointerPosition !== 'number') return;
    const el = React.findDOMNode(this);
    const pointer = this.calculatePointerPosition(event);
    const max = this.props.vertical ? el.offsetHeight : el.offsetWidth;
    const offset = pointer - this.pointerPosition;
    const delta = Math.floor(offset / max * this.props.data.length);
    this.setCurrentFrame(this.startFrame + delta);
  },

  handleTouchEnd(event) {
    event.preventDefault();
    this.pointerPosition = null;
    this.startFrame = null;
  },

  calculatePointerPosition(event) {
    event = event.type.indexOf('touch') === 0 ? event.changedTouches[0] : event;
    const el = React.findDOMNode(this);
    const pos = this.props.vertical ?
      event.clientY - el.offsetTop :
      event.clientX - el.offsetLeft;
    return pos;
  },

  setCurrentFrame(n) {
    const len = this.props.data.length;
    if (n < 0) n = this.props.cycle ? n + len : 0;
    if (n > len - 1) n = this.props.cycle ? n - len : len - 1;
    if (n !== this.state.current) this.setState({current: n});
  },

  render() {
    return (
      <div className={this.props.className} style={styles}
           onWheel={this.handleWheel}
           onTouchStart={this.handleTouchStart}
           onTouchMove={this.handleTouchMove}
           onTouchEnd={this.handleTouchEnd}
           onMouseDown={this.handleTouchStart}
           onMouseMove={this.handleTouchMove} >
        {this.props.data.map((src, i) => {
          const display = this.state.current === i ? 'block' : 'none';
          const imgStyles = {display, width: '100%'};
          return <img src={src} alt='' key={i} style={imgStyles} />;
        })}
      </div>
    );
  }
});


WidgetManager.registerWidget("Rotation", {
    component: Rotation,
    icon: "image",
    config: [
    ],
    defaultValue: {type: 'Rotation'}
});



module.exports = Rotation;
