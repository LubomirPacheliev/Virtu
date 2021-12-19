import React, { useContext, useEffect, useState } from 'react';
import { portfolioContext } from '../../utils/portfolioContext';
import { FirebaseContext } from '../../utils/firebase';
import Notification from '../Notification';
import { GuestCtx } from '../../utils/GuestCtx';

const BuyForm = ({ orderProps }) => {
    const {
        orderType,
        firstSymbol, secondSymbol,
        atPrice, setAtPrice,
        atAmount, setAtAmount,
        atCost, setAtCost,
        history, setHistory
    } = useContext(portfolioContext);
    const { symbol, email } = orderProps;
    const { firestore, firestoreInstance } = useContext(FirebaseContext);
    const {ctxAssets, guestUSDT, setCtxAssets, setUSDT} = useContext(GuestCtx);
    const [available, setAvailable] = useState(0);
    const [error, setError] = useState({});

    const onCostInput = e => {
        const cost = Number(e.target.value);
        setAtCost(cost);
        setAtAmount(cost / atPrice);
    }

    const onBuyClick = async e => {
        e.preventDefault();
        if (atCost > available) {
            setError({error: true, msg: 'Insufficient balance'});
            setTimeout(() => {
                setError({error: false});
            }, 3000);
            return clearTimeout();
        } else {
            if (typeof email !== 'undefined') {
                await fetch('http://localhost:5000/api/order/' + symbol, {
                    method: 'POST',
                    body: JSON.stringify({orderType, asset: firstSymbol, amount: atAmount, usdtCapitalMoved: atCost, email}),
                    headers: {'Content-Type': 'application/json'}
                });
            } else {
                await setUSDT(lastUSDT => lastUSDT - atCost);
                setAvailable(lastAvailable => lastAvailable - atCost);
                let assetIndex;
                const targetAsset = ctxAssets.filter((asset, i) => {
                    assetIndex = i;
                    if (asset.id.toUpperCase() === firstSymbol) return asset;
                });
                if (typeof targetAsset[0] !== 'undefined') {
                    await setCtxAssets(lastAssets => {
                        const returnAssets = lastAssets;
                        returnAssets[assetIndex].amount += Number(atAmount);
                        returnAssets[assetIndex].trades++;
                        return returnAssets;
                    });
                } else {
                    await setCtxAssets(lastAssets => {
                        const returnAssets = lastAssets;
                        returnAssets.push({id: firstSymbol, amount: atAmount, initialUSDT: atCost, trades: 1});
                        return returnAssets;
                    });
                }
            }
            await setHistory(lastHistory => lastHistory.concat([{orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost}]));
        }
    }

    useEffect(() => {
        setAtAmount(atCost / atPrice);
    }, [atPrice]);
    useEffect(async () => {
        if (typeof email !== 'undefined') {
            const docRef = await firestore.getDoc(firestore.doc(firestoreInstance, `assets/${email}`));
            setAvailable(docRef.data().capital.toFixed(2));
        } else {
            setAvailable(guestUSDT);
        }
        setAtAmount(atCost / atPrice);
    }, []);

    return (
        <div>
            {error.error && <Notification msg={error.msg} parent="orderform-error" />}
            <p>available: {available} USDT</p>
            <label htmlFor="at-price">At {secondSymbol}</label><br />
            <input type="text" name="at-price" value={atPrice} />
            <label htmlFor="receive">Receive {firstSymbol}</label>
            <input type="text" name="receive" value={atAmount} />
            <label htmlFor="cost">Cost in {secondSymbol}</label>
            <input type="text" name="cost" defaultValue={atCost} onChange={onCostInput} />
            <button className="btn-buy" onClick={onBuyClick}>Buy</button>
        </div>
    );
}
 
export default BuyForm;