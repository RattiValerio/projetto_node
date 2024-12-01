const validateRegister = (req, res, next) => {
    const { username, email, password , confirm} = req.body;
    const errors = {};
    let credentials = {};
    var e = false;

    if (!username) {
        e = true;
        errors.username = 'Username is required';
    }else{
        credentials.username = username
    }

    if (!email) {
        e = true;
        errors.email = 'Email is required';
    }else{
        credentials.email = email
    }
  
    if (!password) {
        e = true;
        errors.password = 'Password is required';
    }

    if(password != confirm){
        e = true;
        errors.confirm = 'Passwords does not match'
    }

    if (!confirm) {
        e = true;
        errors.confirm = 'Confirm password is required';
    }    

    // req.session.error = errors;
    if (e) {
        //return res.redirect('/login');
        return res.render('register', 
        {
            error : errors,
            credentials: credentials
        });
    }else{
        next();
    }
  
    
  };
  
  module.exports = validateRegister;