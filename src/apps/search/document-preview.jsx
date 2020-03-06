
import { line1, imageUrl, wmgUrl } from './media-element/media-info';
import { Modal } from 'react-bootstrap';
import DocumentInfo from 'components/document/document-info';
// import bases from './tmp/bases';
import { DropdownButton, MenuItem } from 'react-bootstrap';

var ConvertButton = React.createClass({

    render(){
        return (
            <DropdownButton title="Convertir" id='document-convert' bsSize="small">
              <MenuItem eventKey='original'>Original</MenuItem>
              <MenuItem eventKey='low-def'>Basse définition</MenuItem>
              <MenuItem eventKey='thumbnail'>Vignette</MenuItem>
              <MenuItem eventKey='metadata'>Méta-données</MenuItem>
            </DropdownButton>
        );
    }
});

var OldDocumentPreview = React.createClass({

    getDefaultProps(){
        return {
            document: undefined
        };
    },

    render(){
        const { document, onClose } = this.props;
        var style = {
            position: 'fixed', 
            top: 50, left: 0, right: 0, bottom: 0, 
            zIndex: 1000,
            overflowY: 'scroll',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        };
        if (!document){
            return false;
        }
        return (
            <div style={style}>
                <Button style={{position: 'absolute', top: 0, right: 0}} 
                      bsStyle="link" 
                      icon="close"
                      onClick={onClose} />
                <div className="container" style={{margin: 'auto'}}>
                    <Row>
                        <Col sm={4}>
                          <h3>Aperçu</h3>
                          <img style={{width: '100%'}} src={imageUrl(document)} />
                        </Col>
                        <Col sm={8}>
                          <h3>Meta-données</h3>
                          {document}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
});

var DocumentPreview = React.createClass({
  render(){
    const { show, document, onClose } = this.props;
    if (!document) return false;
    var model = undefined;// bases[document.base];
    console.log(model);
    return (
      <Modal show={show} onHide={onClose} bsSize="large" aria-labelledby='search-document-lg'>
        <Modal.Header closeButton>
          <Modal.Title id='search-document-lg'>{line1(document)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonToolbar>
            <ButtonGroup bsSize="sm">
              <Button icon="download">Télécharger</Button>
              <ConvertButton />
            </ButtonGroup>
            <ButtonGroup alignRight bsSize="sm">
              <Button icon="edit">Editer</Button>
            </ButtonGroup>
          </ButtonToolbar>
          <Row>
            <Col sm={5}>
              <h4>Aperçu</h4>
              <img style={{width: '100%'}} src={wmgUrl(document)} />
            </Col>
            <Col sm={7}>
              <h4>Meta-données</h4>
              <DocumentInfo document={document} model={model} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
});

        // <Modal.Footer>
        //   <Button onClick={onClose}>{cancelLabel}</Button>
        //   <Button bsStyle="success" onClick={() => onValidate(this.state)}>{validateLabel}</Button>
        // </Modal.Footer>

module.exports = DocumentPreview;