
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { WysiwygEditor } from 'components/editors';


var TextWidget = React.createClass({
    getDefaultProps(){
        return {
            text: ""
        };
    },

    render(){
        var { text, style } = this.props;
        if (!text){
            return false;
        }
        if( (typeof style !== "object") && (style !== null) ) {
            console.warn('invalid style', style);
            style = undefined;
        }
        //if ((typeof text) === "object"){
        //    text = YAML.stringify(text, 10, 2);
        //}
        console.log(this.props);
        var text = text + ""; // Convert numbers to string
        var pArr = text.split("\n").map((t, idx) => <p key={idx}>{t}</p>);
        return <div style={style}>{pArr}</div>;
    }
});


var HtmlWidget = React.createClass({
    mixins: [WidgetMixin],

    onSave(){
        // Don't save if we have an emmbedded value TODO : {{}} syntax ?
        if (this.refs.editor && (!this.props.widget.data || !this.props.widget.data.type)){
            this.props.widget.data = this.refs.editor.getValue();
        }
    },

    componentDidMount(){
        this.dispatchKey = CmsAdmin.pageDispatcher.register(this.onSave);
    },

    componentWillUnmount(){
        if (this.refs.editor) {
            this.props.widget.data = this.refs.editor.getValue();
        }
        CmsAdmin.pageDispatcher.unregister(this.dispatchKey);
    },

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    },

    renderContent(){
        var data = this.props.widget.data;
        if (this.context.editing){
            return (
                <div key="editor">
                    <WysiwygEditor ref="editor" html={data} airMode={false}/>
                </div>
            );
        }
        return (
            <div key="view">
                <div dangerouslySetInnerHTML={{__html: data}} />
            </div>
        );
    }
});

WidgetManager.registerWidget("Text", {
    component: TextWidget,
    icon: "font",
    defaultValue: {type: 'Text', text: 'Replace text...'},
    config: [
        {key: "text", type: "input"}
    ]
});

WidgetManager.registerWidget("Html", {
    component: HtmlWidget,
    icon: "font",
    defaultValue: {type: 'Html', data: 'Replace text...'}
});

module.exports = {
  TextWidget, HtmlWidget
};
