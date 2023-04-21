import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, AppState, Platform, AppRegistry} from 'react-native';
import * as Notifications from 'expo-notifications';
import { milliseconds } from 'date-fns';
import { eventTags } from '../momTextEngine/dataObjects/eventTags';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


function assign_days(event_type) {
 let numDays;
 switch(event_type) {
   case "Default":
     numDays = 3;
     break;
   case "Course":
     numDays = 1;
     break;
   case "Assignment":
     numDays = 2;
     break;
   case "Exam":
     numDays = 3;
       break;
   case "Work":
     numDays = 1;
     break;
   default:
     numDays = 1;
 }
 return numDays;
}


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


export const pushReminderNotificationsAsync = async (type, selectedDate, text) => {

  let event_days = assign_days(type)
  let day_string = ''
  if (event_days == 1) {
    day_string = 'day!'
  }else {
    day_string = 'days!'
  }
 // console.log("w", event_days, day_string, type)


 // console.log("reminder")
 // console.log(Date.now())
  const targetDate = new Date(selectedDate); // Replace with your target date
  targetDate.setHours(10); // 10 AM
  targetDate.setMinutes(0); // 00 minutes
  targetDate.setSeconds(0); // 0 seconds


  const reminderDate = new Date(targetDate)
  reminderDate.setDate(targetDate.getDate() - event_days + 1);
  // console.log(reminderDate)

  const currentDate = new Date();
  if (reminderDate < currentDate) {
    console.log("past")
    return
  }


  sec = Date.now() - reminderDate.getTime()
  // console.log("seconds", sec)
  s = Math.abs(Number(sec/1000))
  console.log("reminder", s, reminderDate)



 if (Platform.OS === 'ios') {

     Notifications.scheduleNotificationAsync({
         content: {
         title: 'You have your '+ text + ' in ' + event_days + ' ' + day_string,
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
 } else if (Platform.OS === 'android') {
     Notifications.scheduleNotificationAsync({
         content: {
         title: 'You have your '+ text + ' in ' + x + ' days!',
         body: 'Check your calendar to see if you have any other upcoming events.',
         },
         trigger: {seconds: s}
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
 }
}

export const pushCalendarNotificationsAsync = async (appointment) => {

  

  const targetDate = new Date(appointment.date); // Replace with your target date
  targetDate.setHours(9); // 10 AM
  targetDate.setMinutes(0); // 00 minutes
  targetDate.setSeconds(0); // 0 seconds
  targetDate.setDate(targetDate.getDate() + 1);

  const currentDate = new Date();
  if ( targetDate < currentDate) {
    console.log("past")
    return
  }


  console.log(targetDate)
  sec = Date.now() - targetDate.getTime()
  s = Math.abs(Number(sec/1000))
  console.log("push seconds", s, targetDate)

    if (Platform.OS === 'ios') {
    Notifications.scheduleNotificationAsync({
      content: {
      title: 'You have your '+ appointment.title + ' today!',
      body: 'Check your calendar to see if you have any other upcoming events',
      },
      trigger: { hour: 9}
    }).catch((err) => {
        console.log("Got error: ", err);
    });
  } else if (Platform.OS === 'android') {
    Notifications.scheduleNotificationAsync({
      content: {
      title: 'You have your '+ appointment.title + ' today!',
      body: 'Check your calendar to see if you have any other upcoming events',
      },
      trigger: {seconds: s}
    }).catch((err) => {
        console.log("Got error: ", err);
    });
  }
 
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

