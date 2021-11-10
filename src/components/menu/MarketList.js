import React, { useRef, useEffect } from 'react';
// import { useHistory } from 'react-router';

const MarketList = props => {
    const { widgetProps } = props;
    const ref = useRef();

    // jeez this hook is amazing, it can act as both componentDidMount and componentDidUpdate
    useEffect(() => getWidget(widgetProps, ref), [ widgetProps ]);

    return (
        <div ref={ref} className="market-list"></div>
    );
}

const getWidget = (widgetProps, ref) => {
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
}

export default MarketList;