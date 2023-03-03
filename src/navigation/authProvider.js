import React, { createContext, useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        login: async (email, password) => {
          // if email and password are valid, set user and go to home screen
            // if not, throw error
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in go to home screen
                    const currentUser = userCredential.user;
                    setUser(currentUser);
                    // const user = userCredentials.user;
                    console.log("Logged in with:", currentUser.email)
                    }  
                )
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(error);
                }
            );
            setLoading(false);
        },
        register: (displayName, email, password) => {
          setLoading(true);
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const currentUser = userCredential.user;
              updateProfile(auth.currentUser, {
                displayName: displayName
              }).then(() => {
                // Profile updated!
                setUser(currentUser);
                
              })
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error(error);
            });
          setLoading(false)
        },
        logout: async () => {
            try {
                await auth.signOut();
            } catch (e) {
                console.log(e);
            }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};