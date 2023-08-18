const User = require('../model/user');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.log(error);
    }
}

const adminLogin = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username, isAdmin: true });
        if (foundUser) {
            const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
            if (isMatch) {
                req.session.admin = foundUser._id;
                res.redirect("/admin/dashboard");
            } else {
                res.render("admin/login", { error: "Incorrect username or password." });
            }
        } else {
            res.render("admin/login", { error: "Incorrect username or password." });
        }
    } catch (error) {
        console.log(error);
    }
}

const adminRegister = async (req, res) => {
    try {
        const foundUser = await User.findOne({ isAdmin: true });
        if (foundUser) {
            res.render("admin/login", { error: "Admin already exists." });
        } else {
            const hash = await hashPassword(req.body.password);
            const newUser = new User({
                username: req.body.username,
                phone: req.body.phone,
                isAdmin: true,
                password: hash
            });
            await newUser.save();
            const savedUser = await User.findOne({ isAdmin: true });
            req.session.admin = savedUser._id;
            res.redirect("/admin/dashboard");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.render("users/register", { error: validationErrors });
        }
    }
}

const addNewUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if (foundUser) {
            res.render("admin/addUser", { error: "User already exists." });
        } else {
            const hash = await hashPassword(req.body.password);
            const newUser = new User({
                username: req.body.username,
                phone: req.body.phone,
                isAdmin: false,
                password: hash
            });
            await newUser.save();
            res.redirect("/admin/dashboard");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.render("users/register", { error: validationErrors });
        }
    }
}

const adminLogout = async (req, res) => {
    req.session.destroy();
    res.render("admin/login", { error: "" });
}

const userLogin = async (req, res) => {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        if (isMatch) {
            req.session.user = foundUser._id;
            res.redirect("/");
        } else {
            res.render("users/login", { error: "Wrong username or password." });
        }
    } else {
        res.render("users/register", { error: "No  user found." });
    }
}

const userRegister = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if (foundUser) {
            res.render("users/login", { error: "User already exists." });
        } else {
            const hash = await hashPassword(req.body.password);
            const newUser = new User({
                username: req.body.username,
                phone: req.body.phone,
                isAdmin: false,
                password: hash
            });
            await newUser.save();
            const savedUser = await User.findOne({ username: req.body.username });
            req.session.user = savedUser._id;
            res.redirect("/");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            console.log(validationErrors);
            res.render("users/register", { error: validationErrors });
        }
    }
}

const userLogout = async (req, res) => {
    req.session.destroy();
    res.render("users/login", { error: "" });
}

module.exports = {
    adminLogin, adminRegister, addNewUser, adminLogout, userLogin, userRegister, userLogout
};