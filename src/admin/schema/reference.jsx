
import React from 'react';
import Lang from 'utils/lang';
import { Input } from 'admin/forms/form-components';

var RefModel = function(){

    var variables = [
        "dir",
        "filename",
        "fileext",
        "filedate",
        "date",
        "incr",
        "base",
        "user"
    ];

    var parseRef = function(refString){
        if (refString.length === 0){
            return [];
        }
        var start = refString.indexOf('{');
        var end = refString.indexOf('}');
        if ((start === -1) && (end === -1)){
            // Nothing to do
            return [{type: 'sep', value: refString}];
        } else if ((end < start)    // Invalid order
            || (end === -1)     // Unclosed
            || (start === -1)   // Unopened
        ){
            throw "ref.error.invalid";
        } else if (start == 0){
            var ref = refString.substring(start+1, end);
            if (variables.indexOf(ref) === -1) {
                throw "ref.error.invalid";
            }
            return [{type: 'var', value: ref}].concat(parseRef(refString.substring(end+1)));
        } else {
            // Text first, ref after
            var txt = refString.substring(0, start);
            return [{type: 'sep', value: txt}].concat(parseRef(refString.substring(start)));
        }
    };

    var generateRef = function(formats){
        var str = "";
        for(var i=0; i<formats.length; i++){
            var format = formats[i];
            if (format.type === "sep"){
                str += format.value;
            } else {
                str += '{' + format.value + '}';
            }
        }
        return str;
    };

    return {
        variables: variables,
        parseRef: parseRef,
        generateRef: generateRef
    }
}();


var ReferenceBuilder = React.createClass({

    getInitialState: function(){
        return this.computeState(this.props.reference);
    },

    computeState: function(ref){
        var ref = ref || '';
        var formats = [];
        var error;
        try {
            formats = RefModel.parseRef(ref);
        } catch(e){
            error = e;
            if (this.state && this.state.formats){
                formats = this.state.formats; // Restore...
            }
        }
        return {
            ref: ref,
            formats: formats,
            error: error
        }
    },

    updateRef: function(ref){
        var state = this.computeState(ref);
        if (!state.error && this.props.onChange){
            this.props.onChange(state.ref);
        }
        this.setState(state);
    },

    handleChange: function(e){
        this.updateRef(e.target.value);
    },

    updateFormats: function(formats){
        this.setState({
            ref: RefModel.generateRef(formats),
            formats: formats,
            error: false
        });
    },

    onSelectorChange: function(idx, value){
        var formats = this.state.formats;
        if (value === "other"){
            formats[idx].type = "sep";
            formats[idx].value = "-";
        } else {
            formats[idx].type = "var";
            formats[idx].value = value;
        }
        this.updateFormats(formats);
    },

    onOtherChange: function(idx, value){
        var formats = this.state.formats;
        formats[idx].type = "sep";
        formats[idx].value = value;
        this.updateFormats(formats);
    },

    render: function(){
        var error = Lang.txt(this.state.error);
        if (error) {
            console.log(this.state.error, error);
        }
        return (
            <div>
                <h3>{Lang.txt('ref.title_create')}</h3>
                <h4>Format</h4>
                <Input value={this.state.ref} error={error} onChange={this.handleChange} />
                <h4>Détail</h4>
                {this.renderFormats(this.state.formats)}
            </div>
        )
    },

    renderFormats: function(formats){
        return (
            <table className="table table-condensed config reference">
                <thead>
                <td>{Lang.txt('ref.label_type')}</td>
                <td>{Lang.txt('ref.label_value')}</td>
                <td>{Lang.txt('ref.label_max')}</td>
                </thead>
                <tbody>
                {formats.map(this.renderFormat)}
                </tbody>
            </table>
        );
    },

    renderFormat: function(format, idx){
        var input;
        var formatter = v => Lang.txt('ref.var.' + v);
        var variables = RefModel.variables.concat(['other']);
        var value = format.type === "var" ? format.value : "other";
        var selector = <Selector type={idx} value={value} values={variables}
                                 onChange={this.onSelectorChange} formatter={formatter} />;
        if (format.type === "var"){
            selector = <td colSpan={2}>{selector}</td>;
        } else {
            selector = <td>{selector}</td>;
            //var style = {fontSize: "12px", height: "22px"};
            input = <td><Input value={format.value} onChange={e => this.onOtherChange(idx, e.target.value)}  /></td>;
        }

        //<td>{format.type}</td>
        return (
            <tr key={idx}>
                {selector}
                {input}
                <td></td>
            </tr>
        );
    }
});

module.exports = {
    ReferenceBuilder
};