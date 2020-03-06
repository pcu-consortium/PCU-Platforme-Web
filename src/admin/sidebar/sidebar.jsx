
import Router from 'react-router';

require('./sidebar.css');
import classNames from 'classnames';
import { SiteLink } from 'admin/common/components';

var SidebarEntry = React.createClass({
    contextTypes: {
        history: React.PropTypes.object
    },

    isActive(pathname, query={}){
        return this.context.history.isActive(pathname, query);
    },

    render(){
        const { icon, to } = this.props;
        var className = classNames({
            active: this.isActive(to)
        });
        return (
            <li className={className}>
                <SiteLink to={to}>
                    <FAIcon icon={icon}/>
                    <span className="link-label">{this.props.children}</span>
                </SiteLink>
            </li>
        )
    }
});


var Sidebar = React.createClass({

    handleToggle(){
        if (this.props.onToggle){
            this.props.onToggle();
        }
    },

    componentDidUpdate(prevProps){
        // Trigger a window resize event if the sidebar has changed
        // Will force special custom elements to resize (ex: ReactGridLayout)
        if (prevProps.expanded != this.props.expanded){
            window.dispatchEvent(new Event('resize'));
        }
    },

    render(){
        const { expanded } = this.props;
        var chevron = expanded ? "chevron-left" : "chevron-right";
        return (
            <div className="sidebar-wrapper">
                <Button className="btn-toggle" icon={chevron} bsSize="sm" bsStyle="link" onClick={this.handleToggle}/>
                <ul className="sidebar-nav">
                    <SidebarEntry icon="dashboard" to="admin">Dashboard</SidebarEntry>
                    <SidebarEntry icon="users" to="admin/groups">Groupes</SidebarEntry>
                    <SidebarEntry icon="user" to="admin/users">Utilisateurs</SidebarEntry>
                    <SidebarEntry icon="database" to="admin/schema">Fonds</SidebarEntry>
                    <SidebarEntry icon="file-text" to="admin/forms" >Formulaires</SidebarEntry>
                    <SidebarEntry icon="book" to="admin/rameau">Référentiels</SidebarEntry>
                </ul>
            </div>
        );
    }
});


module.exports = {
    Sidebar
};