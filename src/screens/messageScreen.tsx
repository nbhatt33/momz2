import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../firebaseConfig';
import { Message } from '../../momTextEngine/dataObjects/message';
import * as dialogue from '../../momTextEngine/dataObjects/dialogue';
import * as visualGenerator from '../../momTextEngine/code/visualGenerator';


import { getMessages, modifyMessage } from '../redux/message-slice';

export default function MessageScreen() {
    const [currentdialogue, setCurrentDialogue] = useState<dialogue.Dialogue>(dialogue.firstWelcome);
    const sentMessages: Message[] = [];

    const randomIndex = Math.floor(Math.random() * currentdialogue.textOptions.length);
    sentMessages.push({text: currentdialogue.textOptions[randomIndex], saidByMom: true});

    //Display the messages
    let htmlContent = sentMessages.map((message, i) => {
        if (message.saidByMom) {
            return visualGenerator.displayDialogueFromText(message.text);
        } else {
            return visualGenerator.displaySentUserPromptsFromText(message.text);
        }
    });
    //Display options to user (if any)
    if (currentdialogue.promptsAndNext) {
        htmlContent.push(visualGenerator.displayUserPrompts(currentdialogue.promptsAndNext, setCurrentDialogue, sentMessages));
    }

    return (
        <View style={styles.container}>
        <FlatList
            data={htmlContent}
            renderItem={({ item }) => <Text>{item}</Text>}
        />
        </View>

    );

















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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
});