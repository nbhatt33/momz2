import * as userPrompts from "./userPrompts";

export interface Dialogue {
    readonly textOptions: string[];
    readonly promptsAndNext?: {prompts: userPrompts.UserPrompt, next?: Dialogue}[];
}

export const brushTeeth: Dialogue = {
    textOptions: [
        "Alright, don't forget to brush your teeth!",
        "Okay, be sure to clean those pearly whites!",
        "Take care now! Before bed, don't forget to brush your teeth!"
    ]
}

export const changeTag: Dialogue = {
    textOptions: [
        "What would you like to tag this task with?",
        "What tag would you like to add to this task?"
    ],
    promptsAndNext: userPrompts.addTag.map((tag, i) => {
        return {
            prompts: userPrompts.addTag[i],
            next: brushTeeth
        }
    })
}

export const responseFeelingGood: Dialogue = {
    textOptions: [
        "That's great! I'm glad you're feeling good. What would you like to do today?",
        "I am so happy to hear that! What can I help you with?"
    ],
    promptsAndNext: [{prompts: userPrompts.addEvent, next: changeTag}, 
                    {prompts: userPrompts.addTasks, next: changeTag}]
}

export const responseFeelingNotGood: Dialogue = {
    textOptions: [
        "I'm sorry to hear that. I'm here to help you manage your tasks and events. What would you like to do today?",
        "I'm sorry to hear that. What can I help you with?"
    ],
    promptsAndNext: [{prompts: userPrompts.addEvent, next: changeTag}, 
                    {prompts: userPrompts.addTasks, next: changeTag}]
}

export const firstWelcome: Dialogue = {
    textOptions: [
        "Hey there! I'm M.O.M (My Online Mother), and I'm here to help you manage your tasks and events. How are you doing today?",
        "Hi! I'm M.O.M (My Online Mother), and I'm here to help you manage your tasks and events. How are you feeling?"
    ],
    promptsAndNext: [{prompts: userPrompts.feelingGood, next: responseFeelingGood},
                    {prompts: userPrompts.feelingOkay, next: responseFeelingNotGood},
                    {prompts: userPrompts.feelingBad, next: responseFeelingNotGood}]
}


//const secondWelcome: Dialogue = {

