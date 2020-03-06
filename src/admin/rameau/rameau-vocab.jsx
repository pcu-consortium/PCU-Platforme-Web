
import DocumentInfo from 'components/document/document-info';
import Helmet from 'react-helmet';


const conceptModel = {
    name: "Concept",
    fields: [
        {id: "id", label: "Id", type: "text"},
        {id: "prefLabel", label: "Label", type: "text"},
        {id: "altLabel", label: "Labels alternatifs", type: "text", multivalued: true},
        {id: "broader", label: "Plus général", type: "internal_link", multivalued: true},
        {id: "narrower", label: "Plus spécifique", type: "internal_link", multivalued: true},
        {id: "closeMatch", label: "Proche de", type: "internal_link", multivalued: true},
        {id: "related", label: "Associé à", type: "internal_link", multivalued: true},
        {id: "foaf:focus", label: "Focus", type: "internal_link", multivalued: true}
    ],
    tabs: [
        {id: 'info', label: 'Informations', fields: ["id", "prefLabel", "broader", "narrower", "closeMatch", "related", "altLabel", "foaf:focus"]}
    ]
};

const periodicModel = {
    name: "Periodic",
    fields: [
        {id: "id", label: "Id", type: "text"},
        {id: "bibo:issn", label: "ISSN", type: "text"},
        {id: "rdfs:label", label: "Label", type: "text"},
        {id: "dcterms:title", label: "Titre", type: "text"},
        {id: "altLabel", label: "Labels alternatifs", type: "text", multivalued: true},
        {id: "dcterms:description", label: "Description", type: "text", multivalued: true},
        {id: "dcterms:publisher", label: "Editeur", type: "text", multivalued: true},
        {id: "dcterms:frequency", label: "Fréquence", type: "text", multivalued: true},
        {id: "rdagroup1elements:placeOfPublication", label: "Lieu de publication", type: "text", multivalued: true},
        {id: "rdagroup1elements:note", label: "Notes", type: "text", multivalued: true}
    ],
    tabs: [
        {id: 'info', label: 'Informations', fields: [
            "id", "bibo:issn", "rdfs:label", "dcterms:title", "altLabel", "dcterms:description",
            "rdagroup1elements:placeOfPublication", "dcterms:frequency", "dcterms:publisher"
        ]}
    ]
};

var RameauVocab = React.createClass({
    mixins: [URLFetcher],

    getInitialState(){
        return {
            data: this.props.word
        }
    },

    componentDidMount(){
        const { type } = this.props;
        this.fetchUrl('/test/api/rameau/' + type + '/' + encodeURIComponent(this.state.data.id));
    },

    getModel(){
        var models = {
            concepts: conceptModel,
            periodics: periodicModel
        };
        return models[(this.state.data._type || this.props.type)];
    },

    render(){
        const { onClickLink } = this.props;
        const { data } = this.state;
        if (data == this.props.word) {
            return false; // Nothing for now...
        }
        const document = {
            ...data,
            title: data.prefLabel || data['rdfs:label'] || data.id
        };
        return (
            <div>
                <Helmet title={document.title} />
                <DocumentMeta {...metaData} />
                <DocumentInfo document={document} model={this.getModel()} ignoreEmpty onClickLink={onClickLink}/>
            </div>
        );
    }
});

module.exports = RameauVocab;
