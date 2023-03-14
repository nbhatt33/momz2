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
          tempSentMessages.push({text: nextDialogue[i].textOptions[randomIndex2], saidByMom: true});
          setCurrentdialogueAndMessages({currdialogue: nextDialogue[i], sentMessages: tempSentMessages});
      }
  };
}
