import * as action from "./actions";
import { eventTags } from "./eventTags";

export interface UserPrompt {
    readonly textOptions: string[]; //TODO: Decide if array is necessary
    readonly nextAction?: action.Action;
}

export const feelingGood: UserPrompt = {
    textOptions: ["I'm feeling good!", "I'm feeling great!", "I'm feeling awesome!"],
};

export const feelingOkay: UserPrompt = {
    textOptions: ["I'm only feeling okay.", "I'm feeling okay.", "I'm feeling alright."],
}

export const feelingBad: UserPrompt = {
    textOptions: ["I'm feeling bad.", "I'm feeling not so good.", "I'm feeling terrible."],
}

export const addEvent: UserPrompt = {
    textOptions: ["Add event"],
    nextAction: action.addEvent
}

export const addTasks: UserPrompt = {
    textOptions: ["Add tasks"],
    nextAction: action.addTasks
}

export const addTag: UserPrompt[] = action.tags.map((tag, i) => {
    return {
        textOptions: [eventTags[i].name],
        nextAction: tag
    }
});

export const yes: UserPrompt = {
    textOptions: ["Yes", "Yes please", "Yes, please", "Yes, I would like to", "Yes, I would like to do that", "Yes, I would like to do that please", "Yes, I would like to do that please."],
}

export const plainYes: UserPrompt = {
    textOptions: ["Yes"],
}

export const no: UserPrompt = {
    textOptions: ["No", "No thanks", "No, thanks", "No, I don't want to", "No, I don't want to do that", "No, I don't want to do that please", "No, I don't want to do that please."],
}

export const plainNo: UserPrompt = {
    textOptions: ["No"],
}