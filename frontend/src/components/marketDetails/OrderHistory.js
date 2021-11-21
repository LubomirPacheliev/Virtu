import React, { useContext } from 'react';
import { portfolioContext } from '../../portfolioContext';

const OrderHistory = props => {
    const { history } = useContext(portfolioContext);
    return ( 
        <article className="order-history">
            <div className="order-history-nav">
                <h1>Order History</h1>
            </div>
            <div className="order-history-list">
                <p>{history.history.map((el, i) => console.log(el))}</p>
            </div>
        </article>
    );
}
 
export default OrderHistory;