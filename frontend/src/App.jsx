import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import TradePair from "./components/marketDetails/TradePair.jsx";
import MarketList from './components/menu/MarketList.jsx';
import Profile from './components/Profile/Profile.jsx';
import './style.scss';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/market/BTCUSDT">Market</Link></li>
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