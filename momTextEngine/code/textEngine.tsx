import * as dialogue from "../dataObjects/dialogue"
import * as userPrompts from '../dataObjects/userPrompts';
import { Message } from '../dataObjects/message';

export function onOptionPress(uPs: userPrompts.UserPrompt[], i: number, randomIndex: number, nextDialogue: dialogue.Dialogue[], setCurrentdialogueAndMessages: any, sentMessages: Message[]) {
  return () => {
      if (uPs[i].nextAction) {
          uPs[i].nextAction.action();
      }
      if (nextDialogue && nextDialogue[i]) {
        const tempSentMessages = sentMessages;
        tempSentMessages.push({text: uPs[i].textOptions[randomIndex], saidByMom: false});
        const randomIndex2 = Math.floor(Math.random() * nextDialogue[i].textOptions.length);
        let dModal = false;
        if (nextDialogue[i].textOptions[randomIndex2]) {
          console.log(nextDialogue[i].textOptions[randomIndex2]);
          dModal = nextDialogue[i].textOptions[randomIndex2].includes("Would you like to add another event tag?");
          console.log(dModal);
        }
        tempSentMessages.push({text: nextDialogue[i].textOptions[randomIndex2], saidByMom: true, displayModal: dModal});
        setCurrentdialogueAndMessages({currdialogue: nextDialogue[i], sentMessages: tempSentMessages});
      }
  };
}