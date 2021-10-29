import React, { useRef, useEffect, useState } from 'react';
// import { useHistory } from 'react-router';

const MarketList = props => {
    const { widgetProps } = props;
    const ref = useRef();
    const [tableDidLoad, setTableDidLoad] = useState(false);

    // jeez this hook is amazing, it can act as both componentDidMount and componentDidUpdate
    useEffect(() => getWidget(widgetProps, ref, setTableDidLoad), [ widgetProps ]);
    useEffect(() => { 
        console.log('bruh');
        if (tableDidLoad) {
            const listings = document.querySelectorAll('#js-screener-container tr');
            console.log('ey yo');
            listings.map(listing => listing.addEventListener('click', e => {
                
            }));
        }
    }, [ tableDidLoad ]);

    return (
        <div ref={ref} className="market-list"></div>
    );
}

const getWidget = (widgetProps, ref, setTableDidLoad) => {
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
            setTableDidLoad(true);
        }
    }
}

export default MarketList;