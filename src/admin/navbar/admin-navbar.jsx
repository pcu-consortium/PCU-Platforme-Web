import Router from 'react-router';
import {Navbar, NavBrand, CollapsibleNav, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { SiteLink } from 'admin/common/components';
// require('./admin-navbar.css');

var NavItemLink = React.createClass({
    render(){
        const { to, params, style, icon } = this.props;
        var faIcon;
        if (icon){
            faIcon = <FAIcon icon={icon}/>;
        }
        return (
            <li role="presentation">
                <SiteLink role="button" to={to} params={params} style={style}>{faIcon} {this.props.children}</SiteLink>
            </li>
        )
    }
});


var AdminNavbar = React.createClass({

    getRoutes(){
        return this.props.routes;
    },

    getCurrentRoute(){
        var routes = this.getRoutes();
        console.log('routes', routes);
        return routes[routes.length-1];
    },

    getTitleRoute(){
        var routes = this.getRoutes();
        if (routes.length > 1){
            return routes[1];
        }
        return routes[0];
    },

    title(){
        switch(this.getTitleRoute().name){
            case "schema": return "Fonds";
            case "users": return "Utilisateurs";
            case "forms": return "Formulaires";
            case "groups": return "Groupes";
            case "rameau": return "Référentiels";
            default: return "Admin";
        }
    },

    render(){
        const { params } = this.props;
        var route = this.getCurrentRoute();
        console.log(route);
        return (
            <Navbar className="navbar-admin" fixedTop fluid toggleNavKey={0}>
                <NavBrand>{this.renderBrand()}</NavBrand>
                <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                    <Nav navbar>
                        {/*<NavItemLink eventKey={0} to="home" params={state.params} style={{fontSize: '20px'}} icon="home"></NavItemLink>*/}
                        <NavItemLink eventKey={1} to={route.name} params={params} style={{fontSize: '20px'}}>{this.title()}</NavItemLink>
                    </Nav>
                    <Nav navbar right>
                        <NavItemLink eventKey={2} to="admin/users"><FAIcon icon="users" /> Utilisateurs</NavItemLink>
                        <NavItemLink eventKey={3} to="admin/schema"><FAIcon icon="database" /> Fonds</NavItemLink>
                        <NavDropdown eventKey={4} title={<FAIcon icon="cogs"/>} id="navbar-settings">
                            <MenuItem eventKey='1'>Administration</MenuItem>
                            <MenuItem eventKey='2'>Se déconnecter</MenuItem>
                        </NavDropdown>
                    </Nav>
                </CollapsibleNav>
            </Navbar>
        );
    },

    renderBrand(){
        return (
          <SiteLink className="navbar-brand" to="admin">
              <img src={require('./armadillo_brand.png')} height="50" width="50" alt="Armadillo" />
          </SiteLink>
        )
    }
});

module.exports = AdminNavbar;