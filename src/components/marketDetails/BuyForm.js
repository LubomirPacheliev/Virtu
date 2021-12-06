import React, { useContext, useEffect } from 'react';
import { portfolioContext } from '../../utils/portfolioContext';

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

    const onCostInput = e => {
        const cost = Number(e.target.value);
        setAtCost(cost);
        setAtAmount(cost / atPrice);
    }

    const onBuyClick = async e => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/order/' + symbol, {
            method: 'POST',
            body: JSON.stringify({orderType, asset: firstSymbol, amount: atAmount, usdtCapitalMoved: atCost, email}),
            headers: {'Content-Type': 'application/json'}
        });
        await setHistory(lastHistory => lastHistory.concat([{orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost}]));
    }

    useEffect(() => setAtAmount(atCost / atPrice), []);

    return (
        <div>
            <p>available: 1,000 USDT</p>
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