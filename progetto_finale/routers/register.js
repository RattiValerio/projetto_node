const express = require('express');
const router = express.Router();
const validateRegister = require('../middlewares/validateRegister.js');
const database = require("../modules/database.js")
const security = require('../modules/security.js')



router.get('/', (req,res) => {
    res.render('register', 
    {
        error: null,
        credentials: {}
    });
});

router.post('/', validateRegister, async (req, res) => {
    const { username, email, password, confirm } = req.body;
    let user;
    errors = {};
    credentials = {};
    if(! (await database.checkIfUserAlreadyExists(username))){
        user = await database.registerUser(username, email, password);
    }else{
        errors.username = "Username is already used"
        credentials.email = email;
        return res.render('register', {
            error: errors,
            credentials: credentials
        });
    }
    if (!user) {
        errors.username = "Something went wrong during user creation"
        return res.render('register', {
            error: errors,
            credentials: credentials
        });
    }else{
        credentials.username = username
        return res.render('login', {
            success: true,
            credentials: credentials
        });
    }
});

module.exports = router