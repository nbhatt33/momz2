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