import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import { portfolioContext } from '../../utils/portfolioContext';

const OrderForm = props => {
    const orderType = props.orderType;
    const [atPrice, setAtPrice] = useState(1);
    const [atAmount, setAtAmount] = useState(1000);
    const [atCost, setAtCost] = useState(1000);
    const {history, setHistory} = useContext(portfolioContext);

    const { symbol } = useParams();
    const firstSymbol = symbol.slice(2).toLowerCase() === 'usdt' ? symbol.slice(0, 2) : symbol.slice(0, 3);
    const secondSymbol =  firstSymbol.length === 3 ? symbol.slice(3) : symbol.slice(4);
    const orderProps = {
        orderType,
        firstSymbol, secondSymbol,
        atPrice, setAtPrice,
        atAmount, setAtAmount,
        atCost, setAtCost,
        history, setHistory
    };

    let i = 0;
    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
        ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            const price = Number(data.c);
            setAtPrice(price);
            if (i++ < 2) setAtAmount(atCost / price);
        }
    }, [symbol]);

    return (
        <div className="order-form">
            <portfolioContext.Provider value={orderProps}>
                {orderType === 'buy' && <BuyForm />}
                {orderType === 'sell' && <SellForm />}
            </portfolioContext.Provider>
        </div>
    );
}

export default OrderForm;