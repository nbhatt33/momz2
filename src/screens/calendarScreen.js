import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dateFns from 'date-fns';
import * as Notifications from 'expo-notifications';
import {pushCalendarNotificationsAsync, pushReminderNotificationsAsync} from '../notifications'
import { useState } from 'react';
import FormButton from '../components/formButton';
import FormInput from '../components/formInput';
import PromptButton from '../components/promptButton';
//import { Dropdown } from 'react-native-material-dropdown';
import Dropdown from 'react-dropdown';
import Dialog from "react-native-dialog";

const format = (date = new Date()) => dateFns.format(date, 'YYYY-MM-DD');
const appointmentTypes = [
  {value: 'Default'},
  {value: 'Course'},
  {value: 'Assignment'},
  {value: 'Exam'},
  {value: 'Work'}
];
const getMarkedDates = (baseDate, appointments) => {
  const markedDates = {};

  markedDates[baseDate] = { selected: true };

  appointments.forEach((appointment) => {
    const formattedDate = new Date(appointment.date);
    markedDates[formattedDate] = {
      ...markedDates[formattedDate],
      marked: true,
    };

    const curr_date = new Date()

    // if (curr_date.toISOString().substring(0,10) == appointment.date.substring(0,10)){
    //   pushCalendarNotificationsAsync(appointment)
    // }
    
  });

  return markedDates;
};

var test = new Date().toLocaleDateString();
  test = test.substring(0,4) + '-' + test.substring(5);
  test = test.substring(0,1) + '-' + test.substring(2);
  test = test.substring(5) + '-0' + test.substring(0,2) + test.substring(2,4)
  const baseDate = test

export const APPOINTMENTS = [
  {
    date: '2023-04-01',
    title: "It's a past thing!",
    type: "Default"
  },
  {
    date: baseDate,
    title: "It's a today thing!",
    type: "Work"
  },
  {
    date: '2023-04-30',
    title: "It's a future thing!",
    type: "Assignment"
  },
  {
    date: '2024-03-25',
    title: "CS 2200 Exam",
    type: "Course"
  },
  {
    date: '2024-04-21',
    title: "CS 4510 Exam",
    type: "Exam"
  }
];
export var selectedDate = baseDate;
export default () => {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [enteredTypeText, setEnteredTypeText] = useState('');

  function goalInputHandler(textEntered) {
    setEnteredGoalText(textEntered)
  }
  function typeInputHandler(textEntered) {
    setEnteredTypeText(textEntered)
  }

  function addEventHandler() {
    var appointment = {
      date: selectedDate,
      title: enteredGoalText,
      type: enteredTypeText
    }
    APPOINTMENTS[APPOINTMENTS.length] = appointment
    
    pushReminderNotificationsAsync(enteredTypeText, selectedDate, enteredGoalText)
    console.log("push from calendar")
    pushCalendarNotificationsAsync(appointment)
 
    
  }
  
  
  
  /*
  function day() {
    var i = 0;
    while(i < APPOINTMENTS.length) {
      if (day.dateString === APPOINTMENTS[i].date){
        console.log(APPOINTMENTS[i].title)
        show = i
      }
      i++
    }
  }  
  */
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];
  return (
    <View style={styles.container}>
      <Calendar
        current={baseDate} 
        onDayPress={(day) => {
          selectedDate = day.dateString
          var i = 0;
          while(i < APPOINTMENTS.length) {
            if (day.dateString === APPOINTMENTS[i].date){
              //alert("Your notes for " + APPOINTMENTS[i].date + ": " + APPOINTMENTS[i].title);
              Alert.alert(
                "Your notes for " + APPOINTMENTS[i].date + ": ",
                "Type: " + APPOINTMENTS[i].type + " Event: " + APPOINTMENTS[i].title,
              );
              console.log(APPOINTMENTS)
            }
            i++
          }
        }}
        markedDates={getMarkedDates(baseDate, APPOINTMENTS)}
        theme={{
          calendarBackground: '#f2f2f2' ,


          selectedDayBackgroundColor: '#6750a4',
          selectedDayTextColor: 'white',
          selectedDotColor: 'purple',
 
 
          dayTextColor: '#6750a4',
          textDisabledColor: '#b99de0',
          dotColor: 'purple',
 
 
          monthTextColor: '#6750a4',
          textMonthFontWeight: 'bold',
 
 
          arrowColor: '#e4e0e3',
        }}
 
      />
        <View style={styles.inputContainer}>
          <TextInput
            style = {styles.eventTextInput}
            placeholder = 'Your Event Name'
            placeholderTextColor={'lightgray'}
            onChangeText = {goalInputHandler}
            value = {enteredGoalText}>
          </TextInput>

          <TextInput
          style = {styles.typeTextInput}
          labelName = 'Event Type'
          placeholder = 'Event Type'
          placeholderTextColor={'lightgray'}
          onChangeText = {typeInputHandler}
          value = {enteredTypeText}>
          </TextInput>
        </View>
        
       
        <View style={styles.buttonContainer}>
       
          <FormButton
            modeValue="contained" 
            title = "Add Event"
            onPress={addEventHandler}
          />

        </View>
      
     {}
   </View>
 );
};


const styles = StyleSheet.create({
 container: {
   flex: 1,
   // backgroundColor: '#166088',
   justifyContent: 'flex-start' ,
 },
 inputContainer: {
   flex:1,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'flex-start',
   marginTop: 17,
   marginBottom: 24,
   borderBottomWidth: 1,
   borderBottomColor: '#f5f5f5',
   marginRight: 5
   
 },
  eventTextInput: {
   borderWidth: 1,
   borderColor: '#6750a4',
   borderRadius: 10,
   width:'60%',
   marginRight: 10,
   marginLeft: 20,
   padding: 8
 },
  typeTextInput: {
    borderWidth: 1,
    borderColor: '#6750a4',
    borderRadius: 10,
    width:'30%',
    marginRight: 20,
    marginLeft: 5,
    padding: 8
},
 button: {
   marginRight: 5,
   justifyContent: 'center',
   alignItems: 'flex-start',
 },
 buttonContainer: {
   flex:4,
   top: 0,

   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'flex-start',
   marginTop: 0,
   marginBottom: 50,
   borderBottomWidth: 1,
   borderBottomColor: '#f5f5f5',
   marginRight: 5,
   padding: 50,

 }
});

