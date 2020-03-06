


var ConfigEntry = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],

    render(){
        const { style, config } = this.props;
        return (
            <div className="autocomplete-entry" style={style}>
                <div className="autocomplete-header">{config.label || config.key}</div>
                {this.props.children}
            </div>
        );
    }
});



var Selector = React.createClass({

    getDefaultProps(){
        return {
            values: []
        }
    },

    onChange(e){
        if (this.props.onChange){
            this.props.onChange(this.props.type, e.target.value);
        }
    },

    render(){
        const { style, value, values, defaultValue, disabled } = this.props;
        return (
            <select value={value} defaultValue={defaultValue}
                    onChange={this.onChange} disabled={disabled}
                    tabIndex="-1" style={style}>
                {values.map(this.renderOption)}
            </select>
        )
    },

    renderOption(v, idx){
        if ((typeof v) === "object") {
            if (v.header){
                return (
                    <optgroup key={idx} label={v.header}>
                        {v.children.map(this.renderOption)}
                    </optgroup>
                )
            } else if (v.label){
                 return <option key={v.value} value={v.value}>{v.label}</option>;
            }
        }
        var { formatter } = this.props;
        var label = v;
        if (formatter) label = formatter(v);
        return <option key={v} value={v}>{label}</option>;
    }
});

var WidgetConfig = React.createClass({

    updateValue(key, value) {
        this.props.widget[key] = value;
        this.props.onChange();
    },

    render(){
        var config = WidgetManager.getWidgetConfig(this.props.widget.type);
        // var headerConfig = {key: "header",    type: "input"};
        // var configs = [headerConfig].concat(config);
        //config: [
        //    {key: "gridSize", type: "selector", values: ["auto", 2, 3, 4, 6]}
        //]
            //<div className="container-fluid">
            //    <div className="row">
            //        <div className="col-md-6 col-lg-4">
            //            OK !
            //        </div>
            //    </div>
            //</div>
        return (
            <div>
                {config.map(this.renderConfig)}
            </div>
        )
    },

    renderConfig(config, idx){
        if ((typeof this.props.widget[config.key]) === "object"){
            return this.renderObject(config, idx);
        }
        switch(config.type){
            case "selector" : return this.renderSelector(config, idx);
            case "input"    : return this.renderInput(config, idx);
            case "textarea" : return this.renderAreaInput(config, idx);
            case "icon"     : return this.renderIcon(config, idx);
            case "number"   : return this.renderNumber(config, idx);
            case "boolean"  : return this.renderBool(config, idx);
            case "filereader" : return this.renderFilereader(config, idx);            
            default         : console.log('unknown config type for', config); return undefined;
        }
    },

    renderObject(config, idx){
        return (
            <ConfigEntry key={idx} config={config} style={{maxWidth: '320px', width: '100%'}}>
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" disabled placeholder="expression" style={{width: '100%'}} />
                </div>
            </ConfigEntry>
        );
    },

    renderSelector(config, idx){
        var widget = this.props.widget;
        return (
            <ConfigEntry key={idx} config={config} style={{width: 96}}>
                <Selector {...this.props} type={config.key} values={config.values}
                                          onChange={this.updateValue} defaultValue={widget[config.key]} style={{width: '100%'}} />
            </ConfigEntry>
        );
    },

    renderBool(config, idx){
        var widget = this.props.widget;
        // 0 is TRUE, 1 is FALSE !!!!!
        var values = config.labels || [ "on", "off" ];
        var value = values[widget[config.key] ? 0 : 1];
        var updateValue = (key, value) => {
            var isTrue = values.indexOf(value) == 0;
            console.log(isTrue);
            this.updateValue(key, isTrue);
        };
        console.log(widget[config.key], value, values);
        return (
            <ConfigEntry key={idx} config={config} style={{width: 96}}>
                <Radios {...this.props} type={config.key} values={values}
                                        onChange={updateValue} value={value} />
            </ConfigEntry>
        );
    },

    renderInput(config, idx){
        var widget = this.props.widget;
        var onChange = (event => {
            var value = event.target.value;
            if (value === "") value = undefined;
            this.updateValue(config.key, value);
        });
        return (
            <ConfigEntry key={idx} config={config} style={{maxWidth: '320px', width: '100%'}}>
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" value={widget[config.key]} onChange={onChange} style={{width: '100%'}} />
                </div>
            </ConfigEntry>
        );
    },

    renderAreaInput(config, idx){
        var widget = this.props.widget;
        var onChange = (event => {
            var value = event.target.value;
            if (value === "") value = undefined;
            this.updateValue(config.key, value);
        });
        return (
            <ConfigEntry key={idx} config={config} style={{maxWidth: '700px', width: '100%'}}>
                <div className="input-group" style={{width: '100%'}}>
                    <textarea rows="3" value={widget[config.key]} onChange={onChange} style={{width: '100%'}} />
                </div>
            </ConfigEntry>
        );
    },


    renderFilereader(config, idx){
        var widget = this.props.widget;
        var onChange = (event => {
            event.preventDefault();
            var file=event.target.files[0];
            var reader = new FileReader();
            //console.log("file:",file);

        let imageFormData = new FormData();

        imageFormData.append('userPhoto', file);
    
        var xhr = new XMLHttpRequest();
    
        xhr.open('post', '/api/photo', true);

        var toto=this;
        //this.updateValue(config.key, '/files/2.png');
        
        xhr.onload = function () {
        if (this.status == 200) {            
            console.log('localfile','/files/'+this.response);
            toto.updateValue(config.key, '/files/'+this.response);
        } else {
            //reject(this.statusText);
        }
        };
        
        //console.log('file info:',file)
        //this.updateValue(config.key, '/files/'+file.name);
        xhr.send(imageFormData);
        });
        return (
            <ConfigEntry key={idx} config={config} style={{maxWidth: '320px', width: '100%'}}>
                <div className="input-group" style={{width: '100%'}}>
                    <input type="file" onChange={onChange} style={{width: '100%'}}/>
                </div>
            </ConfigEntry>
        );
    },



    renderIcon(config, idx){
        var widget = this.props.widget;
        var onChange = (event => {
            var value = event.target.value;
            if (value === "") value = undefined;
            this.updateValue(config.key, value);
        });
        var faUrl = "http://fortawesome.github.io/Font-Awesome/icons/";
        return (
            <ConfigEntry key={idx} config={config} style={{width: 96}}>
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" value={widget[config.key]} onChange={onChange} style={{width: '100%'}} />
                    <span className="input-group-btn">
                        <Button bsStyle="link" bsSize="xs" href={faUrl} target="__blank" fa="info" />
                    </span>
                </div>
            </ConfigEntry>
        );
    },

    renderNumber(config, idx){
        var widget = this.props.widget;
        var onChange = (event => {
            var value = event.target.value;
            if (value === "") value = undefined;
            else value = Number(value);
            this.updateValue(config.key, value);
        });
        return (
            <ConfigEntry key={idx} config={config} style={{width: 96}}>
                <div className="input-group" style={{width: '100%'}}>
                    <input type="number" value={widget[config.key]} onChange={onChange} style={{width: '100%'}} />
                </div>
            </ConfigEntry>
        );
    }
});

module.exports = {
  WidgetConfig
}