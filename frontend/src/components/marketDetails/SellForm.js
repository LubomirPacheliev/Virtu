import React, { useContext, useEffect } from 'react';
import { portfolioContext } from '../../portfolioContext';

const BuyForm = () => {
    const {
        orderType,
        firstSymbol, secondSymbol,
        atPrice, setAtPrice,
        atAmount, setAtAmount,
        atCost, setAtCost,
        history, setHistory
    } = useContext(portfolioContext);

    const onCostInput = e => {
        const cost = Number(e.target.value);
        setAtCost(cost);
        setAtAmount(cost * atPrice);
    }

    const onBuyClick = e => {
        e.preventDefault();
        setHistory(lastHistory => lastHistory.concat([{orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost}]));
    }

    useEffect(() => setAtAmount(atCost * atPrice), []);

    return (
        <div>
            <p>available: 1000 USDT</p>
            <label htmlFor="at-price">At {secondSymbol}</label>
            <input type="text" name="at-price" value={atPrice} />
            <label htmlFor="receive">Receive {secondSymbol}</label>
            <input type="text" name="receive" value={atAmount} />
            <label htmlFor="cost">Cost in {firstSymbol}</label>
            <input type="text" name="cost" defaultValue={atCost} onChange={onCostInput} />
            <button className="btn-sell" onClick={onBuyClick}>Sell</button>
        </div>
    );
}
 
export default BuyForm;