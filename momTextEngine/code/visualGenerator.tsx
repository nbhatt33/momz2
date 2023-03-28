import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as dialogue from '../dataObjects/dialogue';
import * as userPrompts from '../dataObjects/userPrompts';
import { onOptionPress } from './textEngine';
import { Message } from '../dataObjects/message';
import PromptButtom from '../../src/components/promptButton';


export const displayDialogue = (d: dialogue.Dialogue) => {
    const randomIndex = Math.floor(Math.random() * d.textOptions.length);
    return (
        <View>
            <Text>{d.textOptions[randomIndex]}</Text>
        </View> 
    );
}

export const displayDialogueFromText = (t: string) => {
    return (
        <View>
            <Text>{t}</Text>
        </View> 
    );
}

export const displaySentUserPromptsFromText = (t: string) => {
    return (
        <View>
            <Text>{t}</Text>
        </View> 
    );
}

export const displayUserPrompts = (uPsAndNext: {prompts: userPrompts.UserPrompt, next?: dialogue.Dialogue}[], setCurrentdialogueAndMessages, sentMessages: Message[]) => { //TODO: make {prompts, next} a type
    if (uPsAndNext == null) {
        console.log("No user prompts to display")
        return <Text></Text>;
    }

    const uPs = uPsAndNext.map((uPAndNext) => uPAndNext.prompts); // TODO: consider not mapping to improve performance
    const nextDialogue = uPsAndNext.map((uPAndNext) => uPAndNext.next);

    if (uPs == null || uPs.length === 0) {
        console.log("No user prompts to display")
        return <Text></Text>;
    }

    let htmlButtonArray = [];
    for (let i = 0; i < uPs.length; i++) {
        const randomIndex = Math.floor(Math.random() * uPs[i].textOptions.length); 
        htmlButtonArray.push(
            // <Button 
            //     key={i}
            //     onPress={onOptionPress(uPs, i, randomIndex, nextDialogue, setCurrentDialogue, sentMessages)}
                
            //     title={uPs[i].textOptions[randomIndex]}
            // />
            <PromptButtom 
                key={i}
                modeValue="contained" 
                title={uPs[i].textOptions[randomIndex]}
                onPress={onOptionPress(uPs, i, randomIndex, nextDialogue, setCurrentdialogueAndMessages, sentMessages)}
            />
        );
    }
    return (
        <View>
            {htmlButtonArray}
        </View>
    );
}




export const styles = StyleSheet.create({ //TODO: Make style file

});

