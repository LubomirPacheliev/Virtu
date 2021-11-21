import React, { useState } from "react";
import OrderForm from "./OrderForm.js";

const Order = props => {
    const [orderType, setOrderType] = useState('buy');
    const { portfolio  } = props;

    const clickOrderBtn = (orderType) => {
        const sell = document.querySelector('#sell');
        const buy = document.querySelector('#buy');
        if (orderType === 'buy') {
            sell.style.color = 'white';
            buy.style.color = '#26A69A';
        } else {
            sell.style.color = '#EF5350';
            buy.style.color = 'white';
        }
        setOrderType(orderType);
    }

    return (
        <article className="order">
            <ul>
                <li onClick={() => clickOrderBtn('buy')} id="buy" style={{color: '#26A69A'}}>BUY</li>
                <li onClick={() => clickOrderBtn('sell')} id="sell">SELL</li>
            </ul>
            <OrderForm orderType={orderType} portfolio={portfolio} />
        </article>
    );
}
 
export default Order;