import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../firebaseConfig';
import { Message } from '../../momTextEngine/dataObjects/message';
import * as dialogue from '../../momTextEngine/dataObjects/dialogue';
import * as visualGenerator from '../../momTextEngine/code/visualGenerator';


import { getMessages, modifyMessage } from '../redux/message-slice';

interface DialogueAndMessages {
    readonly currdialogue: dialogue.Dialogue;
    readonly  sentMessages: Message[];
}



export default function MessageScreen() {
    const initalDialogue: dialogue.Dialogue = dialogue.firstWelcome;
    const randomIndex = Math.floor(Math.random() * initalDialogue.textOptions.length);
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
    console.log("currentDialogue:", currentdialogue);

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
            <SafeAreaView>
                {userPrompts}
            </SafeAreaView>
        
        </View>

    );






}

//   const dispatch = useDispatch();
//   const authSlice = useSelector((state) => state.auth);
//   const messagesSlice = useSelector((state) => state.message);
//   const [value, setValue] = useState('');

//   useEffect(() => {
//     if (!messagesSlice.gotMessages) {
//         getDoc(doc(db, "messages", authSlice.user.uid)).then((doc) => {
//             if (doc.exists()) {
//                 dispatch(getMessages(doc.data().messages));
//             } else {
//                 dispatch(getMessages([]));
//             }
//         })
//     }
// }, [messagesSlice.gotMessages]); //Gets all the messages for the user

//   return (
//       <View style={styles.container}>
//         <FlatList
//             data={messagesSlice.messages}
//             renderItem={({ item }) => <Text>{item.text}</Text>}
//             keyExtractor={(item, index) => index}
//         />
//         <View style={{
//             bottom: 40,
//             position: 'absolute',
//             width: '100%',

//         }}>
//             <TextInput
//                 style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1 }}
//                 onChangeText={text => setValue(text)}
//                 value={value}
//             />
//             <Button 
//                 title="Send"
//                 onPress={async () => {
//                     if (messagesSlice.messages.length === 0) {
//                         const newMessage = [{
//                             text: value,
//                             timestamp: new Date().getTime(),
//                             sentBy: authSlice.user.uid,
//                         }]
//                         // Push to new document
//                         await setDoc(doc(db, "messages", authSlice.user.uid), {
//                             messages: newMessage,
//                           }).then(() => {
//                             dispatch(modifyMessage(newMessage));
//                           });
//                     } else {
//                         const newMessage = [{
//                             text: value,
//                             timestamp: new Date().getTime(),
//                             sentBy: auth.currentUser.uid,
//                         }];
//                         const newMessageList = messagesSlice.messages.concat(newMessage);
//                         // Modify existing document
//                         await updateDoc(doc(db, "messages", authSlice.user.uid), {
//                                 messages: newMessageList,
//                             }).then(() => {
//                                 dispatch(modifyMessage(newMessageList));
//                             });
//                     }
//                     setValue('');
//                 }}
//             />
//         </View>
//       </View>
//   );


const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    // flex: 1,
    // height: '100%',
    // width: '100%',
    

  },
  item: {
    // alignContent: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    fontSize: 32,
    backgroundColor: 'white',
  },
  userPrompts: {
    // backgroundColor: 'white',
    // alignItems: 'center',
    // borderColor: 'black',
    // backgroundColor: 'white',
  },
  momText: {
    backgroundColor: 'white',
    // alignItems: 'flex-start',
  },
  
  
});