import React from 'react';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

const OrderForm = props => {
    const orderType = 'buy';
    return (
        <div className="order-form">
            {orderType === 'buy' && <BuyForm />}
            {orderType === 'sell' && <SellForm />}
        </div>
    );
}

export default OrderForm;