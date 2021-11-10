import React, { useEffect, useState } from 'react';

const MarketList = props => {
    const [data, setData] = useState([]);
    useEffect(() => getWidget(setData), [ setData ]);
    console.log(data);
    return (
        <div className="market-list"></div>
    );
}

const getWidget = setData => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onopen = () => console.log('connection established.');
    socket.onmessage = msg => {
        setData(msg.data);
    }
}

export default MarketList;