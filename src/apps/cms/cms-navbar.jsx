
import { Navbar, NavBrand, NavDropdown, CollapsibleNav, Nav, NavItem, MenuItem } from 'react-bootstrap';

const NAVBAR_HEIGHT = 64; // 50 for some themes ? move to css ?
//var util = require('util');
 //var   exec = require('child_process').exec;

var NavMenuItem = React.createClass({
  mixins: [ React.PureRenderMixin ],

  render(){
    var { id, current, baseUrl, icon, label, href, ...props } = this.props;
    if ((!href)&&(id)) href = baseUrl + 'page/' + id;
    const active = (current !== undefined) && (current === id);
    if (icon){
      return <MenuItem {...props} href={href} active={active}><FAIcon icon={icon} /> {label}</MenuItem>
    }
    return <MenuItem {...props} href={href} active={active}>{label}</MenuItem>
  }
});

function renderLabel(label, icon){
  if (icon) return <span><FAIcon icon={icon}/> {label}</span>;
  else return label;
}






var NavSearch = React.createClass({
  mixins: [ React.PureRenderMixin ],

    getInitialState(){
        return {
            value: this.props.defaultValue
        }
    },

    handleChange(evt){
        var value = evt.target.value;
        if (this.props.autoRefreshValue){
            this.refreshWidgetValue(value);
        }
        this.setState({value: value});
        if (this.props.onChange){
            this.props.onChange(value);
        }
    },

    onSearch(evt){
        if (evt){
            evt.preventDefault();
            evt.stopPropagation();
        }
        var searchValue = this.state.value || "";
        if (this.props.onSearch){
            this.props.onSearch(searchValue)
        }
        if (this.props.url){
            var url = this.props.url + encodeURIComponent(searchValue);
            console.log('search url:', url);
            window.location.href = url;
        }
    },

  render(){
    const { value } = this.state;

    return (
      <form className="navbar-form navbar-left" role="search" onSubmit={this.onSearch}>
        <div className="form-group">
          <input type="text" className="form-control input-sm" placeholder="Search" value={value} onChange={this.handleChange} />
        </div>
        <Button bsSize="sm" type="submit" icon="search"/>
      </form>
    );
  }
});


var CmsNavbar = React.createClass({

  mixins: [ React.PureRenderMixin ],

  getDefaultProps(){
    return {
      showSearch: true,
      showEditButton: false
    }
  },

  renderLogo(){
    const { site } = this.props;
    switch(site){
      case "psa":   
        return <img style={{height: NAVBAR_HEIGHT}} src="/images/psa_logo.png"/>;
      case "ahm": 
        return <img style={{height: NAVBAR_HEIGHT}}  src={"/images/icon_" + site + ".jpg"}/>;
      case "campus": 
        return <img style={{height: NAVBAR_HEIGHT}}  src={"/images/icon_campusaar.png"}/>;
      case "pcu":
          return <img style={{height: NAVBAR_HEIGHT}}  src={"/images/icon_pcu.png"}/>;
      default:      
        return <img style={{height: NAVBAR_HEIGHT, padding: 8}} src="/images/armadillo_white.png"/>
    }
  },

  getCurrentPage(){
    const { content } = this.props;
    if (!content) return undefined;
    // Either edit page or page
    const page = (content.data && content.data.page) || content.page;
    if (!page || !page.pageId) return undefined;
    return page.pageId;
  },

  getDefaultMenu(){
    if (!__data__) return [];
    if (!__data__.blocks) return [];
    return __data__.blocks.menu;
  },

  hasTitle(){
    const { entries=this.getDefaultMenu() } = this.props;
    return entries.title != undefined;
  },

  render(){
    var { entries=this.getDefaultMenu(), baseUrl } = this.props;
    var style;
    // Object instead of array ? We might have more info like styles :)
    if (!Array.isArray(entries)) {
      style = entries.style;
      entries = entries.children || [];
    } 
    var leftEntries = entries.filter(e => e && !e.alignRight);
    var rightEntries = entries.filter(e => e && e.alignRight);
    var className = classNames({
      "navbar-with-title": this.hasTitle()
    });

    return (
      <Navbar className={className} toggleNavKey={0} fluid style={style} staticTop inverse>
        <NavBrand><a href={baseUrl} style={{padding: 0}}>{this.renderLogo()}</a></NavBrand>
        {this.renderTitle()}
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            {leftEntries.map(this.renderEntry)}
          </Nav>
          {this.props.children}
          <Nav navbar right>
            {rightEntries.map(this.renderEntry)}
           // {this.renderSearch()}
            {this.renderAdminButton()}
            {this.renderEditButton()}
          </Nav>
        </CollapsibleNav>
      </Navbar>
    )
  },

  renderTitle(){
    var { entries=this.getDefaultMenu() } = this.props;
    const { title, subtitle } = entries;
    if (!title) return undefined;
    return <h1 className="navbar-title">{title}<small>{subtitle}</small></h1>
  },
renderSearch(){
    const { searchUrl, showSearch } = this.props;
    if (!searchUrl || !showSearch) return undefined;
    return <NavSearch url={searchUrl} />;
  },

  handleModeChange(event,key){
 
    //this.setState({mode: mode1||mode});
    if (key=='add-page')
    {
      var pagename = prompt("Saisissez le nom de la page", "Newpage");
      if (pagename != null) {
        window.location.href = this.props.baseUrl + 'admin/page/' + pagename;
      }
    }
    if(key== 'inscription'){
     const { baseUrl } = this.props;
     console.log("Base",baseUrl);
    $.ajax({
      url: baseUrl + 'api/cms/inscription?site="campus"',
      type: "GET",
      contentType: 'application/json',
      success(data) {
                   var newurl = baseUrl + 'page/Inscription';
         window.location.replace(newurl);

      }
    })

    }
     if(key== 'administration'){
     const { baseUrl } = this.props;
     var access= true;
     console.log("Base",baseUrl);
  /*   
     $.ajax({
      url: baseUrl + 'currentuser',
      type: "GET",
      contentType: 'application/json',
      success(data) {
                console.log("CURRENTUSER",data) ;
          for (var i=0; i < data.length; i++)
          {
             
              if (data[i].profilename == "SUPERADMIN")
               { console.log("TTT",data[i].profilename) ;
               $.ajax({
                 url: baseUrl + 'api/cms/admin?site="campus"',
      type: "GET",
      contentType: 'application/json',
      success(data) {
                   var newurl = baseUrl + 'page/Admin';
         window.location.replace(newurl);

      }
    })
       }
          }

      }
    })*/
}

 






  },

  renderAdminButton(){
    var { showEditButton, baseUrl } = this.props;

    if (!showEditButton) return undefined;
    //var adminUrl = baseUrl + 'admin/currentuser';
    var loginUrl = baseUrl + 'login';
    var logoutUrl= baseUrl + 'logout';
    const pageId = this.getCurrentPage();
    const href = baseUrl + 'cms/page/' + pageId;
    return (
      <NavDropdown eventKey="admin" title={<FAIcon icon="cogs"/>} id={'nav-dropdown-admin'} onSelect={this.handleModeChange}>
          <NavMenuItem eventKey="administration"   icon="cog" label="Administration" />
           <MenuItem divider/>
          <NavMenuItem eventKey="inscription"  icon="user" label="Inscription" />
          <NavMenuItem eventKey="connection" href={loginUrl} icon="key" label="Connexion" />
          <NavMenuItem eventKey="déconnection" href={logoutUrl} icon="close" label="Déconnexion" />
                   
      </NavDropdown>

       

    );
  },

 renderEditButton(){
    var { showEditButton, baseUrl } = this.props;

    if (!showEditButton) return undefined;
    var adminUrl = baseUrl + 'admin/cms/menu';
    
    const pageId = this.getCurrentPage();
    const href = baseUrl + 'admin/cms/page/' + pageId;
    return (
      <NavDropdown eventKey="edit" title={<FAIcon icon="edit"/>} id={'nav-dropdown-edit'} onSelect={this.handleModeChange}>
         
          <NavMenuItem eventKey="edit-menu" href={adminUrl} icon="wrench" label="Editer le menu" />
          {pageId ? <NavMenuItem eventKey="edit-page" href={href + "?mode=wysiwyg"}  icon="th" label="Editer la page" /> : undefined }
          {pageId ? <NavMenuItem eventKey="edit-page" href={href + "?mode=source"}   icon="edit" label="Sources de la page" /> : undefined}
          {pageId ? <NavMenuItem eventKey="add-page" icon="plus" label="Ajouter une nouvelle page" /> : undefined} 
      </NavDropdown>

       
    );
  },












  renderEntry(entry, idx){
    const { baseUrl } = this.props;
    const current = this.getCurrentPage();
    const id = entry.id || idx;
    var isCurrentEntry = (current !== undefined) && (entry.id == current) && !entry.href;
    if (entry.children){
      return (
        <NavDropdown key={id} eventKey={id} title={renderLabel(entry.label, entry.icon)} id={'nav-dropdown-' + id}>
          {entry.children.map((ec, idx) => {
            if (!ec || ec.divider) return <MenuItem key={idx} divider/>;
            else return <NavMenuItem key={idx} {...ec} href={ec.url} current={current} baseUrl={baseUrl} />
          })}
        </NavDropdown>
      );
    }
    var href = entry.href;
    if (!href) href = baseUrl + 'page/' + id;
    return <NavItem key={idx} eventKey={1} active={isCurrentEntry} href={href}>{renderLabel(entry.label, entry.icon)}</NavItem>;
  },

  getInscription(){
   const { baseUrl } = this.props;
   console.log("Base",baseUrl);
    $.ajax({
      url: baseUrl + 'api/cms/inscription?site="campus"',
      type: "GET",
      contentType: 'application/json',
      success(data) {
          
         var newurl = baseUrl + 'page/inscription';
         window.location.replace(newurl);

      }
    })
  },





});

export default CmsNavbar;
