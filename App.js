import React from 'react';
import { AppRegistry } from 'react-native';

import App from './src/index';
// connected application - top down
export default function ConnectedApp() {
  return <App />;
}

AppRegistry.registerComponent('App', () => ConnectedApp);