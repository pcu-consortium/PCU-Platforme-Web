
import { line1, line2, line3, imageUrl, defaultImageUrl } from './media-info';
import SquareImage from 'components/image/square-image';

var MediaElementList = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],
    //mixins: [/*MediaMixin, */Router.State, Router.Navigation],

    handleSelect(){
        const { data, onSelect } = this.props;
        if (onSelect) onSelect(data);
    },

    render(){
        var { data, href } = this.props;
        const img = imageUrl(data);
        const defaultImg = defaultImageUrl(data);
        var classes = "list-item thumbnail " + (this.props.selected ? "selected" : "");
        var useHighlight = true;
        let Component = href ? 'a' : 'div';
        return (
            <Col md={12}>
                <Component className={classes} href={href} onClick={href ? undefined : this.handleSelect}>
                    <div className="media-left" style={{width: "74px", minWidth: "74px", height: "74px", "boxSizing": "content-box"}}>
                        <SquareImage src={img} defaultSrc={defaultImg} width="74px" />
                    </div>
                    <div className="media-body" style={{display: 'table-cell', width: '100%'}}>
                        <h4 className="media-heading media-title single-line">{line1(data)}</h4>
                        {useHighlight
                            ? this.renderHighlight()
                            : [<p className="media-line-2 single-line">{this.renderTags()}</p>,
                            <p className="media-line-3 single-line">{this.renderAuthors()}</p>]
                        }
                    </div>
                </Component>
            </Col>
        )
    },

    renderDate(){
        var date = this.props.data.realisation_date;
        if (!date){
            return date;
        }
        return date.split("T")[0];
    },

    renderHighlight(){
        var highlight = this.props.highlight;
        var highlights = [];
        if (highlight){
            for(var key in highlight){
                if (highlight.hasOwnProperty(key)){
                    highlights.push(highlight[key]);
                }
            }
        }
        if (highlights.length === 0){
            return [
                <p key="authors" className="media-line-2 single-line">{this.renderAuthors()}</p>,
                <p key="tags" className="media-line-3 single-line">{this.renderTags()}</p>
            ]
        }
        var spans = [];
        var prev = "";
        highlights.forEach(hs => {
            hs.forEach(h => {
                // Manually deduplicate
                //console.log(h, prev);
                if (h !== prev){
                    spans.push(this.cleanHighlight(h))
                    prev = h;
                }
            })
        });
        //var spans = highlights.map((h, idx) => <span key={idx} dangerouslySetInnerHTML={{__html:h}}/>);
        var withDots = [];
        withDots.push(spans[0]);
        for(var i=1; i<Math.min(5, spans.length); i++){
            withDots.push(" ... ");
            withDots.push(spans[i]);
        }
        return [
            <p key="authors" className="media-line-2 single-line">{this.renderAuthors()}</p>,
            <p key="matches" className="media-line-3 single-line">{withDots}</p>
        ]
    },

    cleanHighlight(highlighted){
        var regex = /(((?!(<strong>)).)*)<strong>([^<]*)<\/strong>/;
        var result = [];
        var cleaner = function(txt){
            // Find tags, half-open and half-closed tags
            var regex = /((<([^>]+)>)|(^([^>]+)>)|(<([^>]+)$))/ig;
            return txt.replace(regex, "");
        };
        while(highlighted.length > 0){
            var matches = highlighted.match(regex, "g");
            if (!matches){
                result.push(cleaner(highlighted));
                highlighted = "";
            } else {
                result.push(cleaner(matches[1]));
                result.push(<strong>{matches[4]}</strong>);
                highlighted = highlighted.substring(matches[0].length);
            }
        }
        return result;
    },

    renderAuthors(){
        var { authors } = this.props.data;
        if (!authors){
            return line2(this.props.data);
            // return undefined;
        }
        return authors.join(", ");
    },

    renderTags(){
        // return this.props.data.legende;
        var defaultValue = line3(this.props.data);
        if (defaultValue) return defaultValue;
        var tags = this.props.data.tags || this.props.data.mc || [];
        var tagString = tags.map(tag => {
            return tag;
        }).join(", ");
        //if (tagString.length > 80){
        //    tagString = tagString.substring(0, 77) + "...";
        //}
        return tagString;
    }

    //renderFacetEntry(entry, idx, isSelected, info){
    //    var name = entry.key_as_string || entry.key;
    //    var url = "";
    //    var searchManager = this.props.searchManager;
    //    if (searchManager){
    //        url = searchManager.toggleFacetUrl(this.props.field, name);
    //    }
    //    var span;
    //    var className = "facet-entry-name";
    //    if (isSelected){
    //        className += " remove";
    //    }
    //    if (info.selected.length > 0) {
    //        var icon = isSelected ? "check-square-o" : "square-o";
    //        span = <FAIcon icon={icon}/>;
    //    }
    //    var onClick = e => {
    //        e.stopPropagation();
    //        e.preventDefault();
    //        searchManager.onToggleFacet(this.props.field, name);
    //    };
    //    return (
    //        <li key={idx} className="facet-entry">
    //            <a href={url} className={className} onClick={onClick}>{span} {name}</a>
    //            <span className="facet-entry-count">{entry.doc_count}</span>
    //        </li>
    //    );
    //}
});

module.exports = MediaElementList;
