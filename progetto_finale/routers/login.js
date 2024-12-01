const express = require('express');
const router = express.Router();
const validateLogin = require('../middlewares/validateLogin.js');
const database = require("../modules/database.js")
const security = require('../modules/security.js')



router.get('/', async (req,res) => {
    
    const user = await database.getUserByUsername(req.session.user);

    if (user) {
        res.redirect('/hangar')
    }else{
        res.render('login', {});
    }
});

router.post('/', validateLogin, async (req, res) => {
    const { username, password } = req.body;

    const user = await database.getUserByCredentials(username, password);
    if (!user) {
        return res.status(404).render('error/404', { message: 'User not found' });
    }else{
        req.session.user = username;
        if(user.admin){
            req.session.admin = user.admin;
            res.status(302).redirect('/admin/aircrafts')
        }else{
            res.status(302).redirect('/hangar')
        }
    }
});

module.exports = router