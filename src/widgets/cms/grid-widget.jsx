
var GridWidget = React.createClass({
    /**
     * computes the optimal item size for a nice display
     * @returns {number}
     */
    computeItemSize: function(){
        var length = this.length();
        if(this.props.gridSize && (this.props.gridSize !== "auto")){
            var propSize = Number(this.props.gridSize);
            if (!isNaN(propSize)){
                //if ((propSize > this.props.items.length) && (length <= 4) && (length > 0)){
                //    return 12/length;
                //}
                return 12 / this.props.gridSize;
            }
        }
        switch(length){
            case 0:
            case 1: return 12;  // 1x1
            case 2: return 6;   // 2x1
            case 3: return 4;   // 3x1
            case 4: return 6;   // 2x2
            default: return 4;  // 3x*
        }
    },

    length: function(){
        if (!this.props.items){
            return 0;
        } else if (this.props.limit){
            return Math.min(Number(this.props.limit), this.props.items.length);
        }
        return this.props.items.length;
    },

    render: function(){
        if (!this.props.items){
            return false; // Nothing to do yet...
        }
        return (
            <div className="fluid-container bubbles">
                <Row>
                    {this.renderPerChunk()}
                </Row>
            </div>
        );
    },

    flatten: function(arrayOfArrays){
        var merged = [];
        return merged.concat.apply(merged, arrayOfArrays);
    },

    renderPerChunk: function(){
        var items = this.props.items;
        if (this.length() == 0){
            return undefined;
        }
        var chunks = [];
        var len = this.length();
        // Do chunks and render row by row to avoid floating bugs
        for (var i=0; i<len; i++) {
            chunks.push(this.renderItem(items[i], i, (i==len-1)));
        }
        return this.flatten(chunks);
    },

    /**
     * Renders items in a bootstrap grid
     *
     * Implementation note :
     * - uses the specified size as "md" size
     * - computes a "sm" size (twice the md size)
     * - inserts clearfix blocks to ensure perfect grid alignment
     *
     */
    renderItem: function(item, idx, isLast){
        var Component = this.props.component;
        var itemSize = this.computeItemSize();
        var sm;
        if (itemSize <= 3){
            sm = itemSize*2;
        } else if (itemSize == 4){
            sm = 6;
        }
        var gridSize = 12/itemSize;
        var smallGridSize = 12/(sm || 1);
        var items = [
            <Col key={idx} md={itemSize} sm={sm} style={{padding: this.props.padding}}>
                <Component {...this.props} {...item} onClick={this.props.onItemClick} />
            </Col>
        ];

        // Last of row ?
        if ((gridSize != 12) && (isLast || ((idx % gridSize) == (gridSize-1)))){
            items.push(<div key={idx + "-md"} className="clearfix visible-md-block visible-lg-block"></div>);
        }
        if ((smallGridSize != 12) && (isLast || ((idx % smallGridSize) == (smallGridSize-1)))){
            items.push(<div key={idx + "-sm"} className="clearfix visible-sm-block"></div>);
        }
        return items;
    }
});

module.exports = GridWidget;
