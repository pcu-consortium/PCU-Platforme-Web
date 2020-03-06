
import WidgetManager from '../widget-manager';

import FixedDataTable from 'fixed-data-table';
import SquareImage from 'components/image/square-image';
import 'fixed-data-table/dist/fixed-data-table.css';
import ResultStore from './result-store';

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

const GRID_WIDTH = 8;

var FullWidthTable = React.createClass({

  getInitialState(){
    return {
      width: 0
    };
  },

  refresh(){
    var width = parseFloat(window.getComputedStyle(this.refs.container).width);
    this.setState({width});
  },

  componentDidMount(){
    window.addEventListener('resize', this.refresh, true);
    this.refresh();
  },

  componentWillUnmount(){
    window.removeEventListener('resize', this.refresh);
  },

  getWidth(){
    if (this.props.width){
      return this.props.width;
    }
    return this.state.width;
  },

  render(){
    const { height } = this.props; // Reserve space
    return (
      <div ref="container" style={{height}}>
        {this.renderChild()}
      </div>
    );
  },

  renderChild(){
    const { gridSize, rowHeight } = this.props;
    const width = this.getWidth();
    if (!width) return undefined;
    const autoRowHeight = gridSize ? (width / gridSize) : rowHeight;
    console.log('autoRowHeight', autoRowHeight);
    return <Table width={width} {...this.props} rowHeight={autoRowHeight}>{this.props.children}</Table>;
  }
});


var TableCheckbox = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  handleChange(e){
    const { onChange, idx, checked } = this.props;
    if (onChange){
      onChange(idx, !checked);
      e.stopPropagation();
      e.preventDefault();
    }
  },

  render(){
    const { checked } = this.props;
    return <input {...this.props} type="checkbox" onChange={this.handleChange} checked={checked} value={checked} />
    // return (
    //   <div className="checkbox">
    //     <label>
    //       <input {...this.props} type="checkbox" onChange={this.handleChange} checked={checked} />
    //     </label>
    //   </div>
    // );
  } 
});


var SearchDataTable = React.createClass({

  getDefaultProps(){
    return {
      query: "",
      displayMode: "table",
      showIndex: true,
      height: 500,
      rowHeight: 32,
      headerHeight: 40,
      checkable: false,
      columns: [
        "docid","reference"
      ]
    };
  },

  componentDidMount(){
    ResultStore.init(this, this.props.query);
  },

  componentDidUpdate(){
    ResultStore.setQuery(this.props.query);
  },

  rowGetter(idx){
    return ResultStore.get(idx);
  },

  onRowClick(evt, idx){
    if (this.props.checkable){
      ResultStore.toggleChecked(idx);
      this.forceUpdate();
    }
  }, 

  renderLabel(cellData, cellDataKey, rowData, rowIndex){
    switch(cellDataKey){
      case "label": return rowData.title || rowData.titre || rowData.titrepropre || rowData.reference;
      default: return rowData.title;
    }
  },

  renderThumbnail(cellData, cellDataKey, rowData){
    var img = "/psa/api/exemplaires/" + rowData.exemplaire + "/thumbnail";
    return (
      <div>
        <SquareImage src="/images/psa_logo.png" alignTop absolute />
        {rowData.exemplaire ? <SquareImage src={img} alignTop absolute /> : undefined}
      </div>
    );
  },

  renderInfo(cellData, cellDataKey, rowData){
    if (rowData.legende) return rowData.legende;
    else if (rowData.refevenement) return rowData.refevenement.join(", ");
    else if (rowData.arboclass) return rowData.arboclass;
    else return (rowData.authors || []).join(", ");
  },

  renderCheckbox(cellData, cellDataKey, rowData, rowIndex){
    return <TableCheckbox checked={rowData._checked} idx={rowIndex} />;
  },

  getQuery(){
    const { query } = this.props;
    if ((typeof query) !== "string") return "";
    return query;
  },

  // onColumnResizeEndCallback(width, dataKey){
  //   const { index, docid, label, infos } = this.state;
  //   switch(dataKey){
  //     case "index": return this.setState({index: width, docid: (docid-index+width)});
  //     case "docid": return this.setState({docid: width, label: (label-docid+width)});
  //     case "label": return this.setState({label: width, infos: (infos-label+width)});
  //   }
  // },

  render(){
    var { checkable, columns, showIndex, rowHeight, displayMode } = this.props;
    if (rowHeight < 10) rowHeight = 10; // Ensure minimum height
    if (!Array.isArray(columns)) columns = [];
    if (displayMode == "grid"){
      return this.renderGrid();
    }
    return (
      <div>
        {ResultStore.isRefreshing() 
          ? "fetching..."
          : (ResultStore.getCount() + ' résultats pour "' + this.getQuery() + '"')
        }
        {/* force flush on rowHeight change */}
        <FullWidthTable
          key={rowHeight} 
          rowGetter={this.rowGetter}
          rowsCount={ResultStore.getCount()}
          {...this.props}
          onRowClick={this.onRowClick}>
          {checkable ? <Column width={32} fixed align="center" cellRenderer={this.renderCheckbox} dataKey="_check" /> : undefined}
          <Column
            label=""
            width={64}
            dataKey="thumbnail"
            fixed
            cellRenderer={this.renderThumbnail} />
          {showIndex ? (<Column
            label="N°"
            width={64}
            align="right"
            fixed
            dataKey="_index" />) : undefined}
          {columns.map(this.renderColumn)}
        </FullWidthTable>
      </div>
    )
  },

  renderColumn(col, idx){
    if ((typeof col) === "string"){
      return (
        <Column
            label={col}
            width={100}
            align="left"
            flexGrow={1}
            dataKey={col} />
      );
    } else if ((typeof col) === "object"){
      // TODO : hide flexGrow and use minWidth/width/maxWidth ?
      const { id, label=col.id, width=100, align="left", flexGrow=1, fixed=false, color } = col;
      var cellRenderer = undefined;
      if (color){
        cellRenderer = (cellData, cellDataKey, rowData) => {
          return <span style={{color}}>{rowData[cellDataKey]}</span>
        };
      }
      return (
        <Column
            label={label}
            width={width}
            align={align}
            fixed={fixed} flexGrow={flexGrow}
            cellRenderer={cellRenderer}
            dataKey={id} />
      );
    } else {
      return undefined;
    }
  },

  gridRowGetter(idx){
    var row = [];
    for(var i=0; i<GRID_WIDTH; i++){
      row[i] = ResultStore.get(idx*GRID_WIDTH+i);
    }
    return row;
  },

  renderGridItems(cellData, cellDataKey, rowData){
    const width = (100/GRID_WIDTH) + '%';
    return (
      <table style={{width: '100%', height: '100%', padding: 0}}>
        <tbody>
        <tr>
          {rowData.map((data, idx) => {
            var img = "/psa/api/exemplaires/" + data.exemplaire + "/thumbnail";
            return (
              <td key={idx} style={{position: 'relative', width: width, minWidth: width, maxWidth: width}}>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                  <SquareImage src="/images/psa_logo.png" alignTop absolute />
                  {data.exemplaire ? <SquareImage src={img} alignTop absolute /> : undefined}
                  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, 
                    color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    fontWeight: 100, fontSize: 12}}>
                    {data.reference}
                  </div>
                </div>
              </td>
            );
          })}
        </tr>
        </tbody>
      </table>
    )
  },

  renderGrid(){
    return (
      <div>
        {ResultStore.isRefreshing() 
          ? "fetching..."
          : (ResultStore.getCount() + ' résultats pour "' + this.getQuery() + '"')
        }
        {/* force flush on rowHeight change */}
        <FullWidthTable
          gridSize={GRID_WIDTH}
          rowGetter={this.gridRowGetter}
          rowsCount={Math.ceil(ResultStore.getCount()/GRID_WIDTH)}
          {...this.props} headerHeight={0}>
          <Column
            label=""
            width={1}
            flexGrow={1}
            dataKey="grid"
            cellRenderer={this.renderGridItems} />
        </FullWidthTable>
      </div>
    )
  },

  renderGridItem(cellData, cellDataKey, rowData){
    const data = rowData[cellDataKey];
    var img = "/psa/api/exemplaires/" + data.exemplaire + "/thumbnail";
    return (
      <div>
        <SquareImage src="/images/psa_logo.png" alignTop absolute />
        {data.exemplaire ? <SquareImage src={img} alignTop absolute /> : undefined}
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, 
          color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)',
          fontWeight: 100, fontSize: 12}}>
          {data.reference}
        </div>
      </div>
    );
  },

  renderGrid2(){
    var columns = [];
    for(var i=0; i<GRID_WIDTH; i++){
      columns.push(
        <Column
          key={i}
          label=""
          width={1}
          flexGrow={1}
          dataKey={i}
          cellRenderer={this.renderGridItem} />
      );
    }
    return (
      <div>
        {ResultStore.isRefreshing() 
          ? "fetching..."
          : (ResultStore.getCount() + ' résultats pour "' + this.getQuery() + '"')
        }
        {/* force flush on rowHeight change */}
        <FullWidthTable
          gridSize={GRID_WIDTH}
          rowGetter={this.gridRowGetter}
          rowsCount={Math.ceil(ResultStore.getCount()/GRID_WIDTH)}
          {...this.props} headerHeight={0}>
          {columns}
        </FullWidthTable>
      </div>
    )
  }
});


WidgetManager.registerWidget("SearchDataTable", {
    component: SearchDataTable,
    icon: "search",
    config: [
      {key: "query",         type: "input"},
      {key: "checkable",     type: "boolean"},
      {key: "width",         type: "number"},
      {key: "height",        type: "number"},
      {key: "rowHeight",     type: "number"},
      {key: "headerHeight",  type: "number"},
    ],
});

module.exports = SearchDataTable;


