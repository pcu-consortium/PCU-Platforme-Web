

var valueOf = function(val){
    if ((typeof val) === "string" && (val.indexOf('~~') == 0)){
        var matches = val.match(/~~[^:]+:[^~]*/g);
        if (!matches){
            return val;
        }
        var obj = {};
        for(var match of matches){
            var kv = match.match(/~~([^:]+):([^~]*)/);
            obj[kv[1]] = kv[2];
        }
        return obj;
    }
    return val;
}

var typeOf = function(type){
    switch(type){
        case "BOOLEAN": return {type: "boolean"};
        case "CHAR":    return {type: "text"};
        case "INTEGER": return {type: "number", subtype: "integer"};
        case "DECIMAL": return {type: "number", subtype: "float"};
        case "DATE":    return {type: "date", subtype: "date"};
        case "TIMESTAMP":    return {type: "date", subtype: "datetime"};
        case "TIME":         return {type: "date", subtype: "time"};
        case "PSEUDODATE":   return {type: "date", subtype: "date"};
        default: console.log('unhandled type', type); return {type: "text"};
    }
};

var multivalued = function(list_type){
    if (!list_type) return false;
    switch(list_type){
        case "LISTE SIMPLE": return true;
        case "THESAURUS":    return true;
        case "LISTE ANNEXE": return true;
        default: return false;
    }
};

var computeTableTabs = function(table){
    var tabs = [];
    var tableMap = {};
    table.fields.forEach(function(field){
        var id = 1+Math.floor(field.pos/100);
        var label = "Tab " + id;
        if (!(id in tableMap)){
            tableMap[id] = {
                id: id,
                label: label,
                fields: []
            };
            tabs.push(tableMap[id]);
        }
        var tab = tableMap[id];
        // if (field.id !== 'commentaires') 
        tab.fields.push(field.id);
    });
    return tabs;
}

var computeTables = function(columns){
    var tables = {};
    var tableNames = [];
    columns.forEach(function(column){
        var id = column.id.toLowerCase();
        if (!(id in tables)){
            var label = column.label || id;
            var table = {id:id, label:label, fields:[]};
            tables[id] = table;
            // console.log('TABLE', label);
            tableNames.push(label);
        }
        var type = typeOf(column.field_type);
        var isMultiValued = multivalued(column.list_type);
        // if (multiValued) console.log(column.field_id, column.field_label);
        tables[id].fields.push({
            id: column.field_id,
            label: column.field_label,
            type: type.type,
            subtype: type.subtype,
            multivalued: isMultiValued,
            pos: parseInt(column.pos, 10)
        });
    });
    for(var id in tables){
        if (tables.hasOwnProperty(id)){
            var table = tables[id];
            table.tabs = computeTableTabs(table);
        }
    }
    // console.log('TABLES:', tableNames.join(', '));
    console.log(tables);
    return tables;
};

module.exports = {
  valueOf, typeOf, computeTables, computeTableTabs
};
