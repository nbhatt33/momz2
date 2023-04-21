import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, AppState, Platform, AppRegistry} from 'react-native';
import { pushNotificationsAsync } from './src/notifications';

import App from './src/index';

export default function ConnectedApp() {

  useEffect(() => {
    pushNotificationsAsync();
  }, []);

  return <App />
}

AppRegistry.registerComponent('App', () => ConnectedApp);

export const styles = StyleSheet.create({ //TODO: Make style file
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});