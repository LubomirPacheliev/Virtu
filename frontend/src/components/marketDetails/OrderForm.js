import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

const OrderForm = props => {
    const { orderType } = props;
    const { portfolio } = props.portfolio;
    const [currPrice, setCurrPrice] = useState(1);
    const [isInputting, setIsInputting] = useState(false);
    const { symbol } = useParams();

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            if (!isInputting) setCurrPrice(Number(data.c).toFixed(2));
        }
    }, [setCurrPrice, isInputting]);

    return (
        <div className="order-form">
            <p>available: {portfolio[0].amount} {portfolio[0].symbol} </p>
            {/* <label for="at-price">at price: </label> */}
            <input type="text" name="at-price" value={currPrice} onFocus={() => setIsInputting(true)} />
            {/* <label for="receive">receive:</label> */}
            <input type="text" name="receive" value={ (portfolio[0].amount / currPrice) } />
            Cost: {currPrice * (portfolio[0].amount / currPrice)}
            {orderType === 'buy' && <button className="btn-buy">Buy</button>}
            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </div>
    );
}

export default OrderForm;