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
            <td>{ticker.s}</td>
            {isMainList && <td>{Number(ticker.c).toFixed(2)}</td>}
            <td>{ticker.P}%</td> 
            {isMainList && <td>{ticker.n}</td>}
        </tr>
    );
}
 
export default Ticker;