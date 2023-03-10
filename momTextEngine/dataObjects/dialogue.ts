import * as userPrompts from "./userPrompts";

export interface Dialogue {
    readonly textOptions: string[];
    readonly promptsAndNext?: {prompts: userPrompts.UserPrompt, next?: Dialogue}[];
}

export const responseFeelingGood: Dialogue = {
    textOptions: [
        "That's great! I'm glad you're feeling good. What would you like to do today?"
    ],
    promptsAndNext: [{prompts: userPrompts.addEvent}, 
                    {prompts: userPrompts.addTasks}]
}

export const responseFeelingNotGood: Dialogue = {
    textOptions: [
        "I'm sorry to hear that. I'm here to help you manage your tasks and events. What would you like to do today?"
    ],
    promptsAndNext: [{prompts: userPrompts.addEvent}, 
                    {prompts: userPrompts.addTasks}]
}

export const firstWelcome: Dialogue = {
    textOptions: [
        "Hey there! I'm M.O.M (My Online Mother), and I'm here to help you manage your tasks and events. How are you doing today?"
    ],
    promptsAndNext: [{prompts: userPrompts.feelingGood, next: responseFeelingGood},
                    {prompts: userPrompts.feelingOkay, next: responseFeelingNotGood},
                    {prompts: userPrompts.feelingBad, next: responseFeelingNotGood}]
}


//const secondWelcome: Dialogue = {

