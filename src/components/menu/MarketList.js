import React, { useEffect, useState } from 'react';

const MarketList = props => {
    const [tickers, setTickers] = useState([]);
    useEffect(() => getWidget(setTickers), [ setTickers ]);
    return (
        <div className="market-list">
            <ul>
                {tickers.map((ticker, i) => <li key={i}>{`${ticker}`}</li>)}
            </ul>
        </div>
    );
}

const getWidget = setTickers => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onopen = () => console.log('connection established.');
    socket.onmessage = msg => {
        const parsed_msg = JSON.parse(msg.data);
        console.log(parsed_msg);
        setTickers(parsed_msg);
    }
}

export default MarketList;