import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, AppState, Platform} from 'react-native';
import * as textEngine from './momTextEngine/code/textEngine';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  useEffect(() => {

    AppState.addEventListener('change', (nextAppState) => {
      if (Platform.OS === 'ios' && nextAppState === 'inactive') {
       Notifications.scheduleNotificationAsync({
          content: {
            title: 'You left the app!',
            body: 'Come back and talk to mom!',
          },
          trigger: { seconds: 5,},
        }).catch((err) => {
          console.error("Got error: ", err);
        });
      } else if (Platform.OS === 'android' && nextAppState === 'background') {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'You left the app!',
            body: 'Come back and talk to mom!',
          },
          trigger: { seconds: 5,},
        }).catch((err) => {
          console.error("Got error: ", err);
        });
      }
    });
    Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        console.log('Notification permissions granted.');
      } else {
        console.log('Notification permissions denied.');
      }
    }).catch((err) => {
      console.error("Got error: ", err);
    });
  }, []);

  return (
    <View style={styles.container}>
      {textEngine.startEngine()}
    </View>
  );
}

export const styles = StyleSheet.create({ //TODO: Make style file
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});