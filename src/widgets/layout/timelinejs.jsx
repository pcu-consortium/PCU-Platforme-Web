import WidgetManager from '../widget-manager';
import './vis.css';


class TimelineJSWidget extends React.Component {
  constructor(props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  updateGraph() {
    var container = document.getElementById('vis-timeline');

    // Options
    var options = {
      height: 250, // px
    };

    var items = new vis.DataSet([{
      id: 1,
      content: 'First event',
      start: '2014-08-01'
    }, {
      id: 2,
      content: 'Pi and Mash',
      start: '2014-08-08'
    }, {
      id: 3,
      content: 'Wikimania',
      start: '2014-08-08',
      end: '2014-08-10'
    }, {
      id: 4,
      content: 'Something else',
      start: '2014-08-20'
    }, {
      id: 5,
      content: 'Summer bank holiday',
      start: '2014-08-25'
    }]);

    var timeline = new vis.Timeline(container, items, options);
  }

  render() {
    return (<div id="vis-timeline"> </div>);
  }
}



WidgetManager.registerWidget("Vis", {
    component: TimelineJSWidget,
    config: [
    ]
}
);

module.exports = TimelineJSWidget;