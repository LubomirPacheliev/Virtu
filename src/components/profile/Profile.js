import React from 'react';
import Balance from './Balance.js';
import Cards from './Cards.js';

const Profile = () => {

    return (
        <section className="portfolio">
            <Balance />
            <Cards />

            {/* Start of recent trades */}
            <article className="statistic">
                <h3 className="one-em">statistics</h3>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">CRYPTO COIN</th>
                        <th scope="col">EARNED TOTAL</th>
                        <th scope="col">EARNED TOTAL %</th>
                        <th scope="col">% OF PORTFOLIO</th>
                        <th scope="col">NUMBER OF TRADES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" />Bitcoin</td>
                            <td>1.45903210</td>
                            <td>18.5</td>
                            <td>56</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" />Bitcoin</td>
                            <td>1.45903210</td>
                            <td>18.5</td>
                            <td>56</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" />Bitcoin</td>
                            <td>1.45903210</td>
                            <td>18.5</td>
                            <td>56</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" />Bitcoin</td>
                            <td>1.45903210</td>
                            <td>18.5</td>
                            <td>56</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" />Bitcoin</td>
                            <td>1.45903210</td>
                            <td>18.5</td>
                            <td>56</td>
                            <td>15</td>
                        </tr>
                    </tbody>
                    </table>
            </article>
        </section>
    );
}
 
export default Profile;