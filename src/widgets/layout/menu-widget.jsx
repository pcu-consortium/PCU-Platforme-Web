
import WidgetManager from '../widget-manager';
import Router from 'react-router';
import {Navbar, CollapsibleNav, Nav, NavItem, DropdownButton, NavDropdown, MenuItem, ButtonToolbar,ButtonGroup} from 'react-bootstrap';


var MenuWidget = React.createClass({
  render() {
    //console.log(this.props.children);
    console.log(this.props);
    var menuchildren = (this.props.children || []).map(this.renderDropdowm);
    //console.log(menuchildren);
    //console.log('ggggg');
    return (
    <div>
	<ButtonGroup {...this.props}>
    {menuchildren}
	</ButtonGroup>
	</div>
    );
  },

  renderDropdowm(btn, idx){
    if (btn.to)
    {
      return(
        <Button href={'/campus/page/'+btn.to} target="_blank">
          {btn.name}
        </Button>
      );
    }
    else
    {
      var submenuchildren= (this.props.children[idx].children ||[] ).map(this.renderMenuItem)
      return (
      <DropdownButton eventKey={idx} title={btn.name}>
          {submenuchildren}
      </DropdownButton>
      );
    }
  },

  renderMenuItem(btn, idx){
    return <MenuItem eventKey={idx} href={'/campus/page/'+btn.to} target="_blank">{btn.name}</MenuItem>
  }
});


WidgetManager.registerWidget("Menu", {
    component: MenuWidget,
    config: [
    ]
}
);

module.exports = MenuWidget;
