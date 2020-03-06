
import _ from 'lodash/object';

var WidgetManager = function(){

    var page;
    var pageWidget;
    var modules = {};
    var widgets = {};
    var values = {};
    var widgetInstances = {};
    var valueCache = {};

    var registerWidget = function(name, widget){
        widgets[name] = widget;
    };

    var registerModule = function(name, module){
        modules[name] = module;
    };

    var getWidget = function(widgetType){
        return widgets[widgetType];
    };

    var getWidgetConfig = function(widgetType){
        var widget = widgets[widgetType];
        if (widget && widget.config){
            return widget.config;
        }
        return [];
    };

    var getWidgetDefault = function(widgetType){
        var widget = widgets[widgetType];
        if (widget && widget.defaultValue){
            return widget.defaultValue;
        }
        return [];
    };

    var getWidgetComponent = function(widgetType){
        var widget = widgets[widgetType];
        if (widget){
            return widget.component;
        }
        return undefined;
    };

    var getDefaultProps = function(widgetType){
        var widget = widgets[widgetType];
        if (widget){
            return widget.properties || {};
        }
        return {};
    };

    var findAndRemoveIn = function(widget, root){
        if (!root){
            return false;
        }
        if (Array.isArray(root)){
            for(var i=0; i<root.length; i++){
                if (root[i] == widget){
                    root.splice(i, 1);
                    return true;
                } else if(findAndRemoveIn(widget, root[i])){
                    return true;
                }
            }
            return false;
        }
        if (root.children){
            return findAndRemoveIn(widget, root.children);
        }
        return false;
    };

    var opEval = function(op){
        switch(op){
            case "+": return (v1, v2)  => {
                if (((typeof v1) === "string") && ((typeof v2) === "object")) {
                    v2 = "";   
                } else if (((typeof v1) === "object") && ((typeof v2) === "string")){
                    v1 = "";   
                }
                return v1 + v2;
            }
            case "-": return (v1, v2)  => v1 - v2;
            case "*": return (v1, v2)  => v1 * v2;
            case ":": return (v1, v2)  => v1 / v2;
            case "=": return (v1, v2)  => v1 == v2;
            case "!=": return (v1, v2) => v1 != v2;
            case "<": return (v1, v2)  => v1 <  v2;
            case "<=": return (v1, v2) => v1 <= v2;
            case ">": return (v1, v2)  => v1 >  v2;
            case ">=": return (v1, v2) => v1 >= v2;
            case "like": return (v1, v2) => like(v1, v2);
            default: return undefined;
        }
    };

    var like = function(v1, v2){
        if (!v1 || !v2){
            return false;
        }
        function escapeRegExp(string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }
        var regexString = "^" + escapeRegExp(v2).replace(/%/g, ".*") + "$";
        var regex = new RegExp(regexString, "i");
        console.log(regexString, v1);
        return regex.test(v1);
    };

    var call = function(call, context){
        var args = call.args;
        var evaluateDefault = function(exp, defaultValue){
            var v = evaluate(exp, context);
            if ((v === null) || (v === undefined)){
                return defaultValue;
            } else {
                return v;
            }
        };
        if (args.length == 2){
            var op = opEval(call.fun);
            if (op){
                return op(evaluateDefault(args[0], ""), evaluateDefault(args[1], ""));
            }
        }
        switch(call.fun){
            case ".":  return getField(args[0], args[1], context);
            case "*.": return mapField(args[0], args[1], context);
            default: console.error("NYI - '" + call.fun + "'"); return "";
        }
    };

    var mapField = function(arrExp, field, context){
        var arr = evaluate(arrExp, context);
        if (!arr){
            return undefined;
        }
        return arr.map(it => it[field]);
    };

    var getField = function(exp, field, context){
        // console.log('getField', exp, field);
        if ((exp === null) || (exp === undefined) || ((typeof exp) !== "object")){
            return undefined;
        }
        // Catch ref instead of running evaluate on it
        if (exp.type == "ref") { // TODO : Benoît, SAVE ME !!! WCE (Worst Code Ever)
            var key = exp.dest + "." + field;
            if (valueCache.hasOwnProperty(key)){
                console.log('from cache !');
                return valueCache[key];
            }
            //if (values.hasOwnProperty(key)){
            //    return values[key];
            //} else {
            // Find widget and use it :)
            var widget = widgetInstances[exp.dest];
            if (!widget){
                return undefined;
            } else {
                // Could be an alias, use destination's widget context
                var context = createContext(widget);
                var val = evaluate(context(field), context);
                valueCache[key] = val;
                return val;
            }
            //}
        } else {
            var obj = evaluate(exp, context);
            if ((obj === null) || (obj === undefined) || ((typeof obj) !== "object")){
                return undefined;
            }
            return createContext(obj)(field);
        }
    };

    var select = function(v, context){
        console.log('SELECT');
        var arr = evaluate(v.from, context);
        if (!arr){
            return undefined;
        }
        var t0 = new Date().getTime();
        if (v.where){
            arr = arr.filter(obj => {
                var context = createContext(obj);
                return evaluate(v.where, context);
            });
        }
        var t1 = new Date().getTime();

        var res = arr.map(obj => {
            var res = {};
            var context = createContext(obj);
            v.statements.forEach((s, idx) => {
                // Either statement name or variable name or default name :)
                var id = s.name || s.expr.name || ("col_" + idx);
                res[id] = evaluate(s.expr, context);
            });
            return res;
        });
        var t2 = new Date().getTime();
        console.log('filter:', (t1-t0) + 'ms', 'map:', (t2-t1) + 'ms');
        return res;
    };

    var evaluate = function(value, context){
        if ((value === null) || (value === undefined)){
            return value;
        }
        var t = typeof value;
        if (t !== "object"){
            return value;
        } else {
            switch(value.type){
                case "ref" : return (value.dest in values) ? values[value.dest] : widgetInstances[value.dest];
                case "call": case "Call": return call(value, context);
                case "select": return select(value, context);
                case "var": return context ? context(value.name) : undefined;
                default: return value; // Nothong to evaluateuate ?
            }
        }
    };

    var mustEvalprop = function(prop){
        return (prop && (typeof prop === "object")
        && ((prop.type === "ref") || (prop.type === "Ref")
        || (prop.type === "call") || (prop.type === "Call")
        || (prop.type === "select") || (prop.type === "var")));
    };

    var mustEval = function(props){
        for(var key in props){
            if (props.hasOwnProperty(key)){
                // Force evaluateuation of "query"...
                if (mustEvalprop(props[key]) || ((key === "query") && mustEval(props[key]))){
                    return true;
                }
            }
        }
        return false;
    };

    var createContext = function(props){
        return function(name) {
            // Dynamic value ?
            console.log('get', name, props);
            if (props.type) {
                var key = widgetName(props.type, props.id) + "." + name;
                if (values.hasOwnProperty(key)) {
                    return values[key];
                }
            }
            // WidgetML property ?
            if (name in props){
                return props[name];
            }
            // Static widget property ?
            return getDefaultProps(props.type)[name];
        };
    };

    var evalProps = function(props){
        if (!mustEval(props)){
            return props;
        }
        props = jQuery.extend(false, {}, props);

        // Create widget context
        var context = createContext(props);
        var widgetKey;
        if (props.type && props.id){ // Only cache unique ids :p
            widgetKey = widgetName(props.type, props.id);
        }
        for(var key in props){
            if (props.hasOwnProperty(key)){
                var prop = props[key];
                // TODO : remove hack, time to compile this crap ?
                if (mustEvalprop(prop)){
                    var cacheKey = widgetKey + "." + key;
                    // console.log('cacheKey', cacheKey, valueCache[cacheKey]);
                    if (widgetKey && valueCache.hasOwnProperty(cacheKey)){
                        props[key] = valueCache[cacheKey];
                    } else {
                        props[key] = evaluate(prop, context);
                        if (widgetKey){ // Save to cache !
                            valueCache[cacheKey] = props[key];
                        }
                    }
                } else if ((key === "query") && ((typeof props) === "object")){
                    props[key] = evalProps(prop, context);
                }
            }
        }
        return props;
    };

    var evalString = function(str){
        try{
            return evaluate(WMLexp2JS(str));
        } catch(e){
            console.warn('Failed to parse string', str);
            return undefined; // Failed...
        }
    };

    var setPage = function(p){
        page = p;
    };

    var widgetName = function(widgetType, id){
        if (id){
            return widgetType + '#' + id;
        } else {
            return widgetType;
        }
    };

    var setPageWidget = function(pw){
        valueCache = {}; // Invalid cache, just in case...
        if (pageWidget === pw){
            //console.log("Page widget already set...");
            return;
        }
        pageWidget = pw;
        widgetInstances = {};

        // Initialize modules
        _.forOwn(modules, (module, name) => {
            widgetInstances[name] = module;
        });


        // Parse and set default values if any... Also capture widgets
        var iter = function(widget){
            if (!widget){
                return;
            }
            if (Array.isArray(widget)){
                for(var i=0; i<widget.length; i++){
                    iter(widget[i]);
                }
            } else {
                var name = widgetName(widget.type, widget.id);
                widgetInstances[name] = widget; // Used for propagating/expansing evaluate...
                if (widget.defaultValue){
                    updateValue(widget.type, widget.id, widget.defaultValue);
                }
                iter(widget.children);
            }
        };
        iter(pw);
    };

    var updateFieldValue = function(widgetType, id, field, value){
        console.log('updateFieldValue', widgetType, id, field, value);
        var key = widgetName(widgetType, id);
        if (field){
            key += "." + field;
        }
        //console.log('updateFieldValue', key, value);
        values[key] = value;
        valueCache = {}; // Flush cache, just in case
        // TODO : dependency checking to do partial cache invalidations
        if (page){
            setTimeout(() => page.refresh());
        }
    };

    var updateValue = function(widgetType, id, value){
        updateFieldValue(widgetType, id, undefined, value);
    };

    return {
        registerWidget, registerModule,
        getWidget, getWidgetComponent, getWidgetConfig, getWidgetDefault,
        findAndRemoveIn: findAndRemoveIn,
        eval: evaluate, evalProps, evalString, // Convert string and evaluate
        updateValue: updateValue, updateFieldValue,
        setPage, setPageWidget
    }
}();

window.WidgetManager = WidgetManager; // TODO: remove

module.exports = WidgetManager;
