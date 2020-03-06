import WidgetManager from 'widgets/widget-manager';

import { DocumentInfo, DataTree } from 'components/document';
import DatabaseSchema from './database-schema';
import DocumentList from './document-list';
import TableView from './table-view';
import JsonViewer from './json-viewer';

WidgetManager.registerWidget("DataTree", {
    component: DataTree,
    icon: "file-o",
    config: [
    ]
});

WidgetManager.registerWidget("DocumentInfo", {
    component: DocumentInfo,
    icon: "file-o",
    config: [
        {key: "tabStyle", type: "selector", values: ["tabs", "pills", "light", "categories"]}
    ]
});

WidgetManager.registerWidget("JSON", {
    component: JsonViewer,
    icon: "code",
    config: [
    ]
});

module.exports = {
    DocumentInfo,
    DatabaseSchema,
    DocumentList,
    TableView
};
