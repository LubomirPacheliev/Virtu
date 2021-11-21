import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

const OrderForm = props => {
    const { orderType } = props;
    const { portfolio } = props.portfolio;
    const {history, setHistory} = props.history;

    const [currPrice, setCurrPrice] = useState(1);
    const [currAmount, setCurrAmount] = useState(1000);
    const [currCost, setCurrCost] = useState(1000);

    const { symbol } = useParams();

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
        let i = 0;
        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            if (++i <= 1) {
                setCurrPrice(Number(data.c).toFixed(2));
                setCurrAmount(portfolio[0].amount / Number(data.c));
            }
        }
    }, [symbol]);

    return (
        <div className="order-form">
            <p>available: {portfolio[0].amount} {portfolio[0].symbol} </p>
            <input type="text" name="at-price" value={currPrice} onChange={e => {
                const newPrice = Number(e.target.value);
                setCurrPrice(newPrice);
                setCurrAmount(portfolio[0].amount / newPrice);
            }} />
            <input type="text" name="receive" value={currAmount} onChange={e => {
                const newAmount = Number(e.target.value);
                setCurrAmount(newAmount);
                setCurrPrice(portfolio[0].amount / newAmount);
            }} />
            {/* <input type="text" name="cost" value={currCost} onChange={e => {
                setCurrCost(Number(e.target.value));
            }} /> */}
            {orderType === 'buy' && <button className="btn-buy" onClick={() => setHistory(currPrice)}>Buy</button>}
            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </div>
    );
}

export default OrderForm;