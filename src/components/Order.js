import { useState } from "react";

const Order = props => {
    const [orderType, setOrderType] = useState('buy');
    return (
        <article className="order">
            <ul>
                <li onClick={() => setOrderType('buy')}>Buy</li>
                <li onClick={() => setOrderType('sell')}>Sell</li>
            </ul>
            <OrderForm orderType={orderType} />
        </article>
    );
}

const OrderForm = props => {
    const orderType = props.orderType;
    return (
        <form className="order-form">
            <p>Available: 50USDT</p>
            <label htmlFor="price">At Price</label>
            <input type="text" id="price" name="price" />
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" name="amount" />
            {orderType === 'buy' && <button className="btn-buy">Buy</button>}
            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </form>
    );
}
 
export default Order;