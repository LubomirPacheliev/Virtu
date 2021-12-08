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
    const currAssetRef = firestore.collection('assets/').doc(email + '/').collection('assets/').doc(asset);
    const currUSDTRef = firestore.collection('assets/').doc(email);
    const currAssetVal = (await currAssetRef.get()).data();
    const currUSDTVal = (await currUSDTRef.get()).data();
    const batch = firestore.batch();
    switch(orderType) {
        case 'buy' :
            if(currUSDTVal.capital < usdtCapitalMoved) res.status(418).end();
            if (typeof currAssetVal === 'undefined') {
                batch.set(currAssetRef, { amount, initialUSDT: usdtCapitalMoved });
                batch.set(currUSDTRef, { capital: currUSDTVal.capital - usdtCapitalMoved });
                await batch.commit();
                res.status(200).end();
            } else {
                batch.set(currAssetRef, { amount: currAssetVal.amount + amount });
                batch.set(currUSDTRef, { capital: currUSDTVal.capital - usdtCapitalMoved});
                await batch.commit();
                res.status(200).end();
            }
            break;
        case 'sell':
            if(currAssetVal.amount < amount) res.status(418).end();
            batch.set(currAssetRef, { amount: currAssetVal.amount - usdtCapitalMoved}); // very bad naming, usdtCapital is actually amount here, but rn I'm lazy
            batch.set(currUSDTRef, { capital: currUSDTVal.capital + amount});
            await batch.commit();
            res.status(200).end();
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