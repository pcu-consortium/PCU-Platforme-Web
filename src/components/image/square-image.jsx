
var SquareImage = React.createClass({
    propTypes: {
        fillWidth:   React.PropTypes.bool,
        fillHeight:   React.PropTypes.bool,
        backgroundSize: React.PropTypes.string,
        alignTop:    React.PropTypes.bool
    },

    getStyle(){
        if (this.props.absolute){
            return {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0};
        }
        return { position: 'relative'};
    },

    // fillHeight => parameter to fit in height rather than width...
    // backgroundSize=v => custom background size
    render(){
        const { className, backgroundSize, src, onClick, defaultSrc } = this.props;
        var imgStyle = {
            "paddingBottom": "100%",
            "backgroundImage": "url(" + src + ")"
        };
        if (backgroundSize){
            imgStyle["backgroundSize"] = backgroundSize;
        }
        if (this.props.fillHeight){
            imgStyle["backgroundSize"] = 'auto 100%';
        } else if (this.props.fillHeight){
            imgStyle["backgroundSize"] = '100% auto';
        }

        if (this.props.alignTop){
            imgStyle["backgroundPosition"] = 'center top';
        }
        if (defaultSrc){
            imgStyle.backgroundImage += ", url(" + defaultSrc + ")";
        }

        return (
            <div className={className} style={this.getStyle()} onClick={onClick}>
                <div className="react-center-image" style={imgStyle} />
                <div className="image-overlay" />
            </div>
        )
    }
});

module.exports = SquareImage;