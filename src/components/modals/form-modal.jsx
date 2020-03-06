
import { Modal } from 'react-bootstrap';
import { Input } from 'admin/forms/form-components';

var FormModal = React.createClass({

    propTypes: {
        show: React.PropTypes.bool
    },

    getDefaultProps(){
        return {
            show: false,
            fields: []
        }
    },

    componentWillUpdate(nextProps){
        if (nextProps.show && !this.props.show && this.props.onShow){
            this.setState({
                id: "",
                label: ""
            });
        }
    },

    render(){
        const { show, title, validateLabel, cancelLabel, onClose, onValidate, fields } = this.props;
        return (
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
            {fields.map(this.renderField)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>{cancelLabel}</Button>
            <Button bsStyle="success" onClick={() => onValidate(this.state)}>{validateLabel}</Button>
          </Modal.Footer>
        </Modal>
        );
    },

    renderField({id, label, options}){
        return <Input inline={false} {...options} label={label} onChange={e => this.setState({[id]: e.target.value})} />;
    }
});


module.exports = FormModal;