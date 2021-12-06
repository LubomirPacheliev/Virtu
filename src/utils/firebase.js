import React, { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { config } from './readEnv';
import { CookiesProvider, useCookies } from 'react-cookie';

const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
  const [cookies, setCookies] = useCookies();
  const email = cookies.email;
  const app = initializeApp(config);
  auth.initializeAuth(app);
  const firestoreInstance = firestore.getFirestore(app);
  return (
    <FirebaseContext.Provider value={ { app, auth, firestoreInstance: firestoreInstance, firestore, email} }>
      <CookiesProvider>
        { children }
      </CookiesProvider>
    </FirebaseContext.Provider>
 );
}