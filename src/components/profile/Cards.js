import React from 'react';

const Cards = ({cards}) => {
    const backwards = '<';
    const forwards = '>';
    return (
        <div className="cards-div">
            <article className="balances-nav">
                <h3 className="one-em">balances</h3>
                <button className="backward">{backwards}</button>
                <button className="forward">{forwards}</button>
            </article>
            <article className="balances">
                {cards.map((card, i) => {
                    if (i < 5) return returnCard(card, i);
                })}
            </article>
        </div>
    );
}

const returnCard = (card, i) => {
    return (
        <article className="card" key={i}>
            <div className="card-body">
                <h5 className="card-title"><img src={card.img}/> {card.coin}</h5>
                <h6 class="card-subtitle mb-2">{card.amount} {card.symbol}</h6>
                <p class="card-text">{card.usdtValue} USDT</p>
            </div>
        </article>
    )
}
 
export default Cards;