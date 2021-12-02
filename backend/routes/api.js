const express = require('express');
const router = express.Router();
const binance = 'https://api.binance.com';

router.get('/order/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const url = `${binance}/api/v3/ticker/24hr?symbol=${symbol}`;
    const data = await fetch(url);
    if (!data.ok) console.log('Something went wrong.');
    const parsed = await data.json();
    res.status(200).send(parsed);
});

router.get('/markets', async (req, res) => {
    const url = `${binance}/api/v3/ticker/24hr`;
    try {
        const data = await fetch(url);
        const parsed = await data.json();
        res.status(200).send(parsed);
    } catch(e) {
        console.error(e);
        res.send();
    }
});

module.exports = router;