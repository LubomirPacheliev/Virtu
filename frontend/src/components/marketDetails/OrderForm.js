import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

const OrderForm = props => {
    const { orderType } = props;
    const { portfolio, setPortfolio } = props.portfolio;
    const { setHistory } = props.history;
    const [currPrice, setCurrPrice] = useState(1);
    const [currAmount, setCurrAmount] = useState(1000);
    const [currCost, setCurrCost] = useState(1000);
    const { symbol } = useParams();
    const firstSymbol = symbol.slice(2).toLowerCase() === 'usdt' ? symbol.slice(0, 2) : symbol.slice(0, 3);
    const secondSymbol =  firstSymbol.length === 3 ? symbol.slice(3) : symbol.slice(4);

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
        let i = 0;
        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            if (++i <= 1) {
                setCurrPrice(Number(data.c).toFixed(2));
                setCurrAmount(currCost / Number(data.c));
                setCurrCost((currCost / Number(data.c) * Number(data.c)));
            }
        }
    }, [symbol]);

    return (
        <div className="order-form">
            <p>available: {portfolio[0].amount} {portfolio[0].symbol} </p>
            <input type="text" name="at-price" value={currPrice + ' ' + secondSymbol} onChange={e => {
                const newPrice = e.target.value;
                setCurrPrice(newPrice);
                setCurrAmount(currCost / newPrice);
            }} />
            <input type="text" name="receive" value={currAmount + ' ' + firstSymbol} onChange={e => {
                const newAmount = e.target.value;
                setCurrAmount(newAmount);
                setCurrPrice(portfolio[0].amount / newAmount);
            }} />
            <input type="text" name="cost" value={currCost + ' ' + secondSymbol} onChange={e => {
                const newCost = e.target.value;
                setCurrCost(newCost);
                setCurrAmount(newCost / currPrice);
            }} />
            {orderType === 'buy' && <button className="btn-buy" onClick={() => 
                setHistory((lastHistory, props) => lastHistory.concat([{symbol: {firstSymbol, secondSymbol}, type: orderType, atPrice: currPrice, amount: currAmount, cost: currCost}])
                )}>Buy</button>}
            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </div>
    );
}

export default OrderForm;