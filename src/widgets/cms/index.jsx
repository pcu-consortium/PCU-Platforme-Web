
import WidgetManager from '../widget-manager';
import * as textWidgets from './text-widgets';
import * as featureWidgets from './feature-widgets';
import * as imageWidgets from './image-widgets';
import * as cmsWidgets from './cms-widgets';
import RSSWidget from './rss-widget';
import GridWidget from './grid-widget';
import VideoWidget from './video-widget';
import MosaicMenu from './mosaic-widget';
import Sitemap from './sitemap-widget';
import BlockQuote from './block-quote-widget';
import { PanelListItem } from 'components/ui';
import { renderWidget } from 'widgets/core/cms';
import WidgetMixin from 'widgets/widget-mixin';
const nl2br = require('react-nl2br');


var PDFWidget = React.createClass({
    getDefaultProps: function(){
        return {
            height: '600px'
        }
    },

    render: function(){
        //var filename = this.props.filename;
        var file = this.props.file;
        var src = this.props.src || file; //"http://demo.armadillolab.fr/libs/pdfjs/viewer.html?file=" + filename;        
        return (
            <div style={{height: this.props.height, position: 'relative'}}>
                <iframe  className="fullscreen-iframe" name="pdf-frame" src={src} width="100%" height="100%" />
            </div>
        );
    }
});


var TextAreaWidget = React.createClass({
    getDefaultProps: function(){
        return {
            height: '600px'
        }
    },

    render: function(){
        return (
            <textarea style={{width: '100%'}} className="boxsizingBorder" rows="10" />
        );
    }
});

var ToolbarWidget = React.createClass({
    render: function(){
        var children = this.props.children || [];
        var children = children.map(this.renderChild);
        return <ButtonToolbar {...this.props}>{children}</ButtonToolbar>
    },

    renderChild: function(child, idx){
        var widget = renderWidget({key: idx,  widget: child, parent: this.props.widget, master: this.props.master});
        // Wrap buttons in a solo button group
        if (child.type === "Button"){
            var props = {};
            props.alignLeft = child.alignLeft;
            props.alignRight = child.alignRight;
            return <ButtonGroup key={idx} {...props}>{widget}</ButtonGroup>;
        }
        return widget;
    }
});

var ButtonGroupWidget = React.createClass({
    render: function(){
        var children = this.props.children || [];
        var children = children.map(this.renderChild);
        return <ButtonGroup {...this.props}>{children}</ButtonGroup>
    },

    renderChild: function(child, idx){
        return renderWidget({key: idx,  widget: child, parent: this.props.widget, master: this.props.master});
    }
});

var MenuHeaderWidget = React.createClass({
    render(){
        return <MenuHeader {...this.props}>{this.props.label}</MenuHeader>;
    }
});

var MenuItemWidget = React.createClass({
    render(){
        return <MenuItem {...this.props}>{this.props.label}</MenuItem>;
    }
});

var MenuDividerWidget = React.createClass({
    render(){
        return <MenuDivider {...this.props} />;
    }
});

var ButtonWidget = React.createClass({
    mixins : [WidgetMixin],
    handleClick() {
        var win = window.open("http://localhost:3000/agora/page/"+this.props.newpage, '_blank');
        win.focus();
    },
    render(){
        var {style} = this.props;
        if( (typeof style !== "object") && (style !== null) ) {
            console.warn('invalid style', style);
            style = undefined;
        }
        return <Button {...this.props}  onClick={this.handleClick} style={this.props.style}>{this.props.label}</Button>;
        //return <Button {...this.props}  href={this.context.baseUrl+this.props.newpage} >{this.props.label}</Button>;
    }
});

var DropdownButtonWidget = React.createClass({

    getDefaultProps(){
        return {children: []};
    },

    render(){
        var children = this.props.children.map(this.renderChild);
        return (
            <DropdownButton {...this.props} title={this.props.label}>
                {children}
            </DropdownButton>
        );
    },

    renderChild: function(child, idx){
        return renderWidget({key: idx,  widget: child, parent: this.props.widget, master: this.props.master});
    }
});


var WidgetUrlMixin = {

    makeUrl: function(props){
        var url = props.url;
        if ((typeof url) != "string") url = ""; // Ensure that we have a string...
        var query = props.query;
        if (query){
            var queries = [];
            for(var key in query){
                if (query.hasOwnProperty(key)){
                    queries.push(key + "=" + encodeURIComponent(query[key]));
                }
            }
            if (queries.length > 0){
                var joinChar = (url.indexOf('?') == -1) ? "?" : ":";
                url += joinChar + queries.join("&");
            }
        }
        return url;
    },

    componentWillReceiveProps: function(nextProps){
        this.fetchUrl(this.makeUrl(nextProps));
    },

    componentDidMount: function(){
        this.fetchUrl(this.makeUrl(this.props));
    },

    getData: function(data){
        //console.log(this.props.items, this.state);
        var data = data || this.props.items;
        if (this.state && this.state.data){
            data = this.state.data;
            if (!Array.isArray(data) && data.items){
                data = data.items;
            }
        }
        return data || [];
    }
};



var MultiPanelListWidget = React.createClass({
    render(){
        var bb={title:"123", subtitle:"1213"};
        var number=1;
        if (this.props.number)
        {
            var number=parseInt(this.props.number , 10 );
        }
        //var options=Array.apply(null, Array(this.props.number)).map(this.renderItem);
        //var options=Array.apply(null, Array(number)).map(Number.prototype.valueOf,bb);
        var options = new Array(number);
        options.fill(bb);
        return (
            <PanelList>
                {options.map(this.renderItem)}
            </PanelList>
        );
    },

    renderItem(it, idx){
        var onClick;
        onClick = () => {
                /*
                if (WidgetManager){
                    WidgetManager.updateFieldValue("PanelList", this.props.id, "selected", it);
                    WidgetManager.updateFieldValue("PanelList", this.props.id, "selectedIndex", idx);
                    this.setState({
                        selected: idx
                    });
                }*/

            };
        
        return (
            <PanelListItem {...it} onClick={onClick} />
        );
    }
});

var PictureWidget = React.createClass({

  render(){
        //console.log("photo props:",this.props);
        var imageurl=   this.props.src ||this.props.file|| "https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif";
        //imageurl="/files/userPhoto14545953365972.PNG"
        //console.log('image:',imageurl);
        var imagealign=this.props.textalign||"left"
        var width=this.props.width||"100%"
        //var imagestyle = this.props.style
        //var textverticalalign = this.props.vertical||"text-top"
        var texthorizontalalign = this.props.imagealign||"left"
        var text= (this.props.text||"")//.replace(/(?:\r\n|\r|\n)/g, '<br/>')
        var textcolor= this.props.color||"Black"
        var fontsize= this.props.fontsize||"100%"
        var fontweight= this.props.fontweight||"normal"
        var fontfamily= this.props.fontfamily||"serif"
        var fontstyle= this.props.fontstyle||"normal"

        var isimage= this.props.image
        //console.log(isimage);
/*
        
        if((typeof imagestyle !== "object") && (imagestyle !== null) ) {
            //console.warn('invalid style', imagestyle);
            imagestyle = undefined;
        }
*/
        var textstyle;
        var imagestyle;
        var rendertext;
        //if (texthorizontalalign=="text-left")
        imagestyle={float:texthorizontalalign};
        textstyle={color:textcolor,fontSize:fontsize,fontWeight:fontweight,fontFamily:fontfamily,fontStyle:fontstyle};
        /*
        rendertext=(
            <div style={textstyle}>
                {text}
            </div>
        );*/
        if (isimage){
        return (
                    <div style={{textAlign:imagealign}}>
                    <div style={textstyle}><img style={imagestyle} src={imageurl}  width={width}/>{nl2br(text)}</div>
                    </div>
        );        
        }
        else{
        return (
                    <div style={{textAlign:imagealign}}>
                    <div style={textstyle}>{nl2br(text)}</div>
                    </div>
        );                    
        }
        /*
        var {style} = this.props;
        if( (typeof style !== "object") && (style !== null) ) {
            console.warn('invalid style', style);
            style = undefined;
        }
        return <Button {...this.props}  onClick={this.handleClick} style={this.props.style}>{this.props.label}</Button>;
*/

  }
});



var PanelListWidget = React.createClass({
    mixins: [URLFetcher, WidgetUrlMixin],

    getInitialState(){
        return {
            selected: this.props.defaultSelectedIndex || -1
        };
    },

    getDefaultProps(){
        return {
            defaultSelectedIndex: undefined,
            items: []
        }
    },

    onDataUpdated(data){
        console.log('onDataUpdated');
        // Warning : state hasn't been updated yet !!
        data = this.getData(data); // Please fix this crap :p
        var selectedIdx = this.props.defaultSelectedIndex;
        if (this.props.defaultSelectedIndex === undefined){
            selectedIdx = -1;
        }
        this.setState({
            selected: selectedIdx
        });
        console.log(selectedIdx);
        if (selectedIdx !== -1){
            WidgetManager.updateFieldValue("PanelList", this.props.id, "selected", data[selectedIdx]);
            WidgetManager.updateFieldValue("PanelList", this.props.id, "selectedIndex", selectedIdx);
        } else {
            WidgetManager.updateFieldValue("PanelList", this.props.id, "selected", undefined);
            WidgetManager.updateFieldValue("PanelList", this.props.id, "selectedIndex", undefined);
        }
    },

    render(){
        //return false;
        var {title, bsStyle, icon, maxHeight} = this.props;
        var panel = {
            title, bsStyle, icon, maxHeight
        };
        var data = this.getData();
        if (!Array.isArray(data)){
            data = [];
        }

        return (
            <PanelList {...panel}>
                {data.map(this.renderItem)}
            </PanelList>
        );
    },

    renderItem(it, idx){
        var onClick;
        if (this.props.selectable || (this.props.defaultSelectedIndex != undefined)){
            onClick = () => {
                if (WidgetManager){
                    WidgetManager.updateFieldValue("PanelList", this.props.id, "selected", it);
                    WidgetManager.updateFieldValue("PanelList", this.props.id, "selectedIndex", idx);
                    this.setState({
                        selected: idx
                    });
                }
            };
        }
        return (
            <PanelListItem key={idx} {...it} onClick={onClick} active={idx == this.state.selected} />
        );
    }
});

var DataWidget = React.createClass({
    mixins: [ URLFetcher ],

    appendQueryString(url, query){
        var queryString = "";
        if (query){
            var queries = [];
            for(var key in query){
                if (query.hasOwnProperty(key)){
                    queries.push(key + "=" + encodeURIComponent(query[key]));
                }
            }
            if (queries.length > 0){
                var joinChar = (url.indexOf('?') == -1) ? "?" : ":";
                queryString += joinChar + queries.join("&");
            }
        }
        return url + queryString;
    },

    makeUrl: function(props){
        if ((typeof props.url) !== "string") return undefined;
        console.log(props);
        var url = this.appendQueryString(props.url, props.query);
        console.log(url);
        if (props.format === "xml"){
            url = this.appendQueryString("/test/api/jsonify", {
                url, format: "xml"
            });
        } else if (url.indexOf('http://') != -1){
            url = "/test/api/url" + '?url=' + encodeURIComponent(url);
        }
        console.log(url);
        return url;
    },

    componentWillReceiveProps: function(nextProps){
        this.fetchUrl(this.makeUrl(nextProps));
    },

    componentDidMount: function(){
        this.fetchUrl(this.makeUrl(this.props));
    },

    getData: function(data){
        //console.log(this.props.items, this.state);
        var data = data || this.props.items;
        if (this.state && this.state.data){
            data = this.state.data;
            if (!Array.isArray(data) && data.items){
                data = data.items;
            }
        }
        return data || [];
    },

    onDataUpdated(data){
        WidgetManager.updateFieldValue("Data", this.props.id, "rawData", data);
        //WidgetManager.updateFieldValue("Data", this.props.id, "data", data);
    },

    render(){
        return false;
    }
});


var PageListWidget = React.createClass({
    render(){
        var request = require('sync-request');
        var res = request('GET', '/campus/api/cms/allpage');
        var pagelist=JSON.parse(res.getBody());    
        return (
            <div>
                {
                    pagelist.map(
                        function(item,idx){
                            return(
                                <div> <a target="_blank" href={'/campus/page/'+item.pageId}>{item.pageId}</a></div>
                            )
                        }
                    )
                }
            </div>
        );
    },
});




WidgetManager.registerWidget("Data", {
    component: DataWidget,
    icon: "database",
    isDataWidget: true, // Not visible in editor
    properties: { // special properties...
        data: {type: 'var', name: 'rawData'}
    },
    config: [
        {key: "url", type: "input"}
    ]
});

WidgetManager.registerWidget("Toolbar", {
    component: ToolbarWidget,
    icon: "ellipsis-h",
    config: [
        {key: "theme", type: "selector", values: ["clear", "shadow"]},
        {key: "bsSize", type: "selector", values: ["xs", "sm", "md", "lg"]}
    ],
    defaultValue: {type: 'Toolbar', bsSize: "md", children: [
        {type: 'ButtonGroup', children: [
            {type: 'Button', faIcon: 'heart'},
            {type: 'Button', faIcon: 'cogs'}
        ]}
    ]}
});

WidgetManager.registerWidget("ButtonGroup", {
    component: ButtonGroupWidget,
    config: [
        {key: "bsSize", type: "selector", values: [undefined, "xs", "sm", "md", "lg"]}
    ],
    defaultValue: {type: 'ButtonGroup', children: [
        {type: 'Button', faIcon: 'heart'},
        {type: 'Button', faIcon: 'cogs'}
    ]}
});

WidgetManager.registerWidget("Button", {
    component: ButtonWidget,
    config: [
        {key: "label", type: "input"},
        {key: "icon", type: "input"}
    ],
    defaultValue: {type: 'Button', icon: 'cogs'}
});


WidgetManager.registerWidget("PictureText", {
    component: PictureWidget,
    config: [
        {key: "text",  type: "textarea"},
        {key: "image",  type: "boolean"},
        {key: "src",   type: "input"},
        {key: "file",   type: "filereader"},
        {key: "width",   type: "input"},
        {key: "textalign",  type: "selector", values: ["left", "center", "right"]},
        {key: "imagealign",  type: "selector", values: ["left", "right"]},
        {key: "color",  type: "selector", values: ["Black","AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]},
        {key: "fontsize",  type: "selector", values: ["100%", "150%","200%","250%","300%","350%","400%","90%","80%","70%","60%","50%","40%","30%","20%","10%"]}, 
        {key: "fontweight",  type: "selector", values: ["normal", "lighter","bold"]},
        {key: "fontfamily",  type: "selector", values: ["serif", "sans-serif","monospace","cursive","fantasy","Arial, Helvetica, sans-serif","'Arial Black', Gadget, sans-serif","'Arial Narrow', sans-serif","Verdana, Geneva, sans-serif","Georgia, serif","'Times New Roman', Times, serif","'Trebuchet MS', Helvetica, sans-serif","'Courier New', Courier, monospace","Impact, Charcoal, sans-serif","'Comic Sans MS', cursive","Tahoma, Geneva, sans-serif","Courier, monospace","'Lucida Sans Unicode', 'Lucida Grande', sans-serif","'Lucida Console', Monaco, monospace","Garamond, serif","'MS Sans Serif', Geneva, sans-serif","'MS Serif', 'New York', sans-serif","'Palatino Linotype', 'Book Antiqua', Palatino, serif","Symbol, sans-serif","'Bookman Old Style', serif"]},
        {key: "fontstyle",  type: "selector", values: ["normal", "italic","oblique"]},
    ]
}
);



WidgetManager.registerWidget("DropdownButton", {
    component: DropdownButtonWidget,
    config: [
        {key: "label", type: "input"},
        {key: "icon", type: "input"}
    ],
    defaultValue: {type: 'DropdownButton', icon: 'cogs'}
});

WidgetManager.registerWidget("MenuHeader", {
    component: MenuHeaderWidget,
    config: [
        {key: "label", type: "input"}
    ],
    defaultValue: {type: 'MenuHeader', label: 'Header'}
});

WidgetManager.registerWidget("MenuItem", {
    component: MenuItemWidget,
    config: [
        {key: "label", type: "input"},
        {key: "eventKey", type: "input"},
        {key: "href", type: "input"}
    ],
    defaultValue: {type: 'MenuItem', label: 'Action', eventKey: 'action'}
});

WidgetManager.registerWidget("MenuDivider", {
    component: MenuDividerWidget,
    config: [
    ]
});

WidgetManager.registerWidget("PDF", {
    component: PDFWidget,
    icon: "file-pdf-o",
    config: [
        {key: "file",   type: "filereader"},
        {key: "height", type: "input"},
        {key: "src", type: "input"}
    ],
    defaultValue: {type: 'PDF', height: '500px'}
});

WidgetManager.registerWidget("TextArea", {
    component: TextAreaWidget,
    config: [
        {key: "defaultValue", type: "input"}
    ]
});



WidgetManager.registerWidget("MultiPanelList", {
    component: MultiPanelListWidget,
    config: [
    ]
});


WidgetManager.registerWidget("PanelList", {
    component: PanelListWidget,
    icon: "list-alt",
    config: [
        {key: "title", type: "input"},
        {key: "url",   type: "input"},
        {key: "icon", type: "icon"},
        {key: "bsStyle",  type: "selector", values: ["default", "primary", "info", "success", "warning", "danger"]},
    ],
    defaultValue: {type: 'PanelList', title: "Title", items: [{title: 'Item1', subtitle: 'Descritpion1'}]}
});

WidgetManager.registerWidget("PageList", {
    component: PageListWidget
});


module.exports = {
    MosaicMenu,
    DataWidget,
    BlockQuote,
    ...textWidgets,
    ...featureWidgets,
    ...imageWidgets,
    ...cmsWidgets,
    Sitemap,
    RSSWidget,
    Image,
    BlockQuote,
    MosaicMenu,
    ToolbarWidget,ButtonGroupWidget,ButtonWidget,DropdownButtonWidget,
    MenuHeaderWidget,MenuItemWidget,MenuDividerWidget,
    PDFWidget,
    TextAreaWidget,
    VideoWidget,
    PanelListWidget,
    PageListWidget
};