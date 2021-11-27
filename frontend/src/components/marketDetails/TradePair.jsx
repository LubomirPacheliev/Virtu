import React, { useState } from 'react';
import Order from "./Order.jsx";
import OrderHistory from "./OrderHistory.jsx";
import TA from "./TA.jsx";
import Chart from "./Chart.jsx";
import { useParams } from 'react-router-dom';
import { portfolioContext } from '../../portfolioContext.jsx';

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
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_82f39"
      }} />
      <portfolioContext.Provider value={{history, setHistory}}>
        <OrderHistory />
        <TA symbol={symbol} />
        <Order />
      </portfolioContext.Provider>
    </div>
  );
}

export default TradePair;