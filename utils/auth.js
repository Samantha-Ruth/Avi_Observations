const withAuth = (req, res, next) => {
    if (!req.session.observer_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
