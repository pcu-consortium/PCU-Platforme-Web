import vis from './vis';

var VocabModule = function(){
    var rootDiv = null;
    var nodes = null;
    var edges = null;
    var network = null;
    var STORM_URL = 'http://storm.armadillo.fr:80/api/v1/vocabs';

    var allNodes = {};
    var allEdges = {};

    var callback;
    var nextId = 1;

    var setApi = function(api){
        STORM_URL = api + '/vocabs';
    };

    function getApi(){
        return STORM_URL;
    }

    var getCanvas = function(){
        return $(rootDiv).find("canvas")[0];
    };

    var languageFor = function(lang){
        switch(lang){
            case 'fra': return 'Français';
            case 'eng':
            case 'ang': return 'Anglais';
            case 'ara': return 'Arabe';
            default: return lang;
        }
    };

    var colorOf = function(lang){
        switch(lang){
            case "fra": return "#F88";
            case "eng": return "#8F8";
            case "ara": return "#88F";
            default: return "#97C2FC";
        }
    };

    var registerCallback = function(cb){
        callback = cb;
    };

    var notifyChange = function(){
        if (callback && callback.onChange){
            callback.onChange();
        }
    };

    var notifySelect = function(id){
        if (callback && callback.onSelect){
            callback.onSelect(id);
        }
    };

    var requestAddNode = function(node){
        if (callback && callback.onAddNode){
            callback.onAddNode(node);
        }
    };

    var requestAddEdge = function(data){
        if (callback && callback.onAddEdge){
            callback.onAddEdge(data);
        }
    };

    var getNodes = function(){
        return allNodes;
    };

    var getNode = function(id){
        var n = allNodes[id];
        if (n.data){
            return n.data;
        } else {
            return {
                'metadatas': {
                    'id': n.node.id,
                    'term': n.node.label
                }
            }
        }
    };

    var fetchExtraNodeInner;

    var fetchExtraNode = function(id){
        if (fetchExtraNodeInner){
            fetchExtraNodeInner(id);
        }
    };

    var redraw = function(){
        if(network){
            network.redraw();
        }
    };

    var getPos = function(id){
        // return undefined;
        return network ? network.getPositions(id)[id] : undefined;
    };

    var addNode = function(node, data, pos){
        var color = !data ? undefined : {
            background: colorOf(data.metadatas.language),
            border: "#555"
            // border: "#2B7CE9"
        };
        if (!(node.id in allNodes)){
            // console.log('nodename', node.label);
            node.group = data ? 'local' : 'remote';
            node.color = color;
            if (!pos && network){
                pos = network.getCenterCoordinates();
            }
            if (pos){
                node.x = pos.x;
                node.y = pos.y;
                node.allowedToMoveX = true;
                node.allowedToMoveY = true;
            }
            nodes.add(node);
            allNodes[node.id] = { node, data };
        } else if(data){
            node = allNodes[node.id].node;
            node.group = 'local';
            node.color = color;
            var pos = getPos(node.id);
            if (pos){
                node.x = pos.x;
                node.y = pos.y;
                node.allowedToMoveX = true;
                node.allowedToMoveY = true;
            }
            nodes.update(node);
            allNodes[node.id].data = data;
        }
    };

    var addEdge = function(rel){
        var hash = JSON.stringify(rel);
        if (hash in allEdges){
            return;
        }
        // console.log('relname', rel.name);
        var edge = {
            from: rel.docsource,
            to: rel.doccible,
            label: rel.name,
            labelAlignment: 'line-above',
            style: (rel.type == 'bidirectionelle' ? 'line' : 'arrow')
        };
        // if (rel.name.toLowerCase() == "traduction de"){
        //   edge.length = 40;
        //   edge.style = 'dash-line';
        // }
        edges.add(edge);
        // if (rel.type == 'bidirectionelle'){
        //   edges.add({
        //     from: rel.doccible,
        //     to: rel.docsource,
        //     label: rel.name,
        //     style: 'arrow',
        //   });
        // }
        allEdges[hash] = true;
    };


    function draw(div, rootVocab) {
        rootDiv = div;
        nodes = new vis.DataSet();
        edges = new vis.DataSet();

        // setTimeout(function(){
        //   nodes.add({
        //     id: 1,
        //     label: 'Greg'
        //   });
        //   edges.add({
        //     from: 1,
        //     to: 27563,
        //   })
        // }, 2000);


        var processNode = function(rootNode){
            addNode({
                id: rootNode.metadatas.id,
                label: rootNode.label
                // value: rootNode.relations.length,
            }, rootNode);
            notifyChange();

            rootNode.relations.forEach(function(rel){
                if (!rel.termcible || !rel.termsource){
                    return;
                }
                var node;
                if (rel.docsource == rootNode.metadatas.id){
                    node = {
                        id: rel.doccible,
                        label: rel.termcible
                    }
                } else {
                    node = {
                        id: rel.docsource,
                        label: rel.termsource
                    }
                }
                node.group = 'remote';
                // node.value = 1,
                addEdge(rel);
                addNode(node, undefined, getPos(rootNode.metadatas.id));
            })
        };

        processNode(rootVocab);
        notifySelect(rootVocab.metadatas.id);

        var fetch = function(node){
            console.log('fetch', node, allNodes[node]);
            if (allNodes[node] && allNodes[node].data){
                return;
            }
            // console.log("fetch url", STORM_URL + '/' + node);
            $.ajax({
                dataType: "json",
                url: STORM_URL + '/' + node,
                // data: un,
                success: function( data ) {
                    if (data && data.metadatas){
                        data.metadatas.id = node;
                    }
                    processNode(data);
                }
            });
        };
        fetchExtraNodeInner = fetch;

        // create a network
        var container = div;
        var data = { nodes, edges };
        var options = {
            // width: '100%',
            stabilize: true,
            dataManipulation: {
                enabled: true,
                initiallyVisible: true
            },
            nodes: {
                fontSize: 12
            },
            physics: {
                barnesHut: {
                    enabled: true,
                    gravitationalConstant: -2000,
                    centralGravity: 0.1,
                    springLength: 80, // 95
                    springConstant: 0.04,
                    damping: 0.12 //0.09
                }
            },
            edges: {
                fontSize: 10,
                fontFill: 'transparent'
            },
            locales: {
                // create a new locale (text strings should be replaced with localized strings)
                fr: {
                    edit: 'Editer',
                    del: 'Supprimer',
                    back: 'Retour',
                    addNode: 'Ajouter un terme',
                    addEdge: 'Ajouter une relation',
                    // editNode: 'Edit Node',
                    editEdge: 'Editer une relation',
                    addDescription: 'Cliquez pour ajouter un terme',
                    edgeDescription: 'Reliez deux termes pour ajouter une relation',
                    editEdgeDescription: 'Changez la source ou la cible de la relation'
                    // createEdgeError: 'Cannot link edges to a cluster.',
                    // deleteClusterError: 'Clusters cannot be deleted.'
                }
            },

            // use the new locale
            locale: 'fr',

            groups: {
                local: {
                    shape: 'ellipse',
                    color: {
                        border: "#555" ,
                        background: "#97C2FC",
                        highlight: {
                            border: "#555",
                            background: "#D2E5FF"
                        }
                    }
                },
                remote: {
                    shape: 'dot',
                    // shape: 'circle',
                    color: {
                        border: "#555" ,
                        background: "#CCC",
                        highlight: {
                            border: "#555",
                            background: "#CCC"
                        }
                    }
                    // fontColor: 'red',
                    // fontSize: 18
                }
                // add more groups here
            },
            onAdd: function(node,callback) {
                node.id = nextId++; //idInput.value;
                node.label = "Nouveau noeud"; //labelInput.value;
                requestAddNode(node);
            },
            // onEdit: function(data,callback) {
            //   var span = document.getElementById('operation');
            //   var idInput = document.getElementById('node-id');
            //   var labelInput = document.getElementById('node-label');
            //   var saveButton = document.getElementById('saveButton');
            //   var cancelButton = document.getElementById('cancelButton');
            //   var div = document.getElementById('network-popUp');
            //   span.innerHTML = "Edit Node";
            //   idInput.value = data.id;
            //   labelInput.value = data.label;
            //   saveButton.onclick = saveData.bind(this,data,callback);
            //   cancelButton.onclick = clearPopUp.bind();
            //   div.style.display = 'block';
            // },
            onConnect: function(data,callback) {
                console.log('connect');
                if (data.from == data.to) {

                    // var r=confirm("Do you want to connect the node to itself?");
                    // if (r==true) {
                    //   callback(data);
                    // }
                }
                else {
                    // callback(data);
                    requestAddEdge(data);
                }
            }
        };
        network = new vis.Network(container, data, options);

        // setTimeout(function(){
        //   console.log("TEST CONNECTION");
        //   network.freezeSimulation(true);
        //   network._unselectAll();
        //   network.forceAppendSelection = false;
        //   network.blockConnectingEdgeSelection = true;

        //   network._handleTouch = network._handleConnect;
        //   network._manipulationReleaseOverload = function () {};
        //   network._handleOnHold    = function () {};
        //   network._handleDragStart = function () {};
        //   network.editMode = true;
        //   network._handleDragEnd   = function(evt){
        //     console.log(evt);
        //     network._finishConnect(evt);
        //   }
        //   network.redraw();
        // }, 1000);

        // add event listeners
        network.on('select', function(params) {
            console.log('select', params);
            if (params.nodes.length){
                notifySelect(params.nodes[0]);
            }
            // document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
            // console.log(params.nodes);
            // params.nodes.forEach(function(node){
            //   // Fetch data...
            //   if (!allNodes[node].data){
            //     fetch(node);
            //   }
            // });
        });

        network.on('click', function(params) {
            console.log('click', params);
            params.nodes.forEach(function(node){
                // Fetch data...
                if (!allNodes[node].data){
                    fetch(node);
                }
            });
        });

        network.on('doubleClick', function(params){
            console.log('doubleclick', params.nodes);
            params.nodes.forEach(function(node){
                // Fetch data for all nodes and subnodes...
                fetch(node);
                if (allNodes[node].data){
                    var relations = allNodes[node].data.relations;
                    if (relations){
                        relations.forEach(function(rel){
                            if (rel.docsource != node){
                                if (rel.termsource) fetch(rel.docsource)
                            } else {
                                if (rel.termcible) fetch(rel.doccible)
                            }
                        });
                    }
                }
            });
        });

        network.on("resize", function(params) {
            console.log('resize', params.width,params.height);
            // network.redraw();
        });
        window.addEventListener("resize", function(){
            network.redraw();
        });
    }
    return {
        draw, notifyChange, redraw, getCanvas,
        addNode, addEdge, registerCallback, fetchExtraNode,
        getNode, getNodes,
        colorOf, languageFor,
        setApi, getApi
    }
};

var VocabModuleMixin = {
    getVocabModule(){
        if (this.props.vocabModule){
            return this.props.vocabModule;
        }
        if (!this.vocabModule){
            this.vocabModule = VocabModule();
        }
        return this.vocabModule;
    },

    resetVocabModule(){
        if (!this.props.vocabModule){
            this.vocabModule = VocabModule();
        }
    }
};


var VocabGraph = React.createClass({
    mixins: [VocabModuleMixin],

    init(){
        const { vocab, api, onVocabSelect, onChange, onAddNode, onAddEdge } = this.props;
        var vocabModule = this.getVocabModule();
        if (api) vocabModule.setApi(api);
        vocabModule.registerCallback({
            onSelect: onVocabSelect,
            onChange: onChange,
            onAddNode: onAddNode,
            onAddEdge: onAddEdge
        });
        vocabModule.draw(this.refs.network, vocab);
    },

    componentDidMount: function () {
        this.init();
    },

    componentWillUpdate: function (nextProps, nextState) {
        return false;
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (!this.constructor.vis){
            return; // Not yet loaded...
        }
        if (prevProps.vocab !== this.props.vocab){
            this.resetVocabModule();
            this.init();
        } else {
            this.getVocabModule().redraw();
        }
    },

    render: function(){
        var style = {
            width: '100%',
            //height: '100%',
            height: '550px',
            minHeight: '550px'
        };

        return <div className={'vocab-graph ' + (this.props.fullSize ? 'fullsize' : '')} ref="network" style={style}></div>
    }
});

var VocabInfo = React.createClass({
    getInitialState: function () {
        return {
            'tab': 'metadata'
        };
    },

    onSelectTab: function(tabId, e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            'tab': tabId
        })
    },

    // toggleEditable: function(){
    //   if (this.state.editable){
    //     // Save !
    //     DocumentStore.notifyCallback();
    //   }
    //   var editables = $(this.getDOMNode()).find(".editable").editable('option', 'disabled', this.state.editable);
    //   this.setState({
    //     'editable': !this.state.editable,
    //   })
    // },


    render: function(){
        if (!this.props.vocab){
            return <div><h3>Metadatas</h3></div>
        }
        var vocab = this.props.vocab.metadatas;
        var tabs = [
            {id: 'metadata',    label: 'Information'},
            {id: 'sources',     label: 'Sources scientifiques'},
            {id: 'definitions', label: 'Définitions'},
            {id: 'relations',   label: 'Relations'},
            {id: 'linguistic',  label: 'Linguistique'}
        ];
        // <ul className="nav nav-tabs" role="tablist">{tabs.map(this.renderTab)}</ul>
        return (
            <div style={{padding: '8px'}}>
                <div style={{paddingRight: '8px', float: 'right'}}>
                    {this.renderLink('vocab.php?docid=' + this.props.vocab.metadatas.id, 'link', 'lien')} {this.renderRDFLink('owl')} {this.renderRDFLink('skos')}</div>
                <h3 style={{textTransform: 'uppercase'}}>{this.props.vocab.metadatas.term}</h3>
                <div style={{marginBottom: '12px', padding: '8px'}}>
                    {tabs.map(this.renderTab)}
                </div>
                <div >
                    {this.renderInformation()}
                </div>
            </div>
        );
        // <div className='shareaholic-canvas' data-app='share_buttons' data-app-id='16197929'></div>
    },

    renderLink: function(href, glyph, txt){
        return <a href={href} target="_blank" style={{paddingLeft: '8px'}}><Glyphicon glyph={glyph} /> {txt}</a>
    },


    renderRDFLink: function(format){
        var baseUrl = 'http://storm.armadillo.fr:80/api/v1/vocabs/';
        return this.renderLink(baseUrl + this.props.vocab.metadatas.id + '?format=' + format, 'download-alt', format);
    },

    renderInformation: function(){
        switch(this.state.tab){
            case 'metadata': return this.renderMetadata();
            case 'sources':  return this.renderSources();
            case 'definitions': return this.renderDefinitions();
            case 'relations': return this.renderRelations();
            case 'linguistic': return this.renderLinguistic();
            default: return undefined;
        }
    },

    renderTab: function(tab){
        var active = tab.id == this.state.tab;
        // <li role="presentation" className={active ? "active" : ""} style={{fontWeight: '200'}}>
        //     <a href="#" aria-controls={tab.id} role="tab" onClick={this.onSelectTab.bind(this, tab.id)}>{tab.label}</a>
        //   </li>
        return (
            <a className={'metadata-tab ' + (active ? 'active': '')} href="#" aria-controls={tab.id} role="tab" onClick={this.onSelectTab.bind(this, tab.id)}>{tab.label}</a>
        )
    },

    renderMetadata: function(){
        var fields = [
            {id: 'id',                  type: 'text', label: 'Id'},
            {id: 'term',                type: 'text', label: 'Terme'},
            {id: 'domain',              type: 'text', label: 'Domaine'},
            {id: 'definition',          type: 'text', label: 'Définition'},
            {id: 'uri',                 type: 'url',  label: 'URI'},
            {id: 'language',            type: 'lang', label: 'Langue'},
            {id: 'comment',             type: 'text', label: 'Commentaire'},
            {id: 'type',                type: 'text', label: 'Type'},
            {id: 'author',              type: 'text', label: 'Author'},
            {id: 'creation',            type: 'text', label: 'Date de création'},
            {id: 'datemodification',    type: 'text', label: 'Date de modification'}
        ];
        return (
            <div className="metadata-card">
                <table className="table table-condensed table-striped table-info" style={{clear: 'both'}}>
                    <tbody>
                    {fields.map(this.renderAttr)}
                    </tbody>
                </table>
            </div>
        )
    },

    renderLinguistic: function(){
        return this.renderCard(this.props.vocab.metadatas, [
            {id: 'type',                type: 'text', label: 'Type'},
            {id: 'gender',              type: 'text', label: 'Genre'},
            {id: 'plural',              type: 'text', label: 'Pluriel'}
        ], {ignoreEmpty: true});
    },

    renderAttr: function(entry){
        return this.renderLine(entry, this.props.vocab.metadatas[entry.id])
    },

    renderLine: function(entry, value, options){
        var vocabModule = this.props.vocabModule;
        var options = options || {};
        if (options.ignoreEmpty && !value){
            return undefined;
        }
        var label = entry.label;
        var valueFor = function(type, value){
            switch(type){
                case 'url':   return <a href={value} target="_blank">{value}</a>;
                case 'lang':  return vocabModule.languageFor(value);
                case 'text':  return value;
                default:      return value;
            }
        };
        return (
            <tr key={entry.id}>
                <td className="field-name">{label}</td>
                <td className="field-value">{valueFor(entry.type, value)}</td>
            </tr>
        )
    },

    renderCard: function(data, fields, options){
        return (
            <div className="metadata-card">
                <table className="table table-condensed table-striped table-info" style={{clear: 'both', marginBottom: '0px'}}>
                    <tbody>
                    {
                        fields.map(function(f){
                            return this.renderLine(f, data[f.id], options);
                        }.bind(this))
                    }
                    </tbody>
                </table>
            </div>
        )
    },

    renderList: function(list, fields){
        return (
            <div>
                {list && list.length > 0
                    ? list.map(function(s){
                    return this.renderCard(s.metadatas, fields);
                }.bind(this))
                    : "Aucune source"
                }
            </div>
        )
    },

    renderSources: function(){
        return this.renderList(this.props.vocab.sources, [
            {id: 'nom',     type: 'text', label: 'Nom'},
            {id: 'titre',   type: 'text', label: 'Titre'},
            {id: 'url',     type: 'url',  label: 'URL'}
        ]);
    },

    renderDefinitions: function(){
        return this.renderList(this.props.vocab.references, [
            {id: 'titre',   type: 'text', label: 'Titre'},
            {id: 'url',     type: 'url',  label: 'URL'}
        ]);
    },

    renderRelations: function(){
        var vocab = this.props.vocab;
        // var cellStyle = {
        //   display: 'table-cell',
        //   paddingRight: '1em',
        // }
        // <span style={cellStyle}>{rel.termsource}</span>
        // <span style={cellStyle}>{rel.name}</span>
        // <span style={cellStyle}>{rel.termcible}</span>
        var renderWord = function(id, word){
            console.log(vocab.id, id);
            if (vocab.metadatas.id != id){
                return <a href={'vocab.php?docid=' + id}>{word}</a>
            } else {
                return word;
            }
        };
        return (
            <div>
                {vocab.relations && vocab.relations.length > 0
                    ? vocab.relations.map(function(rel){
                    return (
                        <div className="metadata-card">
                            {renderWord(rel.docsource, rel.termsource)} <span style={{fontStyle: 'italic', padding: '0em 0.5em 0em 0.5em'}}>{rel.name}</span> {renderWord(rel.doccible, rel.termcible)}
                        </div>
                    )
                }.bind(this))
                    : "Aucune relation"
                }
            </div>
        )
    }
});

var VocabSearchToolbar = React.createClass({

    getInitialState: function () {
        return {
            input: '',
            suggestions: [],
            suggestionSearch: '',
            pendingSuggestion: false
        };
    },

    checkSuggestions: function(value){
        var vocabModule = this.props.vocabModule;
        if ((value != this.state.suggestionSearch) && !this.state.pendingSuggestion){
            if (!value || value == ''){
                this.setState({
                    suggestions: [],
                    suggestionSearch: '',
                    pendingSuggestion: false
                });
                return;
            }
            this.setState({pendingSuggestion: true});
            console.log(this.props);
            // var url = vocabModule.getApi() + '/autocomplete?q=' + value;
            var url = 'http://storm.armadillo.fr:80/api/v1/Query?tbname=VOCABULAIRE&limit=10&q=' + value + '*';
            //var url = baseUrl + '&q=' + value + '*';
            console.log(url);

            $.ajax({
                dataType: "json",
                url: url, //"rest/forward.php?url=" + encodeURIComponent(url),
                // data: un,
                success: function( data ) {
                    // Check if still a valid search...
                    console.log(value, data);
                    if (data.length > 0 && data[0].hasOwnProperty("'empty'")){
                        console.log('EMPTY !');
                        this.setState({pendingSuggestion: false, suggestions: []});
                        this.checkSuggestions(this.state.input);
                        return;
                    }
                    var suggestions = data.map(function(doc){
                        return {
                            id: doc.docid,
                            lang: vocabModule.languageFor(doc.language),
                            domain: vocabModule.languageFor(doc.domain),
                            value: doc.term
                        }
                    });
                    this.setState({
                        pendingSuggestion: false,
                        suggestions: suggestions,
                        suggestionSearch: value
                    });
                    this.checkSuggestions(this.state.input);
                }.bind(this),
                error: function(){
                    this.setState({pendingSuggestion: false, suggestions: []});
                    // this.checkSuggestions(this.state.input);
                }.bind(this)
            });
        }
    },

    inputSubmit: function(){
        this.props.search(this.state.input);
    },

    formSubmit: function(e){
        e.preventDefault();
        e.stopPropagation();
        this.inputSubmit();
    },

    onChange: function(e){
        var value = this.refs.search.value;
        // console.log(value);
        this.setState({
            'input': value
        });
        this.checkSuggestions(value);
    },

    // computeSuggestions: function(value){
    //   return [
    //     {id: '27563', category: 'cat', value: value},
    //     {id: '27564', category: 'cat', value: value},
    //     {id: '27565', category: 'cat', value: value},
    //     {id: '27566', category: 'cat', value: value},
    //     {id: '27567', category: 'cat', value: value},
    //   ]
    // },

    onClick: function(sug){
        const { onGotoVocab } = this.props;
        console.log(sug);
        if (onGotoVocab){
            onGotoVocab(sug);
        }
        // window.location.href = 'vocab.php?docid=' + sug.id;
    },

    onAdd: function(sug){
        console.log('add', sug);
        if (this.props.addNode){
            this.props.addNode(sug.id);
            this.setState({input: ''});
        } else {
            console.warn('Missing props.addNode', this.props);
        }
    },

    render: function(){
        var suggestions = this.state.suggestions;
        // var suggestions = this.computeSuggestions(this.state.input);
        // console.log(suggestions);
        // <li role="presentation"><a role="menuitem" tabindex="-1" href="#">mosque</a></li>
        // <li role="presentation"><a role="menuitem" tabindex="-1" href="#">mosquée</a></li>
        // <li role="presentation" className="divider"></li>
        return (
            <ButtonToolbar style={{position: 'relative'}}>
                <div className={'dropdown ' + (this.state.input.length > 0 ? 'open' : '')}>
                    <form onSubmit={this.formSubmit}>
                        <div className="input-group" style={{maxWidth: '400px', width: '100%'}}>
              <span className="input-group-btn">
                <Button glyph='search' handleClick={this.inputSubmit}/>
              </span>
                            <input ref='search' type="text" className="form-control" onChange={this.onChange}
                                   placeholder="Rechercher" value={this.state.input} />
                        </div>
                    </form>
                    {suggestions.length == 0
                        ? undefined
                        : <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"
                              style={{width: '100%', maxHeight: '320px', overflowY: 'scroll', position: 'inherit'}}>
                        {suggestions.map(this.renderSuggestion)}
                    </ul>
                    }
                </div>
            </ButtonToolbar>
        )
    },

    renderNoSuggestion: function(){
        return (
            <li role="presentation">
                <a role="menuitem" tabindex="-1" href="#">
                    No result
                </a>
            </li>
        )
    },

    renderSuggestion: function(s){
        return (
            <li key={s.id} role="presentation">
                <a role="menuitem" tabindex="-1" href="#" onClick={this.onClick.bind(this, s)} >
                    <div style={{float: 'right'}}>
                        <Button glyph="plus" bsClass="btn btn-xs" handleClick={this.onAdd.bind(this, s)}/>
                    </div>
                    <div style={{position: 'relative', fontSize: '10px', color: '#AAA', textTransform: 'uppercase', marginRight: '48px'}}>
                        <span style={{float: 'right'}}>{s.domain}</span>
                        <span>{s.lang}</span>
                    </div>
                    {this.props.addNode
                        ? <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {s.value}
                    </div>
                        : undefined
                    }
                </a>
            </li>
        )
    }
});

var VocabToolbar = React.createClass({
    render: function(){
        return (
            <div className="toolbar clearfix" style={{height: '50px'}}>
                <div className="pull-left" style={{marginLeft: "16px"}}>
                    <VocabSearchToolbar {...this.props} />
                </div>
                <div className="pull-right">
                    {
                        this.props.toggleInfo
                            ? <Button glyph="info-sign" bsStyle="link" bsSize="lg"
                                      style={{opacity: this.props.showInfo ? 1 : 0.5, color: '#921a22'}}
                                      handleClick={this.props.toggleInfo} />
                            : undefined
                    }
                </div>
            </div>
        )
    }
});

var TermModal = React.createClass({

    getInitialState: function () {
        return {
            inputs: {},
            visible: false
        };
    },

    onInputChange: function(id, e){
        var value = this.refs['input_' + id].value;
        var inputs = this.state.inputs;
        inputs[id] = value;
        this.setState({ 'inputs': inputs });
    },

    onCancel: function(){
        this.props.cancel(this.state.inputs);
    },

    onValidate: function(){
        console.log(this.state.inputs);
        this.props.validate(this.state.inputs);
    },

    componentWillUpdate: function (nextProps, nextState) {
        if (this.props.show != nextProps.show){
            if (nextProps.show){
                // Flush input...
                this.setState({
                    inputs: nextProps.values ? JSON.parse(JSON.stringify(nextProps.values)) : {},
                    visible: true
                });
            } else {
                setTimeout(function(){
                    // Autoclear
                    if (this.state.visible && !this.props.show){
                        this.setState({visible: false});
                    }
                }.bind(this), 1000);
            }
        }
    },

    render: function(){
        var showClass = this.props.show ? 'in' : '';
        var backDropStyle = this.state.visible ? {bottom: '0px'} : {display: 'none'};
        var modalStyle = this.state.visible ? {display: 'block'} : {display: 'none'};

        var fields = [
            {id: 'id', label: 'Id', editable: false},
            {id: 'term', label: 'Terme', editable: true},
            {id: 'domain', label: 'Domaine', editable: true},
        ];

        return (
            <div>
                <div className={'modal-backdrop fade ' + showClass} ref="backdrop" style={backDropStyle} />
                <div className={"modal fade " + showClass} tabIndex="-1" role="dialog" aria-hidden="true" style={modalStyle}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="modal-title">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onValidate}>
                                    {fields.map(this.renderField)}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <Button bsStyle="default" handleClick={this.onCancel}>Annuler</Button>
                                <Button bsStyle="primary" handleClick={this.onValidate}>Ajouter</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    renderField: function(field){
        return (
            <div key={field.id} className="form-group form-inline">
                <label htmlFor="folder-name" className="control-label">{field.label}</label>
                <input ref={'input_' + field.id} type="text" className="form-control" disabled={!field.editable}
                       onChange={this.onInputChange.bind(null, field.id)} value={this.state.inputs[field.id]}/>
            </div>
        )
    }
});

var RelationModal = React.createClass({
    relations: [
        'Terme associé de',
        'Terme spécifique de',
        'Traduction de',
        'Translittération de'
    ],

    getInitialState: function () {
        return {
            relation: this.relations[0],
            visible: false
        };
    },

    onCancel: function(){
        this.props.cancel(this.state.inputs);
    },

    onValidate: function(){
        this.props.validate(this.state.relation);
    },

    onChange: function(type, value){
        this.setState({'relation': value});
    },

    componentWillUpdate: function (nextProps, nextState) {
        if (this.props.show != nextProps.show){
            if (nextProps.show){
                // Flush input...
                this.setState({
                    visible: true,
                });
            } else {
                setTimeout(function(){
                    // Autoclear
                    if (this.state.visible && !this.props.show){
                        this.setState({visible: false});
                    }
                }.bind(this), 1000);
            }
        }
    },

    render: function(){
        var showClass = this.props.show ? 'in' : '';
        var backDropStyle = this.state.visible ? {bottom: '0px'} : {display: 'none'};
        var modalStyle = this.state.visible ? {display: 'block'} : {display: 'none'};
        return (
            <div>
                <div className={'modal-backdrop fade ' + showClass} ref="backdrop" style={backDropStyle} />
                <div className={"modal fade " + showClass} tabIndex="-1" role="dialog" aria-hidden="true" style={modalStyle}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="modal-title">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                {this.props.from} <Selector type='relation' onChange={this.onChange} values={this.relations} defaultValue={this.state.relation}/> {this.props.to}
                            </div>
                            <div className="modal-footer">
                                <Button bsStyle="default" handleClick={this.onCancel}>Annuler</Button>
                                <Button bsStyle="primary" handleClick={this.onValidate}>Ajouter</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


// TODO : require api in props
var VocabApp = React.createClass({
    mixins: [VocabModuleMixin],

    getInitialState: function () {
        return {
            'vocabId': undefined,
            'vocab': undefined,
            'showInfo': true,
            'showCreateTerm': false,
            'newTerm': undefined,
            'showCreateRelation': false,
            'newRelation': undefined
        };
    },

    componentWillUpdate(nextProps, nextState){
        if (nextProps.rootVocab != this.props.rootVocab){
            this.resetVocabModule();
        }
    },

    setVocabId(id){
        if (!this.isMounted()){
            return;
        }
        this.setState({
            vocabId: id,
            vocab: this.getVocabModule().getNode(id)
        })
    },

    onChange: function(){
        if (this.state.vocabId){
            this.setVocabId(this.state.vocabId);
        }
    },

    search: function(value){
        window.location.href = 'vocab.php?q=' + value;
    },

    addNode: function(id){
        console.log('add', id);
        this.getVocabModule().fetchExtraNode(id);
    },

    toggleInfo: function(){
        this.setState({showInfo: !this.state.showInfo});
    },

    closeTerm: function(){
        this.setState({'showCreateTerm': false});
    },

    createTerm: function(info){
        this.setState({'showCreateTerm': false});
        var node = this.state.newTerm;
        var today = new Date();
        function pad2(v){
            if (v < 10) return '0' + v;
            return v;
        }
        var now = pad2(today.getDate()) + '/' + pad2(today.getMonth()+1) + '/' +  today.getFullYear();
        var metadata = {
            domain: info.domain,
            id: node.id,
            creation: now,
            term: info.term
        };
        var doc = {metadatas: metadata, relations: [], sources: [], references: []};
        node.label = info.term;
        this.getVocabModule().addNode(node, doc, {x: node.x, y: node.y});
    },

    closeRelation: function(){
        this.setState({'showCreateRelation': false});
    },

    createRelation: function(info){
        var vocabModule = this.getVocabModule();
        console.log('create relation', info);
        this.setState({'showCreateRelation': false});
        var rel = this.state.newRelation;
        var relFrom = vocabModule.getNode(rel.from);
        var relTo   = vocabModule.getNode(rel.to);
        var relation = {
            name: info,
            type: (info == 'Terme spécifique de') ? null : 'bidirectionelle',
            docsource: rel.from,
            termsource: relFrom.metadatas.term,
            doccible: rel.to,
            termcible: relTo.metadatas.term
        };
        if (relFrom.relations){
            relFrom.relations.push(relation);
        }
        if (relTo.relations){
            relTo.relations.push(relation);
        }
        vocabModule.addEdge(relation);
    },

    onAddNode: function(node){
        console.log('Add', node);
        this.setState({
            showCreateTerm: true,
            newTerm: node
        })
    },

    onAddEdge: function(data){
        console.log('Add edge', data);
        this.setState({
            showCreateRelation: true,
            newRelation: data
        })
    },

    downloadCanvas: function(){
        var canvas = this.getVocabModule().getCanvas();
        console.log(canvas);
        window.open(canvas.toDataURL(), '_blank');
    },

    render: function(){
        const { api, onGotoVocab } = this.props;
        var vocabModule = this.getVocabModule();
        var langs = [
            {id: 'fra', label: 'Français'},
            {id: 'eng', label: 'Anglais'},
            {id: 'ara', label: 'Arabe'},
            {id: 'other', label: 'Autre'}
        ];
        var showInfo = this.state.showInfo;
        if (!this.props.rootVocab){
            var error = "ERROR : terme '" + this.props.term + "' non trouvé...";
            return (
                <div>
                    <VocabToolbar search={this.search} vocabModule={vocabModule} api={this.props.api} onGotoVocabId={onGotoVocab} />
                    <div style={{padding: '8px'}}>
                        <div className="alert alert-danger" role="alert">{error}</div>
                    </div>
                </div>
            )
        }
        var relFrom, relTo;
        if (this.state.newRelation){
            var rel = this.state.newRelation;
            relFrom = vocabModule.getNode(rel.from).metadatas.term;
            relTo   = vocabModule.getNode(rel.to).metadatas.term;
            console.log(rel, relFrom, relTo);
        }
        var vocabGraphKey;
        if (this.props.rootVocab){
            vocabGraphKey = this.props.rootVocab.uri;
        }
        return (
            <div>
                <VocabToolbar search={this.search} vocabModule={vocabModule} addNode={this.addNode} toggleInfo={this.toggleInfo} showInfo={showInfo} onGotoVocabId={onGotoVocab} />
                <div style={{position: 'relative'}}>
                    <SplitPane leftWidth={showInfo ? '50%' : '100%'}>
                        <div style={{position: 'relative'}}>
                            <VocabGraph key={vocabGraphKey} onVocabSelect={this.setVocabId} onChange={this.onChange}
                                        api={api}
                                        onAddNode={this.onAddNode} onAddEdge={this.onAddEdge}
                                        vocab={this.props.rootVocab} fullSize={!showInfo}
                                        vocabModule={vocabModule} />
                            <div className="graph-overlay" style={{padding: '0px'}}>
                                <Button glyph="download-alt" bsStyle="link" handleClick={this.downloadCanvas}>Télécharger</Button>
                            </div>
                            <div className="graph-overlay" style={{right: '0px', left: 'inherit'}}>
                                <h5 style={{marginTop: '0px', marginBottom: '4px'}}>Legende</h5>
                                {langs.map(function(lang){
                                    var color = vocabModule.colorOf(lang.id);
                                    return (
                                        <div style={{padding: "2px"}}>
                                            <span style={{border: "9px solid " + color, display:"table-cell", margin: "4px"}}></span>
                                            <span style={{display:"table-cell", paddingLeft: "4px"}}>{lang.label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <VocabInfo vocab={this.state.vocab} vocabModule={vocabModule} />
                    </SplitPane>
                    {/*<div className="fill-parent">
                     <div className={"left-pane " + (!showInfo ? 'fullsize' : '')} style={leftStyle}>

                     </div>
                     <div className="right-pane" style={{padding: '8px', display: showInfo ? undefined : 'none'}}>
                     <VocabInfo vocab={this.state.vocab} />
                     </div>
                     </div>*/}
                </div>
                <TermModal title="Nouveau terme" values={this.state.newTerm} show={this.state.showCreateTerm} cancel={this.closeTerm} validate={this.createTerm}/>
                <RelationModal title="Nouvelle relation" from={relFrom} to={relTo}
                               show={this.state.showCreateRelation} cancel={this.closeRelation} validate={this.createRelation}/>
            </div>
        );
    }
});

module.exports = {
    VocabGraph,
    VocabApp
};