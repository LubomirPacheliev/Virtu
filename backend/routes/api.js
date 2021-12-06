const express = require('express');
const router = express.Router();
const binance = 'https://api.binance.com';
const firebase = require('firebase-admin');

const serviceAccount = require('../admin-sdk-service/mainbase-2c441-firebase-adminsdk-kqwhn-4f6448f138.json');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

const firestore = require('firebase-admin/firestore').getFirestore();

require('dotenv').config();

router.get('/order/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const url = `${binance}/api/v3/ticker/24hr?symbol=${symbol}`;
    const data = await fetch(url);
    if (!data.ok) console.log('Something went wrong.');
    const parsed = await data.json();
    res.status(200).send(parsed);
});

router.post('/order/:symbol', async (req, res) => {
    const { orderType, asset, amount, usdtCapitalMoved, email } = req.body;
    console.log(email, asset, typeof amount, typeof usdtCapitalMoved);
    const currAssetRef = firestore.collection('assets/').doc(email + '/').collection('assets/').doc(asset);
    const currUSDTRef = firestore.collection('assets/').doc(email);
    const batch = firestore.batch();
    switch(orderType) {
        case 'buy' :
            if(currUSDTRef['capital'] < usdtCapitalMoved) res.status(418).end();
            if (!currAssetRef.value) {
                batch.set(currAssetRef, { amount });
                batch.set(currUSDTRef, { amount: Number(currUSDTRef['capital']) - usdtCapitalMoved});
                await batch.commit();
                res.status(200).end();
            } else {
                batch.set(currAssetRef, { amount: Number(currUSDTRef['amount']) + amount });
                batch.set(currUSDTRef, { amount: Number(currUSDTRef['capital']) - usdtCapitalMoved});
                await batch.commit();
                res.status(200).end();
            }
            break;
        case 'sell':

            break;
    }
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