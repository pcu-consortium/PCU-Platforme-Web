import React from 'react';
import Router from 'react-router';
import {Navbar, NavBrand, CollapsibleNav, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { SiteLink } from 'admin/common/components';
// require('./navbar.css');

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
    //
    //getTitleRoute(){
    //    var routes = this.getRoutes();
    //    if (routes.length > 1){
    //        return routes[1];
    //    }
    //    return routes[0];
    //},
    //
    title(){
        return this.props.title;
        //switch(this.getTitleRoute().name){
        //    case "schema": return "Fonds";
        //    case "users": return "Utilisateurs";
        //    case "forms": return "Formulaires";
        //    case "groups": return "Groupes";
        //    case "rameau": return "Référentiels";
        //    default: return "Admin";
        //}
    },

    render(){
        // const { params } = this.props;
        // var route = this.getCurrentRoute();
        return (
            <Navbar className="navbar-portal" fixedTop fluid toggleNavKey={0}>
                <NavBrand>{this.renderBrand()}</NavBrand>
                {/*<CollapsibleNav eventKey={0}> 
                    <Nav navbar>
                        <NavItemLink eventKey={0} to="home" params={state.params} style={{fontSize: '20px'}} icon="home"></NavItemLink>
                        <NavItemLink eventKey={1} to={route.name} params={params} style={{fontSize: '20px'}}>{this.title()}</NavItemLink>
                    </Nav>
                    <Nav navbar right>
                    </Nav>
                </CollapsibleNav>*/}
            </Navbar>
        );
    },

    renderBrand(){
        return (
            <a className="navbar-brand" href="#">
              {/*<img src={require('./armadillo_brand.png')} height="50" width="50" alt="Armadillo" />*/}
              {/*<img src={'/images/psa_logo.png'} height="50" width="50" alt="Armadillo" />*/}
              <img src={'/images/logo_fmsh_small.png'} height="50" width="50" alt="Armadillo" />
            </a>
        )
    }
});

module.exports = AdminNavbar;