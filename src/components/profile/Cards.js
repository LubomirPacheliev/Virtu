import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../utils/firebase';
import { useCookies } from 'react-cookie';
import fetch from 'isomorphic-fetch';

const Cards = () => {
    const { firestore, firestoreInstance } = useContext(FirebaseContext);
    const [ cookies ] = useCookies();
    const [cards, setCards] = useState([]);
    const email = cookies.email;
    const defaultCards = [
        { img: "http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png", coin: 'Bitcoin', amount: 0, usdtValue: 0, symbol: 'BTC' },
        { img: "https://logodownload.org/wp-content/uploads/2021/01/bitcoin-cash-logo-2-768x768.png", coin: 'Bitcoin Cash', amount: 0, usdtValue: 0, symbol: 'BCH'},
        { img: "https://vectorified.com/image/ethereum-logo-vector-13.png", coin: 'Etherium', amount: 0, usdtValue: '0', symbol: 'ETH' },
        { img: "https://cryptobuyersclub.co.uk/wp-content/uploads/2020/07/Stellar-XLM-Logo.png", coin: 'Lumens', amount: '0', usdtValue: '0', symbol: 'XLM' },
        { img: "https://static.coinpaprika.com/coin/sol-solana/logo.png?rev=10608559", coin: 'Solana', amount: '0', usdtValue: '0', symbol: 'SOL' }
    ];
    
    useEffect(async () => {
        const docs = await firestore.getDocs(firestore.collection(firestoreInstance, `assets/${email}/assets`));
        const assetsRef = docs.docs;
        const assets = [];
        if (assetsRef.length < 5) {
            for (let i = assetsRef.length; i < 5; i++) {
                assets.push(defaultCards[i]);
            }
         }
        assetsRef.map(async (asset, i) => {
            const symbol = asset.id;
            const assetVal = await asset.data();
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
            if (assets.length === 5) setCards(assets);
        });
    }, []);

    return (
        <div>
            <h3 className="one-em">balances</h3>
            <article className="balances">
                {cards.map((card, i) => returnCard(card, i))}
            </article>
        </div>
    );
}

const returnCard = (card, i) => {
    return (
        <article className="card" key={i}>
            <div className="card-body">
                <h5 className="card-title"><img src={card.img}/> {card.coin}</h5>
                <h6 class="card-subtitle mb-2">{card.amount} {card.symbol}</h6>
                <p class="card-text">{card.usdtValue} USDT</p>
            </div>
        </article>
    )
}
 
export default Cards;