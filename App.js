import React from 'react';
import { AppRegistry } from 'react-native';

import App from './src/index';

import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AppState} from 'react-native';

import Constants from 'expo-constants';

const projectId = "momz-example"
// const projectId = "AIzaSyBuUphz4PYFXV9NiTfbd-F4PnAiMOPMJuU"


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ConnectedApp() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {

    AppState.addEventListener('change', (nextAppState) => {
      if (Platform.OS === 'ios' && nextAppState === 'inactive') {
       Notifications.scheduleNotificationAsync({
          content: {
            title: 'You left the app!',
            body: 'Come back and talk to mom!',
          },
          trigger: { seconds:60*3}, 
        });
      } else if (Platform.OS === 'android' && nextAppState === 'background') {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'You left the app!',
            body: 'Come back and talk to mom!',
          },
          trigger: { seconds:60*3},
        });
      }
    });
    Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        console.log('Notification permissions granted.');
      } else {
        console.log('Notification permissions denied.');
      }
    });
  }, []);
  
  return <App />;
}

AppRegistry.registerComponent('App', () => ConnectedApp);

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // const token = (await Notifications.getExpoPushTokenAsync({projectId: "mom-example-react-native"})).data;
    token = (await Notifications.getExpoPushTokenAsync({experienceId: "@shravd_4/projectSlug"})).data;
    console.log("TOKEN",token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function sendPushNotification(expoPushToken) {
  consolelog(expoPushToken)
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
