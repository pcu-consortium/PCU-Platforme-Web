import { AsyncElement } from 'utils/async-element';

var AsyncVocabGraph = React.createClass({
    mixins: [ AsyncElement ],
    bundle: require('bundle?lazy&name=vocab!./vocab'),
    bundleKey: 'VocabGraph',
    preRender: function () {
        return <div></div>;
    }
});

var AsyncVocabApp = React.createClass({
    mixins: [ AsyncElement ],
    bundle: require('bundle?lazy&name=vocab!./vocab'),
    bundleKey: 'VocabApp',
    preRender: function () {
        return <div></div>;
    }
});

module.exports = {
    VocabGraph: AsyncVocabGraph,
    VocabApp: AsyncVocabApp
};

