import React, {useContext} from 'react';
import { portfolioContext } from '../../utils/portfolioContext';

const OrderHistory = () => {
    const { history } = useContext(portfolioContext);
    console.log(history);

    const returnOrderListing = order => {
        const {orderType, firstSymbol, secondSymbol, atPrice, atAmount, atCost} = order;
        if (orderType === 'buy') return <p>{orderType.toUpperCase()} at {atPrice} {secondSymbol}, received {atAmount} {firstSymbol} for {atCost} {secondSymbol}</p>;
        if (orderType === 'sell') return <p>{orderType.toUpperCase()} at {atPrice} {secondSymbol}, received {atAmount} {secondSymbol} for {atCost} {firstSymbol}</p>;
    }

    return ( 
        <article className="order-history">
            <div className="order-history-head">
                <h1>your order history</h1>
            </div>
            <div className="order-history-list">
                {history.map((order, i) => returnOrderListing(order))}
            </div>
        </article>
    );
}
 
export default OrderHistory;