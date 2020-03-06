import WidgetManager from '../widget-manager';
import { AudioPlayer } from 'components/media-player';

WidgetManager.registerWidget("AudioPlayer", {
    component: AudioPlayer,
    icon: "music",
    config: [
        {key: "src", type: "input"},
        {key: "drawMode", type: "selector", values: ['squares', 'bars']}
    ],
    defaultValue: {type: 'AudioPlayer', src: '/files/hardmode.mp3', drawMode: 'squares'}
});

module.exports = {
    AudioPlayer
};
