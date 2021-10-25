import Chart from "./components/Chart.js";
import OrderHistory from "./components/OrderHistory.js";
import TA from "./components/TA.js";
import Order from "./components/Order.js";
import './style.css';

const App = () => {
  return (
    <div className="App">
      <Chart widgetProps={{
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "60",
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

export default App;