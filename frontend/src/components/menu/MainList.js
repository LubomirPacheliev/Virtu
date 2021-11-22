import React, { useEffect, useState, useRef } from 'react';
import Ticker from './Ticker.js';

const MainList = props => { // I want to kill myself because of how bad this component is
    const {tickers} = props;
    const [openTab, setOpenTab] = useState(0);
    const [groups, setGroups] = useState([]);
    const [searchVal, setSearch] = useState('');
    const ref = useRef();

    useEffect(() => {
        if (tickers.length !== 0) {
            const filteredTickers = tickers.filter(ticker => ticker.s.slice(3).toLowerCase() === 'usdt' || ticker.s.slice(2).toLowerCase() === 'usdt');
            let groups = new Array(Math.floor(filteredTickers.length / 10));
            groups = coolfill(groups);
            let i = 0;
            groups.map(group => {
                for (let j = 0; j < 10; j++) {
                    group.push(filteredTickers[i]);
                    i++;
                }
                return null;
            });
            setGroups(groups);
        }
    }, [ tickers ]);

    const search = ref => {
        const input = ref.current;
        const searchSymbol = input.value.toUpperCase();
        if (searchSymbol.length === 0) setSearch('');
        const regex = new RegExp(searchSymbol);
        const filteredGroups = groups.map(group => group.filter(innerGroup => regex.test(innerGroup.s)));
        return filteredGroups.filter(group => group.length > 0).flat();
    }

    return (
        <div className="main-list-component">
            <input type="text" name="search" id="search" ref={ref} onChange={e => setSearch(e.target.value)} />;
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
                            .map((group, i) => <td key={i} onClick={() => setOpenTab(i)}>{i + 1}</td>) // eslint-disable-next-line
                            .filter(tab => tab.key < openTab + 8 && tab.key > openTab - 1 || tab.key === '0' || tab.key === `${groups.length - 20}`)
                        }
                    </tr>
                </tfoot>
                <tbody>
                    {typeof groups[openTab] === 'undefined' 
                    || searchVal.length > 0
                    || groups[openTab].map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={true} />)}
                    {searchVal && search(ref).map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={true} />)}
                </tbody>
            </table>
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