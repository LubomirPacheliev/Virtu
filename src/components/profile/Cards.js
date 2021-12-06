import React from 'react';

const Cards = () => {
    const cards = [
        { img: "http://pngimg.com/uploads/bitcoin/bitcoin_PNG7.png", coin: 'Bitcoin', amount: 1.45342703, usdtValue: 525.43224, symbol: 'BTC' },
        { img: "https://logodownload.org/wp-content/uploads/2021/01/bitcoin-cash-logo-2-768x768.png", coin: 'Bitcoin Cash', amount: 2.342703, usdtValue: 235.424655, symbol: 'BCH'},
        { img: "https://vectorified.com/image/ethereum-logo-vector-13.png", coin: 'Etherium', amount: 3.00, usdtValue: '12,390.00', symbol: 'ETH' },
        { img: "https://cryptobuyersclub.co.uk/wp-content/uploads/2020/07/Stellar-XLM-Logo.png", coin: 'Lumens', amount: '1,300.22364', usdtValue: '225.412230', symbol: 'XLM' },
        { img: "https://static.coinpaprika.com/coin/sol-solana/logo.png?rev=10608559", coin: 'Solana', amount: '12.31073', usdtValue: '102.4004', symbol: 'SOL' }
    ];

    return (
        <div>
             <h3 className="one-em">balances</h3>
            <article className="balances">
                {cards.map(card => 
                    <article className="card">
                    <div className="card-body">
                        <h5 className="card-title"><img src={card.img} /> {card.coin}</h5>
                        <h6 class="card-subtitle mb-2">{card.amount} {card.symbol}</h6>
                        <p class="card-text">{card.usdtValue} USDT</p>
                    </div>
                    </article>
                )}
            </article>
        </div>
    );
}
 
export default Cards;