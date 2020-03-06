
import ReactDOM from 'react-dom';

var JsPlumbMixin = {

    initJsPlumb(container, options){
        this._connectionsToUpdate = null;
        this._draggablesToUpdate = null;
        var bundle = require('bundle?lazy&name=js-plumb!../libs/js-plumb');
        bundle(jsPlumb => {
            this.connections = {};
            options = options || {};
            var targetAnchor = options.targetAnchor || "Top";
            var connector = options.connector || ["Flowchart", {stub: [10, 30], gap: 0, cornerRadius: 5, midpoint: 0.1}];
            this.jsPlumb = jsPlumb.getInstance({
                ConnectionsDetachable: false, // Mouse detachable...
                ConnectionOverlays: [
                    ["Arrow", {location: 1, width:10, length:10}]
                    /*[ "Label", {
                     location: 0.1,
                     id: "label",
                     cssClass: "aLabel"
                     }]*/
                ],
                Anchors: [["Left", "Right"], targetAnchor],
                Endpoints: [["Dot", {radius: 4}], "Blank"],
                PaintStyle: {
                    strokeStyle: "#23527c",
                    fillStyle: "transparent",
                    radius: 7,
                    lineWidth: 2
                },
                Connector: connector

            });
            this.jsPlumb.setContainer(container);
            $(window).resize(() => this.jsPlumb.repaintEverything());

            // Load previously added connections
            this.isLoaded = true;
            if (this._connectionsToUpdate){
                this.setJsPlumbConnections(this._connectionsToUpdate);
                this._connectionsToUpdate = null;
            }
            if (this._draggablesToUpdate){
                this.ensureDraggable(this._draggablesToUpdate);
                this._draggablesToUpdate = null;
            }
        });
    },

    ensureDraggable(draggables){
        if (!this.isLoaded){ // Do once it's ready
            this._draggablesToUpdate = draggables;
            return;
        }
        draggables.forEach(draggable => {
            // Ensure draggable
            this.jsPlumb.draggable(draggable, {
                drag: function (info) { //gets called on every drag
                    // TODO : percentage
                    it.position.x = info.pos[0] + 'px';
                    it.position.y = info.pos[1] + 'px';
                }
            });
        });
    },

    setJsPlumbConnections(connections){
        if (!this.isLoaded){ // Do once it's ready
            this._connectionsToUpdate = connections;
            return;
        }
        var plumb = this.jsPlumb;
        var oldConnections = this.connections;
        this.connections = {};

        connections.forEach(connection => {
            var { source, target, color, anchors } = connection;
            var connectionId = source + "#" + target;
            var conn;
            if (connectionId in oldConnections) {
                // Keep connection
                var conn = oldConnections[connectionId];
                this.connections[connectionId] = conn;
                delete oldConnections[connectionId]; // Check !
            } else if (this.refs[source] && this.refs[target]) {
                // Duplicate default style to allow custom changes
                var paintStyle = jQuery.extend(false, {}, plumb.Defaults.PaintStyle);
                var overlays;
                if (connection.label){
                    overlays = [
                        ["Arrow", {location: 1, width:10, length:10}],
                        [ "Label", {
                            label: connection.label,
                            location: 0.25,
                            cssClass: 'workflow-arrow-label',
                            labelStyle: {
                                //color: color
                                //fillStyle: 'rgba(255, 255, 255, 0.5)',
                                fillStyle: color,
                                color: 'white'
                            }
                        }]
                    ];
                }
                conn = plumb.connect({
                    source: ReactDOM.findDOMNode(this.refs[source]),
                    target: ReactDOM.findDOMNode(this.refs[target]),
                    paintStyle,
                    anchors,
                    overlays
                });
                this.connections[connectionId] = conn;
            }
            if (conn) {
                // Bruteforce color update
                var style = {fillStyle: color};
                conn.getPaintStyle().strokeStyle = color;
                conn.endpoints.forEach(e => e.setStyle(style));
            }
        });

        // Remove old connections
        for(var connectionId in oldConnections){
            if (oldConnections.hasOwnProperty(connectionId)){
                console.log('remove', connectionId);
                plumb.detach(oldConnections[connectionId]);
            }
        }
        plumb.setZoom(this.state.scale);
        plumb.repaintEverything();
    }
};

module.exports = JsPlumbMixin;