import React from 'react';

const Ticker = props => {
    const {ticker} = props;

    return (
        <li className="single-ticker">
            {ticker.c}
        </li>
    );
}
 
export default Ticker;