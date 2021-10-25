import { useState } from "react";

const Order = props => {
    const [orderType, setOrderType] = useState('buy');

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
                <li onClick={() => clickOrderBtn('buy')} id="buy">BUY</li>
                <li onClick={() => clickOrderBtn('sell')} id="sell">SELL</li>
            </ul>
            <OrderForm orderType={orderType} />
        </article>
    );
}

const OrderForm = props => {
    const orderType = props.orderType;
    return (
        <div className="order-form">
            <p>available: 50 USDT</p>
            <input type="text" id="price" name="price" placeholder="at price:" />
            <input type="text" id="amount" name="amount" placeholder="amount:" />
            {orderType === 'buy' && <button className="btn-buy">Buy</button>}
            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </div>
    );
}
 
export default Order;