import {styles} from '../../App';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as dialogue from '../dataObjects/dialogue';
import * as userPrompts from '../dataObjects/userPrompts';

export const displayDialogue = (d: dialogue.Dialogue) => {
    const randomIndex = Math.floor(Math.random() * d.textOptions.length);
    return (
        <View style = {styles.container}>
            <Text>{d.textOptions[randomIndex]}</Text>
        </View> 
    );
}

export const displayUserPrompts = (uPsAndNext: {prompts: userPrompts.UserPrompt, next?: dialogue.Dialogue}[], setCurrentDialogue) => {
    //Display HTML buttons in a row with each uPs[i].textOptions[0]

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
            <Button
                onPress={() => {
                    console.log("Button pressed: " + uPs[i].textOptions[randomIndex]);
                    console.log("Random index: " + randomIndex);
                    console.log("uPs[i].nextAction: " + uPs[i].nextAction);
                    console.log("nextDialogue[i]: " + nextDialogue[i]);
                    if (uPs[i].nextAction) {
                        uPs[i].nextAction.action();
                    }
                    if (nextDialogue && nextDialogue[i]) {
                        // displayDialogue(uPs[i].nextDialogue); TODO: consider efficacy of combining UI and data
                        setCurrentDialogue(nextDialogue[i]);
                    }
                }}
                title={uPs[i].textOptions[0]}
            />
        );
    }
    // return (
    //     <div style={btnGroupStyle.btnGroup}>
    //         {htmlButtonArray}
    //     </div>
    // );
    return (
        <View>
            {htmlButtonArray}
        </View>
    );
}

const btnGroupStyle = StyleSheet.create({
    btnGroup: {
        backgroundColor: '#04AA6D', /* Green background */
        alignItems: 'center',
        justifyContent: 'center',
        // border: 1px solid green; /* Green border */
        // color: white; /* White text */
        // padding: 10px 24px; /* Some padding */
        // cursor: pointer; /* Pointer/hand icon */
        // float: left; /* Float the buttons side by side */
    }
});
