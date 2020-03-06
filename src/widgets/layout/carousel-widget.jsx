
import WidgetManager from 'widgets/widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { LayoutMixin } from 'widgets/core/cms';
import { renderWidget } from 'widgets/core/cms';

import { Carousel, CarouselItem } from 'react-bootstrap';
import './carousel-widget.css';

var CarouselWidget = React.createClass({
  mixins: [WidgetMixin, LayoutMixin],

  getInitialState() {
    return {
      index: 0,
      direction: null
    };
  },

  handleSelect(selectedIndex, selectedDirection) {
    this.setState({
      index: selectedIndex,
      direction: selectedDirection
    });
  },

  getEditProps(){
    if (!this.context.editing) return {};
    const { index, direction } = this.state;
    return {
      activeIndex: index,
      direction,
      onSelect: this.handleSelect
    };
  },

  render(){
    const { height } = this.props;
    var children = this.props.widget.children || [];

    return (
      <Carousel className="carousel-widget" style={{height}} {...this.getEditProps()}>
        {children.map((widget, idx) => (
          <CarouselItem style={{paddingBottom: 16}}>
            {this.renderWidgets([widget], true)}
          </CarouselItem>
        ))}
      </Carousel>
    )
  }
});

WidgetManager.registerWidget("Carousel", {
    component: CarouselWidget,
    config: [
    ]
});

export default CarouselWidget;
