import React, { useRef, useEffect } from 'react';

const MarketList = props => {
    const ref = useRef();
    useEffect(() => getWidget(), []);
    return (
        <div ref={ref} className="market-list"></div>
    );
}

const getWidget = () => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onopen = () => console.log('connection established.');
    socket.onmessage = event => {
        console.log(event.data);
    }
}

export default MarketList;