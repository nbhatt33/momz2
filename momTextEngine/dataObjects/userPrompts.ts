//import * as dialogue from "./dialogue";
import * as action from "./actions";

export interface UserPrompt {
    readonly textOptions: string[]; //TODO: Decide if array is necessary
    // readonly nextDialogue?: dialogue.Dialogue;
    readonly nextAction?: action.Action;
}

export const feelingGood: UserPrompt = {
    textOptions: ["I'm feeling good!"],
    // nextDialogue: dialogue.responseFeelingGood
};

export const feelingOkay: UserPrompt = {
    textOptions: ["I'm only feeling okay."],
    // nextDialogue: dialogue.responseFeelingNotGood
}

export const feelingBad: UserPrompt = {
    textOptions: ["I'm feeling bad."],
    // nextDialogue: dialogue.responseFeelingNotGood
}

export const addEvent: UserPrompt = {
    textOptions: ["Add event"],
    nextAction: action.addEvent
}

export const addTasks: UserPrompt = {
    textOptions: ["Add tasks"],
    nextAction: action.addTasks
}