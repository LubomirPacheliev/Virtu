import React from 'react';
import { useHistory } from 'react-router-dom';

const Ticker = props => {
    const {ticker} = props;
    const history = useHistory();

    const navigate = () => {
        history.push(`/market/${ticker.s}`);
    }

    return (
        <li className="single-ticker" onClick={navigate}>
            {ticker.s}
        </li>
    );
}
 
export default Ticker;