
import SearchBox from '../../components/search/search-box'
import WidgetManager from '../widget-manager';

WidgetManager.registerWidget("SearchBox", {
    component: SearchBox,
    icon: "search",
    config: [
        {key: "url",            type: "input"},
        {key: "placeholder",    type: "input"},
        {key: "icon",           type: "icon"},
        {key: "iconPos",        type: "selector", values: ["right", "left", "none"]},
        {label: "autoRefresh", key: "autoRefreshValue",    type: "boolean"},
        //{key: "justified",      type: "boolean"}
    ]
});

export default SearchBox;
