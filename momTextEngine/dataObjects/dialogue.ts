import * as userPrompts from "./userPrompts";
import * as dialogueTextOptions from "./dialogueTextOptions";

export interface Dialogue {
    readonly textOptions: string[];
    readonly promptsAndNext?: {prompts: userPrompts.UserPrompt, next?: Dialogue}[];
}

export let brushTeeth: Dialogue = {
    textOptions: dialogueTextOptions.brushTeeth
}

export const changeTag: Dialogue = {
    textOptions: dialogueTextOptions.changeTag,
    promptsAndNext: userPrompts.addTag.map((tag, i) => {
        return {
            prompts: userPrompts.addTag[i],
            next: brushTeeth
        }
    })
}

const addTaskAndEvents: {prompts: userPrompts.UserPrompt, next?: Dialogue}[] = 
    [{prompts: userPrompts.addEvent, next: changeTag}, 
    {prompts: userPrompts.addTasks, next: changeTag}];

export const responseFeelingGood: Dialogue = {
    textOptions: dialogueTextOptions.responseFeelingGood,
    promptsAndNext: addTaskAndEvents
}

export const responseFeelingNotGood: Dialogue = {
    textOptions: dialogueTextOptions.responseFeelingNotGood,
    promptsAndNext: addTaskAndEvents
}

export const firstWelcome: Dialogue = { //Really only applies to the first time the user talks to M.O.M
    textOptions: dialogueTextOptions.firstWelcome,
    promptsAndNext: [{prompts: userPrompts.feelingGood, next: responseFeelingGood},
                    {prompts: userPrompts.feelingOkay, next: responseFeelingNotGood},
                    {prompts: userPrompts.feelingBad, next: responseFeelingNotGood}]
}

export const beenTooLong: Dialogue = {
    textOptions: dialogueTextOptions.beenTooLong,
    promptsAndNext: [{prompts: userPrompts.feelingGood, next: responseFeelingGood},
                    {prompts: userPrompts.feelingOkay, next: responseFeelingNotGood},
                    {prompts: userPrompts.feelingBad, next: responseFeelingNotGood}]
}

export const wantToChatYes: Dialogue = {
    textOptions: dialogueTextOptions.wantToChatYes,
    promptsAndNext: addTaskAndEvents
}

export const wantToChatNo: Dialogue = {
    textOptions: dialogueTextOptions.wantToChatNo,
    promptsAndNext: addTaskAndEvents
}


export const wantToChat: Dialogue = {
    textOptions: dialogueTextOptions.wantToChat,
    promptsAndNext: [{prompts: userPrompts.yes, next: wantToChatYes},
                    {prompts: userPrompts.no, next: wantToChatNo}]
}

export const eatingWellYes: Dialogue = {
    textOptions: dialogueTextOptions.eatingWellYes,
    promptsAndNext: addTaskAndEvents
}

export const eatingWellNo: Dialogue = {
    textOptions: dialogueTextOptions.eatingWellNo,
    promptsAndNext: addTaskAndEvents
}

export const eatingWellQuestion: Dialogue = {
    textOptions: dialogueTextOptions.eatingWellQuestion,
    promptsAndNext: [{prompts: userPrompts.plainYes, next: eatingWellYes},
                    {prompts: userPrompts.plainNo, next: eatingWellNo}]
}

export const timeQuestion: Dialogue = {
    textOptions: dialogueTextOptions.timeQuestion,
    promptsAndNext: [{prompts: userPrompts.seeTime}]
}

export const beginConvo: Dialogue[] = [
    beenTooLong,
    wantToChat,
    eatingWellQuestion,
    timeQuestion
]