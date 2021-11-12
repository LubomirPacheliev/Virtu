import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import TradePair from "./components/marketDetails/TradePair.js";
import MarketList from './components/menu/MarketList.js';
import Profile from './components/Profile/Profile.js';
import './style.scss';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/market">Market</Link></li>
          <li><Link to="/profile">My Portfolio</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/market/:symbol" component={ TradePair } />
        <Route path="/home" component={ MarketList } />
        <Route path="/profile" component={ Profile } />
      </Switch>
    </Router>
  );
}

export default App;