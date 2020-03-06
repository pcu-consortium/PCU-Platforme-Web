
import './media-element.css';
import { line1, imageUrl, defaultImageUrl } from './media-info';
import SquareImage from 'components/image/square-image';

var MediaElementSmall = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],
    //mixins: [/*MediaMixin, */Router.State, Router.Navigation],

    handleSelect(){
        const { data, onSelect } = this.props;
        if (onSelect) onSelect(data);
    },

    render: function(){
        var { data, href } = this.props;
        const img = imageUrl(data);
        const defaultImg = defaultImageUrl(data);
        var imgStyle = {
            "paddingBottom": "100%",
            "backgroundImage": "url(" + data.img + ")"
        };
        var classes = "thumbnail search-thumbnail" + (this.props.selected ? "selected" : "");
        let Component = href ? 'a' : 'div';
        return (
            <Col xs={4} sm={3} md={2} animate 
                className="media-small" 
                style={{paddingLeft: 2, paddingRight: 2}}
                 onClick={href ? undefined : this.handleSelect} >
                <Component className={classes} href={href}>
                    <div style={{position: 'relative'}}>
                        <SquareImage src={img} defaultSrc={defaultImg} alignTop />
                        {/*<MediaCheckbox toggle={this.toggle} checked={this.props.selected} />*/}
                    </div>
                    <div className="caption" style={{padding: 2}}>
                        <h5 className="media-heading media-title" style={{fontSize: 10, height: 10}}>{line1(data)}</h5>
                    </div>
                </Component>
            </Col>
        )
    }
});

module.exports = MediaElementSmall;
