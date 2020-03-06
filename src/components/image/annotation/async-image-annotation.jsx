import { AsyncElement } from 'utils/async-element';

var AsyncImageAnnotation = React.createClass({
    mixins: [ AsyncElement ],
    bundle: require('bundle?lazy&name=image-annotation!./image-annotation'),
    bundleKey: 'ImageAnnotation',
    preRender: function () {
        return (
            <div style={{width: 400, margin: 'auto'}}>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = {
    AsyncImageAnnotation
};

