import React, { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FirebaseContext } from '../../utils/firebase';

const Statistics = () => {
    const [cookies, setCookies] = useCookies();
    const [rows, setRows] = useState([]);
    const { firestore, firestoreInstance } = useContext(FirebaseContext);
    const email = cookies.email;

    useEffect( async () => {
        const docs = await firestore.getDocs(firestore.collection(firestoreInstance, `assets/${email}/assets`));
        const assetsRef = docs.docs;
        const assets = [];
        assetsRef.map(async (asset, i) => {
            const symbol = asset.id;
            const assetVal = await asset.data();
            const ticker =  await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=' + symbol.toUpperCase() + 'USDT');
            const parsedTicker = await ticker.json();
            const usdtValue = Number(parsedTicker.lastPrice) * assetVal.amount;
            const returnVal = {
                img: "https://vectorified.com/image/ethereum-logo-vector-13.png", 
                coin: symbol,
                amount: Number(assetVal.amount).toFixed(2), 
                earnedUSDT: (Number(usdtValue) - Number(assetVal.initialUSDT)).toFixed(2),
                earnedPercentage: ((Number(usdtValue) - Number(assetVal.initialUSDT)) / assetVal.initialUSDT * 100).toFixed(2),
                trades: assetVal.trades
            };
            assets.unshift(returnVal);
            if (assets.length === assetsRef.length && assets.length < 6) setRows(assets);
        });
    }, []);

    return (
        <article className="statistic">
            <h3 className="one-em">statistics</h3>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">CRYPTO COIN</th>
                        <th scope="col">EARNED TOTAL</th>
                        <th scope="col">EARNED TOTAL %</th>
                        <th scope="col">NUMBER OF TRADES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length < 1 && <p>No assets to analyse.</p> }
                        {rows.length > 0 && rows.map((row, i) => {
                            return (
                                <tr key={i}>
                                    <td><img src={row.img} />{row.coin}</td>
                                    <td>{row.earnedUSDT}</td>
                                    <td>{row.earnedPercentage}</td>
                                    <td>{row.trades}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
        </article>
    );
}
 
export default Statistics;