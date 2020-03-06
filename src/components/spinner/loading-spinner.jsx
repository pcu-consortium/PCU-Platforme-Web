import './loading-spinner.css';

var LoadingColor = "rgb(35, 82, 124)";

var LoadingSpinner = React.createClass({

    propTypes: {
        color: React.PropTypes.string
    },

    render(){
        const { color, style } = this.props;
        var rectStyle = { backgroundColor: color };
        return (
            <div className="loading-spinner" style={style}>
                <div className="rect1" style={rectStyle}></div>
                <div className="rect2" style={rectStyle}></div>
                <div className="rect3" style={rectStyle}></div>
                <div className="rect4" style={rectStyle}></div>
                <div className="rect5" style={rectStyle}></div>
            </div>
        )
    }
});

var FullscreenLoadingSpinner = React.createClass({

    getDefaultProps(){
        return {
            delay: 0
        }
    },

    getInitialState(){
        // Only visible if no delay is set, else wait a little...
        return {
            visible: (this.props.delay == 0)
        }
    },

    componentDidMount(){
        if (this.props.delay > 0){
            setTimeout(() => {
                if (this.isMounted()){
                    this.setState({visible: true});
                }
            }, this.props.delay*1000);
        }
    },

    render(){
        var style = { opacity: this.state.visible ? 1 : 0};
        return <div className="loading-spinner-container" style={style}><LoadingSpinner /></div>;
    }
});

module.exports = {
    LoadingColor,
    LoadingSpinner,
    FullscreenLoadingSpinner
};
