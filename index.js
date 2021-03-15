import {AppRegistry} from 'react-native';
import Main from './Main';
import {name as appName} from './app.json';
import {initSocket} from './constants.js';

initSocket();
AppRegistry.registerComponent(appName, () => Main);
