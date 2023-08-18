const User = require('../model/user');

const getLogin = (req, res) => {
    res.render("users/login", { error: "" });
}

const getRegister = (req, res) => {
    res.render("users/register", { error: "" });
}

const getHome = async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user);
        res.render("users/home", { user: foundUser.username });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getLogin, getRegister, getHome };