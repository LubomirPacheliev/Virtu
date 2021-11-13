import React, { useEffect, useState, useRef } from 'react';
import Ticker from './Ticker.js';

const MainList = props => {
    const {tickers} = props;
    const [openTab, setOpenTab] = useState(0);
    const [groups, setGroups] = useState([]);
    const [isSearching, setSearch] = useState(false);
    const ref = useRef();

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

    const search = ref => {
        const input = ref.current;
        const searchSymbol = input.value.toUpperCase();
        if (!searchSymbol) setSearch(false);
        const regex = new RegExp(searchSymbol);
        const filteredGroups = groups.map(group => group.filter(innerGroup => regex.test(innerGroup.s)));
        const resultGroup = filteredGroups.filter(group => group.length > 0).flat();
        console.log(resultGroup);
        return resultGroup;
    }

    return (
        <div className="main-list-component">
            <input type="text" name="search" id="search" ref={ref} onChange={() => setSearch(true)} />;
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
                    {isSearching && search(ref).map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={true} />)}
                    {typeof groups[openTab] === 'undefined' 
                    || isSearching
                    || groups[openTab].map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={true} />)}
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