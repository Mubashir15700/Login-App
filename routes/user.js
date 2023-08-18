const router = require('express').Router();
const { userLogin, userRegister, userLogout } = require('../controller/authController');
const { getLogin, getRegister, getHome } = require('../controller/userController');
const { checkAuth, isLoggedIn } = require('../middleware/userAuth');

router.get("/login", isLoggedIn, getLogin);
router.get("/register", isLoggedIn, getRegister);

router.post("/user/login", userLogin);
router.post("/user/register", userRegister);
router.get("/", checkAuth, getHome);
router.post("/logout", userLogout);

module.exports = router;