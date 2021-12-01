import React, { useState } from 'react';
import Order from "./Order.js";
import OrderHistory from "./OrderHistory.js";
import Chart from "./Chart.js";
import { useParams } from 'react-router-dom';
import { portfolioContext } from '../../utils/portfolioContext';

const TradePair = () => {
  const { symbol } = useParams();
  const [history, setHistory] = useState([]);

  return (
    <section className="tradepair-section">
      <h1 className="h1-portfolio">{symbol}</h1>
      <div className="TradePair">
      <Chart widgetProps={{
        "symbol": "BINANCE:" + symbol,
        "interval": "60m",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "container_id": "tradingview_05e64"
      }} />
      <portfolioContext.Provider value={{history, setHistory}}>
        <Order />
        {/* <OrderHistory /> */}
      </portfolioContext.Provider>
    </div>
    </section>
  );
}

export default TradePair;