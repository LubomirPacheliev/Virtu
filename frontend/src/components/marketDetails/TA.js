import React, { useEffect, useRef } from 'react';

const TA = ({symbol}) => {
    return (
        <article className="technical-analysis">
            <TechnicalAnalysisWidget symbol={symbol} />
        </article>
    );
}
 
const TechnicalAnalysisWidget = props => {
    const { widgetProps, symbol } = props;
    const ref = useRef();

    useEffect(() => {
        let refValue;

        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/"
        + "embed-widget-technical-analysis.js";
        script.async = true;
        script.type = "text/javascript";
        script.innerHTML = JSON.stringify({
            "interval": "1h",
            "width": "100%",
            "isTransparent": false,
            "height": "100%",
            "symbol": "BINANCE:" + symbol,
            "showIntervalTabs": true,
            "locale": "en",
            "colorTheme": "dark",
            ...widgetProps
        });
        
        ref.current.appendChild(script);
        refValue = ref.current;

        return () => {
            if (refValue) {
              while (refValue.firstChild) {
                refValue.removeChild(refValue.firstChild);
              }
            }
          }
    }, [widgetProps, symbol])

    return <div ref={ref} />;
}

export default TA;