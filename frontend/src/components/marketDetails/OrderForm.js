import React, { useEffect, useState} from 'react';
import { useParams } from "react-router";
import { portfolioContext } from '../../portfolioContext.js';
import BuyForm from './BuyForm.js';
import SellForm from './SellForm.js';

const OrderForm = props => {
    const { orderType } = props;
    const { portfolio, setPortfolio } = props.portfolio;
    const { setHistory } = props.history;

    const [currPrice, setCurrPrice] = useState(1);
    const [currAmount, setCurrAmount] = useState(1000);
    const [currCost, setCurrCost] = useState(1000);
    const [orders, setOrders] = useState([]);

    const { symbol } = useParams();
    const firstSymbol = symbol.slice(2).toLowerCase() === 'usdt' ? symbol.slice(0, 2) : symbol.slice(0, 3);
    const secondSymbol =  firstSymbol.length === 3 ? symbol.slice(3) : symbol.slice(4);

    const orderProps = {
        portfolio, 
        orders, setOrders, 
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
            const price = Number(data.c);
            if (++i <= 1) {
                setCurrPrice(price.toFixed(2));
                setCurrAmount(currCost / price);
                setCurrCost(currCost / price * price);
            }
            console.log(orders);
            if (orders.length > 0) orders.map((order, i) => {
                    if (Number(order.atPrice) <= price + 0.1 && Number(order.atPrice) >= price - 0.1) {
                        orders.splice(i, 1);
                        setHistory((lastHistory, props) => lastHistory.concat([order]));
                    }
                }
            );
        }
    }, [symbol]);

    return (
        <portfolioContext.Provider value={orderProps}>
            <div className="order-form">
                {orderType === 'buy' && <BuyForm />}
                {orderType === 'sell' && <SellForm />}
            </div>
        </portfolioContext.Provider>
    );
}

export default OrderForm;