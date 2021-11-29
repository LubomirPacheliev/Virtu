import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './utils/firebase';

ReactDOM.render(
  <FirebaseContext>
      <App />
  </FirebaseContext>,
  document.getElementById('root')
);

// Snowpack Plugins

if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}