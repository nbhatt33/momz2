import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';

import Loading from '../components/loading';

import AuthStack from './authStack';
import HomeStack from './homeStack';
import { AuthContext } from './authProvider';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);


//   if (loading) {
//     return <Loading />
//   }
  
    // // Handle user state changes
    // function onAuthStateChanged(user) {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    //     setLoading(false);
    // }

    // useEffect(() => {
    //     const subscriber = onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }
    // , []);

    // if (initializing) return null;
    
    return (
        <NavigationContainer>
            {user ? <HomeStack /> : <AuthStack />}
            {/* {initializing ? <HomeStack /> : <AuthStack />} */}
        </NavigationContainer>
    );

}