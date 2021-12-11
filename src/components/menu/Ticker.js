import React from 'react';
import { useHistory } from 'react-router-dom';

const Ticker = props => {
    const {ticker, isMainList} = props;
    const history = useHistory();

    const navigate = () => {
        history.push(`/market/${ticker.s}`);
    }

    return (
        <tr className="single-ticker" onClick={navigate}>
            <td>{ticker.symbol}</td>
            {isMainList && <td>{Number(ticker.lastPrice).toFixed(2)}</td>}
            <td id="percentage-td">{ticker.priceChangePercent}%</td> 
            {isMainList && <td>{ticker.count}</td>}
        </tr>
    );
}
 
export default Ticker;