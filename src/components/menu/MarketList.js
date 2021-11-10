import React, { useEffect, useState } from 'react';

const MarketList = props => {
    const [data, setData] = useState([]);
    useEffect(() => getWidget(setData), [ setData ]);
    return (
        <div className="market-list"></div>
    );
}

const getWidget = setData => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onopen = () => console.log('connection established.');
    socket.onmessage = async msg => {
        const parsed_msg = await JSON.parse(msg.data);
        setData(parsed_msg);
    }
}

export default MarketList;