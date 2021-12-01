import React from 'react';

const Profile = () => {
    return (
        <section className="portfolio">
            {/* Start of USDT balance */}
            <h1>Portfolio</h1>
            <article className="balance-usdt">
                <h3>Your USDT Balance: <br></br><h1>$ 1,000</h1></h3>
            </article>

            {/* Start of balances cards */}
            <h3>Balances:</h3>
            <article className="balances">
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" /> Bitcoin</h5>
                        <h6 class="card-subtitle mb-2">1.45342703 BTC</h6>
                        <p class="card-text">525.43224 USDT</p>
                    </div>
                </article>
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" /> Bitcoin</h5>
                        <h6 class="card-subtitle mb-2">1.45342703 BTC</h6>
                        <p class="card-text">525.43224 USDT</p>
                    </div>
                </article>
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" /> Bitcoin</h5>
                        <h6 class="card-subtitle mb-2">1.45342703 BTC</h6>
                        <p class="card-text">525.43224 USDT</p>
                    </div>
                </article>
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" /> Bitcoin</h5>
                        <h6 class="card-subtitle mb-2">1.45342703 BTC</h6>
                        <p class="card-text">525.43224 USDT</p>
                    </div>
                </article>
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png" /> Bitcoin</h5>
                        <h6 class="card-subtitle mb-2">1.45342703 BTC</h6>
                        <p class="card-text">525.43224 USDT</p>
                    </div>
                </article>
            </article>

            {/* Start of recent trades */}
            <h3>Statistic</h3>
            <article className="statistic">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Crypto Coin</th>
                        <th scope="col">Earned Total</th>
                        <th scope="col">Earned Total %</th>
                        <th scope="col">% of Portfolio</th>
                        <th scope="col">Number of Trades</th>
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