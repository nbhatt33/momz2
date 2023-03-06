import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/auth-slice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './homeStack';
import AuthStack from './authStack';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';


export default function Navigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  console.log(user);

  function onAuthStateChanged(user) {
    if (user) {
      dispatch(login({
        uid: user.uid,
        displayName: user?.displayName,
        email: user.email,
      }))
    } else {
      dispatch(logout())
    }
  }

  React.useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Stack = createNativeStackNavigator();

  if (user.isLoading) return (
    <SafeAreaView>
      <Text>Loading...</Text>
    </SafeAreaView>
  )

  return (
    <Stack.Navigator>
      {user.user ? (
        <Stack.Screen name="Home" component={HomeStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
