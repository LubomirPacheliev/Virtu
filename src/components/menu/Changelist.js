import React from 'react';
import Ticker from './Ticker.js';

const ChangeList = props => {
    const tickers = props.tickers.filter(ticker => ticker.s.slice(3).toLowerCase() === 'usdt' || ticker.s.slice(2).toLowerCase() === 'usdt');
    return (
        <div className="volatility-list">
            <p>top gainers</p>
            <TopGainers tickers={tickers}/>
            <TopLosers tickers={tickers} />
        </div>
    );
}

const TopGainers = ({tickers}) => {
    const gainers = tickers.sort((tickerA, tickerB) => tickerB.P - tickerA.P).slice(0, 7);
    return (
        <div style={{"color": "white"}}>
            {gainers.map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={false} />)}
        </div>
    );
}

const TopLosers = ({tickers}) => {
    const losers = tickers.sort((tickerA, tickerB) => Number(tickerA.P) - Number(tickerB.P)).slice(0, 7);
    return (
        <div>
            <p>top losers</p>
            {losers.map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={false} />)}
        </div>
    )
}
export default ChangeList;