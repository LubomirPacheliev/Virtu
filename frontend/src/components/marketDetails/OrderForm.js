import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import BuyForm from './BuyForm';

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

    const orderProps = {
        portfolio, 
        setHistory, 
        currPrice, setCurrPrice, 
        currAmount, setCurrAmount,
        currCost, setCurrCost,
        symbol: {firstSymbol, secondSymbol},
        orderType
    };

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
            {orderType === 'buy' && 
            <BuyForm  buyProps={orderProps} />}

            {orderType === 'sell' && <button className="btn-sell">Sell</button>}
        </div>
    );
}

export default OrderForm;