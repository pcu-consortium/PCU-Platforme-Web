
import GridWidget from './grid-widget';

var Feature = React.createClass({
    getDefaultProps: function(){
        return {
            backIcon: 'circle'
        }
    },

    render: function () {
        return (
            <div className="features">
                <div className="icon">
                    <FAStack back={this.props.backIcon} front={this.props.icon}
                             color={this.props.iconColor} size={this.props.iconSize} />
                </div>
                <div className="info">
                    {this.renderTitle()}
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    },

    renderTitle: function(){
        var style = {
            color: this.props.iconColor
        };
        if (this.props.link){
            return <h4><a href={this.props.link} style={style}>{this.props.title}</a></h4>;
        }
        return <h4 style={style}>{this.props.title}</h4>;
    }
});



var Features = React.createClass({
    getDefaultProps: function(){
        return {
            iconColor: '#921a22'
        }
    },

    render: function(){
        return (
            <div>
                <GridWidget {...this.props} component={Feature} />
            </div>
        )
    }
});

var FeatureList = React.createClass({

    getDefaultProps: function(){
        return {
            iconSize: '80px',
            listIcon: 'check-square'
        }
    },

    render: function () {
        var props = this.props;
        return (
            <div className="thumbnail">
                <div className="caption">
                    <div className="feature-list">
                        <div style={{display: 'table-cell'}}>
                            <h4>{this.props.title}</h4>
                            <ul className="fa-ul">
                                {this.props.items.map((it, idx) =>
                                        <li key={idx}><FAIcon fa={props.listIcon} li/>{it}</li>
                                )}
                            </ul>
                        </div>
                        <div className="icon" style={{fontSize: props.iconSize}}>
                            <FAIcon fa={props.icon} color={props.iconColor}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var FlipFeatureList = React.createClass({

    getInitialState: function(){
        return {
            flip: false,
            autoflip: true
        }
    },

    render: function(){
        var props = this.props;
        if (!props.back){
            return <FeatureList {...this.props} />;
        }
        var flippedClass = this.state.flip ? " flipped" : "";
        //<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
        return (
            <div style={{position: 'relative'}} onClick={() => this.setState({flip: !this.state.flip})}>
                <div className={"flippant" + flippedClass}>
                    <FeatureList {...this.props} />
                </div>
                <div className={"flippant-back flipper" + flippedClass}>
                    <div className="thumbnail" style={{height: '100%'}}>
                        <div className="caption">
                            {props.back}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


WidgetManager.registerWidget("FeatureList", {
    component: FlipFeatureList,
    icon: "list-alt",
    config: [
        {key: "title",      type: "input"},
        {key: "back",       type: "input"},
        {key: "icon",       type: "icon"},
        {key: "iconColor",  type: "input"}
    ],
    defaultValue: {
        type: 'FeatureList',
        title: 'Widget title',
        icon: 'bolt',
        iconColor: '#921a22',
        items:['Item 1', 'Item 2', 'Item 3']
    }
});


WidgetManager.registerWidget("Features", {
    component: Features,
    icon: "list-ul",
    config: [
        {key: "gridSize", type: "selector", values: ["auto", 1, 2, 3, 4, 6]},
        {key: "backIcon",    type: "selector", values: ["circle", "square", "square-o"]},
        {key: "iconColor",    type: "input"}
    ],
    defaultValue: {
        type: 'Features',
        items: [
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'},
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'},
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'},
            {title: 'Widget title', description: 'Subtitle...', icon: 'bolt'}
        ],
        gridSize: 2
    }
});

module.exports = {
  Feature,
  Features,
  FeatureList,
  FlipFeatureList
}