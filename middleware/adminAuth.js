
const checkAuth = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect("/admin/login");
    }
};

const isLoggedIn = (req, res, next) => {
    if (!req.session.admin) {
        next();
    } else {
        res.redirect("/");
    }
};

module.exports = { checkAuth, isLoggedIn };