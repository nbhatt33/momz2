interface EventTag {
    readonly name: string;
    readonly defaultReminder?: string;
}

//TODO: Add default reminders for each event tag using JS DATE
const defaultEventTag: EventTag = {name : "Default"};
const course: EventTag = {name : "Course"};
const assignment: EventTag = {name : "Assignment"};
const exam: EventTag = {name : "Exam"};
const work: EventTag = {name : "Work"};

//TODO: Decide status of these tags
/*const work: EventTag = {name : "Work"};
const birthday: EventTag = {name : "Birthday"};
const anniversary: EventTag = {name : "Anniversary"};
const holiday: EventTag = {name : "Holiday"};
const appointment: EventTag = {name : "Appointment"};*/


export const eventTags: EventTag[] = [
    defaultEventTag,
    course,
    assignment,
    exam,
    work
];
