import React from 'react';
import Order from "./Order.js";
import OrderHistory from "./OrderHistory.js";
import TA from "./TA.js";
import Chart from "./Chart.js";

const TradePair = () => {
  return (
    <div className="TradePair">
      <Chart widgetProps={{
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
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
      <TA />
      <Order />
    </div>
  );
}

export default TradePair;