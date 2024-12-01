const express = require('express');
const router = express.Router();
const session = require('express-session');

const validateLogin = require('../middlewares/validateLogin.js');
const database = require("../modules/database.js")

router.get('/', async (req,res) => {
    const aircrafts = await database.aircrafts();
    res.render('home/aircrafts', 
    {
        aircrafts: aircrafts
    });
});

router.get('/:id', async (req,res) => {
    const aircraft = await database.getAircraftById(req.params.id);
    if (!aircraft) {
        return res.status(404).render('error/404', { message: 'Aircraft not found' });
    }
    res.render('home/details', 
    { 
        aircraft: aircraft 
    });
});

module.exports = router