const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");
const isAuthenticated = require("../utilities/authenticate");


router.get("/users/accounts", isAuthenticated, invCont.getAllUsers);

router.get("/users/accounts/:id", isAuthenticated, invCont.editUsers)


module.exports = router;