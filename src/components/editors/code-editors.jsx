
var EditorAutocomplete = function(){
    var autocompleter;
    var autocompleters = {};

    var init = function(){
        if (autocompleter){
            return;
        }
        autocompleter = {
            identifierRegexps: [/[a-zA-Z_0-9\.\$\-\u00A2-\uFFFF]/],
            getCompletions: function(editor, session, pos, prefix, callback) {
                console.log(pos, prefix);
                //if (prefix.length === 0) { callback(null, []); return }
                var id = editor.container.id;
                var completer = autocompleters[id];
                // console.log(id, completer);
                if (completer){
                    // TODO : skip a frame to improve performance ? background checks ??
                    completer(editor, session, pos, prefix, callback);
                }
            }
        };
        var langTools = ace.require("ace/ext/language_tools");
        //langTools.setCompleters([]); // Removes other default completers, fucks up auto-brackets ??
        //langTools.setCompleters([autocompleter]);
        langTools.addCompleter(autocompleter);
    };

    var register = function(editor, autocomplete){
        init();
        //window.editor = editorID;
        autocompleters[editor.container.id] = autocomplete;
    };

    return {
        register: register
    }
}();






export var JsonEditor = React.createClass({
    getInitialState: function(){
        return {
            errors: [],
            uuid: generateUUID() // To ensure unique IDs...
        }
    },

    getDefaultProps: function(){
        return {
            //height: '300px',
            wrapWord: true,
            minLines: 4,
            maxLines: 25,
            checkSyntax: true,
            mode: "ace/mode/json",
            parser: JSON.parse
        }
    },

    getId(){
        return this.props.id || this.state.uuid;
    },

    programOnChange(value){
        if (this.pendingUpdate === undefined){
            setTimeout(() => {
                this.props.onChange(this.pendingUpdate);
                this.pendingUpdate = undefined;
            }, 150); // 150ms delay for performance reasons...
        }
        this.pendingUpdate = value;
    },

    onChange(value){
        try {
            var json = this.props.parser(value);
            var normalized = JSON.stringify(json);
            if (this.props.onValid){
                this.props.onValid();
            }
            if (normalized === this.value){
                // Didn't change...
                //console.log('cancel onChange');
                this.editor.getSession().setAnnotations([]);
                return;
            }
            this.value = normalized;
            console.log(this.value);
           
            if (this.props.onChange){
                //console.log(new Date().getMilliseconds(), 'onChange', json);
                //this.props.onChange(json);
                this.programOnChange(json);
            }
            //this.setState({
            //    errors: []
            //});
            this.editor.getSession().setAnnotations([]);
        } catch (e) {
            //console.log(e.message);
            console.log(e);
            //this.setState({
            //    errors: [e.message]
            //});
            var column = e.parsedColumn || 1;
            var line = e.parsedLine || 1;
            this.editor.getSession().setAnnotations([{
                row: line-1,
                column: column - 1,
                text: e.message,
                type: "error" // also warning and information
            }]);
            if (this.props.onError){
                this.props.onError(e);
            }
            //var Range = require("ace/range").Range;
            //this.editor.session.addMarker(new Range(e.parsedLine-1, column-1, e.parsedLine-1, 200), 'ace_highlight-marker', 'fullLine');
        }
    },

    componentDidMount: function() {
        var editor = ace.edit(this.getId());
        this.editor = editor;
        editor.$blockScrolling = Infinity;
        editor.setShowPrintMargin(false);
        editor.setBehavioursEnabled(true);
        var session = editor.getSession();
        session.setMode(this.props.mode);
        session.setOption("useWorker", this.props.checkSyntax); // Removes syntax checking
        if (!this.props.height){
            editor.setOptions({
                minLines: this.props.minLines,
                maxLines: this.props.maxLines
            });
        }
        session.setValue(this.props.content);
        session.setUseWrapMode(this.props.wrapWord);
        session.setTabSize(2);

        if (this.props.autocomplete){
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
                //enableSnippets: true // Looks for WML snippets...
            });
            EditorAutocomplete.register(editor, this.props.autocomplete);
        }

        //var Range = ace.require("ace/range").Range;
        //setTimeout(() => {
        //        session.addMarker(new Range(3,0,3,20),"ace_selected_word","text");
        //    }, 500
        //);
        session.on('change', function() {
            this.onChange(editor.getSession().getValue());
        }.bind(this));
    },

    render: function() {
        var style = {
            width: '100%', height: this.props.height,
            position: 'relative'
        };
        return (
            <div>
                <div id={this.getId()} style={style}></div>
                {this.state.errors.map(this.renderError)}
            </div>
        )
    },

    renderError: function(err, idx){
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

var Val2Wml = function(){

    var isType = function(string){
        if (!string || string.length === 0){
            return false;
        }
        var first = string.charAt(0);
        // Check lower and upper cases to also test numbers...
        return first !== first.toLowerCase() && first === first.toUpperCase();
    };

    var map2wml = function(obj, indent){
        var string = "";
        if(isType(obj.type)){
            string += obj.type;
            if (obj.id){
                string += "#" + obj.id;
            }
            string += " ";
        }
        string += "{";
        var subindent = indent + "  ";
        var lineindent = "\n" + indent + "  ";

        var props = [];
        var isTyped = isType(obj.type);
        for (var prop in obj){
            if (obj.hasOwnProperty(prop) && ((prop !== 'type') || !isTyped) && (prop !== 'children') && ((prop !== "id") ||!isTyped)){
                var v = obj[prop];
                if (v === true){
                    props.push(prop);
                } else if (v === false){
                    props.push('!' + prop);
                } else {
                    props.push(prop + ": " + val2wml(obj[prop], subindent));
                }
            }
        }
        var inline = false;
        var children = obj.children || [];
        if ((props.length <= 4) && (children.length == 0)) {
            var len = lineindent.length;
            for(var i=0; i<props.length; i++){
                len += props[i].length+1;
            }
            inline = (len < 80);
        }
        if (inline){
            string += " " + props.join(" ");
        } else if (props.length > 0) {
            string += lineindent + props.join(lineindent);
        }
        if (obj.children){
            for(var i=0; i<obj.children.length; i++){
                string += lineindent + val2wml(obj.children[i], subindent);
            }
        }
        if (inline){
            string += " }";
        } else {
            string += "\n" + indent + "}";
        }
        return string;
    };

    var arr2wml = function(arr, indent){
        if (arr.length == 0){
            return "[]";
        }
        var string = "[";
        var subindent = indent + "  ";
        for(var i=0; i<arr.length; i++){
            //if (i != 0){
            //    string += ",";
            //}
            string += "\n" + subindent + val2wml(arr[i], subindent) + ',';
        }
        string += "\n" + indent + "]";
        return string;
    };

    var nameRegex = new RegExp("^[_a-zA-Z0-9]+$");
    var mustEscapeKey = function(str){
        return !nameRegex.test(str);
    };

    var call2wml = function(call, indent){
        if ((call.fun === ".") || (call.fun === "*.")){
            if ((call.fun === ".") && mustEscapeKey(call.args[1])){
                return val2wml(call.args[0], indent) + "['" + call.args[1] + "']";
            }
            return val2wml(call.args[0], indent) + call.fun + call.args[1];
        }
        return val2wml(call.args[0], indent) + " " + call.fun.toUpperCase() + " " + val2wml(call.args[1], indent);
    };


    var var2wml = function(v){
        if (nameRegex.test(v.name)){
            // No need to escape...
            return v.name;
        } else {
            return '`' + v.name + '`';
        }
    };

    var ref2wml = function(ref){
        return ref.dest;
    };

    var string2wml = function(str){
        // Matches colors, numbers with units, and percentages
        if (str.match(/^((#([0-9A-Fa-f]{3}){1,2})|(-?[0-9]+([a-z]+|%)))$/)){
            return str;
        }
        return JSON.stringify(str);
    };

    var select2wml = function(select){
        var statements = select.statements.map(s => {
            var expr = val2wml(s.expr, 0);
            if (s.name){
                expr += " AS " + s.name;
            }
            return expr;
        }).join(", ");
        var from = val2wml(select.from, 0);
        var str = "SELECT " + statements + " FROM " + from;
        if (select.where){
            str += " WHERE " + val2wml(select.where);
        }
        return "(" + str + ")";
    };

    var val2wml = function(val, indent){
        switch(typeof val){
            case "boolean": return val;
            case "string": return string2wml(val);
            case "number": return val;
            case "object": {
                if (val === null){
                    return undefined;
                } else if (Array.isArray(val)){
                    return arr2wml(val, indent);
                }
                var type = val.type || "";
                switch(type.toLowerCase()) {
                    case "call":
                        return call2wml(val, indent);
                    case "ref":
                        return ref2wml(val);
                    case "select":
                        return select2wml(val);
                    case "var":
                        return var2wml(val);
                    default:
                        return map2wml(val, indent);
                }
            }
            default : console.log ('Unsupported type ' + (typeof val)); return undefined;
        }
    };

    return {
        convert: obj => val2wml(obj, "")
    };
}();

export var YamlEditor = React.createClass({

    shouldComponentUpdate: function(){
        return false;
    },

    getDefaultProps: function(){
        return {
            inline_depth: 2
        }
    },

    render: function(){
        var content = YAML.stringify(this.props.content, this.props.inline_depth, 2);

        return <JsonEditor {...this.props}
            parser={YAML.parse}
            content={content}
            mode="ace/mode/yaml" />
    }
});

export var WmlEditor = React.createClass({

    getDefaultProps(){
        return {
            multiwidget: false
        }
    },

    shouldComponentUpdate: function(){
        return false;
    },

    convert(){
        if (this.props.multiwidget){
            return this.props.content.map(Val2Wml.convert).join("\n");
        } else {
            return Val2Wml.convert(this.props.content);
        }
    },

    render: function(){
        return <JsonEditor {...this.props}
            parser={this.parse}
            content={this.convert()}
            mode="ace/mode/wml" checkSyntax={false} />
    },

    parse(content){
        try {
            if (this.props.multiwidget) {
                return WMLs2JS(content);
            } else {
                return WML2JS(content);
            }
        } catch (e) {
            this.throwError(e);
        }
    },

    throwError(errorMsg){
        var error = new Error(errorMsg);
        var lineMatch = errorMsg.match(/line ([0-9]+)/);
        if (lineMatch){
            error.parsedLine = lineMatch[1];
        }
        var colMatch = errorMsg.match(/characters ([0-9]+)/);
        if (colMatch){
            error.parsedColumn = colMatch[1];
        }
        throw error;
    }
});

