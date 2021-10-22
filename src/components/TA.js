import { TechnicalAnalysis } from "react-tradingview-embed";

const TA = props => {
    return (
        <article className="technical-analysis">
            <TechnicalAnalysis widgetProps={
                {
                    "interval": "1m",
                    "width": "100%",
                    "isTransparent": false,
                    "height": "100%",
                    "symbol": "BINANCE:BTCUSDT",
                    "showIntervalTabs": true,
                    "locale": "en",
                    "colorTheme": "dark" 
                }
            } />
        </article>
    );
}
 
export default TA;