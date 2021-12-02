import React, { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';
import { config } from './readEnv';

const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
    const app = initializeApp(config);
    auth.initializeAuth(app);
    return (
      <FirebaseContext.Provider value={ { app, auth } }>
        { children }
      </FirebaseContext.Provider>
    );
}