

var SchemaModel = function(){

    var selected;
    var allModels = [];

    var model, tabbedModel;
    // var model = {
    //     id: "document",
    //     label: "Document",
    //     fields: [
    //         {name: "first_name", type: "text",        multivalued: false},
    //         {name: "last_name", type: "text",         multivalued: false},
    //         {name: "full_name", type: "computed", expression: "{first_name} {last_name}"},
    //         {name: "age", type: "number", subtype: "integer"},
    //         {name: "bool_field", type: "boolean", subtype: "integer"},
    //         {name: "controlled_field", type: "controlled", subtype:"rameau",  multivalued: true},
    //         {
    //             name: "structure_field",
    //             type: "structure",
    //             fields: [
    //                 {name: "name", type: "text"},
    //                 {name: "role", type: "text"}
    //             ],
    //             multiValued: true
    //         },
    //         {name: "other_field", type: "text",        multivalued: false},
    //     ],
    //     tabs: [
    //         {
    //             id: "general",
    //             label: "Général",
    //             fields: [
    //                 "first_name", "last_name", "full_name", "age", "bool_field", "controlled_field", "structure_field"
    //             ]
    //         },
    //         {
    //             id: "other",
    //             label: "Autre",
    //             fields: [
    //                 "other_field"
    //             ]
    //         }
    //     ]
    // };

    var computeTabbedModel = function(model){
        var fieldsById = {};
        model.fields.forEach(field => {
            fieldsById[field.id] = field;
        });
        var tabbedModel = {id: model.id, label: model.label, tabs: {}};
        model.tabs.forEach(tab => {
            var fields = tab.fields.map(f => {
                var field = fieldsById[f];
                if (!field){
                    console.warn('Failed to find field ', f);
                }
                return field;
            }).filter(f => f);
            var newTab = {
                id: tab.id,
                label: tab.label,
                fields
            };
            tabbedModel.tabs[tab.id] = newTab;
            initParents(newTab);
        });
        return tabbedModel;
    };

    // hideTypeLabel => hides the type's name in the subtype selector
    var types = {
        boolean         : {},
        number          : { subtypes: ["float", "integer"]},
        date            : { subtypes: ["date_time", "date", "time"], hideTypeLabel: true},
        duration        : {},
        text            : { subtypes: ["mono_lingual", "multi_lingual"]},
        controlled      : { subtypes: ["thesaurus", "helplist", "classification_plan", "rameau"], hideTypeLabel: true},
        internal_link   : {},
        external_link   : { subtypes: ["any", "url", "email"]},
        structure       : {},
        computed        : {}
    };

    var ensureId = function(field){
        if (!field.id){
            field.id = generateUUID();
        }
        if (field.fields){
            field.fields.forEach(ensureId);
        }
    };

    var initParents = function(parent){
        ensureId(parent);
        if (parent.fields){
            parent.fields.forEach(field => {
                field.parent = parent;
                initParents(field);
            });
        }
    };
    var initSubtypes = function(parent){
        var fields = parent.fields || [];
        fields.forEach(field => {
            ensureTypeInfo(field);
            initSubtypes(field);
        });
    };

    var removeParents = function(parent){
        if (!parent.fields){
            return;
        }
        var fields = parent.fields;
        for(var i=0; i<fields.length; i++){
            var field = fields[i];
            field.parent = undefined;
            removeParents(field);
        }
    };
    var removeIds = function(parent){
        parent.id = undefined;
        if (parent.fields){
            parent.fields.forEach(removeIds);
        }
    };

    var typeList = [];
    for(var key in types){
        if (types.hasOwnProperty(key)){
            typeList.push(key);
        }
    }

    var callback;

    var register = function(cb){
        callback = cb;
    };

    var unregister = function(){
        callback = undefined;
    };

    var notify = function(){
        if (callback){
            callback();
        }
    };

    var setModel = function(m){
        model = m;
        m.fields.forEach(f => {
            if ((typeof f.label) != "string"){
                f.label = f.label.fra;
            }
            ensureTypeInfo(f);
        });
        tabbedModel = computeTabbedModel(m);
        notify();
    };

    var getModel = function(){
        return model;
    };

    var getTabbedModel = function(){
        return tabbedModel;
    };

    var isDuplicate = function(field, anyPos){
        var fields = field.parent.fields;
        for(var i=0; i<fields.length; i++){
            if (fields[i].id === field.id){
                // Different entry with the same name ?
                if (fields[i] == field){
                    if (!anyPos){
                        return false;
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    };

    var ensureTypeInfo = function(field){
        console.log('ensure', field);
        var type = field.type;
        if (types[type].subtypes){
            field.subtype = types[type].subtypes[0];
        }
        if ((type === "structure") && !field.fields){
            field.fields = [];
        }
    };

    var update = function(field, key, value){
        if (!field.id){
            // New field, clone !
            var oldField = field;
            var parent = oldField.parent;
            oldField.parent = undefined;
            field = jQuery.extend(true, {}, oldField);
            field[key] = value;
            parent.fields.push(field);
            field.parent = parent;
            field.type = "text";
            ensureId(field);
            ensureTypeInfo(field);
        } else {
            field[key] = value;
        }
        if (key == "type"){
            ensureTypeInfo(field);
        }
        field.version = (field.version || 0) + 1; // Increment version number for lazy updates !
        console.log('version', field.version);
        //if (isNew) {  // TODO : local updates ??
        notify();
        //}
    };

    var duplicate = function(field){
        // Cloning fails if the data has cycles ; remove parents, clone, reinsert
        var parent = field.parent;
        var idx = parent.fields.indexOf(field);
        removeParents(parent);
        var newField = jQuery.extend(true, {}, field);
        removeIds(newField);
        console.log('idx', idx);
        parent.fields.splice(idx+1, 0, newField);
        initParents(parent);
        var label = newField.label;
        var n = 1;
        if (!label.match(/_[0-9]+$/)){
            label += "_0";
        }
        while(isDuplicate(newField, true)){
            newField.label = label.replace(/_[0-9]+$/, "_" + (n++));
        }
        newField.id = undefined;
        ensureId(newField);
        console.log(newField.label);
        notify();
    };

    var remove = function(field){
        var fields = field.parent.fields;
        var idx = fields.indexOf(field);
        fields.splice(idx, 1);
        notify();
    };

    var move = function(index, target){
        console.log('move', index, target);
    };

    var addTab = function(name){
        tabbedModel.tabs[name] ={
            id: name,
            label: name,
            fields: []
        };
    };

    var getSelected = function(){
        return selected;
    };

    var getSelectedId = function(){
        //console.log('selected', selected, selected&&selected.id);
        return selected && selected.id;
    };

    var dispatch = function(msg){
        switch(msg.action){
            case "update": {
                if (msg.key){
                    update(msg.field, msg.key, msg.value);
                } else {
                    var values = msg.values;
                    for(var key in values){
                        if (values.hasOwnProperty(key)){
                            update(msg.field, key, values[key]);
                        }
                    }
                }
                break;
            }
            case "copy":   duplicate(msg.field); break;
            case "delete": remove(msg.field); break;
            case "move":   move(msg.index, msg.target); break;
            case "add_tab": addTab(msg.name);break;
            case "select": {
                selected = msg.field;
                notify();
                break;
            }
            default: console.warn("unknown message", msg);
        }
    };

    var type = function(name){
        if (!(name in types)){
            console.warn("invalid type", name);
            return {};
        }
        return types[name];
    };

    var reset = function(){
        setModel({
            fields: [],
            tabs: []
        });
    };

    var setModels = function(all){
        allModels = all;
    };

    var switchTo = function(modelId){
        var id = "" + modelId;
        if (id == (""+model.id)) return;
        allModels.forEach(model => {
            if ((""+model.id) == id){
                setModel(model);
            }
        });
    };

    var getAllModels = function(){
        return allModels;
    };

    reset();

    return {
        init: setModel,
        reset, switchTo,
        register, unregister,
        setModel, getModel, setModels, getTabbedModel, getAllModels,
        dispatch,
        isDuplicate,
        type, types: typeList,
        getSelected, getSelectedId
    }
}();

module.exports = SchemaModel;

