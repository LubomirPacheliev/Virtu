import React, { useRef, useEffect } from 'react';

const MarketList = props => {
    const ref = useRef();
    useEffect(() => getWidget(), [ ]);
    return (
        <div ref={ref} className="market-list"></div>
    );
}

const getWidget = () => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onopen = function(event) {
        console.log('ig it works!');
    }
}

export default MarketList;