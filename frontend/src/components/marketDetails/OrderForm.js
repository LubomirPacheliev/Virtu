import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

const OrderForm = props => {
    const {orderType, portfolio} = props;
    const [currPrice, setCurrPrice] = useState();
    const { symbol } = useParams();

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            setCurrPrice(Number(data.c).toFixed(2));
        }
    }, [setCurrPrice]);

    return (
        <div className="order-form">
            <p>available: {portfolio[0].amount} {portfolio[0].symbol} </p>
            <input type="text" value={currPrice} />
            <input type="text" value={ (portfolio[0].amount / currPrice) } />
            {orderType === 'buy' && <button className="btn-buy">Buy</button>}
            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </div>
    );
}

export default OrderForm;