import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Order = props => {
    const [orderType, setOrderType] = useState('buy');
    const { portfolio } = props;

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

const OrderForm = props => {
    const {orderType, portfolio} = props;
    const [currPrice, setCurrPrice] = useState(0);
    const { symbol } = useParams();

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            setCurrPrice(data.c); 
        }
    }, [setCurrPrice]);

    return (
        <div className="order-form">
            <p>available: {portfolio[0].amount} {portfolio[0].symbol} </p>
            <input type="text" placeholder="at price:" value={Number(currPrice).toFixed(2)} />
            <input type="text" placeholder="amount:" />
            <input type="text" placeholder="receive: " />
            {orderType === 'buy' && <button className="btn-buy">Buy</button>}
            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </div>
    );
}
 
export default Order;