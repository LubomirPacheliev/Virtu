import React, { useEffect, useState } from 'react';
import Ticker from './Ticker.js';

const MainList = props => {
    const {tickers} = props;
    const [openTab, setOpenTab] = useState(0);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        let groups;
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
            setGroups(groups);
        }
    }, [ tickers ]);

    return (
        <div className="main-list-component">
            <ul>
                {groups.map((group, i) => <p key={i} onClick={() => setOpenTab(i)}>Group {i + 1}</p>)}
                {groups[openTab] === undefined || groups[openTab].map((ticker, i) => <Ticker key={i} ticker={ticker} />)}
            </ul>
        </div>
    );
}
 
export default MainList;