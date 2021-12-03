import React, { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { config } from './readEnv';
import { CookiesProvider } from 'react-cookie';

const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
    const app = initializeApp(config);
    auth.initializeAuth(app);
    return (
      <FirebaseContext.Provider value={ { app, auth, firestore } }>
        <CookiesProvider>
          { children }
        </CookiesProvider>
      </FirebaseContext.Provider>
    );
}