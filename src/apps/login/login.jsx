
import { Alert, Button, Modal, Input } from 'react-bootstrap';
import './login.css';

var ModalInput = React.createClass({
  getDefaultProps(){
    return {
      type: "text"
    };
  },

  handleChange(e){
    const { name, onChange } = this.props;
    if (onChange){
      onChange(name, e.target.value);
    }
  },

  render(){
    return (
      <Input {...this.props} groupClassName="group-class" onChange={this.handleChange} />
    );
  }
});



var LoginWindow = React.createClass({
  contextTypes: {
    site: React.PropTypes.string
  },

  getInitialState(){
    return {
      username: this.props.username || "",
      password: ""
    };
  },

  handleChange(key, value){
    this.setState({
      [key]: value
    });
  },

  handleHide(){},

  render(){
    const { site } = this.props;
    const { username, password } = this.state;
    const isValid = username.length > 0 && password.length > 0;

    return (
      <div className="static-modal">
        <Modal.Dialog onHide={this.handleHide}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.renderError()}
            <form action={`/${site}/login`} method="post">
              <ModalInput name="username" value={username} placeholder="Username" onChange={this.handleChange} />
              <ModalInput type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} />
              <Button bsStyle="primary" type="submit" block disabled={!isValid}>Sign in</Button>
            </form>

          </Modal.Body>

        </Modal.Dialog>
      </div>
    );
  },

  renderError(){
    const { error } = this.props;
    console.log('error', error);
    if (!error || (error.length == 0)) return undefined;
    return (
      <Alert bsStyle="danger">
        {error}
      </Alert>
    )
  }
});

module.exports = LoginWindow;
