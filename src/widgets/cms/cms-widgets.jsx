
import WidgetManager from '../widget-manager';
import GridWidget from './grid-widget';

var IconWithText = React.createClass({
    getDefaultProps: function(){
        return {
            backIcon: 'circle'
        }
    },

    render: function () {

        return (
            <div>
                <FAStack back={this.props.backIcon} front={this.props.icon} color={this.props.iconColor} size="80px" />
                <br />
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
});


var TextBubble = React.createClass({

    getDefaultProps: function(){
        return {
            pixelSize: '260px',
            imgSize: '96px'
        }
    },

    render: function () {
        var props = this.props;
        var style = props.style || {};
        style.width = props.pixelSize;
        style.height = props.pixelSize;
        style.borderRadius = '50%';
        style.borderColor = '#ddd';
        style.backgroundColor = '#fff';
        style.overflow = 'hidden';
        style.margin = 'auto';
        style.paddingTop = '32px';
        style.backgroundColor = this.props.circleColor;
        if (props.borderColor){
            style.borderColor = props.borderColor;
            style.borderWidth = '2px';
            style.borderStyle = 'solid';
        }


        return (
            <div style={{color: this.props.textColor, paddingTop: '16px', paddingBottom: '16px'}}>
                <div style={style}>
                    <FAIcon fa={props.icon} color={props.iconColor} size={props.imgSize} />
                    <h3 style={{color: this.props.textColor}}>{this.props.title}</h3>
                    <p style={{paddingLeft: '24px', paddingRight: '24px'}}>{this.renderDescription()}</p>
                </div>
            </div>
        )
    },

    renderDescription: function(){
        var description = this.props.description;
        if (description.indexOf("\n") == -1){
            return description;
        }
        var lines = description.split("\n");
        var result = [];
        for(var i=0; i<lines.length; i++){
            if (i != 0){
                result.push(<br key={i*2} />);
            }
            result.push(lines[i]);
        }
        return result;
    }
});

var TextBubbleGrid = React.createClass({
    getDefaultProps: function(){
        return {
            textColor: '#fff',
            circleColor: '#921a22'
        }
    },

    render: function(){
        return (
            <div style={{/*backgroundColor: this.props.textColor, */padding: '16px'}}>
                <GridWidget {...this.props} component={TextBubble} />
            </div>
        )
    }
});

var IconWithTextGrid = React.createClass({
    getDefaultProps: function(){
        return {
            iconColor: '#921a22'
        }
    },

    render: function(){
        return (
            <div className="widget-icon-with-text-grid">
                <GridWidget {...this.props} component={IconWithText} />
            </div>
        )
    }
});



WidgetManager.registerWidget("TextBubbles", {
    component: TextBubbleGrid,
    icon: "circle",
    config: [
        {key: "gridSize", type: "selector", values: ["auto", 1, 2, 3, 4, 6]},
        {key: "textColor",    type: "input"},
        {key: "circleColor",   type: "input"},
        {key: "borderColor",   type: "input"}
    ],
    defaultValue: {
        type: 'TextBubbles',
        items: [
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'},
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'},
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'}
        ],
        gridSize: 3
    }
});

WidgetManager.registerWidget("IconWithText", {
    component: IconWithTextGrid,
    icon: "circle-o",
    config: [
        {key: "gridSize", type: "selector", values: ["auto", 1, 2, 3, 4, 6]},
        {key: "backIcon",    type: "selector", values: ["circle", "square", "square-o"]},
        {key: "iconColor",    type: "input"}
    ],
    defaultValue: {
        type: 'IconWithText',
        items: [
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'},
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'},
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'}
        ],
        gridSize: 3
    }
});
