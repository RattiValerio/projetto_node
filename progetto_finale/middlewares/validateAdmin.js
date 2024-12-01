const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.admin) {
        return next();
    }
    return res.status(403).render('error/restricted_access', { message: 'Access denied: Admins only' });
};
  
module.exports = isAdmin;