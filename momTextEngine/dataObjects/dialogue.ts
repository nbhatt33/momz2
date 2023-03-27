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

const addTaskAndEvents: {prompts: userPrompts.UserPrompt, next?: Dialogue}[] = 
    [{prompts: userPrompts.addEvent, next: changeTag}, 
    {prompts: userPrompts.addTasks, next: changeTag}];

export const responseFeelingGood: Dialogue = {
    textOptions: [
        "That's great! I'm glad you're feeling good. What would you like to do today?",
        "I am so happy to hear that! What can I help you with?"
    ],
    promptsAndNext: addTaskAndEvents
}

export const responseFeelingNotGood: Dialogue = {
    textOptions: [
        "I'm sorry to hear that. I'm here to help you manage your tasks and events. What would you like to do today?",
        "I'm sorry to hear that. What can I help you with?"
    ],
    promptsAndNext: addTaskAndEvents
}

export const firstWelcome: Dialogue = { //Really only applies to the first time the user talks to M.O.M
    textOptions: [
        "Hey there! I'm M.O.M (My Online Mother), and I'm here to help you manage your tasks and events. How are you doing today?",
        "Hi! I'm M.O.M (My Online Mother), and I'm here to help you manage your tasks and events. How are you feeling?"
    ],
    promptsAndNext: [{prompts: userPrompts.feelingGood, next: responseFeelingGood},
                    {prompts: userPrompts.feelingOkay, next: responseFeelingNotGood},
                    {prompts: userPrompts.feelingBad, next: responseFeelingNotGood}]
}

export const beenTooLong: Dialogue = {
    textOptions: [
        "It's been a while since we last talked. How are you doing today?",
        "Oh, it's you! How's life treating you at the moment?",
        "Hey, it's been a while! How're you feeling?"
    ],
    promptsAndNext: [{prompts: userPrompts.feelingGood, next: responseFeelingGood},
                    {prompts: userPrompts.feelingOkay, next: responseFeelingNotGood},
                    {prompts: userPrompts.feelingBad, next: responseFeelingNotGood}]
}

export const wantToChatYes: Dialogue = {
    textOptions: [
        "I am here to help however I can. I am here to listen to you, and I am here to help you manage your tasks and events. What would you like to do today?",
        "I wish we could chat more in depth, but for now, I am here to help you manage your tasks and events. Can I help you with anything?",
        "Even though I can't talk to you in depth, I am here to help you manage your tasks and events. Let's try to get you feeling better by getting atop of your responsibilities.",
        "If you ever need more support than even I can provide, please reach out to a friend or professional. I am here to help you manage your tasks and events. How about we get into that now?"
    ],
    promptsAndNext: addTaskAndEvents
}

export const wantToChatNo: Dialogue = {
    textOptions: [
        "Okay, I understand. I am here to help you manage your tasks and events. Let's hop into that!",
        "I understand. I am here no matter what to you keep organized! What would you like to do today?",
        "If you ever need more support than even I can provide, please reach out to a friend or professional. I am always here to help you manage your tasks and events.",
        "No problem. I am here to help you manage your tasks and events."
    ],
    promptsAndNext: addTaskAndEvents
}


export const wantToChat: Dialogue = {
    textOptions: [
        "Would you like to chat?",
        "Do you want to talk about anything that's been on your mind lately?",
        "Would you like to talk about anything?",
        "Do you want to talk about anything?",
        "Would you like to talk about anything that's been on your mind as of late?"
    ],
    promptsAndNext: [{prompts: userPrompts.yes, next: wantToChatYes},
                    {prompts: userPrompts.no, next: wantToChatNo}]
}

export const eatingWellYes: Dialogue = {
    textOptions: [
        "That's great! I'm glad you're eating well. In that case, should we take care of any responsibilities?",
        "I am so happy to hear that! What can I help you with?"
    ],
    promptsAndNext: addTaskAndEvents
}

export const eatingWellNo: Dialogue = {
    textOptions: [
        "I'm sorry to hear that. After we take charge of your responsibilities, be sure to check out some healthy recipes online! I know you're always so good with that techy stuff.",
        "I'm sorry to hear that. What can I help you with?",
        "Don't worry, we'll get you back on track. After we take care of your responsibilities, be sure to check out some healthy recipes online!",
        "Staying well fed is important to keep that big brain of yours working. Let's handle your tasks so you can onto other things!"
    ],
    promptsAndNext: addTaskAndEvents
}

export const eatingWellQuestion: Dialogue = {
    textOptions: [
        "Are you eating well?",
        "Are you eating healthy?",
        "Being healthy is important. Are you eating well?",
        "You have to take care of yourself. Being sure to eat well?"
    ],
    promptsAndNext: [{prompts: userPrompts.plainYes, next: eatingWellYes},
                    {prompts: userPrompts.plainNo, next: eatingWellNo}]
}

export const beginConvo: Dialogue[] = [
    beenTooLong,
    wantToChat,
    eatingWellQuestion
]

//TODO: add "restart" closer dialogue options