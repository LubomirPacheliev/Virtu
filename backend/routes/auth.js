const router = require('express').Router();
const jwt = require('jsonwebtoken');
const app = require('firebase-admin/app');
const auth = require('firebase-admin/auth').getAuth();
const firestore = require('firebase-admin/firestore').getFirestore();

require('dotenv').config();

app.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
});

router.post('/auth/register', async (req, res) => {
    const user = {email: req.body.email, password: req.body.pass};
    const capital = req.body.capital;
    const token = await jwt.sign({email, pass}, process.env.JWT_SECRET);
    await auth.createUser(user);
    await firestore.doc(user.email).create(capital);
    res.cookie('auth', token);
});

module.exports = router;