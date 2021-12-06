const router = require('express').Router();
const jwt = require('jsonwebtoken');
const firestore = require('firebase-admin/firestore').getFirestore();

require('dotenv').config();

router.post('/register', async (req, res) => {
    const body = req.body;
    const user = {email: body.email, password: body.pass};
    // const capital = body.capital;
    const capital = 1000;

    const token = jwt.sign(user, 'haveyouevertriedashakewithbananasandkiwis');
    const firestoreBatch = firestore.batch();
    firestoreBatch.create(firestore.doc('assets/' + user.email), { capital });
    await firestoreBatch.commit();
    res.cookie('auth', token).status(200).end();
});

router.post('/login', async (req, res) => {
    const body = req.body;
    const user = {email: body.email, password: body.pass};
    const token = jwt.sign(user, 'haveyouevertriedashakewithbananasandkiwis');
    res.cookie('auth', token).status(200).end();
});

module.exports = router;