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
                <p key={i}>{el.type} {el.symbol} at {el.atPrice}, received {el.amount} for {el.cost}. </p>)}
            </div>
        </article>
    );
}
 
export default OrderHistory;