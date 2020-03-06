import React from 'react';
import classNames from 'classnames';
import _ from 'lodash/collection';

var DataTableColumn = React.createClass({
    render(){
        return <span>{this.props.children}</span>;
    }
});

var DataTable = React.createClass({

    getInitialState(){
        return {
            sortColumn: this.props.sortColumn,
            sortOrder : this.props.sortOrder || "asc"
        }
    },

    getDefaultProps(){
        return {
            className: "table-info",
            data: []
        }
    },

    sort(items){
        var columnId = this.state.sortColumn;
        if (!columnId){
            return items;
        }
        var order = this.state.sortOrder === "asc" ? 1 : -1;
        var column = _.find(this.getColumns(), c => (columnId === (c.props.id || c.props.dataField)));
        if (!column){
            return items; // No possible sort
        }
        var field = column.props.dataField;
        return items.sort((objA, objB) => {
            var a = objA[field], b = objB[field];
            a = (a || (a === 0)) ? (a+"").toLowerCase() : "";
            b = (b || (b === 0)) ? (b+"").toLowerCase() : "";
            return order * a.localeCompare(b);
        });
    },

    filter(items, columns){
        const { filter, filterColumns } = this.props;
        if (!filterColumns || !filter || filter.length == 0){
            return items;
        }
        var regexp = new RegExp(filter.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&"), 'i');
        var columnIds = this.props.filterColumns;
        var isValid = function(item){
            console.log(item);
            for(var colId of filterColumns){
                console.log(colId, item[colId]);
                if (item[colId] && item[colId].match(regexp)){
                    return true;
                }
            }
            return false;
        }
        return items.filter(isValid);
    },

    orderBy(id){
        if (id === this.state.sortColumn){
            var sortOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
            this.setState({sortOrder});
        } else {
            this.setState({
                sortColumn: id,
                sortOrder: "asc"
            });
        }
    },

    getColumns(){
        const columns = this.props.children;
        if (React.Children.count(columns) == 0){
            return undefined;
        }
        return columns;
    },

    handleClick(e, id){
        if (this.props.onHeaderClick){
            e.preventDefault();
            this.props.onHeaderClick(id);
        } else {
            this.orderBy(id);
        }
    },

    handleLineClick(item, idx){
        console.log('click');
        const { onClick } = this.props;
        if (onClick) onClick(item, idx);
    },

    render(){
        var columns = this.getColumns();
        if (!columns) {
            return false;
        }
        var { data } = this.props;

        var items = this.sort(this.filter(data, columns));
        return (
            <Table {...this.props} className={this.props.className} hover>
                <thead>
                <tr>
                    {columns.map(this.renderHeader)}
                </tr>
                </thead>
                <tbody>
                {items.map((item, idx) => this.renderLine(columns, item, idx))}
                </tbody>
            </Table>
        );
    },

    renderHeader(column, idx){
        var { id, dataField, className, style, sortable, shrink, align, width } = column.props;
        var classes = classNames(className, { shrink, sortable });
        style = {...style, textAlign: align, width};
        if (!sortable){
            return (
                <th key={idx} className={classes} style={style}>
                    {column}
                </th>
            );
        }
        const { sortColumn, sortOrder } = this.state;
        var sortId = id || dataField;
        var isSort = sortColumn === sortId;
        var iconStyle = {visibility: (isSort ? undefined : "hidden")};
        var icon = <FAIcon icon={sortOrder === "asc" ? "caret-up" : "caret-down"} style={iconStyle}/>;
        return (
            <th key={idx} className={classes} onClick={e => this.handleClick(e, sortId)} style={style}>
                {column} {icon}
            </th>
        );
    },

    renderLine(columns, item, idx){
        return (
            <tr key={idx} onClick={() => this.handleLineClick(item, idx)}>
                {columns.map((col, colIdx) => {
                    const { dataField, dataFormat, tdStyle, align } = col.props;
                    var data = dataFormat ? dataFormat(dataField, item) : item[dataField];
                    return <td key={colIdx} style={{...tdStyle, textAlign: align}}>{data}</td>;
                })}
            </tr>
        )
    }
});


module.exports = {
    DataTable,
    DataTableColumn
};