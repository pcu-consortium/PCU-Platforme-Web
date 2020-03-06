
import WidgetManager from 'widgets/widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import DocumentList from './document-list';
import { Nav, NavItem } from 'react-bootstrap';
import { DataTable, DataTableColumn } from 'admin/common/data-table';
import { SaveButton } from 'components/ui';

var formatLabel = function(key, column){
  var label = column[key];
  if ((typeof label) == "object"){
    return label.fra || label.eng || label;
  }
  return label;
};

var TableView = React.createClass({
  mixins: [WidgetMixin],

  getInitialState(){
    return {
      tab: 'table'
    }
  },

  getDefaultProps(){
    return {
      tabStyle: 'tabs',
      documentTabStyle: 'categories'
    };
  },

  handleTab(tab){
    this.setState({tab});
  },

  handleClick(){
    const { table } = this.props;
    this.setState({saving: true});
    $.ajax({
        url: this.context.api + '/tmp/schema/' + encodeURIComponent(table.id),
        type: "PUT",
        contentType: 'application/json',
        //dataType: 'json',
        data: JSON.stringify(table),
        success: (data) => console.log('saved !', data),
        complete: () => this.setState({saving: false})
    });
  },

  render(){
    const { table, tabStyle, documentTabStyle } = this.props;
    const { tab, saving } = this.state;
    if (!table) return false;
    return (
      <div>
        <h1>{table.label || table.id}</h1>
        <Nav bsStyle={tabStyle} activeKey={tab} onSelect={this.handleTab}>
          <NavItem eventKey="table">Schéma</NavItem>
          <NavItem eventKey="documents">Contenu</NavItem>
        </Nav>
        {this.renderTableInfo()}
        {this.renderDocumentList()}
      </div>
    );
  },

  renderTableInfo(){
    const { table } = this.props;
    const { tab, saving } = this.state;
    if (tab != "table") return false;
    console.log(table);
    // sortColumn="id" sortOrder="asc"
    // console.log(table.fields);
    var fields = table.fields.filter(column => !column.pos || (column.pos >= 100));
    return (
      <div>
        <div className="clearfix" style={{paddingBottom: 8}}>
          <SaveButton bsSize="sm" alignRight onClick={this.handleClick} saving={saving}>Save</SaveButton>
          {fields.length + " champs clients"}
        </div>
        <DataTable responsive striped bordered data={fields} >
          <DataTableColumn dataField="id" isKey width={90}>Id</DataTableColumn>
          <DataTableColumn dataField="label" dataFormat={formatLabel}>Label</DataTableColumn>
          <DataTableColumn dataField="type" width={90}>Type</DataTableColumn>
        </DataTable>
      </div>
    );
  },

  renderDocumentList(){
    const { documentTabStyle } = this.props;
    const { tab } = this.state;
    if (tab != "documents") return false;
    return <DocumentList {...this.props} tabStyle={documentTabStyle} showTableLabel={false} />;
  }
});

WidgetManager.registerWidget("TableView", {
    component: TableView,
    icon: "database-o",
    config: [
        {key: "tabStyle", type: "selector", values: ["tabs", "pills"]},
        {key: "documentTabStyle", type: "selector", values: ["tabs", "pills", "light", "categories"]}
    ]
});

