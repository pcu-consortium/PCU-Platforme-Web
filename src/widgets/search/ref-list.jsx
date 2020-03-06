
import WidgetManager from '../widget-manager';

import FixedDataTable from 'fixed-data-table';
import SquareImage from 'components/image/square-image';
import 'fixed-data-table/dist/fixed-data-table.css';
import request from 'superagent';
import './ref-list.css';
import removeDiacritics from 'utils/diacritics';
// import LazyRender from 'react-lazy-render';


// var LazyRender = React.createClass({
//   propTypes: {
//     children: React.PropTypes.array.isRequired,
//     maxHeight: React.PropTypes.number.isRequired,

//     className: React.PropTypes.string,
//     itemPadding: React.PropTypes.number,
//     childHeight: React.PropTypes.number
//   },

//   getDefaultProps() {
//     return {
//       itemPadding: 3,
//       childHeight: 20
//     };
//   },

//   getInitialState() {
//     return {
//       childrenTop: 0,
//       childrenToRender: 10,
//       scrollTop: 0,
//       height: this.props.maxHeight
//     };
//   },

//   onScroll() {
//     var container = this.refs.container.getDOMNode();
//     var scrollTop = container.scrollTop;

//     var childrenTop = Math.floor(scrollTop / this.props.childHeight);
//     var childrenBottom = (this.props.children.length - childrenTop -
//                           this.state.childrenToRender);

//     if (childrenBottom < 0) {
//       childrenBottom = 0;
//     }

//     this.setState({
//       childrenTop: childrenTop,
//       childrenBottom: childrenBottom,
//       scrollTop: scrollTop
//     });
//   },

//   getHeight(numChildren, childHeight, maxHeight) {
//     var fullHeight = numChildren * childHeight;
//     if (fullHeight < maxHeight) {
//       return fullHeight;
//     } else {
//       return maxHeight;
//     }
//   },

//   getElementHeight(element) {
//     var marginTop = parseInt(window.getComputedStyle(element).marginTop);
//     return elementSize(element)[1] - marginTop; //remove one margin since the margins are shared by adjacent elements
//   },

//   componentWillReceiveProps(nextProps) {
//     var childrenTop = Math.floor(this.state.scrollTop / this.props.childHeight);
//     var childrenBottom = (nextProps.children.length - childrenTop -
//                           this.state.childrenToRender);

//     if (childrenBottom < 0) {
//       childrenBottom = 0;
//     }

//     var height = this.getHeight(
//       nextProps.children.length,
//       this.props.childHeight,
//       nextProps.maxHeight
//     );

//     var numberOfItems = Math.ceil(height / this.props.childHeight);

//     if (height === this.props.maxHeight) {
//       numberOfItems += this.props.itemPadding;
//     }

//     this.setState({
//       childrenTop: childrenTop,
//       childrenBottom: childrenBottom,
//       childrenToRender: numberOfItems,
//       height: height
//     });
//   },

//   componentDidMount() {
//     const { childHeight } = this.props;
//     // var childHeight = this.getChildHeight();

//     var height = this.getHeight(
//       this.props.children.length,
//       this.props.childHeight,
//       this.props.maxHeight
//     );

//     var numberOfItems = Math.ceil(height / childHeight);

//     if (height === this.props.maxHeight) {
//       numberOfItems += this.props.itemPadding;
//     }

//     this.setState({
//       // childHeight: childHeight,
//       childrenToRender: numberOfItems,
//       childrenTop: 0,
//       childrenBottom: this.props.children.length - numberOfItems,
//       height: height
//     });
//   },

//   componentDidUpdate() {
//     //important to update the child height in the case that the children change(example: ajax call for data)
//     // if (this.props.childHeight !== this.getChildHeight()) {
//     //   this.setState({childHeight: this.getChildHeight()});
//     // }
//   },

//   // getChildHeight: function() {
//   //   var firstChild = this.refs['child-0'];
//   //   var el = firstChild.getDOMNode();
//   //   return this.getElementHeight(el);
//   // },

//   render() {
//     const { childrenTop, childrenBottom, childrenToRender, height } = this.state;
//     const { childHeight, className, style } = this.props;
//     // var start = childrenTop;
//     const childPadding = Math.floor(childrenToRender*2);
//     var start = Math.max(0, childrenTop - childPadding);
//     var end = Math.min(this.props.children.length, childrenTop + childrenToRender + childPadding);
//     // var end = childrenTop + childrenToRender;
//     // console.log(start, end);

//     var children = this.props.children.slice(start, end);
//     // var children = childrenToRender.map(function(child, index) {
//     //   if (index === 0) {
//     //     return React.cloneElement(child, {ref: 'child-' + index, key: index});
//     //   }
//     //   return child;
//     // });

//     const preSpacing = (
//       <div style={
//         { height: start * childHeight }
//       } key="top"></div>
//     );

//     const postSpacing = (
//       <div style={
//         { height: (this.props.children.length-end) * childHeight }
//       } key="bottom"></div>
//     );

//     return (
//       <div style={{...style, height: height, overflowY: 'auto' }}
//         className={className}
//         ref="container"
//         onScroll={this.onScroll}>
//         {preSpacing}
//         {children}
//         {postSpacing}
//       </div>
//     );
//   }
// });

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

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
    const width = this.getWidth();
    if (!width) return undefined;
    return <Table width={width} {...this.props}>{this.props.children}</Table>;
  }
});

const quoteRegex = function(str) {
    return (str+'').replace(/[.?+^$[\]\\(){}|-]/g, '\\$&').replace(new RegExp("\\*", "g"), '[^ \\t]*');
};

// const runPerformanceTest = function(times=1){
//   if (times <= 0) return;
//   const startTime = new Date().getTime();
//   request.get('/ping').end(() => {
//     const endTime = new Date().getTime();
//     console.log('took', (endTime - startTime), 'ms');
//     runPerformanceTest(times-1);
//   });
// }; 

const Cell = React.createClass({
  mixins: [ React.addons.PureRenderMixin ],

  getDefaultProps(){
    return {
      depth: 0,
      isOpen: false
    };
  },

  render(){
    var { children, label, depth, isOpen, autoOpen } = this.props;
    if (children && !autoOpen){
      label = `${label} (${children.length})`
    }
    const visibility = children ? 'visible' : 'hidden';
    const icon = (isOpen || autoOpen) ? 'caret-down' : 'caret-right';
    const color = autoOpen ? '#777' : '#333';
    return (
      <div style={{color, paddingLeft: 12*depth, textOverflow: 'ellipsis', overflowX: 'hidden', whiteSpace: 'nowrap'}}>
        <FAIcon icon={icon} style={{visibility}} />
        {label}
      </div>
    );
  }
});

var RefList = React.createClass({

  getInitialState(){
    return {
      totalCount: 0,
      data: undefined,
      filteredData: undefined,
      queryFilter: undefined,
    };
  },

  getDefaultProps(){
    return {
      url: '/files/authors.txt',
      query: "",
      showIndex: false,
      height: 500,
      rowHeight: 20,
      headerHeight: 32
    };
  },

  filterData(data, query){
    // console.log('filterData', '"' + query + '"');
    const queries = query.split(' ').map(s => removeDiacritics(s).toLowerCase()).filter(s => s.length > 0);
    var stack = [];
    const isOr = relIdx => {
      const idx = stack.length - relIdx - 1;
      if (idx < 0) return false;
      const item = stack[idx];
      return (item === "or") || (item === "ou");
    }
    const ensureFun = query => {
      if ((typeof query) !== "string") return query;
      else {
        const regex = new RegExp('\\b' + quoteRegex(query), 'i');
        return s => regex.test(s);
      }
    }
    queries.forEach((query, idx) => {
      if (isOr(0)){
        const or = stack.pop(); // Ignore
        const exp0 = ensureFun(stack.pop());
        const exp1 = ensureFun(query);
        stack.push(item => exp0(item) || exp1(item));
      } else {
        stack.push(query);
      }
    });

    // Convert to functions
    const matchers = stack.map(ensureFun);
    // console.log(matchers);
    const len = matchers.length;
    const queryFilter = item => {
      const toSearch = item.searchData;
      for(var i=0; i<len; i++){
        if (!matchers[i](toSearch)) return false;
      }
      return true;
    }
    // const tester = s => console.log(s, queryFilter({searchData: s}));
    // tester('gravure');
    // tester('estampe');
    const recQueryFilter = item => {
      if (queryFilter(item)){
        return true;
      } else if (item.children) {
        var children = item.children;
        for(var i=0; i<children.length; i++){
          if (recQueryFilter(children[i])) return true;
        }
        return false;
      }
    }
    var results = [];
    // var startTime = new Date().getTime();
    var addEntries = (entries, validated=false) => {
      entries.forEach(entry => {
        var display = false;
        var isSelected = false;
        if (validated){
          display = true;
          isSelected = true;
          entry.autoOpen = false;
        } else if (queryFilter(entry)){
          display = true;
          isSelected = true;
          entry.autoOpen = false;
        } else if (recQueryFilter(entry)){
          display = true;
          entry.autoOpen = true;
        }
        if (display){
          results.push(entry);
          if (entry.children && (entry.isOpen || entry.autoOpen)){
            addEntries(entry.children, isSelected);
          }
        }
      });
    };
    addEntries(data);
    // var endTime = new Date().getTime();
    // console.log('filter time', endTime - startTime);
    // const results = data.filter(queryFilter);
    // console.log(results.length, 'results');
    return results;
  },

  parseData(text){
    const lines = text.split('\n').filter(s => s.length > 0);
    const totalCount = lines.length;
    let data = [];
    var hasChildren = false;
    var depthEntries = []; // Used to build tree

    // const regex = new RegExp('^ (- +)+([^ ].*)');

    const computeDepth = entry => {
      var depth = 0, i = 0, len = entry.length;
      while(i < len && ((entry[i] === ' ') || (entry[i] === '-'))){
        if (entry[i] === '-') depth++;
        i++;
      }
      return { depth, label: entry.substring(i) };
    };

    lines.forEach(line => {
      // Check if sub-item
      if ((line.length > 2) && (line[0] == ' ') && (line[1] == '-')){
        hasChildren = true;
        const { depth, label } = computeDepth(line);
        const parent = depthEntries[depth-1];
        parent.children = parent.children || [];

        const entry = {
          label, depth, searchData: removeDiacritics(label)
        };
        depthEntries[depth] = entry;
        parent.children.push(entry);
      } else {
        const label = line.trim();
        var entry = {
          label, searchData: removeDiacritics(label)
        }
        depthEntries[0] = entry;
        data.push(entry);
      }
    });
    // console.log(hasChildren, data);
    return {
      totalCount,
      hasChildren,
      data: data
    }
  },

  refresh(){
    const url = this.props.url;
    request.get(url)
      .set('Accept', 'text/plain')
      .end((err, res) => {
        if (url != this.props.url){
          return; // Already changed!!
        }
        if (err){
          this.setState({
            data: [],
            filteredData: []
          });
          return;
        }
        // console.log('received data');
        const {totalCount, hasChildren, data} = this.parseData(res.text);
        // console.log('parsed data');
        const filteredData = this.filterData(data, this.cleanQuery(this.props.query));
        // console.log('filtered data');
        this.setState({data, filteredData, totalCount, hasChildren});
        // setTimeout(() => runPerformanceTest(8), 1000);
      });
  },

  componentDidMount(){
    this.refresh();
  },

  componentWillUpdate(nextProps, nextState){
    const { data } = this.state;
    // console.log('nextProps.query', nextProps.query);
    if (data && this.cleanQuery(nextState.queryFilter) != this.cleanQuery(nextProps.query)){
      const filteredData = this.filterData(data, this.cleanQuery(nextProps.query));
      this.setState({filteredData, queryFilter: nextProps.query});
    }
  },

  componentDidUpdate(prevProps){
    // console.log(this.props.url, prevProps.url);
    if (this.props.url !== prevProps.url){
      this.refresh();
    }
  },

  rowGetter(idx){
    const { filteredData } = this.state;
    if (!filteredData) return undefined;
    return {...filteredData[idx]}; // Force copy ?
  },

  onRowClick(evt, idx){
    const { hasChildren, data, filteredData } = this.state;
    const entry = filteredData[idx];
    console.log(entry);
    evt.stopPropagation();
    evt.preventDefault();
    if (hasChildren && entry.children && !entry.autoOpen){
      // Immutability rules !
      entry.isOpen = !entry.isOpen;
      // console.log('parent', entry.idx, entry.parent);
      // const newEntry = {
      //   ...entry,
      //   isOpen: !entry.isOpen
      // };
      // if (entry.parent) entry.parent.children[entry.idx] = newEntry;
      // else data[entry.idx] = newEntry;

      // if (newEntry.children){
      //   // Patch parent links
      //   newEntry.children.forEach(it => {it.parent = newEntry;});
      // }
      const newData = this.filterData(data, this.cleanQuery(this.props.query));
      this.setState({filteredData: newData});
    }
  },

  cleanQuery(query){
    if ((typeof query) !== "string") return "";
    return query;
  },

  cellRenderer(cellData, cellDataKey, rowData) {
    return rowData[cellDataKey];
  },

  cellWithChildrenRenderer(cellData, cellDataKey, rowData) {
    return <Cell {...rowData} />;
  },

  indexRenderer(cellData, cellDataKey, rowData, rowIndex) {
    return rowIndex+1;
  },

  render(){
    const { filteredData, hasChildren } = this.state;
    var { showIndex, rowHeight, query, height } = this.props;
    const data = filteredData || [];
    const count = data.length;
    if (rowHeight < 10) rowHeight = 10; // Ensure minimum height

    // var renderer = hasChildren ? this.cellWithChildrenRenderer : this.cellRenderer;
    var renderer = this.cellWithChildrenRenderer;// : this.cellRenderer;
    return (
      <div className="ref-list">
        {this.renderCount()}
        {/* force flush on rowHeight change */}

       {/*} <LazyRender maxHeight={height} itemPadding={2} childHeight={20} style={{minHeight: height, border: '1px solid #ddd'}} >
          {data.map((it, idx) => (
            <div style={{height: 20}} 
                 onClick={e => this.onRowClick(e, idx)}>
              {renderer(null, null, it, idx)}
            </div>
          ))}
        </LazyRender>*/}

        <FullWidthTable
          key={rowHeight} 
          rowGetter={this.rowGetter}
          rowsCount={count}
          {...this.props}
          onRowClick={this.onRowClick}>
          {showIndex ? (<Column
            label="N°"
            width={64}
            align="right"
            fixed
            dataKey="_index" cellRenderer={this.indexRenderer}/>) : undefined}
          <Column
            label="Nom"
            width={100}
            flexGrow={1}
            dataKey="label" cellRenderer={renderer} />
        </FullWidthTable>
      </div>
    )
  },



  renderCount(){
    const { filteredData, totalCount } = this.state;
    const { query } = this.props;
    if (!filteredData) return "fetching...";
    if (totalCount === filteredData.length){
      return `${totalCount} entrées`;
    } else if (this.cleanQuery(query) === ""){
      return `${totalCount} entrées, ${filteredData.length} affichées`;
    } else if (this.cleanQuery(query) !== ""){
      return `${totalCount} entrées, ${filteredData.length} affichées pour "${this.cleanQuery(query)}"`;
    }
  }
});

WidgetManager.registerWidget("RefList", {
    component: RefList,
    icon: "list",
    config: [
      {key: "query",         type: "input"},
    ],
});

module.exports = RefList;
