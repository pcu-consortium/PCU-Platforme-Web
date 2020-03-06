import paper from 'libs/paper';



var initDraw = function(tool, callbacks={}){
    var action;

    //var textItem = new paper.PointText({
    //    content: 'Cliquez pour ajouter des formes',
    //    point: new paper.Point(20, 30),
    //    fillColor: 'white'
    //});

    var hitOptions = {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5
    };

    //tool.minDistance = 7;

    var paths = {};
    var segment, path;
    var movePath = false;
    var id = 1;

    var lastSelected;

    var updateFillColors = function(){
        for(var key in paths){
            if (paths.hasOwnProperty(key)){
                var path = paths[key];
                if (path.selected){
                    path.fillColor = new paper.Color(1, 0, 0, 0.3);
                } else {
                    path.fillColor = new paper.Color(1, 1, 1, 0.3);
                }
            }
        }
    };

    var updateBounds = function(path){
        const { left, top, right, bottom } = path.bounds;
        path._props = {id: path._props.id, left, top, right, bottom};
        console.log(Math.round(left), Math.round(top), Math.round(right), Math.round(bottom));
    };

    tool.onMouseDown = function(event) {
        segment = path = null;
        var hitResult = paper.project.hitTest(event.point, hitOptions);
        if (!hitResult){
            onNewPath(event);
            return;
        }
        action = 'MOVE';

        if (event.modifiers.shift) {
            if (hitResult.type == 'segment') {
                hitResult.segment.remove();
            }
            return;
        }

        if (hitResult) {
            path = hitResult.item;
            lastSelected = path;
            if (callbacks.onSelect){
                callbacks.onSelect(path._props.id);
            }
            if (hitResult.type == 'segment') {
                segment = hitResult.segment;
            } else if (hitResult.type == 'stroke') {
                var location = hitResult.location;
                segment = path.insert(location.index + 1, event.point);
                path.smooth();
            }
        }
        movePath = hitResult.type == 'fill';
        if (movePath)
            paper.project.activeLayer.addChild(hitResult.item);
        updateFillColors();
    };

    var select = function(id){
        console.log('select', id);
        paper.project.activeLayer.selected = false;
        if (id){
            lastSelected = paths[id];
            lastSelected.selected = true;
        }
        updateFillColors();
        paper.view.update();
    };

    var hover = function(id){
        paper.project.activeLayer.selected = false;
        if (id){
            paths[id].selected = true;
        } else if (lastSelected){
            lastSelected.selected = true;
        }
        updateFillColors();
        paper.view.update();
    };

    // Selects the currently visible path
    tool.onMouseMove = function(event) {
        if (action != 'CREATE'){
            paper.project.activeLayer.selected = false;
            if (event.item){
                event.item.selected = true;
                if (callbacks.onHover){
                    callbacks.onHover(event.item._props.id)
                }
            } else {
                if (callbacks.onHover){
                    callbacks.onHover(null);
                }
                if (lastSelected){
                    lastSelected.selected = true;
                }
            }
            updateFillColors();
        }
    };

    tool.onMouseDrag = function(event) {
        if (action == 'CREATE'){
            onCreateDrag(event);
            return;
        } else if (action == 'MOVE'){
            if (segment) {
                segment.point = segment.point.add(event.delta);
                path.smooth();
            } else if (path) {
                path.position = path.position.add(event.delta);
            }
            updateBounds(path);
            callbacks.onUpdate(path._props);
        }
    };
    tool.onMouseUp = function(event){
        if (action == 'CREATE'){
            onCreateUp(event);
            return;
        }
    };

    var onNewPath = function(event) {
        action = 'CREATE';

        // If we produced a path before, deselect it:
        if (path) {
            path.selected = false;
        }
        paper.project.activeLayer.selected = false;

        // Create a new path and set its stroke color to black:
        path = new paper.Path({
            segments: [event.point],
            strokeColor: 'white',
            strokeWidth: 3,
            // Select the path, so we can see its segment points:
            fullySelected: true
        });
        paths[id] = path;
        path._props = {
            id: id++
        };
        lastSelected = path;
    };

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
    var onCreateDrag = function(event) {
        path.add(event.point);

        // Update the content of the text item to show how many
        // segments it has:
        //textItem.content = 'Segment count: ' + path.segments.length;
    };

// When the mouse is released, we simplify the path:
    var onCreateUp = function(event) {
        action = 'NONE';

        // When the mouse is released, simplify it:
        path.simplify(1.5);
        path.smooth();

        // Clean up
        path.closed = true;
        path.fillColor = new paper.Color(1, 1, 1, 0.3);
        paper.project.activeLayer.selected = false;
        path.fullySelected = true;
        if (callbacks.onCreate){
            updateBounds(path);
            callbacks.onCreate(path._props);
        }
    };

    return {
        paths,
        select, hover
    };
};

var ImageAnnotation = React.createClass({

    componentDidMount(){
        paper.setup(this.refs.canvas);
        var tool = new paper.Tool();

        var callback = type => {
            return id => {
                if (this.props[type]){
                    this.props[type](id);
                }
            }
        };

        this.project = initDraw(tool, {
            onHover: callback('onHover'),
            onSelect: callback('onSelect'),
            onCreate: callback('onCreate'),
            onUpdate: callback('onUpdate')
        });
    },

    componentWillUpdate(nextProps){
        if (!this.project){
            return;
        }
        if (nextProps.selected != this.props.selected){
            this.project.select(nextProps.selected);
        } else if (nextProps.hover != this.props.hover){
            this.project.hover(nextProps.hover);
        }
    },

    render(){
        const fillStyle = {position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, right: 0, bottom: 0};
        return (
            <div style={{width: 400, margin: 'auto'}}>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    {this.props.children}
                    <canvas ref="canvas" style={fillStyle} width={400} height={593} />
                </div>
            </div>
        );
    }
});

module.exports = {
    ImageAnnotation
};

