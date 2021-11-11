import React from 'react';
import Ticker from './Ticker.js';

const MainList = props => {
    return (
        <div className="main-list-component">
            <ul>
                {props.tickers.map((ticker, i) => <Ticker key={i} ticker={ticker} />)}
            </ul>
        </div>
    );
}
 
export default MainList;