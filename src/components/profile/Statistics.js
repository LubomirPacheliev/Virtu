import React from 'react';

const Statistics = ({rows}) => {
    return (
        <article className="statistic">
            <h3 className="one-em">statistics</h3>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">CRYPTO COIN</th>
                        <th scope="col">EARNED TOTAL</th>
                        <th scope="col">EARNED TOTAL %</th>
                        <th scope="col">NUMBER OF TRADES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length < 1 && <p>No assets to analyse.</p> }
                        {rows.length > 0 && rows.map((row, i) => {
                            return (
                                <tr key={i}>
                                    <td><img src={row.img} />{row.coin}</td>
                                    <td>{row.earnedUSDT}</td>
                                    <td>{row.earnedPercentage}</td>
                                    <td>{row.trades}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
        </article>
    );
}
 
export default Statistics;