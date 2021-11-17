import React from 'react';

const OrderHistory = props => {
    const {history} = props;
    return ( 
        <article className="order-history">
            <div className="order-history-nav">
                <h1>Order History</h1>
            </div>
            <div className="order-history-list">
                <p>{history}</p>
            </div>
        </article>
    );
}
 
export default OrderHistory;