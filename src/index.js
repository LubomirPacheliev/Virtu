import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './utils/firebase';
import GuestCtx from './utils/GuestCtx';

ReactDOM.render(
  <FirebaseContext>
    <GuestCtx >
      <App />
    </GuestCtx>
  </FirebaseContext>,
  document.getElementById('root')
);