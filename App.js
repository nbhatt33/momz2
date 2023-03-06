import React from 'react';
import { AppRegistry } from 'react-native';

import App from './src/index';

export default function ConnectedApp() {
  return <App />;
}

AppRegistry.registerComponent('App', () => ConnectedApp);