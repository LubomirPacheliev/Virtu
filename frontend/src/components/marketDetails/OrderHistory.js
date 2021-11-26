import React, {useContext} from 'react';
import { portfolioContext } from '../../portfolioContext';

const OrderHistory = () => {
    const { history } = useContext(portfolioContext);
    console.log(history);

    const returnOrderListing = order => {
        const {orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost} = order;
        return <p>{firstSymbol} {orderType} at {atPrice}, received {atAmount} for {atCost}{secondSymbol}</p>
    }

    return ( 
        <article className="order-history">
            <div className="order-history-nav">
                <h1>Order History</h1>
            </div>
            <div className="order-history-list">
                {history.map((order, i) => returnOrderListing(order))}
            </div>
        </article>
    );
}
 
export default OrderHistory;