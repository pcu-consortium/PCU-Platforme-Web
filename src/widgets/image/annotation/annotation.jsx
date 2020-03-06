import { Panel, ListGroup, ListGroupItem, Input } from 'react-bootstrap';

var Image = React.createClass({

    computeStyle(){
        const { size, left, top, right, bottom } = this.props;
        var width = (right - left) || 1;
        var height = (bottom - top) || 1;
        var scale = Math.min(size/width, size/height);
        var dx = -(size-(width*scale))/2;
        var dy = -(size-(height*scale))/2;
        return {
            width: 400*scale,
            margin: ('-' + ((top*scale)+dy) + 'px 0 0 -' + ((left*scale)+dx) + 'px')
        }
    },

    render(){
        const { src, description, size } = this.props;
        return (
            <div style={{width: size, height: size, overflow: 'hidden'}}>
                <img src={src} alt={description} style={this.computeStyle()}/>
            </div>
        );
    }
});

var Annotation = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    onChange(evt){
        const { id, onChange } = this.props;
        onChange(id, 'description', evt.target.value);
    },

    onActionChange(evt){
        const { id, onChange } = this.props;
        onChange(id, 'action', evt.target.value);
    },

    render(){
        const { description, action/*, active, hover*/ } = this.props;

        //var className = classNames("annotation media", { active, hover });

        //const button = <Button><FAIcon icon="remove"/></Button>;
        //form-horizontal
        //label='Action' labelClassName="col-xs-4" wrapperClassName="col-xs-8"
        //label='Description' labelClassName="col-xs-4" wrapperClassName="col-xs-8"
        return (
            <div className="media">
                <div className="media-left">
                    <Image {...this.props} size={90} />
                </div>
                <div className="media-body">
                    <form className="image-annotation">
                        <Input type='select' bsSize="small" placeholder='action'
                               value={action}
                               onChange={this.onActionChange}
                            >
                            <option value="---">---</option>
                            <option value="A restaurer">A restaurer</option>
                            <option value="A nettoyer">A nettoyer</option>
                            <option value="A effacer">A effacer</option>
                        </Input>
                        <Input type='textarea'
                               bsSize="small"
                               placeholder="Description de l'action"
                               onChange={this.onChange}
                               value={description}/>
                    </form>
                </div>
            </div>
        );
    }
});

var AnnotationList = React.createClass({

    render(){
        return (
            <div>
                {/*<h3>Annotations</h3>*/}
                <ListGroup>
                    {this.props.annotations.map(this.renderAnnotation)}
                </ListGroup>
            </div>
        )
    },

    renderAnnotation(it){
        const { src, selected, hover, onHover, onSelect, updateAnnotation } = this.props;
        const active= it.id == selected;
        const bsStyle = (it.id == hover) ? "info" : undefined;
        const className = classNames("annotation", { active });
        return (
            <ListGroupItem className={className} bsStyle={bsStyle}
                onMouseEnter={() => {onHover(it.id)}}
                onMouseLeave={() => {onHover(null)}}
                onClick={() => {onSelect(it.id)}}>
            <Annotation key={it.id}
                {...it} src={src} onChange={updateAnnotation} />
                </ListGroupItem>
        );
    }
});

module.exports = {
    Annotation,
    AnnotationList
};