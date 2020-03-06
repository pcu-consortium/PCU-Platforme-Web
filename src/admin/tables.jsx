
import React from 'react';
import { Table, Column } from 'fixed-data-table';

var TableTest = React.createClass({
    render: function () {
        var rows = [
            ['a1', 'b1', 'c1'],
            ['a2', 'b3', 'c2'],
            ['a3', 'b3', 'c3']
        ];

        var rowGetter = function(rowIndex) {
            return rows[rowIndex];
        };

        var cellRenderer = function(cellData, cellDataKey, rowData, rowIndex, columnData, width) {
            return <div>rows[{rowIndex}] = {cellData}</div>;
        };

        return (
            <Table
                rowHeight={50} rowGetter={rowGetter} rowsCount={rows.length}
                width={900} height={500} headerHeight={40}>
                <Column cellRenderer={cellRenderer} label="Col 1"
                        width={200} flexGrow={2} dataKey={0}
                    />
                <Column label="Col 2" width={200} flexGrow={1} dataKey={1} />
                <Column label="Col 3" width={200} flexGrow={1} dataKey={2} />
            </Table>
        );
    }
});

module.exports = {
    TableTest
};