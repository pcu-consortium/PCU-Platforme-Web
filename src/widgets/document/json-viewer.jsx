

var JsonViewer = React.createClass({
    getInitialState(){
        return {
            errors: [],
            uuid: generateUUID() // To ensure unique IDs...
        }
    },

    getDefaultProps(){
        return {
            //height: '300px',
            wrapWord: true,
            minLines: 4,
            maxLines: 25,
            checkSyntax: true,
            mode: "ace/mode/json"
        }
    },

    getId(){
        return this.props.id || this.state.uuid;
    },

    setContent(content){
        //console.log('content', content);
        var type = typeof content;
        // Flush data to avoid ace crash...
        if (type === "string" || type === "boolean" || type === "number"){
            content = "";
        }
        if ((typeof content) === "object"){
            content = JSON.stringify(content, null, 2);
        }
        this.editor.getSession().setValue(content);
    },

    componentDidUpdate(prevProps){
        const { minLines, maxLines } = this.props;
        this.setContent(this.props.content);
        if ((minLines != prevProps.minLines) || (maxLines != prevProps.maxLines)){
            this.editor.setOptions({
                minLines: minLines,
                maxLines: maxLines
            });
        }
    },

    componentDidMount() {
        var { content, height, wrapWord, checkSyntax, mode } = this.props;
        var editor = ace.edit(this.getId());
        this.editor = editor;
        editor.$blockScrolling = Infinity;
        editor.setReadOnly(true);
        //editor.setShowPrintMargin(false);
        //editor.setBehavioursEnabled(true);
        var session = editor.getSession();
        session.setMode(mode);
        session.setOption("useWorker", checkSyntax); // Removes syntax checking
        if (!height){
            editor.setOptions({
                minLines: this.props.minLines,
                maxLines: this.props.maxLines
            });
        }
        session.setUseWrapMode(wrapWord);
        session.setTabSize(2);
        this.setContent(content);
    },

    render() {
        var style = {
            width: '100%', // ignore 0/false height
            position: 'relative'
        };
        return (
            <div>
                <div id={this.getId()} style={style}></div>
                {this.state.errors.map(this.renderError)}
            </div>
        )
    },

    renderError(err, idx){
        return (
            <div key={idx} style={{padding: '8px'}}>
                <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span> {err}
                </div>
            </div>
        )
    }
});

module.exports = JsonViewer;
