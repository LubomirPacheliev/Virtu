import React, { useContext, useEffect, useState } from 'react';
import { portfolioContext } from '../../utils/portfolioContext';
import { FirebaseContext } from '../../utils/firebase';

const SellForm = ({orderProps}) => {
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
    const [available, setAvailable] = useState(0);

    const onCostInput = e => {
        const cost = Number(e.target.value);
        setAtCost(cost);
        setAtAmount(cost * atPrice);
    }

    const onSellClick = async e => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/order/' + symbol, {
            method: 'POST',
            body: JSON.stringify({orderType, asset: firstSymbol, amount: atAmount, usdtCapitalMoved: atCost, email}),
            headers: {'Content-Type': 'application/json'}
        });
        await setHistory(lastHistory => lastHistory.concat([{orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost}]));
    }

    useEffect(() => {
        setAtAmount(atCost * atPrice)
    }, [atPrice]);
    useEffect(async () => {
        const docRef = await firestore.getDoc(firestore.doc(firestoreInstance, `assets/${email}/assets/${firstSymbol}`));
        if (docRef.data().amount) setAvailable(docRef.data().amount.toFixed(2));
        setAtAmount(atCost * atPrice)
    }, []);

    return (
        <div>
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