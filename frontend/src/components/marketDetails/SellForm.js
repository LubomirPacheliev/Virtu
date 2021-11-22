import React, { useContext, useEffect } from 'react';
import { portfolioContext } from '../../portfolioContext';

const SellForm = () => {
    const {
        portfolio, 
        setHistory, 
        currPrice, setCurrPrice, 
        currAmount, setCurrAmount,
        currCost, setCurrCost,
        symbol,
        orderType
    } = useContext(portfolioContext);
    const {firstSymbol, secondSymbol} = symbol;
    useEffect(() => setCurrAmount(currCost * currPrice), []);
    return (
        <div>
            <p>available: {portfolio[0].amount} {portfolio[0].symbol}</p>
            <label for="at-price">At {secondSymbol}</label>
            <input type="text" name="at-price" value={currPrice} onChange={e => {
                const newPrice = e.target.value;
                setCurrPrice(newPrice);
                setCurrAmount(currCost * newPrice);
            }} />
            <label for="receive">Receive {secondSymbol}</label>
            <input type="text" name="receive" value={currAmount} onChange={e => {
                const newAmount = e.target.value;
                setCurrAmount(newAmount);
                setCurrPrice(portfolio[0].amount * newAmount);
            }} />
            <label for="cost">Cost in {firstSymbol}</label>
            <input type="text" name="cost" value={currCost} onChange={e => {
                const newCost = e.target.value;
                setCurrCost(newCost);
                setCurrAmount(newCost * currPrice);
            }} />
            <button className="btn-buy" onClick={() => 
                setHistory((lastHistory, props) => lastHistory.concat([{symbol: {firstSymbol, secondSymbol}, type: orderType, atPrice: currPrice, amount: currAmount, cost: currCost}])
            )}>Buy</button>
        </div>
    );
}
 
export default SellForm;