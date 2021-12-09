import React, {useEffect, useRef} from 'react';
import { ScaleLoader } from 'react-spinners';

const Chart = ({ widgetProps, isChartLoading, setChartLoading }) => {
    const ref = useRef();

    useEffect(() => {
      let refValue;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        setChartLoading(false);
        if (typeof TradingView != 'undefined') {
          new window.TradingView.widget({
            "width": "auto",
            "symbol": "BINANCE:BTCUSDT",
            "interval": "60mcl",
            "range": "1M",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "9",
            "locale": "en",
            "toolbar_bg": "rgba(0, 0, 0, 0.8)",
            "hide_top_toolbar": false,
            "hide_side_toolbar": false,
            "withdateranges": false,
            "save_image": true,
            "enable_publishing": false,
            "container_id": 'tradingview_05e64',
            ...widgetProps
          });
        } 
      };

      ref.current.appendChild(script);
      refValue = ref.current;

      return () => {
          if (refValue) {
            while (refValue.firstChild) {
            refValue.removeChild(refValue.firstChild);
          }
        }
      }
    }, [widgetProps]);

    return ( 
        <article className="chart" id="tradingview_05e64" ref={ref}>
          {isChartLoading && <ScaleLoader />}
        </article>
    );
}

export default Chart;