import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar.js';
import Ticker from './Ticker.js';

const MainList = props => {
    const {tickers} = props;
    const [openTab, setOpenTab] = useState(0);
    const [groups, setGroups] = useState([]);
    const [isSearching, setSearch] = useState(false);

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
            <table>
                <thead>
                    <tr>
                        <th>Coin Pair</th>
                        <th>Price</th>
                        <th>24H Change</th>
                        <th>Trades</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        {
                            groups
                            .map((group, i) => <p key={i} onClick={() => setOpenTab(i)}>{i + 1}</p>) // eslint-disable-next-line
                            .filter(tab => tab.key < openTab + 8 && tab.key > openTab - 1 || tab.key === '0' || tab.key === `${groups.length - 20}`)
                        }
                    </tr>
                </tfoot>
                <tbody>
                    {typeof groups[openTab] === 'undefined' 
                    || groups[openTab].map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={true} />)}
                </tbody>
            </table>
            <Searchbar groups={groups} setSearch={setSearch} />
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