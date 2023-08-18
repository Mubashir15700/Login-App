const User = require('../model/user');

const getLogin = (req, res) => {
    res.render("admin/login", { error: "" });
}

const getRegister = (req, res) => {
    res.render("admin/register", { error: "" });
}

const getUsers = async (req, res) => {
    try {
        const foundUsers = await User.find({ isAdmin: false }, { username: 1, phone: 1 });
        res.render("admin/dashboard", { users: foundUsers });
    } catch (error) {
        console.log(error);
    }
}

const addUser = async (req, res) => {
    res.render("admin/addUser", { error: "" });
}

const getUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.params.id }, { username: 1, phone: 1 });
        res.render("admin/editUser", { error: "", user: foundUser });
    } catch (error) {
        console.log(error);
    }
}

const editUser = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.params.id }, {
            username: req.body.username, phone: req.body.phone
        });
        res.redirect("/admin/dashboard");
    } catch (error) {
        res.render(`admin/edit-user/${req.params.id}`, {
            error: "An error occured while editing the user", user: ""
        });
    }
};

const searchUser = async (req, res) => {
    try {
        const foundUsers = await User.find({ username: { $regex: req.body.username, $options: 'i' } });
        res.render("admin/dashboard", { users: foundUsers });
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
};

module.exports = { getLogin, getRegister, addUser, getUsers, getUser, editUser, searchUser, deleteUser };