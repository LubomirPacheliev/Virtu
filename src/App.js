import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import TradePair from "./components/TradePair.js";
import './style.css';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/market">Market</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/market" component={ TradePair } />
        <Route path="/home" />
      </Switch>
    </Router>
  );
}

export default App;