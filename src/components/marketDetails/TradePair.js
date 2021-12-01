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
    <div className="TradePair">
      <Chart widgetProps={{
        "autosize": true,
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
        <OrderHistory />
        <Order />
      </portfolioContext.Provider>
    </div>
  );
}

export default TradePair;