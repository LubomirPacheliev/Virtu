import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import TradePair from "./components/marketDetails/TradePair.js";
import MarketList from './components/menu/MarketList.js';
import Profile from './components/Profile/Profile.js';
import './style.scss';

const App = () => {
  return (
    <Router>
      <main>
        <aside>
          <h1>Virtu</h1>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/market/SOLUSDT">Market</Link></li>
            <li><Link to="/profile">My Portfolio</Link></li>
          </ul>
        </aside>
        <Switch>
          <Route path="/market/:symbol" component={ TradePair } />
          <Route path="/home" component={ MarketList } />
          <Route path="/profile" component={ Profile } />
          <Route path="/" component={ Profile } />
        </Switch>
        <div class="custom-shape-divider-bottom-1638357497">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
        </div>
      </main>
    </Router>
  );
}

export default App;