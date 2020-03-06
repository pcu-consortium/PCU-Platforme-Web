
import { MediaElementList, MediaElementLarge, MediaElementSmall, MediaElementTable } from './media-element';

const STYLES = [
    {value: "large", icon: "th-large"},
    {value: "small", icon: "th"},
    {value: "list", icon: "list"},
    // {value: "table", icon: "table"},
];

var getMediaElement = function(style){
    switch(style){
        case "large": return MediaElementLarge;
        case "small": return MediaElementSmall;
        case "list": 
        default : return MediaElementList;
    }
};

/*
 * StyleSelector
 */
var StyleSelector = React.createClass({
    getDefaultProps(){
        return {
        }
    },

    render: function(){
        const { bsSize, styles=STYLES, selected, onChange, alignRight } = this.props;
        return (
            <ButtonGroup alignRight={alignRight}>
                {styles.map(({value, icon}) => <Button
                                    key={value}
                                    icon={icon}
                                    value={value}
                                    active={selected == value}
                                    handleClick={onChange} />
                )}
            </ButtonGroup>
        )
    }
});


var SearchResults = React.createClass({
    getDefaultProps(){
        return {
            viewMode: "list",
            hasMore: false,
            headless: false,
            results: []
        }
    },

    // getInitialState(){
    //     return {
    //         displayStyle: 'list'
    //     }
    // },

    handleStyleChange(displayStyle){
        this.props.onViewChange(displayStyle);
        // this.setState({displayStyle});
    },

    documentHeaderText(size){
        switch(size){
            case 0 : return "aucun résultat";
            case 1 : return "1 résultat";
            default: return size + " résultats";
        }
    },

    showDocument(doc){
        console.log('show document', doc);
        //this.refs.documentPane.showDocument(doc);
    },

    render(){
        // const { displayStyle } = this.state;
        const { results, viewMode, query, headless, searchLabel } = this.props;
        if (headless){
            return this.renderResults();
        }
        var forQuery = "";
        if (searchLabel || ((typeof searchLabel) === "string")){
            if (searchLabel && ((typeof searchLabel) === "string")) {
                forQuery = ` pour "${searchLabel}"`;
            }
        } else if (query && query.length > 0) {
            forQuery = ` pour "${query}"`;
        }
        return (
            <div key="results" className="fluid-container" style={{padding: 8}}>
                <div className="clearfix">
                    <StyleSelector selected={viewMode} alignRight onChange={this.handleStyleChange}/>
                    <h4 className="single-line">{this.documentHeaderText(results.total) + forQuery}</h4>
                </div>
                {this.renderResults()}
                {this.renderShowMore()}
            </div>
        );
    },

    renderResults(){
        switch(this.props.viewMode){
            case "table": return this.renderTableElements();
            case "small": case "large": return this.renderRowElements(13);
            default: return this.renderRowElements();
        }
    },

    renderRowElements(padding){
        var { results } = this.props;
        var style = {paddingLeft: padding, paddingRight: padding};
        return (
            <Row style={style}>
                {results.hits.map(this.renderElement)}
            </Row>
        ); 
    },

    renderElement(doc){
        const { urlMaker } = this.props;
        // Play with elasticsearch results... either _source for full document or fields.source[] for partials
        var document = doc._source || doc.fields.source[0];
        var MediaElement = getMediaElement(this.props.viewMode);
        return <MediaElement key={document.id} 
                             data={document} 
                             highlight={doc.highlight}
                             show={this.showDocument} 
                             href={urlMaker ? urlMaker(document) : undefined}
                             onSelect={this.props.onSelectDocument} />;
    },

    renderTableElements(){
        var documents = this.props.results.hits.map(hit => hit._source || hit.fields.source[0]);
        return <MediaElementTable documents={documents} onSelect={this.props.onSelectDocument} />;
    },  

    renderShowMore(){
        if (!this.props.hasMore){
            return undefined;
        }
        return <Button href="#" onClick={this.props.onShowMore} icon="plus" bsStyle="link">Afficher plus</Button>;
    }
});

module.exports = SearchResults;
