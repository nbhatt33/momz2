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

const format = (date = new Date()) => dateFns.format(date, 'YYYY-MM-DD');
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

    if (curr_date.toISOString().substring(0,10) == appointment.date.substring(0,10)){
      pushCalendarNotificationsAsync(appointment)
    }
    
  });

  return markedDates;
};

export default () => {
  const [enteredGoalText, setEnteredGoalText] = useState('');

  function goalInputHandler(textEntered) {
    setEnteredGoalText(textEntered)
  }

  function addEventHandler() {
    APPOINTMENTS[APPOINTMENTS.length - 1].date = selectedDate
    APPOINTMENTS[APPOINTMENTS.length - 1].title = enteredGoalText

    //Reminder Notifications
    console.log(selectedDate)

    x = 2
    pushReminderNotificationsAsync(x, selectedDate, enteredGoalText)

  }
  var selectedDate
  const baseDate = '2023-04-18'
  // console.log(new Date().toLocaleDateString());
  var test = new Date().toLocaleDateString();
  //test = test.replace(/'\\"'/g, '-');
  test = test.substring(0,4) + '-' + test.substring(5);
  test = test.substring(0,1) + '-' + test.substring(2);
  // console.log(test);
  const APPOINTMENTS = [
    {
      date: '2023-04-01',
      title: "It's a past thing!",
    },
    {
      date: '2023-04-18',
      title: "It's a today thing!",
    },
    {
      date: '2023-04-30',
      title: "It's a future thing!",
    },
    {
      date: '2024-03-25',
      title: "CS 2200 Exam",
    }
  ];
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
  return (
    <View style={styles.container}>
      <Calendar
        current={baseDate} 
        onDayPress={(day) => {
          selectedDate = day.dateString
          var i = 0;
          while(i < APPOINTMENTS.length) {
            if (day.dateString === APPOINTMENTS[i].date){
              console.log(APPOINTMENTS[i].title)
            }
            i++
          }
        }}
        markedDates={getMarkedDates(baseDate, APPOINTMENTS)}
        theme={{
          calendarBackground: '#f5f5f5',

          selectedDayBackgroundColor: '#C0D6DF',
          selectedDayTextColor: '#166088',
          selectedDotColor: '#166088',

          dayTextColor: '#729DAF',
          textDisabledColor: '#729DAF',
          dotColor: '#DBE9EE',

          monthTextColor: '#729DAF',
          textMonthFontWeight: 'bold',

          arrowColor: '#DBE9EE',
        }}
      />
      <FormInput 
        // style = {styles.input}
        labelName = 'Event'
        onChangeText = {goalInputHandler}
        value = {enteredGoalText}>
      </FormInput>

      <PromptButton
        // color='#578580'
        title = "Add Event"
        onPress={addEventHandler}
      ></PromptButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#166088',
    justifyContent: 'center',
  },
  input: {
    alignItems: 'center'
  },
});
