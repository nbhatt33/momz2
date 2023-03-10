import React, { useState } from 'react';
import {View} from 'react-native';
import * as dialogue from "../dataObjects/dialogue"
import { displayDialogue, displayUserPrompts } from './visualGenerator';

export const startEngine = () => {
  const [currentdialogue, setCurrentDialogue] = useState<dialogue.Dialogue>(dialogue.firstWelcome);

  return <View>
    {displayDialogue(currentdialogue)}
    {displayUserPrompts(currentdialogue.promptsAndNext, setCurrentDialogue)}
    </View>;
  


  //TODO: pass current dialgue to visual generator, get back HTML, display HTML
  //TODO: find out the option chose to get the next dialogue

};
