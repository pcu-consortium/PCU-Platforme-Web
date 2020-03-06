import { AsyncElement } from 'utils/async-element';

var AsyncOpenStreetMap = React.createClass({
    mixins: [ AsyncElement ],
    bundle: require('bundle?lazy&name=open-street-map!./open-street-map'),
    bundleKey: 'OpenStreetMap',
    preRender: function () {
        return <div></div>;
    }
});

module.exports = {
    AsyncOpenStreetMap
};

