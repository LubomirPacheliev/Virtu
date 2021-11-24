import React from 'react';

const SellForm = () => {
    return (
        <div>
            <p>available: 1000 USDT</p>
            <label htmlFor="at-price">At </label>
            <input type="text" name="at-price" />
            <label htmlFor="receive">Receive </label>
            <input type="text" name="receive" />
            <label htmlFor="cost">Cost in </label>
            <input type="text" name="cost" />
            <button className="btn-sell">Sell</button>
        </div>
    );
}
 
export default SellForm;