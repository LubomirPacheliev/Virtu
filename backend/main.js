const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const binance = 'https://api.binance.com';

app.use(express.static(path.resolve('../build')));

app.get('/api/order/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const url = `${binance}/api/v3/ticker/24hr?symbol=${symbol}`;
    const data = await fetch(url);
    if (!data.ok) console.log('Something went wrong.');
    const parsed = await data.json();
    res.status(200).send(parsed);
});

app.get('/api/markets', async (req, res) => {
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

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../build/index.html'));
});

app.listen(port, console.log(`sksksksk on: ${port}`));