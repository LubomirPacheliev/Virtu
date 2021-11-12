import React from 'react';
import { useHistory } from 'react-router-dom';

const Ticker = props => {
    const {ticker} = props;
    const history = useHistory();

    const navigate = () => {
        history.push(`/market/${ticker.s}`);
    }

    return (
        <tr className="single-ticker" onClick={navigate}>
            <td>{ticker.s}</td>
            <td>{Number(ticker.c).toFixed(2)}</td>
            <td>{ticker.P}%</td>
            <td>{ticker.n}</td>
        </tr>
    );
}
 
export default Ticker;