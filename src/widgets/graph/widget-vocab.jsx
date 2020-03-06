
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { VocabGraph, VocabApp } from '../../components/graph/async-vocab';

var VocabWidget = React.createClass({
    mixins: [WidgetMixin, URLFetcher],

    getDefaultProps: function() {
        return {
            word: 'mosquée'
        };
    },

    makeUrl: function(props){
        return this.context.api + '/vocabs/' + encodeURIComponent(props.word);
    },

    componentWillReceiveProps: function(nextProps){
        console.log('will receive', nextProps);
        this.fetchUrl(this.makeUrl(nextProps));
    },

    componentDidMount: function(){
        this.fetchUrl(this.makeUrl(this.props));
    },

    getData: function(){
        var data = undefined;
        if (this.state && this.state.data){
            data = this.state.data;
        }
        return data;
    },

    render: function() {
        var data = this.getData();
        if (!data){
            return false;
        }
        return (
            <VocabGraph vocab={data} vocabModule={this.props.vocabModule} api={this.context.api} />
        );
    }
});


var VocabAppWidget = React.createClass({
    mixins: [WidgetMixin, URLFetcher],

    getDefaultProps: function() {
        return {
            word: "mosquée"
        };
    },

    makeUrl: function(props){
        console.log(this.context);
        return this.context.api + '/vocabs/' + encodeURIComponent(props.word);
    },

    componentWillReceiveProps: function(nextProps){
        console.log('will receive', nextProps);
        this.fetchUrl(this.makeUrl(nextProps));
    },

    componentDidMount: function(){
        this.fetchUrl(this.makeUrl(this.props));
    },

    getData: function(){
        var data = undefined;
        if (this.state && this.state.data){
            data = this.state.data;
        }
        return data;
    },

    render: function() {
        var data = this.getData();
        if (!data){
            return false;
        }
        console.log('api', this.context.api);
        return (
            <VocabApp key={data.uri} rootVocab={data} vocabModule={this.props.vocabModule} api={this.context.api} />
        );
    }
});

WidgetManager.registerWidget("Vocab", {
    component: VocabWidget,
    icon: "code-fork",
    config: [
        {key: "word", type: "input"}
    ],
    defaultValue: {
        type: 'Vocab',
        word: 27563
    }
});

WidgetManager.registerWidget("VocabApp", {
    component: VocabAppWidget,
    icon: "code-fork",
    config: [
        {key: "word", type: "input"}
    ],
    defaultValue: {
        type: 'VocabApp',
        word: 27563
    }
});

module.exports = {
    VocabWidget, VocabAppWidget
};