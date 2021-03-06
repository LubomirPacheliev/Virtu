import React, { useEffect, useState, useRef } from 'react';
import Ticker from './Ticker.js';

const MainList = props => { // I want to kill myself because of how bad this component is
    const tickers = props.tickers.sort((tickA, tickB) => Number(tickB.lastPrice) - Number(tickA.lastPrice));
    const [openTab, setOpenTab] = useState(0);
    const [groups, setGroups] = useState([]);
    const [searchVal, setSearch] = useState('');
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
        if (searchSymbol.length === 0) setSearch('');
        const regex = new RegExp(searchSymbol);
        const filteredGroups = groups.map(group => group.filter(innerGroup => regex.test(innerGroup.symbol)));
        return filteredGroups.filter(group => group.length > 0).flat();
    }

    return (
        <div className="main-list-component">
            <input type="text" placeholder="search" id="search" ref={ref} onChange={e => setSearch(e.target.value)} />
            <table className="table table-borderless table-hover">
                <thead>
                    <tr>
                        <th scope="col">Coin Pair</th>
                        <th scope="col">Price</th>
                        <th scope="col">24H Change</th>
                        <th scope="col">Trades</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof groups[openTab] === 'undefined' 
                    || searchVal.length > 0
                    || groups[openTab].map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={true} />)}
                    {searchVal && search(ref)
                    .map((ticker, i) => <Ticker key={i} ticker={ticker} isMainList={true} />)
                    .filter(tab => tab.key < openTab + 8 && tab.key > openTab - 1 || tab.key === '0' || tab.key === `${groups.length - 20}`)}
                </tbody>
            </table>
            <div className="tabs">
                {
                    groups
                    .map((group, i) => <p key={i} onClick={() => setOpenTab(i)}>{i + 1}</p>) // eslint-disable-next-line
                    .filter(tab => tab.key < openTab + 8 && tab.key > openTab - 1 || tab.key === '0' || tab.key === `${groups.length - 20}`)
                }
            </div>
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