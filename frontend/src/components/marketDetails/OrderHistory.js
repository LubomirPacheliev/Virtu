import React from 'react';

const OrderHistory = props => {
    const { history } = props;
    console.log(history);
    return ( 
        <article className="order-history">
            <div className="order-history-nav">
                <h1>Order History</h1>
            </div>
            <div className="order-history-list">
                {history.map((el, i) => 
                <p key={i}>{el.type} {el.symbol.firstSymbol} at {el.atPrice} 
                {el.symbol.secondSymbol}, received {el.amount} {el.symbol.firstSymbol} for {el.cost.toFixed(2)} {el.symbol.secondSymbol}. </p>)}
            </div>
        </article>
    );
}
 
export default OrderHistory;