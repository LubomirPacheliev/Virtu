import React from 'react';
import Ticker from './Ticker.js';

const MainList = props => {
    const {tickers} = props;
    let groups = [];
    if (tickers.length !== 0) {
        groups = new Array(Math.floor(tickers.length / 10));
        groups.fill(new Array(10));
        let i = 0;
        groups.forEach(group => {
            for (let j = 0; j < 10; j++) {
                group[j] = tickers[i];
                i++;
            }
        });
        console.log(groups);
    }

    return (
        <div className="main-list-component">
            <ul>
                {tickers.map((ticker, i) => <Ticker key={i} ticker={ticker} />)}
            </ul>
            {groups.map((group, i) => <p key={i} >{i + 1}</p>)}
        </div>
    );
}
 
export default MainList;