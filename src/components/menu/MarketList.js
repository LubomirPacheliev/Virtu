import React, { useEffect, useState } from 'react';
import { GridLoader, PropagateLoader, ScaleLoader } from 'react-spinners';
import ChangeList from './Changelist.js';
import MainList from './MainList.js';

const MarketList = props => {
    const [tickers, setTickers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => getTickers(setTickers, setLoading), [ setTickers ]);
    return (
        <div className="market-list-container">
            {isLoading && <ScaleLoader/>}
            {!isLoading && <div>
                <h1 className="h1-portfolio">markets</h1>
                <article className="market-list">
                    <MainList tickers={tickers} />
                    <ChangeList tickers={tickers} />
                </article>
            </div>}
        </div>
    );
}

const getTickers = async (setTickers, setLoading) => {
    // We can't just use a fetch request here because of CORS, we either have to 
    // use a proxy(slow) or make an entire back end for one request(not ideal either)
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onmessage = msg => {
        const tickers = JSON.parse(msg.data);
        const sortedTickers = tickers.sort((tickA, tickB) => Number(tickB.c) - Number(tickA.c));
        setTickers(sortedTickers);
        setLoading(false);
        socket.close();
    }
}

export default MarketList;