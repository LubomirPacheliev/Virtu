import React, { useRef, useEffect } from 'react';

const MarketList = props => {
    const { widgetProps } = props;
    const ref = useRef();

    useEffect(() => {
        let refValue;
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
        script.innerHTML = JSON.stringify({
            "width": "100%",
            "height": "100%",
            "defaultColumn": "overview",
            "screener_type": "crypto_mkt",
            "displayCurrency": "USD",
            "colorTheme": "dark",
            "locale": "en",
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
    }, [ widgetProps ]);

    return (
        <div ref={ref} className="market-list"></div>
    );
}

export default MarketList;