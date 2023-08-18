const router = require('express').Router();
const { adminLogin, adminRegister, addNewUser, adminLogout } = require('../controller/authController');
const { 
    getLogin, getRegister, addUser, getUsers, getUser, editUser, searchUser, deleteUser 
} = require('../controller/adminController');
const {checkAuth, isLoggedIn } = require('../middleware/adminAuth');

router.get("/login", isLoggedIn, getLogin);
router.get("/register", isLoggedIn, getRegister);
router.post("/login", adminLogin);
router.post("/register", adminRegister);
router.get("/dashboard", checkAuth, getUsers);
router.get("/addUser", checkAuth, addUser);
router.post("/addNewUser", checkAuth, addNewUser);
router.get("/edit-user/:id", checkAuth, getUser);
router.put("/editUser/:id", checkAuth, editUser);
router.post("/search-user", checkAuth, searchUser);
router.delete("/delete-user/:id", checkAuth, deleteUser);
router.post('/logout', adminLogout);

module.exports = router;