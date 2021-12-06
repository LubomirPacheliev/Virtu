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
    const { orderType, asset, amount, usdtCapital: usdtCapitalMoved, email } = req.body;
    const docRef = firestore.collection('assets').doc(email);
    const capitalField = docRef.capital;
    const currUSDTCapital = Number(capitalField[0].value);
    const currAssetCapital = Number(capitalField.filter(currAsset => currAsset.symbol === asset)[0]);

    const writeBatch = firestore.batch();

    if ( orderType === 'buy' ) {
        if ( currUSDTCapital < usdtCapitalMoved ) res.status(418).end();
        const newUSDTCapital = currUSDTCapital - usdtCapitalMoved;
        const newAssetCapital = currAssetCapital + Number(amount);

        // const newCapitalField = capitalField;
        // newCapitalField

        // writeBatch.set(docRef, );
    } else {

    }
}); 

router.post('/test', async (req, res) => {
    const writeBatch = firestore.batch();
    const docRef = firestore.collection('assets').doc('test').collection('testA').doc('testB');
    writeBatch.create(docRef, {test: 'testing'});
    await writeBatch.commit();
    res.end();
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