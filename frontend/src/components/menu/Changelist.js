import React from 'react';
import Ticker from './Ticker.js';

const ChangeList = props => {
    const tickers = props.tickers.filter(ticker => ticker.s.slice(3).toLowerCase() === 'usdt' || ticker.s.slice(2).toLowerCase() === 'usdt');
    return (
        <div>
            <TopGainers tickers={tickers}/>
            <TopLosers tickers={tickers} />
        </div>
    );
}

const TopGainers = ({tickers}) => {
    const gainers = tickers.sort((tickerA, tickerB) => tickerB.P - tickerA.P).slice(0, 4);
    return (
        <div style={{"color": "white"}}>
            Top Gainers
            {gainers.map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={false} />)}
        </div>
    );
}

const TopLosers = ({tickers}) => {
    const losers = tickers.sort((tickerA, tickerB) => Number(tickerA.p) - Number(tickerB.p)).slice(0, 4);
    return (
        <div style={{"color": "white"}}>
            Top Losers
            {losers.map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={false} />)}
        </div>
    )
}
export default ChangeList;