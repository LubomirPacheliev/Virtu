import React, {useContext} from 'react';
import { portfolioContext } from '../../utils/portfolioContext';

const OrderHistory = () => {
    const { history } = useContext(portfolioContext);

    const returnOrderListing = order => {
        const {orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost} = order;
        if (orderType === 'buy') return <p>{orderType.toUpperCase()} at {atPrice} {secondSymbol}, received {atAmount} {firstSymbol} for {atCost} {secondSymbol}</p>;
        if (orderType === 'sell') return <p>{orderType.toUpperCase()} at {atPrice} {secondSymbol}, received {atAmount} {secondSymbol} for {atCost} {firstSymbol}</p>;
    }

    return ( 
        <div>
            <h1 className="order-history-h1">history</h1>
            <article className="order-history">
            <div className="order-history-list">
                {history.reverse().map((order, i) => returnOrderListing(order))}
            </div>
        </article>
        </div>
    );
}
 
export default OrderHistory;