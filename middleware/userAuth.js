
const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};

const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.redirect("/");
    }
};

module.exports = { checkAuth, isLoggedIn };