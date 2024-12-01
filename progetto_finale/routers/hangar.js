const express = require('express');
const router = express.Router();
const session = require('express-session');
const dayjs = require('dayjs');

const validateLogin = require('../middlewares/validateLogin.js');
const database = require("../modules/database.js")

router.get('/', async (req,res) => {
    const user = await database.getUserByUsername(req.session.user);
    if (!user) {
        return res.status(401).render('error/restricted_access', { message: 'User not found' });
    }

    let aircrafts = [];
    for(purchase of user.purchase_history){
        aircrafts.push(purchase)
    }
    res.render('home/hangar', 
    { 
        aircrafts: aircrafts
    });
});

router.post('/add', async (req,res) => {
    const { name, price } = req.body;
    const user = await database.getUserByUsername(req.session.user);
    if (!user) {
        return res.status(401).render('error/restricted_access', { message: 'User not found' });
    }

    let purchase = {
        aircraft: name,
        date: dayjs().format('YYYY-MM-DD'),
        price: price
    }
    user.purchase_history.push(purchase)
    await user.save()
    res.redirect('/aircrafts');
});

router.post('/remove', async (req, res) => {
    const { name, date, price } = req.body;
    const user = await database.getUserByUsername(req.session.user);

    if (!user) {
        return res.status(401).render('error/restricted_access', { message: 'User not found' });
    }

    const p = {
        aircraft: name,
        date: date,
        price: parseInt(price)
    };

    const index = user.purchase_history.findIndex(purchase =>
        p.aircraft === purchase.aircraft &&
        p.date === purchase.date &&
        p.price === purchase.price
    );

    if (index !== -1) {
        user.purchase_history.splice(index, 1);
    }

    await user.save();
    res.redirect('/aircrafts');
});

module.exports = router