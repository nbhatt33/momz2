import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { Message } from '../../momTextEngine/dataObjects/message';
import * as dialogue from '../../momTextEngine/dataObjects/dialogue';
import * as visualGenerator from '../../momTextEngine/code/visualGenerator';

interface DialogueAndMessages {
    readonly currdialogue: dialogue.Dialogue;
    readonly  sentMessages: Message[];
}



export default function MessageScreen() {
    //const initalDialogue: dialogue.Dialogue = dialogue.firstWelcome;
    let randomIndex = Math.floor(Math.random() * dialogue.beginConvo.length);
    const initalDialogue: dialogue.Dialogue = dialogue.beginConvo[randomIndex];
    randomIndex = Math.floor(Math.random() * initalDialogue.textOptions.length);
    const [currentdialogueAndMessages, setCurrentdialogueAndMessages] = useState<DialogueAndMessages>({currdialogue: initalDialogue, sentMessages: [{text: initalDialogue.textOptions[randomIndex], saidByMom: true}]});

    const sentMessages = currentdialogueAndMessages.sentMessages;

    //Display the messages
    let htmlContent = sentMessages.map((message, i) => {
        if (message.saidByMom) {
            return visualGenerator.displayDialogueFromText(message.text);
        } else {
            return visualGenerator.displaySentUserPromptsFromText(message.text);
        }
    });
    //Display options to user (if any)
    const currentdialogue = currentdialogueAndMessages.currdialogue;
    // console.log("currentDialogue:", currentdialogue);
    if (currentdialogue && currentdialogue.promptsAndNext) {
        htmlContent.push(visualGenerator.displayUserPrompts(currentdialogue.promptsAndNext, setCurrentdialogueAndMessages, currentdialogueAndMessages.sentMessages));
    } else {
        console.log("No prompts");
    }

    return (
        <View style={styles.container}>
        <FlatList
            data={htmlContent}
            renderItem={({ item }) => <Text>{item}</Text>}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});