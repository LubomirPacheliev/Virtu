import React, { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import fetch from 'isomorphic-fetch';
import ChangeList from './Changelist.js';
import MainList from './MainList.js';

const MarketList = props => {
    const [tickers, setTickers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => getTickers(setTickers, setLoading), [ setTickers, setLoading ]);
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
    const tickers = await fetch('/api/markets');
    const parsed = await tickers.json();
    const filteredTickers = parsed.filter(ticker => ticker.symbol.slice(3).toLowerCase() === 'usdt' || ticker.symbol.slice(2).toLowerCase() === 'usdt');
    setTickers(filteredTickers);
    setLoading(false);
}

export default MarketList;