import React, { useEffect, useState } from 'react';

const MarketList = props => {
    const [tickers, setTickers] = useState([]);
    useEffect(() => getTickers(setTickers), [ setTickers ]);
    return (
        <div className="market-list">
            <ul>
                {tickers.map((ticker, i) => <li key={i}>{`${ticker.s}: ${ticker.c}`}</li>)}
            </ul>
        </div>
    );
}

const getTickers = async setTickers => {
    // We can't just use a fetch request here because of CORS, we either have to 
    // use a proxy(slow) or make an entire back end for one request(not ideal either)
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onopen = () => console.log('connection established.');
    socket.onmessage = msg => {
        const tickers = JSON.parse(msg.data);
        const sortedTickers = tickers.sort((tickA, tickB) => Number(tickB.c) - Number(tickA.c));
        setTickers(sortedTickers);
        socket.close();
    }
}

export default MarketList;