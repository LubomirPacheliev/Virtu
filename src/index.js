import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './utils/firebase';

ReactDOM.render(
  <FirebaseContext>
      <App />
  </FirebaseContext>,
  document.getElementById('root')
);