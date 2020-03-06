import { Overlay, Tooltip } from 'react-bootstrap';

const MIN_PIXEL_WIDTH = 24; // Minimum width when resizing

var noClick = function(e) {
    e.stopPropagation();
};

var Movable = React.createClass({

    getInitialState(){
        return {
            moving: false
        }
    },

    initDrag(event, type){
        event.preventDefault();
        event.stopPropagation();
        //console.log(type, event, event.nativeEvent);

        if (this.props.onClick){
            this.props.onClick();
        }

        var that = this;
        this.setState({
            moving: true
        });

        var clamp = function(v, min, max){
            if (v < min) return min;
            else if (v > max) return max;
            else return v;
        };

        const { left: initialLeft, right: initialRight } = this.props;
        var startX = event.nativeEvent.clientX;
        var parentNode = this.refs.movable.parentNode;
        var parentWidth = parseInt(document.defaultView.getComputedStyle(parentNode, null).width, 10);
        var minWidth = MIN_PIXEL_WIDTH / parentWidth;
        var drag = e => {
            var { left, right } = this.props;
            var delta = (e.clientX - startX) / parentWidth;
            //console.log(left, right, delta);
            if (type == 'left'){
                left = clamp(initialLeft + delta, 0, right-minWidth);
            } else if (type == 'right'){
                right = clamp(initialRight + delta, left+minWidth, 1);
            } else if (type == 'move'){
                left = initialLeft + delta;
                right = initialRight + delta;
                if (left < 0){
                    right -= left;
                    left = 0;
                }
                if (right > 1){
                    left -= right-1;
                    right = 1;
                }
            } else {
                console.warn('unknown move type', type);
            }
            //console.log(' => ', left, right);
            this.props.onMove({left, right});
        };
        // console.log(info.left + " vs " + (parentWidth*parseFloat(elem.style.left)/100) + " (" + elem.style.left + ")");
        document.documentElement.addEventListener('mousemove', drag, false);
        document.documentElement.addEventListener('mouseup', function stopDrag(){
            that.setState({moving: false});
            document.documentElement.removeEventListener('mousemove', drag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);
            //if (options['onFinished'] !== undefined) options['onFinished'](elem);
        }, false);
    },

    onMouseDownLeft(e){
        this.initDrag(e, 'left');
    },

    onMouseDownRight(e){
        this.initDrag(e, 'right');
    },

    onMouseDownMove(e){
        this.initDrag(e, 'move');
    },

    render(){
        const { left, right, style } = this.props;
        var percent = function(f){
            return (f*100) + '%';
        };
        var className = classNames("vt-handle-parent movable resizable", this.props.className);
        var zIndex = this.state.moving ? 100 : undefined;
        var target = props => this.refs.left;
        return (
            <div ref="movable" className={className}
                 onMouseDown={this.onMouseDownMove}
                 onClick={this.props.onClick}
                 style={{...style, left: percent(left), width: percent(right-left), zIndex}} >
                {this.props.children}
                <div ref="left" className="vt-handle vt-left-handle"  onMouseDown={this.onMouseDownLeft}  onClick={noClick} ></div>
                <div ref="right" className="vt-handle vt-right-handle" onMouseDown={this.onMouseDownRight} onClick={noClick} ></div>
                {/*this.state.moving || true
                    ? (
                        <Overlay show container={this} target={target} placement="top">
                            <Tooltip>Haha</Tooltip>
                        </Overlay>
                    )
                    : undefined
                */}
            </div>
        );
    }
});

module.exports = Movable;