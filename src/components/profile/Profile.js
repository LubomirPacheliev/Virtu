import React, { useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ScaleLoader } from 'react-spinners';
import { FirebaseContext } from '../../utils/firebase.js';
import { GuestCtx } from '../../utils/GuestCtx.js';
import Balance from './Balance.js';
import Cards from './Cards.js';
import Statistics from './Statistics.js';

const Profile = () => {
    const { firestore, firestoreInstance } = useContext(FirebaseContext);
    const { ctxAssets } = useContext(GuestCtx);
    const [ cookies ] = useCookies();
    const [cards, setCards] = useState([]);
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const email = cookies.email;
    const defaultCards = [
        { img: "http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png", coin: 'Bitcoin', amount: 0, usdtValue: 0, symbol: 'BTC' },
        { img: "https://logodownload.org/wp-content/uploads/2021/01/bitcoin-cash-logo-2-768x768.png", coin: 'Bitcoin Cash', amount: 0, usdtValue: 0, symbol: 'BCH'},
        { img: "https://vectorified.com/image/ethereum-logo-vector-13.png", coin: 'Etherium', amount: 0, usdtValue: '0', symbol: 'ETH' },
        { img: "https://cryptobuyersclub.co.uk/wp-content/uploads/2020/07/Stellar-XLM-Logo.png", coin: 'Lumens', amount: '0', usdtValue: '0', symbol: 'XLM' },
        { img: "https://static.coinpaprika.com/coin/sol-solana/logo.png?rev=10608559", coin: 'Solana', amount: '0', usdtValue: '0', symbol: 'SOL' }
    ];
    
    useEffect(async () => {
        let assetsRef;
        if (typeof email !== 'undefined') {
            const docs = await firestore.getDocs(firestore.collection(firestoreInstance, `assets/${email}/assets`));
            assetsRef = docs.docs;
        } else {
            assetsRef = ctxAssets;
        }
        const assets = [];
        if (assetsRef.length < 5) {
            for (let i = assetsRef.length; i < 5; i++) {
                assets.push(defaultCards[i]);
            }
         }
        assetsRef.map(async (asset, i) => {
            const symbol = asset.id;
            const assetVal = typeof asset.data !== 'undefined' ? await asset.data() : asset;
            const ticker =  await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=' + symbol.toUpperCase() + 'USDT');
            const parsedTicker = await ticker.json();
            const usdtValue = Number(parsedTicker.lastPrice) * assetVal.amount;
            const returnVal = {
                img: "https://vectorified.com/image/ethereum-logo-vector-13.png", 
                coin: symbol, 
                symbol,
                amount: Number(assetVal.amount).toFixed(7), 
                usdtValue: Number(usdtValue).toFixed(7)
            };
            assets.unshift(returnVal);
        });
        setCards(assets);
    }, []);

    useEffect( async () => {
        let assetsRef;
        if (typeof email !== 'undefined') {
            const docs = await firestore.getDocs(firestore.collection(firestoreInstance, `assets/${email}/assets`));
            assetsRef = docs.docs;
        } else {
            assetsRef = ctxAssets;
        }
        const assets = [];
        assetsRef.map(async (asset, i) => {
            const symbol = asset.id;
            const assetVal = typeof asset.data !== 'undefined' ? await asset.data() : asset;
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
            if (assets.length === assetsRef.length && assets.length <= 6) { 
                setRows(assets);
                setLoading(false);
            }
        });
    }, []);

    
    return (
        <section className="portfolio">
            {isLoading && <ScaleLoader />}
            {!isLoading && <Balance /> }
            {!isLoading && <Cards cards={cards}/>}
            {!isLoading && <Statistics rows={rows} />}
        </section>
    );
}
 
export default Profile;