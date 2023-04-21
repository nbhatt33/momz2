import { eventTags } from "./eventTags";
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import calendarScreen, { APPOINTMENTS, selectedDate } from "../../src/screens/calendarScreen";
import { useState } from 'react';
import Dialog from "react-native-dialog";
import { Modal } from "react-native/Libraries/Modal/Modal";
import React from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { pushCalendarNotificationsAsync, pushReminderNotificationsAsync } from "../../src/notifications";
import { Platform } from "react-native";

let taskBool = false

export interface Action {
    readonly action: () => void; //TODO: Add proper parameters
}

export const addEvent: Action = {
    
    action: () => {
        taskBool = false
        if (Platform.OS === 'android') {
            console.log("add event attempt");
            alert("Your current selected date is " + selectedDate + ". If you want to change it, go to the calendar app and tap the date you want.")
        } else if (Platform.OS === 'ios') {
            console.log("ios add event")
        }
    }
}

export var chosenDates = selectedDate;


export function chosenDate() {
    const [chosensDate, setchosenDate] = useState('');
    setchosenDate(selectedDate);
    chosenDates = chosensDate;
    return (
        chosensDate
    )
}

/*{
    action: () => {
        console.log("Adding event");
    }
}*/

export const addTasks: Action = {
    
    action: () => {
        taskBool = true

        if (Platform.OS === 'android') {
            console.log("add event attempt");
            alert("Your current selected date is " + selectedDate + ". If you want to change it, go to the calendar app and tap the date you want.")
        } else if (Platform.OS === 'ios') {
            console.log("ios add task")
        }
    }
}

//Turn each of these into an array generated by eventTags[]
export const tags: Action[] = eventTags.map((tag) => {
        
        return {
            action: () => {
                
                if (Platform.OS === 'ios') {
                    let input = "";
                    let chosen = Alert.prompt(
                        `Please enter the date of your ${tag.name} in yyyy-mm-dd`, 
                        'Example: 2023-04-21',
                        [{
                            text: "OK",
                            onPress: (date) => {
                                // Set the user input to the variable
                                input = date;

                                var appointment = {
                                    date: input,
                                    title: "Event added through chat",
                                    type: tag.name
                                }
                                APPOINTMENTS[APPOINTMENTS.length] = appointment
                                console.log(taskBool)
                                if (taskBool == false) {
                                    
                                    pushCalendarNotificationsAsync(appointment)
                                    pushReminderNotificationsAsync(tag.name, input, "Event added through chat")
                                    console.log("reminders!!")
                                }
                                
                                console.log(appointment)

                            }
                        }],
                    )
                    } else if (Platform.OS === 'android'){
                        console.log("This is the selected date" + selectedDate);
                        console.log("This is the selected date" + chosenDates);
                        
                        console.log("Tagging " + tag.name);
                        
                        var appointment = {
                            date: selectedDate,
                            title: "Event added through chat",
                            type: tag.name
                          }
                          APPOINTMENTS[APPOINTMENTS.length] = appointment
                          
                          if (taskBool == false) {
                            pushCalendarNotificationsAsync(appointment)
                            pushReminderNotificationsAsync(tag.name, selectedDate, "Event added through chat")
                          }
                    }
            }
        }    
});


export const getTime: Action = {
    action: () => {
        let date = new Date();
        Alert.alert("Current time/date " + date.toDateString())
    }
}

