import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { auth, db } from '../../firebaseConfig.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { getDoc } from 'firebase/firestore';

import FormButton from '../components/formButton.js';
import FormInput from '../components/formInput.js';
import { login } from '../redux/auth-slice.js';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Welcome!</Title>
        <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <FormButton
            title="Login"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={async () => {
              signInWithEmailAndPassword(auth, email, password).then(async userCredential => {
                await getDoc(db, `users/${userCredential.user.uid}`).then(async doc => {
                  if (doc.exists()) {
                    dispatch(login({
                      uid: userCredential.user.uid,
                      email: userCredential.user.email,
                      displayName: doc.data().displayName,
                    }));
                }
              })
            })
          }}
        />
        <FormButton
            title="Sign up here"
            modeValue="text"
            uppercase={false}
            labelStyle={styles.navButtonText}
            onPress={() => navigation.navigate('Signup')}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});