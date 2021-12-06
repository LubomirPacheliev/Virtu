import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../utils/firebase';
import { useCookies } from 'react-cookie';

const Profile = () => {
    const [cookies, setCookies] = useCookies();
    const [balance, setBalance] = useState(1000);
    const { firestore, firestoreInstance } = useContext(FirebaseContext);
    const email = cookies.email;

    useEffect(async () => {
        const docRef = await firestore.getDoc(firestore.doc(firestoreInstance, 'assets/' + email));
        const docVal = await docRef.data();
        console.log(docVal);
        setBalance(docVal.capital);
    }, []);

    return (
        <section className="portfolio">
            {/* Start of USDT balance */}
            <h1 className="h1-portfolio">portfolio</h1>
            <article className="balance-usdt">
                <h3 className="one-em">your balance <br></br><h1>{balance} USDT</h1></h3>
            </article>

            {/* Start of balances cards */}
            <h3 className="one-em">balances</h3>
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
                        <h5 className="card-title"><img src="https://logodownload.org/wp-content/uploads/2021/01/bitcoin-cash-logo-2-768x768.png" /> Bitcoin Cash</h5>
                        <h6 class="card-subtitle mb-2">2.342703 BCH</h6>
                        <p class="card-text">235.424655 USDT</p>
                    </div>
                </article>
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="https://vectorified.com/image/ethereum-logo-vector-13.png" /> Etherium</h5>
                        <h6 class="card-subtitle mb-2">3.00 ETH</h6>
                        <p class="card-text">12,390.00 USDT</p>
                    </div>
                </article>
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="https://cryptobuyersclub.co.uk/wp-content/uploads/2020/07/Stellar-XLM-Logo.png" /> Lumens</h5>
                        <h6 class="card-subtitle mb-2">1,300.222364 XLM</h6>
                        <p class="card-text">225.412230 USDT</p>
                    </div>
                </article>
                <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src="https://static.coinpaprika.com/coin/sol-solana/logo.png?rev=10608559" /> Solana</h5>
                        <h6 class="card-subtitle mb-2">12.31073 SOL</h6>
                        <p class="card-text">102.4004 USDT</p>
                    </div>
                </article>
            </article>

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