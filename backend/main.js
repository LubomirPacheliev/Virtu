const express = require('express');
const app = express();
const port = 5000;
const binance = 'https://api.binance.com';

app.get('/api/order/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const url = `${binance}/api/v3/ticker/24hr?symbol=${symbol}`;
    const res = await fetch(url);
    const parsed = await res.json();
    res.send(parsed);
});

app.listen(port, console.log(`sksksksk on: ${port}`));