import React, { useEffect, useState } from 'react';
import Ticker from './Ticker.js';

const MainList = props => {
    const {tickers} = props;
    const [openTab, setOpenTab] = useState(0);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (tickers.length !== 0) {
            let groups = new Array(Math.floor(tickers.length / 10));
            groups = coolfill(groups);
            let i = 0;
            groups.map(group => {
                for (let j = 0; j < 10; j++) {
                    group.push(tickers[i]);
                    i++;
                }
                return null;
            });
            setGroups(groups);
        }
    }, [ tickers ]);

    return (
        <div className="main-list-component">
            <ul>
                {groups.map((group, i) => <p key={i} onClick={() => setOpenTab(i)}>Group {i + 1}</p>)}
                {typeof groups[openTab] === 'undefined' || groups[openTab].map((ticker, i) => <Ticker key={i} ticker={ticker} />)}
            </ul>
        </div>
    );
}

const coolfill = (entryArr) => {
    let outputArr = [];
    for (let i = 0; i < entryArr.length; i++) {
        outputArr.push([]);
    }
    return outputArr;
}
 
export default MainList;