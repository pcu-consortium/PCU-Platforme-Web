
import { DataTable, DataTableColumn } from 'admin/common/components';
import { line1, line2 } from './media-info';

var docTitle = (key, doc) => line1(doc);
var docAuthors = (key, doc) => line2(doc);

var MediaElementTable = React.createClass({
  // mixins: [ React.addons.PureRenderMixin ],

  render(){
    const { documents, onSelect } = this.props;
    console.log('onSelect', onSelect);
             // <DataTableColumn dataField="id" dataFormat={(key, doc) => doc.id || doc.docid} style={{width: 40}}>Id</DataTableColumn>
      return (
        <DataTable data={documents} responsive striped onClick={onSelect} >
             <DataTableColumn dataField="title" dataFormat={docTitle}>Title</DataTableColumn>
             <DataTableColumn dataField="authors" dataFormat={docAuthors}>Infos</DataTableColumn>
        </DataTable>
      )
  }
});

module.exports = MediaElementTable;
