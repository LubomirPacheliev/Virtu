import React, { useContext, useEffect, useState } from 'react';
import { portfolioContext } from '../../utils/portfolioContext';
import { FirebaseContext } from '../../utils/firebase';
import Notification from '../Notification';
import { GuestCtx } from '../../utils/GuestCtx';

const SellForm = ({orderProps}) => {
    const {
        orderType,
        firstSymbol, secondSymbol,
        atPrice, setAtPrice,
        atAmount, setAtAmount,
        atCost, setAtCost,
        history, setHistory
    } = useContext(portfolioContext);
    const {ctxAssets, guestUSDT, setCtxAssets, setUSDT} = useContext(GuestCtx);
    const { symbol, email } = orderProps;
    const { firestore, firestoreInstance } = useContext(FirebaseContext);
    const [available, setAvailable] = useState(0);
    const [error, setError] = useState({});

    const onCostInput = e => {
        const cost = Number(e.target.value);
        setAtCost(cost);
        setAtAmount(cost * atPrice);
    }

    const onSellClick = async e => {
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
                await setUSDT(lastUSDT => lastUSDT + atAmount);
                setAvailable(lastAvailable => lastAvailable - atCost);
                let assetIndex;
                const targetAsset = ctxAssets.filter((asset, i) => {
                    assetIndex = i;
                    if (asset.id.toUpperCase() === firstSymbol) return asset;
                });
                await setCtxAssets(lastAssets => {
                    const returnAssets = lastAssets;
                    returnAssets[assetIndex].amount -= Number(atCost);
                    returnAssets[assetIndex].trades++;
                    return returnAssets;
                });
            }
            await setHistory(lastHistory => lastHistory.concat([{orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost}]));
        }
    }

    useEffect(() => {
        setAtAmount(atCost * atPrice)
    }, [atPrice]);
    useEffect(async () => {
        if (typeof email !== 'undefined') {
            const docRef = await firestore.getDoc(firestore.doc(firestoreInstance, `assets/${email}/assets/${firstSymbol}`));
            if (docRef.data().amount) setAvailable(docRef.data().amount.toFixed(2));
        } else {
            const ctxAssetVal = ctxAssets.filter(asset => asset.id.toUpperCase() === firstSymbol)[0];
            if (typeof ctxAssetVal !== 'undefined') setAvailable(ctxAssetVal.amount);
        }
        setAtAmount(atCost * atPrice)
    }, []);

    return (
        <div>
            {error.error && <Notification msg={error.msg} parent="orderform-error" />}
            <p>available: {available} {firstSymbol}</p>
            <label htmlFor="at-price">At {secondSymbol}</label><br />
            <input type="text" name="at-price" value={atPrice} />
            <label htmlFor="receive">Receive {secondSymbol}</label>
            <input type="text" name="receive" value={atAmount} />
            <label htmlFor="cost">Cost in {firstSymbol}</label>
            <input type="text" name="cost" defaultValue={atCost} onChange={onCostInput} />
            <button className="btn-sell" onClick={onSellClick}>Sell</button>
        </div>
    );
}
 
export default SellForm;