const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    const errors = {};
    let credentials = {};
    var e = false;

    if (!username) {
        e = true;
        errors.username = 'Username is required';
    }else{
        credentials.username = username;
    }
  
    if (!password) {
        e = true;
        errors.password = 'Password is required';
    }

    // req.session.error = errors;
    if (e) {
        //return res.redirect('/login');
        return res.render('login', 
        {
            error : errors,
            credentials: credentials
        });
    }else{
        next();
    }
  
    
  };
  
  module.exports = validateLogin;