import React, { useState } from 'react';
import { FlatList, View, Text, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import { StyleSheet } from 'react-native';

import { Message } from '../../momTextEngine/dataObjects/message';
import * as dialogue from '../../momTextEngine/dataObjects/dialogue';
import * as visualGenerator from '../../momTextEngine/code/visualGenerator';
import { withDecay } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';

// import * as actions from '../../momTextEngine/dataObjects/actions';

interface DialogueAndMessages {
    readonly currdialogue: dialogue.Dialogue;
    readonly  sentMessages: Message[];
    readonly displayModal?: boolean;
}


export default function MessageScreen() {
    //const initalDialogue: dialogue.Dialogue = dialogue.firstWelcome;
    let randomIndex = Math.floor(Math.random() * dialogue.beginConvo.length);
    const initalDialogue: dialogue.Dialogue = dialogue.beginConvo[randomIndex];
    randomIndex = Math.floor(Math.random() * initalDialogue.textOptions.length);
    const [currentdialogueAndMessages, setCurrentdialogueAndMessages] = useState<DialogueAndMessages>({currdialogue: initalDialogue, sentMessages: [{text: initalDialogue.textOptions[randomIndex], saidByMom: true}], displayModal: false});

    const sentMessages = currentdialogueAndMessages.sentMessages;

    const [modalVisible, setModalVisible] = useState(true);

    const [eventTag, setEventTag] = useState('');


    //Display the messages
    let htmlContent = sentMessages.map((message, i) => {
        if(message.displayModal) {
          console.log("Displaying modal");
            setCurrentdialogueAndMessages({currdialogue: currentdialogueAndMessages.currdialogue, sentMessages: currentdialogueAndMessages.sentMessages, displayModal: true});
          }
        if (message.saidByMom) {
            return visualGenerator.displayDialogueFromText(message.text);

        } else {
            return visualGenerator.displaySentUserPromptsFromText(message.text);

        }
    });
    //Display options to user (if any)
    const currentdialogue = currentdialogueAndMessages.currdialogue;

    let userPrompts;
    if (currentdialogue && currentdialogue.promptsAndNext) {
        userPrompts = visualGenerator.displayUserPrompts(currentdialogue.promptsAndNext, setCurrentdialogueAndMessages, currentdialogueAndMessages.sentMessages);
    } else {
        console.log("No prompts");
    }

    return (
        <View style={{
          height: '100%',
          width: '100%',
        }}>
            <FlatList
                data={htmlContent}
                renderItem={({ item, index }) => {
                  if (index % 2 === 0) {
                    return (
                      <View style={{
                        backgroundColor: 'pink',
                        width: '100%',
                        padding: 10,
                        marginVertical: 3,
                        borderRadius: 10,
                      }}>
                        <Text>{item}</Text>
                      </View>
                    )
                  } else {
                    return (
                      <View style={{
                        backgroundColor: 'lightblue',
                        alignItems: 'flex-end',
                        padding: 10,
                        marginRight: 3,
                        marginVertical: 3,
                        borderRadius: 10,
                      }}>
                        <Text>{item}</Text>
                      </View>
                    )
                  }
              }}
            />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Here are our event tag options: Exam, Assignment, Course, Work, Default. Would you like to add another tag?</Text>
                        <View>
                          <TextInput
                            style={{height: 40}}
                            placeholder="Type a tag here!"
                            onChangeText={newEventTag => setEventTag(newEventTag)}
                            defaultValue={eventTag}
                          />
                        </View>
                        <View>
                          <TouchableHighlight
                              style={{ ...styles.openButton, backgroundColor: "#2196F3", paddingTop: 10, paddingBottom: 10 }}
                              onPress={() => {
                                  console.log('new tag: ' + eventTag);
                                  setModalVisible(false)
                                  setCurrentdialogueAndMessages({currdialogue: currentdialogueAndMessages.currdialogue, sentMessages: currentdialogueAndMessages.sentMessages, displayModal: false});
                                  const min = 1;
                                  const max = 100000000;
                                  const rand = min + Math.random() * (max - min);
                                  console.log('rand: ' + rand)
                                  const strRand = rand.toString();
                                  console.log('strRand: ' + strRand)
                                  // fetch('curl -X "PUT" -H "Content-Type: application/json" -d "{\"id\": \"' + strRand + '\"}"');
                                  const curl = 'curl -X "PUT" -H "Content-Type: application/json" -d "{\"id\": \"' + strRand + '\", \"tag\": \"'+ eventTag+ '\"}" https://9rd8efs79f.execute-api.us-east-2.amazonaws.com/items';
                                  console.log('curl: ' + curl);
                                  // fetch(curl);
                                  fetch('https://9rd8efs79f.execute-api.us-east-2.amazonaws.com/items', {
                                    method: 'PUT',
                                    headers: {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                      id: strRand,
                                      tag: eventTag,
                                    }),
                                  });

                                  // fetch('curl -X "PUT" -H "Content-Type: application/json" -d "{\"id\": \"' + strRand + '\", \"tag\": \"'+ eventTag+ '\"}" https://9rd8efs79f.execute-api.us-east-2.amazonaws.com/items')
                              }}
                          >
                              <Text style={styles.textStyle}>Submit</Text>
                          </TouchableHighlight>
                        </View>
                        <View>
                          <TouchableHighlight
                              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                              onPress={() => {
                                  setModalVisible(false)
                                  setCurrentdialogueAndMessages({currdialogue: currentdialogueAndMessages.currdialogue, sentMessages: currentdialogueAndMessages.sentMessages, displayModal: false});
                              }}
                          >
                              <Text style={styles.textStyle}>None</Text>
                          </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
            <SafeAreaView>
                {userPrompts}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#A020F0",
        borderRadius: 20,
        padding: 10,
        paddingBottom: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
