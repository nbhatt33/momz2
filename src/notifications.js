import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, AppState, Platform, AppRegistry} from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
   handleNotification: async () => ({
     shouldShowAlert: true,
     shouldPlaySound: false,
     shouldSetBadge: false,
   }),
});

export const pushNotificationsAsync = async () => {

    AppState.addEventListener('change', (nextAppState) => {
       if (Platform.OS === 'ios' && nextAppState === 'inactive') {
         const n = Math.floor(Math.random()*100)
         console.log(n)
         if (n<=25) {
           console.log("notification")
           Notifications.scheduleNotificationAsync({
             content: {
               title: 'You left the app!',
               body: 'Come back soon!',
             },
             trigger: { seconds: 5,},
            
           }).catch((err) => {
             console.log("Got error: ", err);
           });
         }
       } else if (Platform.OS === 'android' && nextAppState === 'background') {
         const n = Math.floor(Math.random()*100)
         console.log(n)
         if (n<=25) {
           Notifications.scheduleNotificationAsync({
             content: {
               title: 'You left the app!',
               body: 'Come back soon!',
             },
             trigger: { seconds: 5,},
           }).catch((err) => {
             console.log("Got error: ", err);
           });
         }
       }
   });
   Notifications.requestPermissionsAsync().then((status) => {
   if (status.granted) {
       console.log('Notification permissions granted.');
   } else {
       console.log('Notification permissions denied.');
   }
   }).catch((err) => {
   console.log("Got error: ", err);
   });
};

export const pushReminderNotificationsAsync = async (x, selectedDate, text) => {
 console.log("reminder")
 const targetDate = new Date(selectedDate); // Replace with your target date
 targetDate.setHours(15); // 2 PM
 targetDate.setMinutes(58); // 40 minutes
 targetDate.setSeconds(0); // 0 seconds


 const reminderDate = new Date(targetDate)
 reminderDate.setDate(targetDate.getDate() - x + 1);


 console.log(targetDate.toISOString(), reminderDate)
 Notifications.scheduleNotificationAsync({
     content: {
     title: 'You have your '+ text + ' in ' + x + ' days!',
     body: 'Check your calendar to see if you have any other upcoming events.',
     },
     trigger: {date: reminderDate}
 }).catch((err) => {
     console.log("Got error: ", err);
 });

 Notifications.requestPermissionsAsync().then((status) => {
 if (status.granted) {
     console.log('Notification permissions granted.');
 } else {
     console.log('Notification permissions denied.');
 }
 }).catch((err) => {
 console.log("Got error: ", err);
 });
};


export const pushCalendarNotificationsAsync = async (appointment) => {
   Notifications.scheduleNotificationAsync({
       content: {
       title: 'You have your '+ appointment.title + ' today!',
       body: 'Check your calendar to see if you have any other upcoming events',
       },
       trigger: {
       hour:9,
       },
      
   }).catch((err) => {
       console.log("Got error: ", err);
   });


   Notifications.requestPermissionsAsync().then((status) => {
   if (status.granted) {
       console.log('Notification permissions granted.');
   } else {
       console.log('Notification permissions denied.');
   }
   }).catch((err) => {
   console.log("Got error: ", err);
   });
};



