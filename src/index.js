import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <nav>
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="home">Markets</Link></li>
        </ul>
      </nav> */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);