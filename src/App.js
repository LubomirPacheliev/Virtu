import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import TradePair from "./components/marketDetails/TradePair.js";
import MarketList from './components/menu/MarketList.js';
import Profile from './components/Profile/Profile.js';
import { portfolioContext } from './portfolioContext.js';
import './style.scss';

const App = () => {
  const [portfolio, setPortfolio] = useState([{amount: 1000, symbol: 'USDT'}]);
  const value = useMemo(() => ({portfolio, setPortfolio}), [portfolio, setPortfolio]);

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
        <portfolioContext.Provider value={value} >
          <Route path="/market/:symbol" component={ TradePair } />
          <Route path="/home" component={ MarketList } />
          <Route path="/profile" component={ Profile } />
        </portfolioContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;