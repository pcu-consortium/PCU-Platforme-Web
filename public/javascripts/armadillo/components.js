
var generateUUID = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};



var ButtonToolbar = React.createClass({displayName: "ButtonToolbar",
    render: function(){
        var classes = "btn-toolbar";
        if (this.props.theme && (this.props.theme != "clear")){
            classes += " toolbar-" + this.props.theme;
        }
        return (
            React.createElement("div", {className: classes, role: "toolbar", style: this.props.style}, 
                this.props.children
            )
        )
    }
});


var ButtonGroup = React.createClass({displayName: "ButtonGroup",

    getSize: function(){
        if (this.props.bsSize){
            return this.props.bsSize;
        } else if (this.props.parent){
            return this.props.parent.bsSize;
        } else {
            return undefined;
        }
    },

    render: function(){
        var className = "btn-group";
        var bsSize = this.getSize();
        if (this.props.justified) {
            className += " btn-group-justified";
        }
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        if (bsSize){
            className += ' btn-group-' + bsSize;
        }
        if (this.props.alignRight){
            className += " pull-right";
        }

        return (
            React.createElement("div", {className: className, role: "group", style: this.props.style}, 
                this.props.children
            )
        )
    }
});

var RadioGroup = React.createClass({displayName: "RadioGroup",
    render: function(){
        return (
            React.createElement("div", {className: "btn-group", role: "group"}, 
                this.props.children
            )
        )
    }
});

var Glyphicon = React.createClass({displayName: "Glyphicon",
    propTypes: {
        glyph: React.PropTypes.string
    },

    render: function () {
        if (!this.props.glyph){
            return false;
        }

        var cls = "glyphicon glyphicon-" + this.props.glyph;
        if (this.props.className){
            cls += " " + this.props.className;
        }
        if (this.props.spin){
            cls += " spin";
        }
        return (
            React.createElement("span", React.__spread({},  this.props, {className: cls, "aria-hidden": "true"}), 
                this.props.children
            )
        );
    }
});

var FAIcon = React.createClass({displayName: "FAIcon",
    propTypes: {
        fa: React.PropTypes.string
    },

    render: function () {
        var props = this.props;
        var $__0=            this.props,spin=$__0.spin,inverse=$__0.inverse,li=$__0.li,className=$__0.className,stack=$__0.stack,defaultWidth=$__0.defaultWidth,alignRight=$__0.alignRight,color=$__0.color,size=$__0.size;
        var icon = props.fa || props.icon;
        if (!icon){
            return false; // Hide
        }
        var cx = React.addons.classSet;
        var classes = {
            fa: true,
            'fa-fw': !defaultWidth,
            'fa-spin': spin,
            'fa-inverse': inverse,
            'fa-li': li
        };
        classes['fa-' + icon] = true;
        if (className){
            classes[className] = true;
        }
        if (stack){
            classes['fa-stack-' + stack] = true;
        }
        var style = props.style || {};
        if (alignRight){
            style.float = 'right';
        }
        style.color = color;
        style.fontSize = size;
        return (
            React.createElement("span", React.__spread({},  props, {className: cx(classes), "aria-hidden": "true", style: style}), 
                props.children
            )
        );
    }
});

var FAStack = React.createClass({displayName: "FAStack",
    render: function(){
        var back = this.props.back;
        var inverse = ((back == "circle") || (back == "square")) && !this.props.inverse;
        var stackStyle = {
            fontSize: this.props.size,
            color: this.props.color
        };
        return (
            React.createElement("span", {className: "fa-stack fa-lg", style: stackStyle}, 
                React.createElement(FAIcon, {fa: this.props.back, stack: "2x", color: this.props.backColor}), 
                React.createElement(FAIcon, {fa: this.props.front, inverse: inverse, stack: "1x"})
            )
        );
    }
});

var Button = React.createClass({displayName: "Button",
    mixins: [ React.addons.PureRenderMixin ],

    getDefaultProps:function () {
        return {
            bsClass: 'btn',
            bsStyle: 'default',
            bsSize: undefined,
            className: ''
        };
    },

    getSize:function(){
        if (this.props.bsSize){
            return this.props.bsSize;
        } else if (this.props.parent){
            return this.props.parent.bsSize;
        } else {
            return undefined;
        }
    },

    updateTooltips:function() {
        $(this.refs.button).tooltip();
        // $(this.refs.button.getDOMNode()).tooltip();
    },

    componentDidMount:function(){
        if (this.props['data-toggle'] === "tooltip"){
            this.updateTooltips();
        }
    },

    componentDidUpdate:function(prevProps, prevState){
        if ((this.props['data-toggle'] === "tooltip") || (prevProps['data-toggle'] === "tooltip")){
            this.updateTooltips();
        }
    },

    handleClick:function(e) {
        var onClick = this.props.onClick || this.props.handleClick;
        if (!onClick){
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        setTimeout(function(){
            $(e.target).removeClass("focus").blur();
        }, 50);
        onClick(this.props.value);
    },

    render:function() {
        var Component = this.props.componentClass || 'button';
        var activeClassName;
        if (this.props.href){
            Component = "a";
        } else if (this.props.query || this.props.to || this.props.params){
            // Auto-link
            Component = Link;
            activeClassName = "";
        }
        var cx = React.addons.classSet;
        var classes = {
            "pull-left": this.props.alignLeft,
            "pull-right": this.props.alignRight,
            "dropdown-toggle": this.props.isDropdown,
            active: this.props.active,
            "no-outline": this.props.noOutline
        };
        var bsSize = this.getSize();
        classes[this.props.bsClass] = true;
        classes['btn-' + this.props.bsStyle] = true;
        if (bsSize){
            classes['btn-' + bsSize] = true;
        }
        if (this.props.className){
            classes[this.props.className] = true;
        }
        var style = this.props.style || {};
        if (this.props.bsStyle == 'link'){
            style['textDecoration'] = 'none';
        }
        if (this.props.noPadding){
            style['padding'] = '0px';
        }

        var onClick;
        if (this.props.onClick || this.props.handleClick){
            onClick = this.handleClick;
        }
        var type = "button", role = undefined;
        if (Component == "a"){
            role = "button";
            type = undefined;
        }
        return (
            React.createElement(Component, React.__spread({ref: "button"}, 
                this.props, {className: cx(classes), activeClassName: activeClassName, style: style, 
                                type: type, role: role, onClick: onClick}), 
                this.renderIcon(), " ", this.props.children
            )
        );
    },

    renderIcon: function(){
        var $__0=        this.props,glyph=$__0.glyph,glyphSpin=$__0.glyphSpin,iconSpin=$__0.iconSpin,fa=$__0.fa,icon=$__0.icon;
        if (glyph){
            return [React.createElement(Glyphicon, {key: "icon", glyph: glyph, spin: glyphSpin}), " "];
        } else if (this.props.fa || this.props.icon){
            return [React.createElement(FAIcon, {key: "icon", fa: fa || icon, spin: glyphSpin || iconSpin}), " "];
        }
        return undefined;
    }
});

var DropdownMenu = React.createClass({displayName: "DropdownMenu",
    render:function(){
        return (
            React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                this.props.children
            )
        );
    }
});

var MenuHeader = React.createClass({displayName: "MenuHeader",
    render:function(){
        return React.createElement("li", {role: "presentation", className: "dropdown-header"}, this.props.children)
    }
});

var MenuItem = React.createClass({displayName: "MenuItem",

    handleClick:function(e){
        console.log(this.props.onSelect);
        if (this.props.onSelect){
            e.preventDefault();
            e.stopPropagation();
            this.props.onSelect(this.props.eventKey);
        }
    },

    render:function(){
        var href = this.props.href || '#';
        return (
            React.createElement("li", {role: "presentation", onClick: this.props.onSelect}, 
                React.createElement("a", {role: "menuitem", tabIndex: "-1", href: href}, this.props.children)
            )
        );
    }
});

var MenuDivider = React.createClass({displayName: "MenuDivider",
    render:function(){
        return React.createElement("li", {role: "presentation", className: "divider"});
    }
});

var DropdownButton = React.createClass({displayName: "DropdownButton",

    getInitialState:function(){
        return {
            open: false
        }
    },

    toggle:function(){
        this.setState({open: !this.state.open});
    },

    handleSelect:function(key){
        if (this.props.onSelect){
            this.setState({open: false});
            this.props.onSelect(key);
        }
    },

    render:function(){

        var caret = React.createElement("span", {className: "caret"});
        return this.renderGroup([
            React.createElement(Button, React.__spread({key: "button"},  this.props, {isDropdown: true, onClick: this.toggle}), this.props.title, " ", caret),
            this.renderDropdown()
        ]);
    },

    renderGroup:function(children){
        var cx = React.addons.classSet;
        var groupClasses = {
            'open': this.state.open,
            'dropup': this.props.dropup
        };

        return React.createElement(ButtonGroup, {className: cx(groupClasses)}, children);
    },

    renderDropdown:function(){
        if (!this.state.open){
            return undefined;
        }
        return (
            React.createElement(DropdownMenu, {key: "dropdown"}, 
                this.props.children.map(this.renderItem)
            )
        );
    },

    renderItem:function(it){
        var clone = React.cloneElement(it, {onSelect: this.handleSelect});
    }
});


var RadioButton = React.createClass({displayName: "RadioButton",
    getDefaultProps:function() {
        return {
            bsClass: 'btn',
            bsStyle: 'default',
            type: 'button'
        };
    },

    handleClick: function(e) {
        console.log("on change");
        console.log(this.props.handleClick);
        this.props.handleClick(this.props.value);
    },

    render: function () {
        var cx = React.addons.classSet;
        var classes = {};
        classes[this.props.bsClass] = true;
        classes['btn-' + this.props.bsStyle] = true;
        classes['active'] = this.props.active;

        var icon;
        if (this.props.glyph){
            icon = React.createElement(Glyphicon, {glyph: this.props.glyph})
        }
        return (
            React.createElement("label", {className: cx(classes), onChange: this.handleClick}, 
                React.createElement("input", {
                    type: "radio", 
                    value: this.props.value, 
                    autoComplete: "off", 
                    checked: this.props.active, 
                    onChange: this.handleClick}), 
                icon
            )
        );
    }
});


var SquareImage = React.createClass({displayName: "SquareImage",
    propTypes: {
        fillWidth:   React.PropTypes.bool,
        fillHeight:   React.PropTypes.bool,
        backgroundSize: React.PropTypes.string,
        alignTop:    React.PropTypes.bool
    },

    // fillHeight => parameter to fit in height rather than width...
    // backgroundSize=v => custom background size
    render: function(){
        var imgStyle = {
            // "background-position": "center center",
            // "background-repeat": "no-repeat",
            // "background-size": "100%",
            "paddingBottom": "100%",
            "backgroundImage": "url(" + this.props.src + ")"
        };
        if (this.props.backgroundSize){
            imgStyle["backgroundSize"] = this.props.backgroundSize;
        }
        if (this.props.fillHeight){
            imgStyle["backgroundSize"] = 'auto 100%';
        } else if (this.props.fillHeight){
            imgStyle["backgroundSize"] = '100% auto';
        }

        if (this.props.alignTop){
            imgStyle["backgroundPosition"] = 'center top';
        }

        return (
            React.createElement("div", {style: {position: 'relative'}, onClick: this.props.onClick}, 
                React.createElement("div", {className: "react-center-image", style: imgStyle}), 
                React.createElement("div", {className: "image-overlay"})
            )
        )
    }
});

var VideoImage = React.createClass({displayName: "VideoImage",
    propTypes: {
        fillHeight:   React.PropTypes.bool,
        backgroundSize: React.PropTypes.string
    },

    // fillHeight => parameter to fit in height rather than width...
    // backgroundSize=v => custom background size
    render: function(){
        var imgStyle = {
            // "background-position": "center center",
            // "background-repeat": "no-repeat",
            // "background-size": "100%",
            "paddingBottom": "56%",
            "backgroundImage": "url(" + this.props.src + ")"
        };
        if (this.props.backgroundSize){
            imgStyle["background-size"] = this.props.backgroundSize;
        }
        if (this.props.fillHeight){
            imgStyle["background-size"] = 'auto 100%';
        }

        // <Glyphicon glyph="play" className="center-glyph" />
        return (
            React.createElement("div", {style: {position: "relative"}}, 
                React.createElement("div", {className: "react-center-image", style: imgStyle}
                ), 
                React.createElement("div", {className: "play-image"})
            )
        )
    }
});




var ContextMenu = React.createClass({displayName: "ContextMenu",
    render: function(){
        var dividerIdx = 0;
        return (
            React.createElement("div", {id: this.props.id}, 
                React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                    
                        this.props.items.map(function(item, idx){
                            if (item.header){
                                return (React.createElement("li", {key: 'header-' + item.header,  role: "presentation", className: "dropdown-header"}, item.header))
                            } else if (!item.label){
                                return (React.createElement("li", {key: 'divider-' + (dividerIdx++), role: "presentation", className: "divider"}))
                            } else {
                                return (
                                    React.createElement("li", {key: 'action-' + item.action, role: "presentation"}, 
                                        React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", "data-action": item.action}, React.createElement(Glyphicon, {glyph: item.glyph}), item.label)
                                    )
                                )
                            }
                        }.bind(this))
                    
                )
            )
        )
    }
    // <div id="folder-context-menu">
    //   <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    //     <li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-action="new"><span class="glyphicon glyphicon-plus"></span>Nouveau dossier</a></li>
    //     <li role="presentation" class="divider"></li>
    //   </ul>
    // </div>

});

var ProgressBar = React.createClass({displayName: "ProgressBar",
    render: function(){
        var progressInt = this.props.progress*100;
        return (
            React.createElement("div", {className: "progress"}, 
                React.createElement("div", {className: "progress-bar", role: "progressbar", "aria-valuenow": progressInt, "aria-valuemin": "0", "aria-valuemax": "100", style: {width: progressInt+'%'}}
                )
            )
        )
    }
});


var Panel = React.createClass({displayName: "Panel",
    getDefaultProps: function () {
        return {
            'bsStyle': 'primary',
            'list': false, // Use as list
            'style': {}
        };
    },
    render: function(){
        var bodyClass = this.props.list ? 'list-group' : 'panel-body';
        return (
            React.createElement("div", React.__spread({className: 'panel panel-' + this.props.bsStyle},  this.props.style), 
                React.createElement("div", {className: "panel-heading"}, 
                    React.createElement("h3", {className: "panel-title"}, this.props.title)
                ), 
                React.createElement("div", {className: bodyClass}, 
                    this.props.children
                )
            )
        )
    }
});

var PanelList = React.createClass({displayName: "PanelList",
    getDefaultProps:function(){
        return {
            bsStyle: 'default'
        }
    },

    render: function(){
        var groupClass = "list-group";
        if (this.props.compact){
            groupClass += " " + "list-group-compact";
        }
        var style;
        if (this.props.maxHeight){
            style = {
                maxHeight: this.props.maxHeight,
                overflowY: 'auto'
            };
        }
        return (
            React.createElement("div", {className: 'panel panel-' + this.props.bsStyle, onClick: this.props.onClick}, 
                React.createElement("div", {className: "panel-heading panel-compact"}, 
                    this.renderTitle()
                ), 
                React.createElement("div", {className: groupClass, style: style}, 
                    this.props.children
                )
            )
        )
    },

    renderTitle:function(){
        var $__0=     this.props,title=$__0.title,icon=$__0.icon;
        if (icon){
            return React.createElement("h3", {className: "panel-title"}, React.createElement(FAIcon, {icon: icon}), " ", title);
        } else {
            return React.createElement("h3", {className: "panel-title"}, title);
        }
    }
});


var Navbar = React.createClass({displayName: "Navbar",
    render: function(){
        var entries = this.props.entries.map(function(e){
            if (e.id == this.props.current){
                return (React.createElement("li", {key: e.id, className: "active"}, React.createElement("a", {href: e.href}, e.label, React.createElement("span", {className: "sr-only"}, "(current)"))))
            } else {
                return (React.createElement("li", {key: e.id}, React.createElement("a", {href: e.href}, e.label)))
            }
        }.bind(this));
        return (
            React.createElement("nav", {className: "navbar navbar-default navbar-fixed-top", role: "navigation"}, 
                React.createElement("div", {className: "container-fluid"}, 
                    React.createElement("div", {className: "navbar-header"}, 
                        React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1"}, 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"})
                        ), 
                        React.createElement("img", {className: "navbar-brand", style: {padding: '8px'}, src: "images/armadillo_white.png"})
                    ), 
                    React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 
                        React.createElement("ul", {className: "nav navbar-nav"}, 
                            entries
                        ), 
                        React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
                            React.createElement(NavbarNotification, null)
                        ), 
                        this.props.children
                    )
                ), 
                React.createElement(NavbarAlert, null)
            )
        )
    }
});

var Alert = React.createClass({displayName: "Alert",
    getDefaultProps:function(){
        return {
            bsStyle: "info"
        }
    },

    render:function(){
        var className = "alert alert-" + this.props.bsStyle;
        return React.createElement("div", {className: className, role: "alert"}, this.props.children);
    }
});

var CarouselItem = React.createClass({displayName: "CarouselItem",
    render: function(){
        var className = this.props.active ? "item active" : "item";
        return (
            React.createElement("div", {className: className}, 
                React.createElement("div", {className: "carousel-image", style: {backgroundImage: 'url(' + this.props.img + ')'}}), 
                React.createElement("div", {className: "carousel-caption"}, 
                    React.createElement("h3", null, this.props.title), 
                    React.createElement("p", null, this.props.description)
                )
            )
        );
    }
});


var Carousel = React.createClass({displayName: "Carousel",

    getInitialState: function(){
        return {
            id: this.props.id || ('carousel-' + generateUUID())
        };
    },

    getId: function(){
        return this.state.id;
    },

    render: function(){
        var id = this.getId();

        //<div className="fluid-container">
        //    <div className="row">
        // style={{marginLeft: '-12px', marginRight: '-12px'}}
        return (
            React.createElement("div", {id: id, className: "carousel slide", "data-ride": "carousel"}, 
                React.createElement("ol", {className: "carousel-indicators"}, 
                    this.props.items.map(this.renderControls)
                ), 
                React.createElement("div", {className: "carousel-inner", role: "listbox"}, 
                    this.props.items.map(this.renderItem)
                ), 
                React.createElement("a", {className: "left carousel-control", href: '#' + id, role: "button", "data-slide": "prev"}, 
                    React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"}), 
                    React.createElement("span", {className: "sr-only"}, "Previous")
                ), 
                React.createElement("a", {className: "right carousel-control", href: '#' + id, role: "button", "data-slide": "next"}, 
                    React.createElement("span", {className: "glyphicon glyphicon-chevron-right", "aria-hidden": "true"}), 
                    React.createElement("span", {className: "sr-only"}, "Next")
                )
            )
        )
    },

    renderControls: function(item, idx){
        var className = "";
        if (idx == 0){
            className = "active";
        }
        return  React.createElement("li", {key: idx, "data-target": '#' + this.getId(), "data-slide-to": idx, className: className})
    },

    renderItem: function(item, idx){
        return React.createElement(CarouselItem, React.__spread({key: idx, active: idx==0},  item))
    }
});




var URLFetcher = {

    isRefreshing: function(){
        if (!this.state){
            return false;
        }
        return this.state.isFetching;
        //return !this.state.url || !this.state.data || (this.state.url !== this.state.targetUrl);
    },

    // TODO : change model to only query if there is no pending request...
    // buffer url to query for when it finished
    fetchUrl: function(url){
        var state = this.state || {};
        if (url === state.url) {
            // Already fetched
            if (url !== state.targetUrl){
                this.setState({targetUrl: url});
            }
            return;
        }

        if (url === this.targetUrl){
            // Current fetching...
            return;
        }

        if (!url){
            return;
        }

        console.log('fetch', url);
        $.ajax({
            dataType: "json",
            url: url,
            success: function(data)  {
                // Check if component is still alive
                if (!this.isMounted()){
                    return;
                }
                if (url !== this.state.url){
                    // Url has changed, abort
                    return;
                }
                this.setState({
                    url:url,
                    rawData: data,
                    data:data,
                    isFetching: false
                });
                if (this.onDataUpdated){
                    this.onDataUpdated(data);
                }
            }.bind(this),
            error: function(msg)  {
                console.warn('FetchURL failed', msg);
            }
        });

        this.setState({
            url:url,       // Url we want
            targetUrl: url,  // Url we are fetching
            isFetching: true
        });
    }
};



var Radios = React.createClass({displayName: "Radios",

    getDefaultProps:function(){
        return {
            values: []
        }
    },

    onChange: function(value){
        if (this.props.onChange){
            this.props.onChange(this.props.type, value);
        }
    },

    render: function(){
        console.log(this.props);
        return (
            React.createElement("div", null, 
                this.props.values.map(this.renderOption)
            )
        );
    },

    renderOption: function(v){
        var label = v;
        if (this.props.formatter){
            label = this.props.formatter(v);
        }
        var checked = this.props.value == v;
        var onChange = function(e)   {return this.onChange(v);}.bind(this);
        return (
            React.createElement("label", {key: v, className: "radio-inline"}, 
                React.createElement("input", {type: "radio", name: this.props.name, value: v, checked: checked, onChange: onChange}), " ", label
            )
        );
    }
});

var Image = React.createClass({displayName: "Image",
    render: function(){
        return React.createElement("img", React.__spread({},   this.props, {style: {width: this.props.width, display: 'block', marginLeft: 'auto', marginRight: 'auto'}}));
    }
});


var Tabs = React.createClass({displayName: "Tabs",
    propTypes: {
        tabStyle: React.PropTypes.oneOf(['tabs', 'pills', 'light', 'categories']),
        // tabStyle = categories => show title with content rather than tabs
    },

    getDefaultProps: function(){
        return {
            tabStyle: 'tabs',
            lazy: false,
            onChangeTab: undefined
        }
    },

    getInitialState: function () {
        var defaultTab = this.props.defaultTab;
        var tabs = this.props.tabs;
        if (tabs && tabs.length > 0){
            defaultTab = tabs[0].id;
        }
        var closedTabs = {};
        return {
            tab: defaultTab,
            closedTabs:closedTabs
        };
    },

    isCategories:function(){
        return this.props.tabStyle === "categories"
    },

    onSelectTab: function (e, tabId,idx) {
        e.stopPropagation();
        e.preventDefault();
        if (tabId != this.state.tab){
            this.setState({ tab: tabId });
            if (this.props.onChangeTab){
                this.props.onChangeTab(idx);
            }
        }
    },

    currentTab:function(){
        for(var i=0; i<this.props.tabs.length; i++){
            var tab = this.props.tabs[i];
            if (tab.id === this.state.tab){
                return tab;
            }
        }
        return undefined;
    },

    toggleTab:function(id){
        var closedTabs = this.state.closedTabs;
        closedTabs[id] = !closedTabs[id];
        this.setState({closedTabs:closedTabs});
    },


    render:function() {
        var $__0=     this.props,tabLeft=$__0.tabLeft,tabRight=$__0.tabRight;

        if (!this.isCategories() && (tabLeft || tabRight)){
            return this.renderLeftOrRight();
        } else {
            return (
                React.createElement("div", null, 
                    this.renderTabHeader(), 
                    React.createElement("div", {className: "tab-content"}, 
                        this.renderTabContent()
                    )
                )
            );
        }
    },

    renderLeftOrRight:function(){
        var $__0=     this.props,tabLeft=$__0.tabLeft,tabRight=$__0.tabRight;
        var tabs = (
            React.createElement(Col, {md: 3}, 
                this.renderTabHeader()
            )
        );
        var tabContent = (
            React.createElement(Col, {md: 9}, 
                React.createElement("div", {className: "tab-content"}, 
                    this.renderTabContent()
                )
            )
        );
        var fragment; // Fragment links key to value and preserves order.
        if (tabLeft || !tabRight){ // If non specified, tab left
            fragment = React.addons.createFragment({tabs:tabs, tabContent:tabContent});
        } else {
            fragment = React.addons.createFragment({tabContent:tabContent, tabs:tabs});
        }
        return React.createElement(Row, null, fragment);
    },

    renderTabHeader:function(){
        if (this.isCategories()){
            return undefined; // No header
        }
        var $__0=        this.props,justified=$__0.justified,tabStyle=$__0.tabStyle,tabs=$__0.tabs,tabLeft=$__0.tabLeft,tabRight=$__0.tabRight;
        var navClass = "nav nav-" + tabStyle;
        if (justified) navClass += " nav-justified";
        if (tabLeft) navClass += " nav-left";
        if (tabRight) navClass += " nav-right";
        return (
            React.createElement("ul", {className: navClass, role: "tablist"}, 
                tabs.map(this.renderTab), 
                this.renderPlusButtton(), 
                this.props.children
            )
        );
    },

    renderTab: function(tab, idx){
        var active = tab.id === this.state.tab;
        return (
            React.createElement("li", {key: idx, role: "tab", className: active ? "active": ""}, 
                React.createElement("a", {href: "#", "aria-controls": tab.id, role: "tab", onClick: function(e)  {return this.onSelectTab(e, tab.id, idx);}.bind(this)}, tab.label)
            )
        )
    },

    renderPlusButtton: function(){
        if (!this.props.onClickPlus){
            return undefined;
        }
        return (
            React.createElement("li", null, 
                React.createElement(Button, {bsStyle: "primary", bsSize: "sm", onClick: this.props.onClickPlus, style: {margin: '4px'}}, "+")
            )
        )
    },

    renderTabContent: function(){
        if (this.props.lazy && !this.isCategories()){
            return this.renderTabPanel(this.currentTab(), 0);
        } else {
            return this.props.tabs.map(this.renderTabPanel);
        }
    },

    renderTabPanel: function(tab, idx){
        var className, role;
        if (!this.isCategories()){
            var active = tab.id === this.state.tab;
            var cx = React.addons.classSet;
            className = cx({
                "tab-pane": true,
                active:active
            });
            role="tabpanel";
        }
        var renderer = tab.render || this.props.tabContentRenderer;
        return (
            React.createElement("div", {key: idx, className: className, role: role}, 
                this.renderCategoryTitle(tab), 
                this.state.closedTabs[tab.id] ? undefined : renderer(tab.id)
            )
        )
    },

    renderCategoryTitle:function(tab){
        if (!this.isCategories()) {
            return undefined;
        }
        var icon = this.state.closedTabs[tab.id] ? "chevron-right" : "chevron-down";
        return (
            React.createElement("div", {className: "collapsable", onClick: function()  {return this.toggleTab(tab.id);}.bind(this)}, 
                React.createElement("h4", {style: {marginTop: 16}}, React.createElement("a", {href: "#"}, React.createElement(FAIcon, {icon: icon, alignRight: true}), tab.label))
            )
        );
    }
});



var SplitPane = React.createClass({displayName: "SplitPane",
    render: function(){
        return (
            React.createElement("div", {className: this.props.fillParent ? "fill-parent" : "", style: {display: 'table', width: '100%'}}, 
                React.createElement("div", {className: "left-pane", style: {width: this.props.leftWidth, maxWidth: this.props.leftWidth}}, 
                    this.props.children[0]
                ), 
                this.renderRight()
            )
        )
    },

    renderRight:function(){
        if (this.props.children.length <= 1){
            return undefined;
        }
        var isVisible = this.props.leftWidth !== "100%";
        return (
            React.createElement("div", {className: "right-pane", style: {display: (isVisible ? undefined : "none")}}, 
                this.props.children[1]
            )
        );
    }
});

var Container = React.createClass({displayName: "Container",
    render:function(){
        var $__0=     this.props,className=$__0.className,style=$__0.style;
        if (!className) className = "";
        className += " fluid-container";
        return React.createElement("div", {className: className, style: style}, this.props.children);
    }
});


var Row = React.createClass({displayName: "Row",
    render:function(){
        var className = "row";
        if (this.props.className){
            className += " " + this.props.className;
        }
        return React.createElement("div", React.__spread({},  this.props, {className: className}), this.props.children);
    }
});

var Col = React.createClass({displayName: "Col",

    computeClass:function(name){
        var className = "";
        if (this.props[name]){
            className += "col-" + name + "-" + this.props[name] + " ";
        }
        if (this.props[name + "Offset"]){
            className += "col-" + name + "-offset-" + this.props[name + "Offset"] + " ";
        }
        return className;
    },

    render:function(){
        var $__0=      this.props,className=$__0.className,animate=$__0.animate,small=$__0.small;
        var sizes = ["xs", "sm", "md", "lg"];
        var classes = sizes.map(this.computeClass).filter(function(x)  {return x != "";});
        if (className) classes.push(className);
        if (animate) classes.push("col-animate");
        if (small) classes.push("col-small");
        return React.createElement("div", React.__spread({},  this.props, {className: classes.join(" ")}), this.props.children);
    }
});

var Table = React.createClass({displayName: "Table",
    render:function(){
        var props = this.props;
        var cx = React.addons.classSet;
        var classes = {
            "table": true,
            "table-condensed": props.condensed,
            "table-striped": props.striped,
            "table-bordered": props.bordered,
            "table-hover": props.hover
        };
        var className = props.className || "";
        className += " " + cx(classes);
        var style = jQuery.extend(false, {clear: 'both'}, this.props.style);
        var table = (
            React.createElement("table", {className: className, style: style}, 
                props.children
            )
        );
        if (props.responsive){
            return React.createElement("div", {className: "table-responsive"}, table);
        } else {
            return table;
        }
    }
});



var SortableDataTable = React.createClass({displayName: "SortableDataTable",

    getInitialState:function(){
        return {
            sortColumn: this.props.sortColumn,
            sortOrder : this.props.sortOrder || "asc"
        }
    },

    getDefaultProps:function(){
        return {
            items: []
        }
    },

    sort:function(items){
        var column = this.state.sortColumn;
        if (!column){
            return items;
        }
        var order = this.state.sortOrder === "asc" ? 1 : -1;
        return items.sort(function(objA, objB)  {
            var a = objA[column], b = objB[column];
            a = (a || (a === 0)) ? (a+"").toLowerCase() : "";
            b = (b || (b === 0)) ? (b+"").toLowerCase() : "";
            return order * a.localeCompare(b);
        });
    },

    orderBy:function(id){
        if (id === this.state.sortColumn){
            var sortOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
            this.setState({sortOrder:sortOrder});
        } else {
            this.setState({
                sortColumn: id,
                sortOrder: "asc"
            });
        }
    },

    render:function(){
        var items = this.sort(this.props.items);
        return React.createElement(DataTable, React.__spread({},  this.props, {items: items},  this.state, {onHeaderClick: this.orderBy}));
    }
});

var DataTable = React.createClass({displayName: "DataTable",

    getDefaultProps:function(){
        return {
            items: []
        }
    },

    getColumns:function(){
        var props = this.props;
        if (props.columns){
            return props.columns;
        }
        if (props.model){
            return props.model.fields.slice(0, 4).map(function(f)  {return {id: f.name, label: f.name}});
        }
        return undefined;
    },

    handleClick:function(e, id){
        if (this.props.onHeaderClick){
            e.preventDefault();
            this.props.onHeaderClick(id);
        }
    },

    render:function(){
        var columns = this.getColumns();
        if (!columns) {
            return false;
        }
        var scrollStyle;
        if (this.props.maxHeight) {
            scrollStyle = {
                maxHeight: this.props.maxHeight,
                overflowY: "scroll"
            };
        }
        // Render the table header twice to have the whole table scroll with the header on top
        return (
            React.createElement("div", {style: scrollStyle}, 
                React.createElement(Table, {condensed: true, striped: true, bordered: this.props.bordered, className: "table-info", hover: true}, 
                    React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        columns.map(function(col)  {return this.renderHeader(col);}.bind(this))
                    )
                    ), 
                    React.createElement("tbody", null, 
                    this.props.items.map(function(item, idx)  {return this.renderLine(columns, item, idx);}.bind(this))
                    )
                )
            )
        );
    },

    renderHeader:function(column){
        var $__0=     this.props,sortColumn=$__0.sortColumn,sortOrder=$__0.sortOrder;
        var isSort = sortColumn === column.id;
        var iconStyle = {visibility: (isSort ? undefined : "hidden")};
        var icon = React.createElement(FAIcon, {icon: sortOrder === "asc" ? "caret-up" : "caret-down", style: iconStyle});
        return React.createElement("th", {className: "sortable", onClick: function(e)  {return this.handleClick(e, column.id);}.bind(this)}, column.label, icon)
    },

    renderLine:function(columns, item, idx){
        var mapper = this.props.mapper || (function(col, item)  {return item[col];});
        return (
            React.createElement("tr", {key: idx}, 
                columns.map(function(col)  {return React.createElement("td", null, mapper(col.id, item));})
            )
        )
    }
});


