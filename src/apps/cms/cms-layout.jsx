
import { YamlEditor } from 'components/editors/code-editors';
import CmsNavbar from './cms-navbar';

var ArmaTools = ArmaTools || {};

ArmaTools.Dispatcher = function(){
  this._nextId = 0;
  this._observers = {};
};

ArmaTools.Dispatcher.prototype.unregister = function(key){
  delete this._observers[key];
};

ArmaTools.Dispatcher.prototype.register = function(callback){
  var id = "" + (this._nextId++);
  this._observers[id] = callback;
  return id;
};

ArmaTools.Dispatcher.prototype.dispatch = function(obj){
  // console.log('this._observers', this._observers);
  for(var key in this._observers){
    if (this._observers.hasOwnProperty(key)){
      this._observers[key](obj);
    }
  }
};

ArmaTools.Dispatcher.prototype.dispatchAsync = function(obj){
  setTimeout(function(){
    dispatch(obj);
  }, 0);
};



var CmsAdmin = function(){

  var menuListener;
  var menu;
  var page;

  var pageDispatcher = new ArmaTools.Dispatcher();

  var registerMenuListener = function(cb){
    menuListener = cb;
  };

  var setMenu = function(newMenu){
    menu = newMenu;
    if (menuListener){
      menuListener(menu);
    }
  };

  var setPage = function(p){
    page = p;
  };

  var pageSourceUrl = function(p){
    console.log(props.api, p.pageId);
    return props.api + '/cms/page/' + p.pageId;
  };

  var removeIds = function(obj){
    if (!obj){
      return;
    } else if (Array.isArray(obj)){
      for(var i=0; i<obj.length; i++){
        removeIds(obj[i]);
      }
      return;
    } else if (typeof obj === 'object'){
      if (obj._id){
        delete obj._id;
      }
      for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
          removeIds(obj[key]);
        }
      }
    }
  };

  var savePage = function(cb){
    pageDispatcher.dispatch({actionType: "save"});

    var url = pageSourceUrl(page);
    var newPage = jQuery.extend(true, {}, page);

    removeIds(newPage);

    console.log('Query url', url);
    $.ajax({
      url: url,
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(newPage),
      success(data){
        console.log('saved !', data);
        if (cb) {
          cb();
        }
      },
      complete( jqXHR, textStatus ){
        console.log('complete', textStatus);
      }
    });
  };

  var props = {
    api: undefined, 
    setMenu: setMenu,
    setPage: setPage,
    savePage: savePage,
    registerMenuListener: registerMenuListener,
    pageDispatcher: pageDispatcher,
    removeIds: removeIds
  };

  return props;
}();




var CmsMenuLine = React.createClass({
  getInitialState () {
    return {
      expanded: false
    };
  },

  toggleExpand () {
    this.setState({
      expanded: !this.state.expanded
    })
  },

  render () {
    var menu = this.props.menu;
    var children = menu.children;
    if (!children || (children.length == 0) || !Array.isArray(children)){
      return false; // Don't display menu if empty
    }

    var extraClass = menu.className || "menu1";
    var overflowClass = ((menu.children.length >= 10) && !this.state.expanded) ? " hide-overflow" : "";

    return (
      <div className={"cms-menu " + extraClass + overflowClass} style={menu.style}>
        {this.renderExpand()}
        <ul className={"clearfix "}>
          {menu.children.map(this.renderItem)}
        </ul>
      </div>
      )
  },

  renderExpand () {
    if (this.props.menu.children.length < 10) {
      return undefined;
    }
    return (
      <Button bsSize="xs" bsStyle="link" style={{float: "right", color: "white"}}
      glyph={this.state.expanded ? "minus" : "plus"} handleClick={this.toggleExpand}/>
    );
  },

  renderItem (item, idx) {
    if (!item) return undefined;
    var className = (item.glyph && idx == 0) ? "header" : "menu-item";
    var children = item.children;
    var icon;
    if (item.glyph) icon = <Glyphicon glyph={item.glyph}/>;
    if (item.icon)  icon = <FAIcon icon={item.icon}/>;
    var caret;
    if (children && (children.length > 0)) {
      className += " dropdown open";
    }
    var url = item.url;

    if (!url){
      url = this.props.baseUrl + 'page/' + item.id;
    }
    return (
      <li id={'menu-'+item.id} key={idx + '-' + item.id} className={className}>
        <a href={url} style={item.style}>
          {icon}
          {item.label}
          {caret}
        </a>
      </li>
      );

  },

  renderSubMenu(item){
    var children = item.children;
    if (children && (children.length > 0)){
      return (
        <ul className="dropdown-menu" role="menu" aria-labelledby={'menu-' + item.id}>
          {children.map(this.renderSubItem)}
        </ul>
        );
    }
    return undefined;
  },

  renderSubItem(item, idx){
    var url = item.url;
    if (!url){
      url = this.props.baseUrl + 'page/' + item.id;
    }
    var icon;
    if (item.glyph) icon = <Glyphicon glyph={item.glyph}/>;
    if (item.icon)  icon = <FAIcon icon={item.icon}/>;

    return (
      <li key={idx + '-' + item.id} role="presentation">
        <a href={url} style={item.style} role="menuitem">
          {icon}
          {item.label}
        </a>
      </li>
    );
  }
});

var CmsFooter = React.createClass({
  render () {
    if (!this.props.footer){
      return false;
    }
    try {
      return (
        <footer className="cms-footer">
          <CmsMenuLine menu={this.props.footer} baseUrl={this.props.baseUrl}/>
        </footer>
      )
    } catch(err){
      return undefined;
    }
  }
});

var CmsMenu = React.createClass({
  formSubmit() {
    this.search();
  },

  inputSubmit() {
    // <SearchBox url={this.props.searchUrl} />
    this.search();
  },

  render() {
    var menu = this.props.menu || {};
    try {
      var entries;
      if (Array.isArray(menu) && (menu.length == 1)){
        entries = menu[0].children.map(it => ({
          id: it.id,
          label: it.label,
          href: it.url || (this.props.baseUrl + 'page/' + it.id)
        }));
      } else {
        entries = menu;
      }
      return <CmsNavbar {...__data__} {...this.props} entries={entries} showEditButton={true} />;
    } catch(err){
      console.log(err);
      return false;
    }
  }
});




var CmsEditMenu = React.createClass({

  getInitialState () {
    return {
      tab: 'menu',
      canSave: false,
      menu: this.props.blocks.menu,
      footer: this.props.blocks.footer
    }
  },

  getMenuData() {
    return {
      menu: this.state.menu,
      footer: this.state.footer
    };
  },

  handleChange (type, value) {
    var state = {canSave: true};
    state[type] = value;
    this.setState(state);
    CmsAdmin.setMenu(this.getMenuData());
  },

  onSelectTab(tab){
    this.setState({
      tab: tab
    })
  },

  onClick() {
    $.ajax({
      url: this.props.api + '/cms/menu',
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(this.getMenuData()),
      success(data){
        console.log('saved !', data);
      }
    });
  },

  render () {
    var tabs = [
    {id: 'menu', label: 'Menu'},
    {id: 'footer', label: 'Footer'}
    ];
    var changeHandler = (type) => this.handleChange.bind(this, type);
    return (
      <div style={{paddingLeft: 12, paddingRight: 12, minHeight: 300}}>
        <h3>Menu Editor</h3>

        <div style={{float: 'right'}}>
          <a href="https://fortawesome.github.io/Font-Awesome/icons/" target="_blank">
            <FAIcon icon="info-circle"/>&nbsp;Available icons 
          </a>
          &nbsp;
          <Button type="submit" disabled={!this.state.canSave} handleClick={this.onClick} icon="save">Save</Button>
        </div>

        <ul className="nav nav-tabs">
          {tabs.map(this.renderTab)}
        </ul>
        <div className="tab-content" style={{padding: '0px'}}>
          {this.renderTabPanel('menu',
            <YamlEditor id="editor-menu" content={this.state.menu}
            onChange={changeHandler('menu')} inline_depth={4}/>
            )}
          {this.renderTabPanel('footer',
            <YamlEditor id="editor-footer" content={this.state.footer}
            onChange={changeHandler('footer')} inline_depth={2}/>
            )}
        </div>
      </div>
    )
  },

  renderTab(tab){
    var active = tab.id == this.state.tab;
    return (
      <li key={tab.id} role="presentation" className={(active ? 'active': '')}>
        <a href="#" onClick={this.onSelectTab.bind(this, tab.id)}>{tab.label}</a>
      </li>
    );
  },

  renderTabPanel(tab, component){
    return (
      <div role="tabpanel" className={'tab-pane ' + (tab == this.state.tab ? 'active' : '')}>
        {component}
      </div>
    );
  }
});

if (window) window.CmsAdmin = CmsAdmin;

module.exports = {
  CmsAdmin, CmsEditMenu, CmsMenu, CmsFooter
}

