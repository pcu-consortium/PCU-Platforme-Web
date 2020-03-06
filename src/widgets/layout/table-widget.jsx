import WidgetManager from '../widget-manager';
import Router from 'react-router';
import {Row, Col, Grid, Input, Table, thead, tbody, tr, td, th} from 'react-bootstrap';
import { LayoutMixin } from 'widgets/core/cms';
import WidgetMixin from 'widgets/widget-mixin';

//var titlearray=[{name:"nom interne"},{name:"nom court"},{name:"nom long"},{name:"Oblicatoire"},{name:"Facette"}];


var DataTableWidget = React.createClass({
  mixins : [WidgetMixin, LayoutMixin],
  render() {
    const { children=[] } = this.props;
    //console.log(this.props);
    if ((children[0]) && (children[1])){
      //return undefined;
    var headchildren = (children[0].children || []).map(this.Headrender);
    var bodychildren = (children[1].children || []).map(this.Bodyrender);
    return (
    <Table striped bordered condensed hover>
    <thead>
      <tr>
        {headchildren}
      </tr>
    </thead>
    <tbody>
      {bodychildren}
    </tbody>
    </Table>
    );
    }
    else return null;
  },

  Headrender(btn,idx) {
    return (
      <th>{btn.name}</th>
    );
  },

  Bodyrender(btn,idx) {
    var bodylinechildren=(btn.children || []).map(this.BodyLinerender);
    return(
      <tr>
        {bodylinechildren}
      </tr>
      );
  },

  BodyLinerender(btn,idx) {
    //var bodylinechildrenrenderresult=(btn || []).map( (entry) => {return <td> {entry.name}</td>;} );
    if (btn.children) {
    return(
      <td style={{verticalAlign: 'middle'}}>
        {this.renderWidgets(btn.children)}        
      </td>
      //{bodylinechildrenrenderresult}
      );
      }
      else
      {
        return(
        <td style={{verticalAlign: 'middle'}}>
          {btn.name}
        </td>
      );        
      }
  }
});



WidgetManager.registerWidget("DataTable", {
    component: DataTableWidget,
    config: [
    ]
}
);

module.exports = DataTableWidget;






