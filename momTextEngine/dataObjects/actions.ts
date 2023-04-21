import { eventTags } from "./eventTags";
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import calendarScreen, { APPOINTMENTS, selectedDate } from "../../src/screens/calendarScreen";
import { useState } from 'react';
import Dialog from "react-native-dialog";
import { Modal } from "react-native/Libraries/Modal/Modal";
import React from "react";
import { RefreshControl } from "react-native-gesture-handler";

export interface Action {
    readonly action: () => void; //TODO: Add proper parameters
}

export const addEvent: Action = {
    action: () => {
        console.log("add event attempt");
        alert("Your current selected date is " + selectedDate + ". If you want to change it, go to the calendar app and tap the date you want.")
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
        alert("Your current selected date is " + selectedDate + ". If you want to change it, go to the calendar app and tap the date you want.")
        console.log("Adding tasks");
    }
}

//Turn each of these into an array generated by eventTags[]
export const tags: Action[] = eventTags.map((tag) => {
        
        return {
            action: () => {
                console.log("This is the selected date" + selectedDate);
                console.log("This is the selected date" + chosenDates);
                
                console.log("Tagging " + tag.name);
                
                var appointment = {
                    date: selectedDate,
                    title: "Added through chat",
                    type: tag.name
                  }
                  APPOINTMENTS[APPOINTMENTS.length] = appointment
            }
        }    
});


export const getTime: Action = {
    action: () => {
        let date = new Date();
        Alert.alert("Current time/date " + date.toDateString())
    }
}

