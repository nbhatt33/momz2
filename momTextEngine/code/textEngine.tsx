import React, { useState } from 'react';
import {View} from 'react-native';
import * as dialogue from "../dataObjects/dialogue"
import { displayDialogue, displayUserPrompts } from './visualGenerator';
import * as userPrompts from '../dataObjects/userPrompts';
import { Message } from '../dataObjects/message';

// export const startEngine = () => {
//   const [currentdialogue, setCurrentDialogue] = useState<dialogue.Dialogue>(dialogue.firstWelcome);

//   return <View>
//     {displayDialogue(currentdialogue)}
//     {displayUserPrompts(currentdialogue.promptsAndNext, setCurrentDialogue)}
//     </View>;
  


//   //TODO: pass current dialgue to visual generator, get back HTML, display HTML
//   //TODO: find out the option chose to get the next dialogue

// };

export function onOptionPress(uPs: userPrompts.UserPrompt[], i: number, randomIndex: number, nextDialogue: dialogue.Dialogue[], setCurrentDialogue: any, sentMessages: Message[]) {
  return () => {
      if (uPs[i].nextAction) {
          uPs[i].nextAction.action();
      }
      if (nextDialogue && nextDialogue[i]) {
          // displayDialogue(uPs[i].nextDialogue); TODO: consider efficacy of combining UI and data
          sentMessages.push({text: uPs[i].textOptions[randomIndex], saidByMom: false});
          sentMessages.push({text: nextDialogue[i].textOptions[0], saidByMom: true}); //TODO FIX DEFAULTING TO 0
          setCurrentDialogue(nextDialogue[i]);
      }
  };
}
