
import WidgetManager from '../widget-manager';
import GridWidget from './grid-widget';
import SquareImage from 'components/image/square-image';

// import 'react-photoswipe/node_modules/photoswipe/dist/photoswipe.css';
// import 'react-photoswipe/node_modules/photoswipe/dist/default-skin/default-skin.css';
// import {PhotoSwipe} from 'react-photoswipe';

var CmsBubble = React.createClass({

    render: function () {
        var style = {backgroundImage: 'url(' + this.props.img + ')'};
        if (this.props.imgSize){
            style['width'] = this.props.imgSize;
            style['height'] = this.props.imgSize;
        }
        return (
            <div>
                <div className="square-image img-circle" style={style}></div>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                {/*<p><a class="btn btn-default" href="#" role="button">Plus en détails »</a></p>*/}
            </div>
        )
    }
});


var BubbleGrid = React.createClass({
    render: function(){
        return <GridWidget {...this.props} component={CmsBubble} />
    }
});

var SquareImageWidget = React.createClass({
    render: function(){
        return (
            <SquareImage {...this.props} src={this.props.img} />
        );
    }
});

var ImageGrid = React.createClass({
    getDefaultProps(){
        return {
            padding: '0px'
        };
    },

    getInitialState(){
        return {

        };
    },

    // getInitialState(){
    //     return {
    //         isOpen: false
    //     };
    // },

    // handleClick(){ 
    //     this.setState({isOpen: true});
    // },

    // handleClose(){
    //     this.setState({ isOpen: false });
    // },  

    // getItems(){
    //     const { items=[] } = this.props;
    //     return items.map(item => ({
    //         src: item.imgLarge,
    //         w: 1024,
    //         h: 1024,
    //         title: item.title
    //     }));
    // },  


    render: function(){
        const { isOpen } = this.state;
        const options = {};
        return (
            <div>
                <GridWidget {...this.props} component={SquareImageWidget} onItemClick={this.handleClick} />
                {/*<PhotoSwipe isOpen={isOpen} items={this.getItems()} options={options} onClose={this.handleClose}/>*/}
            </div>
        )
    }
});

var RemoteImageWrapper = React.createClass({
    mixins: [URLFetcher],

    makeUrl: function(props){
        return props.url;
    },

    componentWillReceiveProps: function(nextProps){
        this.fetchUrl(this.makeUrl(nextProps));
    },

    componentDidMount: function(){
        this.fetchUrl(this.makeUrl(this.props));
    },

    getData: function(){
        var data = this.props.items || [];
        if (this.state && this.state.data){
            data = this.state.data.items.map(it => {
                return {
                    title: it.title,
                    img: it.media.m.replace('_m.jpg', '_n.jpg'),
                    imgThumbnail: it.media.m,
                    imgLarge: it.media.m.replace('_m.jpg', '_b.jpg')
                }
            });
        }
        return data;
    },

    render: function(){
        var data = this.getData();
        if (!data || data.length == 0){
            return false;
        }
        var Component = this.props.component;
        return <Component {...this.props} items={data} />
    }
});

var CarouselWidget = React.createClass({

    render: function(){
        return <RemoteImageWrapper {...this.props} component={Carousel} />;
    }
});

var BubbleGridWidget = React.createClass({

    render: function(){
        return <RemoteImageWrapper {...this.props} component={BubbleGrid} />;
    }
});

var ImageGridWidget = React.createClass({

    render: function(){
        return <RemoteImageWrapper {...this.props} component={ImageGrid} />;
    }
});



WidgetManager.registerWidget("Bubbles", {
    component: BubbleGridWidget,
    config: [
        {key: "gridSize", type: "selector", values: ["auto", 1, 2, 3, 4, 6]},
        {key: "imgSize", type: "selector", values: ["128px", "160px", "200px", "250px"]}
    ]
});

WidgetManager.registerWidget("ImageCarousel", {
    component: CarouselWidget,
    config: [
        {key: "url",      type: "input"}
    ]
});

WidgetManager.registerWidget("ImageGrid", {
    component: ImageGridWidget,
    icon: "th",
    config: [
        {key: "gridSize", type: "selector", values: ["auto", 1, 2, 3, 4, 6, 12]},
        {key: "limit",    type: "number"},
        {key: "url",      type: "input"},
        {key: "padding",  type: "input"}
    ],
    defaultValue: {type: 'ImageGrid', gridSize: 6, url: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=art&jsoncallback=?'}
});

WidgetManager.registerWidget("Image", {
    component: Image,
    config: [
        {key: "src",    type: "input"},
        {key: "width",    type: "selector", values: ['', '50%', '100%']}
    ]
});

module.exports = {
  BubbleGridWidget, CarouselWidget, ImageGridWidget
}
