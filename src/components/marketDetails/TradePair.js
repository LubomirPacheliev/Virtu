import React, { useContext } from 'react';
import Order from "./Order.js";
import OrderHistory from "./OrderHistory.js";
import TA from "./TA.js";
import Chart from "./Chart.js";
import { useParams } from 'react-router-dom';
import { portfolioContext } from '../../portfolioContext.js';

const TradePair = () => {
  const { symbol } = useParams();
  const { portfolio, setPortfolio } = useContext(portfolioContext);

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
      <OrderHistory />
      <TA symbol={symbol} />
      <Order portfolio={portfolio} />
    </div>
  );
}

export default TradePair;