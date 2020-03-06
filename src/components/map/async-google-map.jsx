import { AsyncElement } from 'utils/async-element';

var AsyncGoogleMap = React.createClass({
    mixins: [ AsyncElement ],
    bundle: require('bundle?lazy&name=google-map!./google-map'),
    bundleKey: 'GoogleMap',
    preRender: function () {
        return <div>lazy loading...</div>;
    }
});

module.exports = {
    AsyncGoogleMap
};

