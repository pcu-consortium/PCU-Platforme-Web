
import './media-element.css';
import { line1, line2, imageUrl, defaultImageUrl } from './media-info';
import SquareImage from 'components/image/square-image';

var MediaElementLarge = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],
    //mixins: [/*MediaMixin, */Router.State, Router.Navigation],

    handleSelect(){
        const { data, onSelect } = this.props;
        if (onSelect) onSelect(data);
    },

    render(){
        const { data, href } = this.props;
        const img = imageUrl(data);
        const defaultImg = defaultImageUrl(data);
        var classes = "thumbnail search-thumbnail" + (this.props.selected ? "selected" : "");
        let Component = href ? 'a' : 'div';
        return (
            <Col xs={6} sm={4} md={3} animate 
                 className="media-large" 
                 onClick={href ? undefined : this.handleSelect} 
                 style={{paddingLeft: 2, paddingRight: 2}}>
                <Component className={classes} href={href}>
                    <div style={{position: 'relative'}}>
                        <SquareImage src={img} defaultSrc={defaultImg} alignTop />
                        {/*<MediaCheckbox toggle={this.toggle} checked={this.props.selected} />*/}
                    </div>
                    <div className="caption" style={{padding: 4}}>
                        <h5 className="media-heading media-title">{line1(data)}</h5>
                        {/*<div className="single-line">{line2(data)}</div>*/}
                    </div>
                </Component>
            </Col>
        )
    }
});

module.exports = MediaElementLarge;
