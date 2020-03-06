import WidgetManager from './widget-manager';

import MaterialColor from 'utils/material-color';
WidgetManager.registerModule("Color", MaterialColor);
import './abtest'
import './beacon';
import './campus-aar';
import './calendar';
import './cms';
import './d3js';
import './document';
import './graph';
import './image';
import './layout';
import './map';
import './media-player';
import './search';
import './tags';
import './timeline';
import './users';
import './viewbi';
import './workflow';


import 'utils/react-root-instance'; // Used for the non-router based websites

module.exports = {
    WidgetManager
};
