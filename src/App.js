import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import TradePair from "./components/marketDetails/TradePair.js";
import MarketList from './components/menu/MarketList.js';
import './style.scss';

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
        <Route path="/home" component={ MarketList } />
      </Switch>
    </Router>
  );
}

export default App;