
var generateUUID = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};



var ButtonToolbar = React.createClass({
    render: function(){
        var classes = "btn-toolbar";
        if (this.props.theme && (this.props.theme != "clear")){
            classes += " toolbar-" + this.props.theme;
        }
        return (
            <div className={classes} role="toolbar" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
});


var ButtonGroup = React.createClass({

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
            <div className={className} role="group" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
});

var RadioGroup = React.createClass({
    render: function(){
        return (
            <div className="btn-group" role="group">
                {this.props.children}
            </div>
        )
    }
});

var Glyphicon = React.createClass({
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
            <span {...this.props} className={cls} aria-hidden="true">
                {this.props.children}
            </span>
        );
    }
});

var FAIcon = React.createClass({
    propTypes: {
        fa: React.PropTypes.string
    },

    render: function () {
        var props = this.props;
        var { spin, inverse, li, className, stack, defaultWidth, alignRight, color, size } = this.props;
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
            <span {...props} className={cx(classes)} aria-hidden="true" style={style}>
                {props.children}
            </span>
        );
    }
});

var FAStack = React.createClass({
    render: function(){
        var back = this.props.back;
        var inverse = ((back == "circle") || (back == "square")) && !this.props.inverse;
        var stackStyle = {
            fontSize: this.props.size,
            color: this.props.color
        };
        return (
            <span className="fa-stack fa-lg" style={stackStyle}>
                <FAIcon fa={this.props.back} stack="2x" color={this.props.backColor}  />
                <FAIcon fa={this.props.front} inverse={inverse} stack="1x" />
            </span>
        );
    }
});

var Button = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],

    getDefaultProps () {
        return {
            bsClass: 'btn',
            bsStyle: 'default',
            bsSize: undefined,
            className: ''
        };
    },

    getSize(){
        if (this.props.bsSize){
            return this.props.bsSize;
        } else if (this.props.parent){
            return this.props.parent.bsSize;
        } else {
            return undefined;
        }
    },

    updateTooltips() {
        $(this.refs.button).tooltip();
        // $(this.refs.button.getDOMNode()).tooltip();
    },

    componentDidMount(){
        if (this.props['data-toggle'] === "tooltip"){
            this.updateTooltips();
        }
    },

    componentDidUpdate(prevProps, prevState){
        if ((this.props['data-toggle'] === "tooltip") || (prevProps['data-toggle'] === "tooltip")){
            this.updateTooltips();
        }
    },

    handleClick(e) {
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

    render() {
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
            <Component ref="button"
                {...this.props} className={cx(classes)} activeClassName={activeClassName} style={style}
                                type={type} role={role} onClick={onClick} >
                {this.renderIcon()} {this.props.children}
            </Component>
        );
    },

    renderIcon: function(){
        var { glyph, glyphSpin, iconSpin, fa, icon } = this.props;
        if (glyph){
            return [<Glyphicon key="icon" glyph={glyph} spin={glyphSpin}/>, " "];
        } else if (this.props.fa || this.props.icon){
            return [<FAIcon key="icon" fa={fa || icon} spin={glyphSpin || iconSpin} />, " "];
        }
        return undefined;
    }
});

var DropdownMenu = React.createClass({
    render(){
        return (
            <ul className="dropdown-menu" role="menu">
                {this.props.children}
            </ul>
        );
    }
});

var MenuHeader = React.createClass({
    render(){
        return <li role="presentation" className="dropdown-header">{this.props.children}</li>
    }
});

var MenuItem = React.createClass({

    handleClick(e){
        console.log(this.props.onSelect);
        if (this.props.onSelect){
            e.preventDefault();
            e.stopPropagation();
            this.props.onSelect(this.props.eventKey);
        }
    },

    render(){
        var href = this.props.href || '#';
        return (
            <li role="presentation" onClick={this.props.onSelect}>
                <a role="menuitem" tabIndex="-1" href={href}>{this.props.children}</a>
            </li>
        );
    }
});

var MenuDivider = React.createClass({
    render(){
        return <li role="presentation" className="divider"></li>;
    }
});

var DropdownButton = React.createClass({

    getInitialState(){
        return {
            open: false
        }
    },

    toggle(){
        this.setState({open: !this.state.open});
    },

    handleSelect(key){
        if (this.props.onSelect){
            this.setState({open: false});
            this.props.onSelect(key);
        }
    },

    render(){

        var caret = <span className="caret"></span>;
        return this.renderGroup([
            <Button key="button" {...this.props} isDropdown onClick={this.toggle}>{this.props.title} {caret}</Button>,
            this.renderDropdown()
        ]);
    },

    renderGroup(children){
        var cx = React.addons.classSet;
        var groupClasses = {
            'open': this.state.open,
            'dropup': this.props.dropup
        };

        return <ButtonGroup className={cx(groupClasses)}>{children}</ButtonGroup>;
    },

    renderDropdown(){
        if (!this.state.open){
            return undefined;
        }
        return (
            <DropdownMenu key="dropdown">
                {this.props.children.map(this.renderItem)}
            </DropdownMenu>
        );
    },

    renderItem(it){
        var clone = React.cloneElement(it, {onSelect: this.handleSelect});
    }
});


var RadioButton = React.createClass({
    getDefaultProps() {
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
            icon = <Glyphicon glyph={this.props.glyph} />
        }
        return (
            <label className={cx(classes)} onChange={this.handleClick}>
                <input
                    type="radio"
                    value={this.props.value}
                    autoComplete="off"
                    checked={this.props.active}
                    onChange={this.handleClick} />
                {icon}
            </label>
        );
    }
});


var SquareImage = React.createClass({
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
            <div style={{position: 'relative'}} onClick={this.props.onClick}>
                <div className="react-center-image" style={imgStyle} />
                <div className="image-overlay" />
            </div>
        )
    }
});

var VideoImage = React.createClass({
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
            <div style={{position: "relative"}}>
                <div className="react-center-image" style={imgStyle}>
                </div>
                <div className="play-image" />
            </div>
        )
    }
});




var ContextMenu = React.createClass({
    render: function(){
        var dividerIdx = 0;
        return (
            <div id={this.props.id}>
                <ul className="dropdown-menu" role="menu">
                    {
                        this.props.items.map(function(item, idx){
                            if (item.header){
                                return (<li key={'header-' + item.header} role="presentation" className="dropdown-header">{item.header}</li>)
                            } else if (!item.label){
                                return (<li key={'divider-' + (dividerIdx++)} role="presentation" className="divider"></li>)
                            } else {
                                return (
                                    <li key={'action-' + item.action} role="presentation">
                                        <a role="menuitem" tabIndex="-1" href="#" data-action={item.action}><Glyphicon glyph={item.glyph} />{item.label}</a>
                                    </li>
                                )
                            }
                        }.bind(this))
                    }
                </ul>
            </div>
        )
    }
    // <div id="folder-context-menu">
    //   <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    //     <li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-action="new"><span class="glyphicon glyphicon-plus"></span>Nouveau dossier</a></li>
    //     <li role="presentation" class="divider"></li>
    //   </ul>
    // </div>

});

var ProgressBar = React.createClass({
    render: function(){
        var progressInt = this.props.progress*100;
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={progressInt} aria-valuemin="0" aria-valuemax="100" style={{width: progressInt+'%'}}>
                </div>
            </div>
        )
    }
});


var Panel = React.createClass({
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
            <div className={'panel panel-' + this.props.bsStyle} {...this.props.style}>
                <div className="panel-heading">
                    <h3 className="panel-title" >{this.props.title}</h3>
                </div>
                <div className={bodyClass}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

var PanelList = React.createClass({
    getDefaultProps(){
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
            <div className={'panel panel-' + this.props.bsStyle} onClick={this.props.onClick}>
                <div className="panel-heading panel-compact">
                    {this.renderTitle()}
                </div>
                <div className={groupClass} style={style}>
                    {this.props.children}
                </div>
            </div>
        )
    },

    renderTitle(){
        var { title, icon } = this.props;
        if (icon){
            return <h3 className="panel-title" ><FAIcon icon={icon}/> {title}</h3>;
        } else {
            return <h3 className="panel-title" >{title}</h3>;
        }
    }
});


var Navbar = React.createClass({
    render: function(){
        var entries = this.props.entries.map(function(e){
            if (e.id == this.props.current){
                return (<li key={e.id} className="active"><a href={e.href}>{e.label}<span className="sr-only">(current)</span></a></li>)
            } else {
                return (<li key={e.id}><a href={e.href}>{e.label}</a></li>)
            }
        }.bind(this));
        return (
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <img className="navbar-brand" style={{padding: '8px'}} src="images/armadillo_white.png"/>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {entries}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <NavbarNotification />
                        </ul>
                        {this.props.children}
                    </div>
                </div>
                <NavbarAlert />
            </nav>
        )
    }
});

var Alert = React.createClass({
    getDefaultProps(){
        return {
            bsStyle: "info"
        }
    },

    render(){
        var className = "alert alert-" + this.props.bsStyle;
        return <div className={className} role="alert">{this.props.children}</div>;
    }
});

var CarouselItem = React.createClass({
    render: function(){
        var className = this.props.active ? "item active" : "item";
        return (
            <div className={className}>
                <div className="carousel-image" style={{backgroundImage: 'url(' + this.props.img + ')'}}></div>
                <div className="carousel-caption">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }
});


var Carousel = React.createClass({

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
            <div id={id} className="carousel slide" data-ride="carousel" >
                <ol className="carousel-indicators">
                    {this.props.items.map(this.renderControls)}
                </ol>
                <div className="carousel-inner" role="listbox">
                    {this.props.items.map(this.renderItem)}
                </div>
                <a className="left carousel-control" href={'#' + id} role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href={'#' + id} role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    },

    renderControls: function(item, idx){
        var className = "";
        if (idx == 0){
            className = "active";
        }
        return  <li key={idx} data-target={'#' + this.getId()} data-slide-to={idx} className={className}></li>
    },

    renderItem: function(item, idx){
        return <CarouselItem key={idx} active={idx==0} {...item} />
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
            success: data => {
                // Check if component is still alive
                if (!this.isMounted()){
                    return;
                }
                if (url !== this.state.url){
                    // Url has changed, abort
                    return;
                }
                this.setState({
                    url,
                    rawData: data,
                    data,
                    isFetching: false
                });
                if (this.onDataUpdated){
                    this.onDataUpdated(data);
                }
            },
            error: msg => {
                console.warn('FetchURL failed', msg);
            }
        });

        this.setState({
            url,       // Url we want
            targetUrl: url,  // Url we are fetching
            isFetching: true
        });
    }
};



var Radios = React.createClass({

    getDefaultProps(){
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
            <div>
                {this.props.values.map(this.renderOption)}
            </div>
        );
    },

    renderOption: function(v){
        var label = v;
        if (this.props.formatter){
            label = this.props.formatter(v);
        }
        var checked = this.props.value == v;
        var onChange = e =>  this.onChange(v);
        return (
            <label key={v} className="radio-inline">
                <input type="radio" name={this.props.name} value={v} checked={checked} onChange={onChange} /> {label}
            </label>
        );
    }
});

var Image = React.createClass({
    render: function(){
        return <img  {...this.props} style={{width: this.props.width, display: 'block', marginLeft: 'auto', marginRight: 'auto'}} />;
    }
});


var Tabs = React.createClass({
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
            closedTabs
        };
    },

    isCategories(){
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

    currentTab(){
        for(var i=0; i<this.props.tabs.length; i++){
            var tab = this.props.tabs[i];
            if (tab.id === this.state.tab){
                return tab;
            }
        }
        return undefined;
    },

    toggleTab(id){
        var closedTabs = this.state.closedTabs;
        closedTabs[id] = !closedTabs[id];
        this.setState({closedTabs});
    },


    render() {
        var { tabLeft, tabRight } = this.props;

        if (!this.isCategories() && (tabLeft || tabRight)){
            return this.renderLeftOrRight();
        } else {
            return (
                <div>
                    {this.renderTabHeader()}
                    <div className="tab-content">
                        {this.renderTabContent()}
                    </div>
                </div>
            );
        }
    },

    renderLeftOrRight(){
        var { tabLeft, tabRight } = this.props;
        var tabs = (
            <Col md={3}>
                {this.renderTabHeader()}
            </Col>
        );
        var tabContent = (
            <Col md={9}>
                <div className="tab-content">
                    {this.renderTabContent()}
                </div>
            </Col>
        );
        var fragment; // Fragment links key to value and preserves order.
        if (tabLeft || !tabRight){ // If non specified, tab left
            fragment = React.addons.createFragment({tabs, tabContent});
        } else {
            fragment = React.addons.createFragment({tabContent, tabs});
        }
        return <Row>{fragment}</Row>;
    },

    renderTabHeader(){
        if (this.isCategories()){
            return undefined; // No header
        }
        var { justified, tabStyle, tabs, tabLeft, tabRight } = this.props;
        var navClass = "nav nav-" + tabStyle;
        if (justified) navClass += " nav-justified";
        if (tabLeft) navClass += " nav-left";
        if (tabRight) navClass += " nav-right";
        return (
            <ul className={navClass} role="tablist">
                {tabs.map(this.renderTab)}
                {this.renderPlusButtton()}
                {this.props.children}
            </ul>
        );
    },

    renderTab: function(tab, idx){
        var active = tab.id === this.state.tab;
        return (
            <li key={idx} role="tab" className={active ? "active": ""}>
                <a href="#" aria-controls={tab.id} role="tab" onClick={e => this.onSelectTab(e, tab.id, idx)}>{tab.label}</a>
            </li>
        )
    },

    renderPlusButtton: function(){
        if (!this.props.onClickPlus){
            return undefined;
        }
        return (
            <li>
                <Button bsStyle="primary" bsSize="sm" onClick={this.props.onClickPlus} style={{margin: '4px'}}>+</Button>
            </li>
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
                active
            });
            role="tabpanel";
        }
        var renderer = tab.render || this.props.tabContentRenderer;
        return (
            <div key={idx} className={className} role={role}>
                {this.renderCategoryTitle(tab)}
                {this.state.closedTabs[tab.id] ? undefined : renderer(tab.id)}
            </div>
        )
    },

    renderCategoryTitle(tab){
        if (!this.isCategories()) {
            return undefined;
        }
        var icon = this.state.closedTabs[tab.id] ? "chevron-right" : "chevron-down";
        return (
            <div className="collapsable" onClick={() => this.toggleTab(tab.id)}>
                <h4 style={{marginTop: 16}}><a href="#"><FAIcon icon={icon} alignRight/>{tab.label}</a></h4>
            </div>
        );
    }
});



var SplitPane = React.createClass({
    render: function(){
        return (
            <div className={this.props.fillParent ? "fill-parent" : ""} style={{display: 'table', width: '100%'}}>
                <div className="left-pane" style={{width: this.props.leftWidth, maxWidth: this.props.leftWidth}}>
                    {this.props.children[0]}
                </div>
                {this.renderRight()}
            </div>
        )
    },

    renderRight(){
        if (this.props.children.length <= 1){
            return undefined;
        }
        var isVisible = this.props.leftWidth !== "100%";
        return (
            <div className="right-pane" style={{display: (isVisible ? undefined : "none")}}>
                {this.props.children[1]}
            </div>
        );
    }
});

var Container = React.createClass({
    render(){
        var { className, style } = this.props;
        if (!className) className = "";
        className += " fluid-container";
        return <div className={className} style={style}>{this.props.children}</div>;
    }
});


var Row = React.createClass({
    render(){
        var className = "row";
        if (this.props.className){
            className += " " + this.props.className;
        }
        return <div {...this.props} className={className}>{this.props.children}</div>;
    }
});

var Col = React.createClass({

    computeClass(name){
        var className = "";
        if (this.props[name]){
            className += "col-" + name + "-" + this.props[name] + " ";
        }
        if (this.props[name + "Offset"]){
            className += "col-" + name + "-offset-" + this.props[name + "Offset"] + " ";
        }
        return className;
    },

    render(){
        var { className, animate, small } = this.props;
        var sizes = ["xs", "sm", "md", "lg"];
        var classes = sizes.map(this.computeClass).filter(x => x != "");
        if (className) classes.push(className);
        if (animate) classes.push("col-animate");
        if (small) classes.push("col-small");
        return <div {...this.props} className={classes.join(" ")}>{this.props.children}</div>;
    }
});

var Table = React.createClass({
    render(){
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
            <table className={className} style={style}>
                {props.children}
            </table>
        );
        if (props.responsive){
            return <div className="table-responsive">{table}</div>;
        } else {
            return table;
        }
    }
});



var SortableDataTable = React.createClass({

    getInitialState(){
        return {
            sortColumn: this.props.sortColumn,
            sortOrder : this.props.sortOrder || "asc"
        }
    },

    getDefaultProps(){
        return {
            items: []
        }
    },

    sort(items){
        var column = this.state.sortColumn;
        if (!column){
            return items;
        }
        var order = this.state.sortOrder === "asc" ? 1 : -1;
        return items.sort((objA, objB) => {
            var a = objA[column], b = objB[column];
            a = (a || (a === 0)) ? (a+"").toLowerCase() : "";
            b = (b || (b === 0)) ? (b+"").toLowerCase() : "";
            return order * a.localeCompare(b);
        });
    },

    orderBy(id){
        if (id === this.state.sortColumn){
            var sortOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
            this.setState({sortOrder});
        } else {
            this.setState({
                sortColumn: id,
                sortOrder: "asc"
            });
        }
    },

    render(){
        var items = this.sort(this.props.items);
        return <DataTable {...this.props} items={items} {...this.state} onHeaderClick={this.orderBy} />;
    }
});

var DataTable = React.createClass({

    getDefaultProps(){
        return {
            items: []
        }
    },

    getColumns(){
        var props = this.props;
        if (props.columns){
            return props.columns;
        }
        if (props.model){
            return props.model.fields.slice(0, 4).map(f => {return {id: f.name, label: f.name}});
        }
        return undefined;
    },

    handleClick(e, id){
        if (this.props.onHeaderClick){
            e.preventDefault();
            this.props.onHeaderClick(id);
        }
    },

    render(){
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
            <div style={scrollStyle}>
                <Table condensed striped bordered={this.props.bordered} className="table-info" hover>
                    <thead>
                    <tr>
                        {columns.map(col => this.renderHeader(col))}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map((item, idx) => this.renderLine(columns, item, idx))}
                    </tbody>
                </Table>
            </div>
        );
    },

    renderHeader(column){
        var { sortColumn, sortOrder } = this.props;
        var isSort = sortColumn === column.id;
        var iconStyle = {visibility: (isSort ? undefined : "hidden")};
        var icon = <FAIcon icon={sortOrder === "asc" ? "caret-up" : "caret-down"} style={iconStyle}/>;
        return <th className="sortable" onClick={e => this.handleClick(e, column.id)}>{column.label}{icon}</th>
    },

    renderLine(columns, item, idx){
        var mapper = this.props.mapper || ((col, item) => item[col]);
        return (
            <tr key={idx}>
                {columns.map(col => <td>{mapper(col.id, item)}</td>)}
            </tr>
        )
    }
});


