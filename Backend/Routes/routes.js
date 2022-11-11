const router = require("express").Router()
const {login, register, GetOneUser, logout} = require("../Controller/controller");
const {checkAuth} = require("../middlewear/middlewear")
 
router.post("/login", login);
router.post("/register", register);
router.get('/logout', logout);
router.get("/private",checkAuth, GetOneUser)

module.exports = router;