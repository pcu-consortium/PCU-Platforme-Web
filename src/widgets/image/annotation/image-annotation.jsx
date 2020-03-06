import {AsyncImageAnnotation} from 'components/image/annotation/async-image-annotation';
import { Annotation, AnnotationList } from './annotation';
import './image-annotation.css';


var ImageAnnotationWidget = React.createClass({

    getInitialState(){
        return {
            annotations: [],
            hover: null,
            selected: null
        }
    },

    getDefaultProps(){
        return {
            src: "/files/joconde.jpg"
        }
    },

    onCreate(path){
        var annotations = [...this.state.annotations, {
            ...path
        }];
        this.setState({annotations, selected: path.id});
    },

    onUpdate({id, left, top, right, bottom}){
        var annotations = this.state.annotations.map(an => {
            if (an.id != id) return an;
            return {
                ...an,
                left, top, right, bottom
            }
        });
        this.setState({annotations});
    },

    onSelect(selected){
        this.setState({ selected });
    },

    onHover(hover){
        if (!this.isMounted()){
            return;
        }
        if (hover == this.state.hover){
            return;
        }
        this.setState({ hover });
    },

    updateAnnotation(id, key, value){
        var annotations = this.state.annotations.map(an => {
            if (an.id != id) return an;
            return {
                ...an,
                [key]: value
            }
        });
        this.setState({annotations});
    },

    render(){
        const { src } = this.props;
        const { selected, hover } = this.state;
        return (
            <Row>
                <Col sm={6}>
                    <AsyncImageAnnotation
                        selected={selected}
                        hover={hover}
                        onHover={this.onHover}
                        onSelect={this.onSelect}
                        onCreate={this.onCreate}
                        onUpdate={this.onUpdate}>
                        <img src={this.props.src} style={{width: 400, height: 593}} />
                    </AsyncImageAnnotation>
                </Col>
                <Col sm={6}>
                    <AnnotationList {...this.state}
                                    src={src}
                                    updateAnnotation={this.updateAnnotation}
                                    onHover={this.onHover}
                                    onSelect={this.onSelect} />
                </Col>
            </Row>
        );
    },

});


WidgetManager.registerWidget("ImageAnnotation", {
    component: ImageAnnotationWidget,
    icon: "image",
    config: [
        {key: "src",  type: "input"}
    ],
    defaultValue: {type: 'ImageAnnotation'}
});

module.exports = ImageAnnotationWidget;
