import React, { useEffect, useState } from 'react';

const OrderHistory = props => {
    const { history } = props;
    const [iHistory, setiHistory] = useState(history);
    useEffect(() => setiHistory(history), [history]);
    return ( 
        <article className="order-history">
            <div className="order-history-nav">
                <h1>Order History</h1>
            </div>
            <div className="order-history-list">
                {iHistory.map((el, i) => 
                <p key={i}>{el.type} {el.symbol.firstSymbol} at {el.atPrice} 
                {el.symbol.secondSymbol}, received {el.amount} {el.symbol.firstSymbol} for {Number(el.cost).toFixed(2)} {el.symbol.secondSymbol}. </p>)}
            </div>
        </article>
    );
}
 
export default OrderHistory;