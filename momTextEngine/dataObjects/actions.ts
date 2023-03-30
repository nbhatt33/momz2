import { eventTags } from "./eventTags";
import { Alert } from 'react-native'

export interface Action {
    readonly action: () => void; //TODO: Add proper parameters
}

export const addEvent: Action = {
    action: () => {
        console.log("Adding event");
    }
}

export const addTasks: Action = {
    action: () => {
        console.log("Adding tasks");
    }
}

//Turn each of these into an array generated by eventTags[]
export const tags: Action[] = eventTags.map((tag) => {
    return {
        action: () => {
            console.log("Tagging " + tag.name);
        }
    }
});

export const getTime: Action = {
    action: () => {
        let date = new Date();
        Alert.alert("Current time/date " + date.toDateString())
    }
}