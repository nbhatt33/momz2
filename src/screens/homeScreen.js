import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebaseConfig';


import FormButton from '../components/formButton';
import { logout } from '../redux/auth-slice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
      <View style={styles.container}>
        <Title>Momz Example</Title>
        <FormButton
          modeValue="contained"
          title="Send a message to mom"
          onPress={() => navigation.navigate('Message')}
        />
        <FormButton 
          modeValue="contained" 
          title="Logout" 
          onPress={() => {
            auth.signOut().then(() => {
              dispatch(logout())
            });
          }}
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
});